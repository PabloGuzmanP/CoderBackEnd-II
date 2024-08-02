import { Router } from "express";
import UserManager from "../managers/UserManager.js";
import jwt from "jsonwebtoken"

const router = Router();
const userManager = new UserManager()

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = userManager.getOneByEmailAndPassword(email, password);
        const accessToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY_JWT, { expiresIn: "2h" });

        res.status(200).json({ status: true, token: accessToken })

    } catch (error) {
        res.status(500).json({ status: false, message: error.message })
    }
});

router.post("/register", async (req, res) => {
    try {
        const userCreated = userManager.insertOne(req.body);
        const accessToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY_JWT, { expiresIn: "2h" });

        res.status(200).json({ status: true, payload: userCreated, token: accessToken })

    } catch (error) {
        res.status(500).json({ status: false, message: error.message })
    }
});

export default router;