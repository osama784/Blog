import { Request, Response, Router } from "express";
import passport from "passport";
import "../auth/localStrategy";

const router = Router();

router.post("/login", passport.authenticate("local"), (req: Request, res: Response) => {
    res.status(200).send({ success: true, message: "logged in" });
});

router.post("/status", (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
        res.status(200).send({ success: true, message: "logged in" });
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
});

export default router;
