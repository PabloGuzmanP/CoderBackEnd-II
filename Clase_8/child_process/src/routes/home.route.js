import { Router } from "express";
import { calculateComplexOperation } from "../utils/operations.js";
import { fork } from "child_process";
import paths from "../utils/paths.js";

const router = new Router();
let count = 0;

router.get("/saludo", (req, res) => {
    count++;
    res.status(200).send(`Hola Mundo ${count}`);
});

router.get("/calculo-bloqueante", (req, res) => {
    const result = calculateComplexOperation();
    res.status(200).send(`El resultado del calculo bloqueante es: ${result}`);
});

router.get("/calculo-no-bloqueante", (req, res) => {
    const childProcess = fork(`${paths.forks}/operation.fork.js`);
    childProcess.send("Iniciar proceso")

    childProcess.on("message", (data) => {
        if(data.error){
            res.status(500).send(`Error al realizar el calculo no bloqueante ${data.error}`);
        } else {
            res.status(200).send(`El resultado del calculo no bloqueante es: ${data.result}`);
        }
    });
});

export default router