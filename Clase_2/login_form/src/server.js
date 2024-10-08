import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";

import usersRouter from "./routes/api.users.route.js";
import sessionRouter from "./routes/api.sessions.route.js";
import homeRouter from "./routes/home.route.js";

import mongoDB from "./config/mongoose.config.js";
import handlebarsConfig from "./config/handlebars.config.js";
import { config as dotenvConfig } from "dotenv";
import paths from "./utils/path.js";


const server = express();
const PORT = 8080;
const HOST = "localhost";

server.use(express.urlencoded({extended: true}));
server.use(express.json());

dotenvConfig({ path: paths.env });

handlebarsConfig.config(server);

const storeOptions = MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    autoRemove: "native",
});

// Configuración de Sessions
const sessionOptions = {
    store: storeOptions,
    // El secret es una clave secreta
    secret: process.env.SECRET_KEY,
    cookie: {maxAge: 60*1000},
    resave: false, 
    saveUninitialized: true
};

// Middleware para la gestion de sessions
server.use(session(sessionOptions))

server.use("/api/users", usersRouter);
server.use("/", homeRouter);
server.use("/api/sessions",sessionRouter)

server.use("*", (req, res) => {
    res.status(404).send("Ruta inexistente");
});

server.listen(PORT, () => {
    console.log(`Ejecutándose en http://${HOST}:${PORT}`);
    mongoDB.connectDB();
});