import { NextFunction, Request, Response } from "express";
import Blog from "../../models/Blog";

const listBlogs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const blogs = await Blog.find().lean().exec();
        res.status(200).json(blogs);
    } catch (e) {
        next(e);
    }
};

export default listBlogs;
