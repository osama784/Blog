import mongoose from "mongoose";
import { z } from "zod";

const BlogSchema = z.object({
    title: z.string().min(10).trim(),
    content: z.string().min(4).trim(),
    category: z.string().min(5).trim(),
    tags: z.string().trim().optional(),
});

export default BlogSchema;
