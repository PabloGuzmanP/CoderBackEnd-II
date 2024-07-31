import jwt from "jsonwebtoken";
import UserManager from "../managers/UserManager.js"

const userManager = new UserManager();

export const checkAuth = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if(!token){
        return res.status(400).json({ status: false, message: "No se encontro el token" })
    }

    try {
        const decode = jwt.verify(token, process.env.SECRET_KEY_JWT);
        const user = userManager.getOneById(decode.id);

        req.user = {
            id: user._id,
            role: user.role,
        }

        next()

    } catch (error) {
        return res.stauts(401).json({ status: false, message: "Token invalido" })
    }
};