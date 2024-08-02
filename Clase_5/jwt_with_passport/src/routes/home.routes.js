import { Router } from "express";
import passport from "passport";
import { checkAuth } from "../middlewares/auth.middleware.js";

const router = Router();

// Ruta para la página de inicio
router.get("/", async (req, res) => {
    res.status(200).render("home");
});

router.get("/login", async (req, res) => {
    res.status(200).render("login");
});

router.get("/current", checkAuth, async (req, res) => {
    res.status(200).render("current");
});

router.get("/logout", async (req, res) => {
    res.clearCookie("cookieToken");
    res.status(200).send("Has cerrado sesion")
});

export default router;