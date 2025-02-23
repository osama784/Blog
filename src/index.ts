import express, { NextFunction, Request, Response } from "express";
import { config } from "dotenv";
import blogRouter from "./routes/Blog";
import usersRouter from "./routes/User";
import authRouter from "./routes/Auth";
import "./config/dbConn";
import mongoose from "mongoose";
import session from "express-session";
import AppError from "./utils/AppError";
import passport from "passport";
import { logger, loggerMiddlware } from "./middlewares/logger";
import MongoStore from "connect-mongo";
config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(
    session({
        secret: process.env.SESSION_SECRET!,
        store: MongoStore.create({
            client: mongoose.connection.getClient(),
        }),
        saveUninitialized: false,
        resave: false,
        cookie: {
            secure: true,
            httpOnly: true,
            sameSite: "strict",
            maxAge: 60000 * 60,
        },
    })
);
app.use(loggerMiddlware);

app.use(passport.initialize());
app.use(passport.session());

app.use("/blogs", blogRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);

app.use((err: AppError | Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        res.status(err.statusCode).json({ message: err.message });
    } else {
        res.status(500).json({
            message: "Something went wrong on the server",
        });
        logger.error(err.message);
    }
});

mongoose.connection.on("open", () => {
    console.log("connected to mongodb");
    app.listen(PORT, () => {
        console.log(`Listening on Port ${PORT}`);
    });
});
