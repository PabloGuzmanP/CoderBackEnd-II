import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";

import { config as dotenvConfig } from "dotenv";
import mongoDB from "./config/mongoose.config.js";
import handlebarsConfig from "./config/handlebars.config.js";
import { configPassport } from "./config/passport.config.js";

import usersRouter from "./routes/api.users.route.js";
import sessionRouter from "./routes/api.sessions.route.js";
import homeRouter from "./routes/home.route.js";
import paths from "./utils/path.js";

const server = express();
const PORT = 8080;
const HOST = "localhost";

server.use(express.urlencoded({extended: true}));
server.use(express.json());

dotenvConfig({ path: paths.env })

const storeOptions = MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    autoRemove: "native",
});

// Configuración de Sessions
const sessionOptions = {
    store: storeOptions,
    secret: process.env.SECRET_KEY,
    cookie: {maxAge: 2 * 60 * 60 * 1000}, // Esto equivale a dos horas
    resave: false, 
    saveUninitialized: false
};

// Middleware para la gestion de sessions
server.use(session(sessionOptions));

// Configuracion de Passport
configPassport();
server.use(passport.initialize());
server.use(passport.session());

handlebarsConfig.config(server);

server.use("/api/users", usersRouter);
server.use("/api/sessions",sessionRouter);
server.use("/", homeRouter);

server.use("*", (req, res) => {
    res.status(404).send("Ruta inexistente");
});

server.use((error, req, res) => {
    console.log("Error: ", error.message);
    res.status(500).send("<h1>Error 500</h1><h3>Se ha generado un error en el servidor</h3>");
});

server.listen(PORT, async () => {
    console.log(`Ejecutándose en http://${HOST}:${PORT}`);
    await mongoDB.connectDB();
});