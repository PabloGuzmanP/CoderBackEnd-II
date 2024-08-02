import passport from "passport";
import { ERROR_INVALID_TOKEN, ERROR_NOT_FOUND_TOKEN, ERROR_INVALID_ID, ERROR_NOT_FOUND_ID } from "../constants/messages.constant.js";

const translator =  {
    [ERROR_INVALID_ID]: ERROR_INVALID_ID,
    [ERROR_NOT_FOUND_ID]: ERROR_NOT_FOUND_ID,
    ["No auth token"]: ERROR_NOT_FOUND_TOKEN,
    ["invalid token"]: ERROR_INVALID_TOKEN
};

export const checkAuth = (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (error, user, info) => {
        if(error) return next(error);
        if(!user) return res.status(401).send(translator[info.message]);

        req.user = user;

        next();
    })(req, res, next);
};