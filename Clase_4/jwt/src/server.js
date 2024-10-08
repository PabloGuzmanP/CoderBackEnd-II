import express from "express";
import paths from "./utils/paths.js";

import { config as dotenvConfig } from "dotenv";
import { connectDB } from "./config/mongoose.config.js";
import { config as configHandlebars } from "./config/handlebars.config.js";

import apiAuthRouter from "./routes/api.auth.routes.js";
import apiUsersRouter from "./routes/api.users.routes.js";
import homeRouter from "./routes/home.routes.js";

const server = express();

// Middleware para decodificar datos de formularios y JSON
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Declaración de ruta estática: http://localhost:8080/api/public
server.use("/public", express.static(paths.public));

// Variables de entorno
dotenvConfig({ path: paths.env });

// Conexión con la Base de Datos
connectDB();

// Configuración del motor de plantillas
configHandlebars(server);

// Enrutadores
server.use("/api/users", apiUsersRouter);
server.use("/api/auth", apiAuthRouter);
server.use("/", homeRouter);

// Control de rutas inexistentes
server.use("*", (req, res) => {
    res.status(404).send("<h1>Error 404</h1><h3>La URL indicada no existe en este servidor</h3>");
});

// Control de errores internos
server.use((error, req, res) => {
    console.log("Error:", error.message);
    res.status(500).send("<h1>Error 500</h1><h3>Se ha generado un error en el servidor</h3>");
});

// Método oyente de solicitudes
server.listen(process.env.PORT, async () => {
    console.log(`Ejecutándose en http://localhost:${process.env.PORT}`);
});