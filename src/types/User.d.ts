import { Document } from "mongoose";
import UserSchema from "../validators/UserSchema";
import { z } from "zod";

type User = z.infer<typeof UserSchema>;

export default User;
