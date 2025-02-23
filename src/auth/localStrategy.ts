import passport from "passport";
import { Strategy } from "passport-local";
import User from "../models/User";
import bcrypt from "bcryptjs";
import AppError from "../utils/AppError";

export default (function initPassport() {
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id: string, done) => {
        try {
            const user = await User.findById(id);
            if (!user) {
                throw new Error("user not found");
            }
            done(null, user);
        } catch (e) {
            done(e, null);
        }
    });

    passport.use(
        new Strategy(async (username, password, done) => {
            try {
                const user = await User.findOne({
                    username: username,
                });
                if (!user) {
                    return done(new AppError("username or password is incorrect", 400), false);
                }
                const isMatch = await bcrypt.compare(password, user.password!);
                if (!isMatch) {
                    return done(new AppError("username or password is incorrect", 400), false);
                }
                done(null, user);
            } catch (e) {
                done(e, false);
            }
        })
    );
})();
