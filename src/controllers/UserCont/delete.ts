import { NextFunction, Request, Response } from "express";
import User from "../../models/User";
import AppError from "../../utils/AppError";

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    if (!res.locals[User.modelName]) {
        next(new Error("something went wrong on the server"));
        return;
    }
    try {
        const user = res.locals[User.modelName];
        const result = await user.deleteOne().lean().exec();
        if (result.deletedCount == 0) {
            next(new AppError("no user found", 404));
            return;
        }
        res.status(204).json({ success: true });
    } catch (e) {
        next(e);
    }
};

export default deleteUser;
