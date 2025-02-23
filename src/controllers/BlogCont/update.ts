import { NextFunction, Request, Response } from "express";
import Blog from "../../models/Blog";
import AppError from "../../utils/AppError";
import { Document } from "mongoose";

const updateBlog = async (req: Request, res: Response, next: NextFunction) => {
    if (!res.locals[Blog.modelName]) {
        next(new Error("something went wrong on the server"));
        return;
    }
    try {
        const blog: Document = res.locals[Blog.modelName];
        const updatedBlog = await blog.updateOne({ $set: req.validatedData }, { new: true }).lean().exec();
        res.status(200).json({ success: true, blog: updatedBlog });
    } catch (e) {
        next(e);
    }
};

export default updateBlog;
