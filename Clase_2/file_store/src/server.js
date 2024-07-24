import express from "express";
import loginRouter from "./routes/login.route.js";
import session from "express-session";
import sessionFileStore from "session-file-store";
import paths from "./utils/path.js";

const server = express();
const PORT = 8080;
const HOST = "localhost";

// Decodificadores del BODY
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

const storeOptions = {
    path: paths.sessions,
    ttl: 10,
    retries: 0
};

// Configuración de Sessions
const FileStore = sessionFileStore(session);
const sessionOptions = {
    store: new FileStore(storeOptions),
    // El secret es una clave secreta
    secret: "secretCoder",
    cookie: {maxAge: 60*1000},
    resave: false, 
    saveUninitialized: true
};

// Middleware para la gestion de sessions
server.use(session(sessionOptions))

// Enrutadores
server.use("/", loginRouter);

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
server.listen(PORT, () => {
    console.log(`Ejecutándose en http://${HOST}:${PORT}`);
});