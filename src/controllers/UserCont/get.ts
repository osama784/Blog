import { NextFunction, Request, Response } from "express";
import User from "../../models/User";
import AppError from "../../utils/AppError";

const findUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(req.params.id).lean().exec();
        if (!user) {
            next(new AppError("no user found", 404));
            return;
        }
        res.status(200).json({ success: true, user });
    } catch (e) {
        next(e);
    }
};

export default findUser;
