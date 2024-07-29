import { connect } from "mongoose";

const connectDB = () => {
    const URI = "mongodb+srv://juanpagu2101:Quemiralampara@clusterbackend.urvvi7i.mongodb.net/";

    connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "hash-password"
    })
        .then(() => console.log("Conectado a MongoDB"))
        .catch((error) => console.error("Fallo en la conexion a MonogoDB"));
};

export default {
    connectDB
};