import { Router } from "express";
import UserManager from "../managers/UserManager.js";

const router = Router();
const userManager = new UserManager();

router.post("/register", async (req, res) => {
    try {
        console.log(req.body);
        await userManager.insertOne(req.body);
        res.status(201).redirect("/login");
    } catch (error) {
        res.json(error.message);
    }
});

router.post("/login", async (req, res) => {
    try {

        if(req.session?.user?.loggedIn) {
            throw new Error ("Ya has iniciado sesión.")
        }

        const {email, password} = req.body;
        const userFound = await userManager.getOneByEmailAndPassword(email, password);

        req.session.user = {
            id: userFound._id.toString(),
            name: userFound.name,
            loggedIn: true,
        };

        res.status(200).redirect("/")
    } catch (error) {
        res.json(error.message);
    }
});

router.post("/logout", async (req, res) => {
    try {
        req.session.destroy();
        res.status(200).redirect("/");
    } catch (error) {
        res.json(error.message);
    }
});


export default router;