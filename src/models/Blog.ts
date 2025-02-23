import mongoose, { Schema } from "mongoose";
import Blog from "../types/Blog";

const Blog = new Schema<Blog & { author: mongoose.Types.ObjectId }>(
    {
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        title: String,
        content: String,
        tags: String,
        category: String,
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Blog", Blog);
