console.log("---------- PROCESS ----------");
console.log("\tVersion de Node:", process.version);
console.log("\tMemoria en uso:", process.memoryUsage());
// console.log("Variables de Entorno", process.env);
console.log("\tUsuario del sistemas:", process.env.USERNAME);
console.log("\tRuta de carpeta personal:", process.env.HOME);
console.log("\tIdioma del SO:", process.env.LANG);
console.log("\tRuta desde donde se ejecuto el arcivho:", process.cwd());

console.log("---------- CREAR VARIABLE DE ENTORNO ----------");
process.env.MI_VARIABLE = "Creacion de variable de entorno"
console.log("\tMi variable:", process.env.MI_VARIABLE);

// console.log("---------- ESCUCHAR EVENTOS ----------");

// process.on("message", (msg) => {
//     console.log("Mensaje Recibido", msg);
// });

// setTimeout(() => {
//     process.emit("message", "Hola Mundo!");
// }, 1000);

console.log("---------- ARGUMENTOS ----------");
console.log("\tArgumentos recibidos", process.argv);
const argumentos = process.argv.slice(2);

argumentos.forEach((argumento) => {
    console.log("\t", argumento);
})