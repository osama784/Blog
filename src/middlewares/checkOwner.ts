import { NextFunction, Request, Response } from "express";
import mongoose, { Document } from "mongoose";
import AppError from "../utils/AppError";

type options = {
    isForeignKey: boolean;
    fieldName: string;
};

const checkOwner = (modelName: string, options: options | null) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const model = mongoose.model(modelName);
        const doc: Document | null = await model.findById(req.params.id);
        if (!doc) {
            next(new AppError(`no ${modelName.toLowerCase()} found`, 404));
            return;
        }
        if (options && options.isForeignKey) {
            const foreignKey = doc.get(options.fieldName);
            if (!foreignKey || !(foreignKey instanceof mongoose.Types.ObjectId)) {
                next(new Error("invalid field name"));
                return;
            }

            if (foreignKey.equals(req.user?.id)) {
                res.locals[modelName] = doc;
                next();
                return;
            }
            next(new AppError("you're not allowed to be here", 403));
            return;
        }
        if (doc.id == req.user?.id) {
            res.locals[modelName] = doc;
            next();
            return;
        }
        next(new AppError("you're not allowed to be here", 403));
    };
};

export default checkOwner;
