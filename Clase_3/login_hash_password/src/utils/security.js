import bcrypt from "bcrypt";

export const createHash = (password) => {
    // Algoritmo para construir el Hash
    const salt = bcrypt.genSaltSync();

    // Siempre tiene que ser un String
    return bcrypt.hashSync(String(password), salt);
};

export const isValidPassword = (password, hash) => {
    return bcrypt.compareSync(String(password), hash)
};