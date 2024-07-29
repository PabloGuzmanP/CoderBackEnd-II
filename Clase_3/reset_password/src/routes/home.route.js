import { Router } from "express";
import UserManager from "../managers/UserManager.js";

const router = Router();
const userManager = new UserManager();

router.get("/", async (req, res) => {
    try {
        console.log('Session:', req.session);
        const session = {
            loggedIn: req.session?.user?.loggedIn,
            loggedOut: !(req.session?.user?.loggedIn ?? false),
        }
        res.status(200).render("home", session);
    } catch (error) {
        res.json(error.message);
    }
});


router.get("/login", async (req, res) => {
    try {
        res.status(200).render("login");
    } catch (error) {
        res.json(error.message);
    }
});

router.get("/register", async (req, res) => {
    try {
        res.status(200).render("register");
    } catch (error) {
        res.json(error.message);
    }
});

router.get("/profile", async (req, res) => {
    try {
        const id = req.session.user.id;
        const userFound = await userManager.getOneById(id);
        res.status(200).render("profile", userFound);
    } catch (error) {
        res.json(error.message);
    }
});

router.get("/reset-password", async (req, res) => {
    res.status(200).render("resetPassword");
});


export default router;