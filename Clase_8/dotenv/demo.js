import dotenv from "dotenv";
import { Command } from "commander";

dotenv.config(); // Si se envia vacio va a buscar las variables de entorno al archivo .env
console.log(process.env.SALUDO);
console.log(process.env.PAIS);

dotenv.config({
    path: (process.env.ENVIROMENT === "PROD" ? "./.env.prod" : "./.env.dev")
});
console.log(process.env.PORT);

