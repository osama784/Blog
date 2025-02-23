import { NextFunction, Request, Response } from "express";
import Blog from "../../models/Blog";

const createBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const blog = await Blog.create({ ...req.validatedData, author: req.user?.id });
        res.status(201).json({ success: true, blog });
    } catch (e) {
        next(e);
    }
};

export default createBlog;
