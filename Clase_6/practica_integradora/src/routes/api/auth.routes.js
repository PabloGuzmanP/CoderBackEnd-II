import { Router } from "express";
import { handleError } from "../../middlewares/error.middleware.js";
import { generateToken } from "../../middlewares/auth.middleware.js";

const router = Router();

// Ruta para poder ingresar y obtener el token
router.post("/login", generateToken, async (req, res, next) => {
    try {
        const token = req.token;
        res.status(200).json({ status: true, payload: token });
    } catch (error) {
        next(error);
    }
});

// Middleware de manejo de errores
router.use(handleError);

export default router;