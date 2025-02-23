import { NextFunction, Request, Response } from "express";
import User from "../../models/User";

const listUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.find().select("-password").lean().exec();
        res.status(200).json(users);
    } catch (e) {
        next(e);
    }
};

export default listUsers;
