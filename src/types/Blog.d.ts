import BlogSchema from "../validators/BlogSchema";
import { z } from "zod";

type Blog = z.infer<typeof BlogSchema>;

export default Blog;
