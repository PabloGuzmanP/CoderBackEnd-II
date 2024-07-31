import { Router } from "express";

const router = Router();

const validateSession = (req, res, next) => {
    if(!req.isAuthenticated()){
        return res.status(403).send("Este es un recurso privado exclusivo para usuarios registrados.");
    }

    next();
};

// Ruta para la página de inicio
router.get("/", async (req, res) => {
    res.status(200).render("home");
});

router.get("/github/login-failure", async (req, res) => {
    res.status(401).json("Fallo la autenticación");
});

router.get("/github/login-success", async (req, res) => {
    res.status(200).redirect("/");
});

router.get("/profile", validateSession, async (req, res) => {
    res.status(200).render("profile", {})
});

router.get("/logout", async (req, res) => {
    req.logout((error) => {
        if(error) res.status(400).json(error.message);
        res.status(200).redirect("/");
    });
});

export default router;