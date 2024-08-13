import dotenv, { parse } from "dotenv";
import { Command } from "commander";

const programa = new Command();

programa
    .version("1.2.2")
    .description("Este programa define el entorno de trabajo")
    .requiredOption("-e, --env <string>", "Especifica el entorno")
    parse(process.argv);

const options = programa.opts();

dotenv.config({
    path: (options.env === "PROD" ? "./.env.prod" : "./.env.dev"),
});

console.log(process.env.PORT);