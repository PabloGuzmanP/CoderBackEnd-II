import { Command } from "commander";

const programa = new Command();

programa.version("1.5.2")
    .option("-n, --name <String>", "Especifica el nombre")
    .option("-a, --age <Number>", "Especifica la edad", 18, parseInt)
    .requiredOption("-i, --isArgentino <boolean>", "Especifica si es argentino", (value) => value === "true")
    .parse(process.argv);
const options = programa.opts();
console.log(options);
