import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createHash = (password) => {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(String(password), salt);
};

export const isValidPassword = (password, hash) => {
    return bcrypt.compareSync(String(password), hash);
};

export const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.SECRET_KEY_JWT, { expiresIn: "2h" })
};