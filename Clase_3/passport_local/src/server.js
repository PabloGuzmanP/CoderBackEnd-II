import express from "express";
import usersRouter from "./routes/api.users.route.js";
import sessionRouter from "./routes/api.sessions.route.js";
import mongoDB from "./config/mongoose.config.js";
import handlebarsConfig from "./config/handlebars.config.js";
import homeRouter from "./routes/home.route.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import { configPassport } from "./config/passport.config.js";

const server = express();
const PORT = 8080;
const HOST = "localhost";

server.use(express.urlencoded({extended: true}));
server.use(express.json());

const storeOptions = MongoStore.create({
    mongoUrl: "mongodb+srv://juanpagu2101:Quemiralampara@clusterbackend.urvvi7i.mongodb.net/hash-password",
    autoRemove: "native",
});

// Configuración de Sessions
const sessionOptions = {
    store: storeOptions,
    secret: "secretCoder",
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