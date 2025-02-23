import mongoose from "mongoose";
import Blog from "../../models/Blog";
import { NextFunction, Request, Response } from "express";

const findBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const blog = await Blog.findById(req.params.id).lean().exec();
        if (!blog) {
            res.status(404).json({ message: "no blog found" });
            return;
        }
        res.status(200).json({ success: true, blog });
    } catch (e) {
        next(e);
    }
};

export default findBlog;
