import express from "express";
import usersRouter from "./routes/users.route.js";
import homeRouter from "./routes/home.route.js";

import mongoDB from "./config/mongoose.config.js";
import { config as configDotEnv } from "./config/dotenv.config.js";

const server = express();

server.use(express.urlencoded({extended: true}));
server.use(express.json());

server.use("/api/users", usersRouter);
server.use("/", homeRouter);

// Configuracion de variables de entorno
configDotEnv();

server.use("*", (req, res) => {
    res.status(404).send("Ruta inexistente");
});

server.listen(process.env.PORT, () => {
    console.log(process.env.PORT);
    
    console.log(`Ejecutándose en http://localhost:${process.env.PORT}`);
    mongoDB.connectDB();
});