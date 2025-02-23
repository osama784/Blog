import { Router } from "express";
import validate from "../middlewares/validate";
import BlogSchema from "../validators/BlogSchema";
import createBlog from "../controllers/BlogCont/create";
import updateBlog from "../controllers/BlogCont/update";
import listBlogs from "../controllers/BlogCont/list";
import deleteBlog from "../controllers/BlogCont/delete";
import findBlog from "../controllers/BlogCont/get";
import checkOwner from "../middlewares/checkOwner";
import Blog from "../models/Blog";
import authenticated from "../middlewares/authenticated";
import mongoose from "mongoose";
import AppError from "../utils/AppError";

const router = Router();

router.param("id", (req, res, next, value, name) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        next(new AppError("invalid ID", 400));
        return;
    }
    next();
});

router.get("/", listBlogs);
router.get("/:id", findBlog);
router.post("/create", authenticated, validate(BlogSchema), createBlog);
router.put(
    "/update/:id",
    authenticated,
    checkOwner(Blog.modelName, {
        isForeignKey: true,
        fieldName: "author",
    }),
    validate(BlogSchema.partial()),
    updateBlog
);
router.delete(
    "/delete/:id",
    authenticated,
    checkOwner(Blog.modelName, {
        isForeignKey: true,
        fieldName: "author",
    }),
    deleteBlog
);

export default router;
