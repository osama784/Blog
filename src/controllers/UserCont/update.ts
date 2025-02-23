import { NextFunction, Request, Response } from "express";
import User from "../../models/User";
import bcrypt from "bcryptjs";
import { Document } from "mongoose";

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    if (!res.locals[User.modelName]) {
        next(new Error("something went wrong on the server"));
        return;
    }
    let update = req.validatedData;
    if (req.validatedData?.password) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.validatedData?.password, salt);
        update = { ...update, password: hash };
    }
    try {
        const user: Document = res.locals[User.modelName];
        const updatedUser = await user.updateOne({ $set: update }, { new: true }).lean().exec();
        res.status(201).json({ success: true, user: updatedUser });
    } catch (e) {
        next(e);
    }
};

export default updateUser;
