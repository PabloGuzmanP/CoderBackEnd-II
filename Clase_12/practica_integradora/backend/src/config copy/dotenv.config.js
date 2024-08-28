import dotenv from "dotenv";
import { Command } from "commander";
import paths from "../utils/paths.js";

export const config = () => {
    const command = new Command();

    command.option("-e, --env <string>", "Especifica el entorno de trabajo.", "DEV")
    .parse(process.argv);
    const options = command.opts();
    
    dotenv.config({
        path: (options.env === "PROD" ? paths.env.prod : paths.env.dev),
    });
}

