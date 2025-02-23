import { Request } from "express";
import { Document } from "mongoose";
import IUser from "./User";

declare module "express" {
    interface Request {
        validatedData?: Object<any>;
    }
}

declare global {
    namespace Express {
        interface User extends Document, IUser {}
    }
}
