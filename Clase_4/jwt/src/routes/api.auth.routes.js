import { Router } from "express";
import UserManager from "../managers/UserManager.js";
import { checkAuth } from "../middleware/auth.middleware.js";

import {
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND_ID,
    ERROR_NOT_FOUND_CREDENTIALS,
} from "../constants/messages.constant.js";
import { generateToken } from "../utils/security.js";

const router = Router();
const userManager = new UserManager();

// Función para manejar errores
const errorHandler = (res, message) => {
    if (message === ERROR_INVALID_ID) return res.status(400).json({ status: false, message: ERROR_INVALID_ID });
    if (message === ERROR_NOT_FOUND_ID) return res.status(404).json({ status: false, message: ERROR_NOT_FOUND_ID });
    if (message === ERROR_NOT_FOUND_CREDENTIALS) return res.status(401).json({ status: false, message: ERROR_NOT_FOUND_CREDENTIALS });
    return res.status(500).json({ status: false, message });
};

// Ruta para generar el token
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const userFound = await userManager.getOneByEmailAndPassword(email, password);
        const accessToken = generateToken(userFound.id, userFound.role);

        res.status(201).json({ status: true, generateToken: accessToken });
    } catch (error) {
        errorHandler(res, error.message);
    }
});

router.post("/register", async (req, res) => {
    try {
        const userCreated = await userManager.insertOne(req.body);
        const accessToken = generateToken(userCreated.id, userCreated.role)
        res.status(201).json({ status: true, payload: {user: userCreated, token: accessToken} });
    } catch (error) {
        errorHandler(res, error.message);
    }
});

export default router;