import { connect } from "mongoose";
import paths from "../utils/paths.js";
import { config as configDotEnv } from "../config/dotenv.config.js";

configDotEnv();

const connectDB = () => {
    console.log(process.env.MONGODB_URI);
    
    connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => console.log("Conectado a MongoDB"))
        .catch((error) => console.error("Fallo en la conexion a MonogoDB"));
};

export default {
    connectDB
};