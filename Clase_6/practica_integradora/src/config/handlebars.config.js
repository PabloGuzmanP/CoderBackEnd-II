import handlebars from "express-handlebars";
import path from "../utils/paths.js";

export const config = (serverHTTP) => {
    const hbs = handlebars.create({
        defaultLayout: "main",
        runtimeOptions: {
            allowedProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true,
        },
    });
    serverHTTP.engine("handlebars", hbs.engine);
    serverHTTP.set("views", path.views);
    serverHTTP.set("view engine", "handlebars")
};