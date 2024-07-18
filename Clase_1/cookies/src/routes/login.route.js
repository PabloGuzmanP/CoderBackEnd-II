import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
    res.status(200).render("login");
});

router.post("/", async (req, res) => {
    const { name, email } = req.body;

    const options = {
        secure: true,
        maxAge: 100 * 1000,
        path: "/",
        signed: true,
    }

    res.cookie("name", name, options);
    res.cookie("email", email, options);

    res.status(200).send("Las cookies se han creado correctamente")
});

router.get("/get-cookie", async (req, res) => {
    const { name, email } = req.signedCookies;

    res.status(200).json({ name, email });
});

router.get("/delete", async (req, res) => {

    res.clearCookie("name");

    res.status(200).json(req.signedCookies);
});

export default router;