import jwt from "jsonwebtoken";
import passport from "passport";
import UserManager from "../managers/user.manager.js";
import { JWT_TRANSLATIONS } from "../constants/messages.constant.js";

const userManager = new UserManager();

export const generateToken = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const userFound = await userManager.getOneByEmailAndPassword(email, password);

        const token = jwt.sign({ id: userFound._id}, process.env.SECRET_KEY, { expiresIn: "2h" });

        req.token = token;
        next();
    } catch (error) {
        next(error);
    }
};

export const checkAuth = (req, res, next) => {
    passport.authenticate("jwt-api", { session: false }, (error, user, info) => {
        if(error) return next(error);

        if(!user) return next(new Error(JWT_TRANSLATIONS[info.message] ?? info.message));

        req.roles = user.roles
        next();
    })(req, res, next);
};