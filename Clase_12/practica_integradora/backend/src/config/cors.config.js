import cors from "cors";

export const config = (server) => {
    server.use(cors({
        origin: process.env.FRONTEND_HOST,
        methods: "GET, POST, PUT, DELETE",
    }));
};