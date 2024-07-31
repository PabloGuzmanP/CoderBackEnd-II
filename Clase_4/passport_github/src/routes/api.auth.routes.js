import { Router } from "express";
import UserManager from "../managers/UserManager.js";

import {
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND_ID,
    ERROR_NOT_FOUND_CREDENTIALS,
} from "../constants/messages.constant.js";
import passport from "passport";

const router = Router();
const userManager = new UserManager();

// Función para manejar errores
const errorHandler = (res, message) => {
    if (message === ERROR_INVALID_ID) return res.status(400).json({ status: false, message: ERROR_INVALID_ID });
    if (message === ERROR_NOT_FOUND_ID) return res.status(404).json({ status: false, message: ERROR_NOT_FOUND_ID });
    if (message === ERROR_NOT_FOUND_CREDENTIALS) return res.status(401).json({ status: false, message: ERROR_NOT_FOUND_CREDENTIALS });
    return res.status(500).json({ status: false, message });
};

router.get("/github", passport.authenticate("github"));

router.get("/github/callback", passport.authenticate("github", {
    failureRedirect: "/github/login-failure",
    successRedirect: "/github/login-success",
}));



// router.get("/github/callback", async (req, res) => {
//     try {
//         const usersFound = await userManager.getAll(req.query);
//         res.status(200).json({ status: true, payload: usersFound });
//     } catch (error) {
//         errorHandler(res, error.message);
//     }
// });

export default router;