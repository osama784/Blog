import { Router } from "express";
import validate from "../middlewares/validate";
import UserSchema from "../validators/UserSchema";
import createUser from "../controllers/UserCont/create";
import listUsers from "../controllers/UserCont/list";
import updateUser from "../controllers/UserCont/update";
import deleteUser from "../controllers/UserCont/delete";
import findUser from "../controllers/UserCont/get";
import authenticated from "../middlewares/authenticated";
import checkOwner from "../middlewares/checkOwner";
import User from "../models/User";
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

router.get("/:id", findUser);
router.get("/", listUsers);
router.post("/create", authenticated, validate(UserSchema), createUser);
router.put("/update/:id", authenticated, checkOwner(User.modelName, null), validate(UserSchema.partial()), updateUser);
router.delete("/delete/:id", authenticated, checkOwner(User.modelName, null), deleteUser);

export default router;
