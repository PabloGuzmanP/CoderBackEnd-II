import { Router } from "express";

const router = Router();
const users = [
    {
        username: "juan",
        password: "1234"
    },
    {
        username: "maria",
        password: "4321"
    }
]

router.get("/", async (req, res) => {
    if(!req.session?.username){
        return res.status(200).send("Te damos la bienvenida.")
    }

    if(!req.session.counter){
        req.session.counter = 1;
        return res.status(200).send(`Bienvenido ${req.session.username}`)
    }

    req.session.counter++;
    res.status(200).send(`${req.session.username} visitiaste esta pagina ${req.session.counter}`)
});

router.get("/login", async (req, res) => {
    const {username, password} = req.query;

    const user = users.find((user) => user.username === username && user.password === password);

    if(!user){
        return res.status(401).send("Usuario o contraseña incorrectos");
    }

    req.session.username = user.username;
    return res.status(200).send("Has iniciado sesión correctamente!");
});


router.get("/logout", async (req, res) => {
    req.session.destroy();
    return res.status(200).send("Se ha cerrado la sesión!");
});

export default router;