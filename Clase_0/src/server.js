import express from "express";
import usersRouter from "./routes/users.route.js"
import mongoDB from "./config/mongoose.config.js";

const server = express();
const PORT = 8080;
const HOST = "localhost";

server.use(express.urlencoded({extended: true}));
server.use(express.json());

server.use("/api/users", usersRouter);

server.use("*", (req, res) => {
    res.status(404).send("Ruta inexistente");
});

server.listen(PORT, () => {
    console.log(`Ejecutándose en http://${HOST}:${PORT}`);
    mongoDB.connectDB();
});