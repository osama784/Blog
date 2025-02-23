import { NextFunction, Request, Response } from "express";
import Blog from "../../models/Blog";
import { DeleteResult, Document } from "mongoose";
import AppError from "../../utils/AppError";

const deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
    if (!res.locals[Blog.modelName]) {
        next(new Error("something went wrong on the server"));
        return;
    }
    try {
        const blog: Document = res.locals[Blog.modelName];
        const result: DeleteResult = await blog.deleteOne();

        if (result.deletedCount == 0) {
            next(new AppError("no blog found", 404));
            return;
        }
        res.status(204).json({ success: true });
    } catch (e) {
        next(e);
    }
};

export default deleteBlog;
