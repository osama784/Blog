import { NextFunction, Request, Response } from "express";
import User from "../../models/User";
import bcrypt from "bcryptjs";
import AppError from "../../utils/AppError";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        next(new AppError("Forbidden", 403));
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.validatedData.password, salt);
        const user = await User.create({
            ...req.validatedData,
            password: hash,
        });
        res.status(201).json({ success: true, user });
    } catch (e) {
        next(e);
    }
};

export default createUser;
