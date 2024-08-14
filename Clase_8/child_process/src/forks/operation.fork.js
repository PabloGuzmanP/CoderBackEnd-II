import { calculateComplexOperation } from "../utils/operations.js";

process.on("message", (data) => {
    console.log(`Mensaje recibido: ${JSON.stringify(data)}  - PID ${process.pid}`);
    
    try {
        const result = calculateComplexOperation();
        console.log(`Resultado de la operacion: ${result}`);

        process.send({ result });
        
    } catch (error) {
        process.send({ error: `Error critico. ${error.message}` })
    }
});