import { connect } from "mongoose";

const connectDB = () => {
    const URI = "mongodb+srv://juanpagu2101:Quemiralampara@clusterbackend.urvvi7i.mongodb.net/?retryWrites=true&w=majority&appName=ClusterBackEnd";

    connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "class-zero"
    })
        .then(() => console.log("Conectado a MongoDB"))
        .catch((error) => console.error("Fallo en la conexion a MonogoDB"));
};

export default {
    connectDB
};