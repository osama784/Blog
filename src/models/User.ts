import { model, Schema } from "mongoose";
import User from "../types/User";

const User = new Schema<User>(
    {
        username: {
            type: String,
            unique: true,
        },
        password: String,
        email: String,
        phone: String,
    },
    {
        timestamps: true,
    }
);

export default model("User", User);
