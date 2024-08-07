import mongoose from "mongoose";
import User from "../models/user.model.js";
import { isValidID } from "../config/mongoose.config.js";
import { createHash, isValidHash } from "../utils/security.js";

import {
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND_ID,
    ERROR_NOT_FOUND_CREDENTIALS
} from "../constants/messages.constant.js";

export default class UserManager {
    #user;

    constructor() {
        this.#user = User;
    }

    // Maneja errores lanzados durante las operaciones de Mongoose.
    #handleError = (error) => {
        if (error instanceof mongoose.Error.ValidationError) {
            throw new Error(Object.values(error.errors)[0].message);
        }
        throw new Error(error.message);
    };

    // Valida que el ID proporcionado sea válido.
    #validateId = (id) => {
        if (!isValidID(id)) throw new Error(ERROR_INVALID_ID);
    };

    // Busca un usere por su ID.
    #findOneById = async (id) => {
        this.#validateId(id);

        const userFound = await this.#user.findOne({ _id: id });
        if (!userFound) throw new Error(ERROR_NOT_FOUND_ID);

        return userFound;
    };

    // Obtiene todos los users con filtros y paginación opcional.
    getAll = async (paramFilters) => {
        try {
            const $and = [];

            // Aplica filtro por título si se proporciona.
            if (paramFilters?.title) {
                $and.push({ title: { $regex: paramFilters.title, $options: "i" } });
            }

            const filters = $and.length > 0 ? { $and } : {};

            const sort = {
                asc: { title: 1 },
                desc: { title: -1 },
            };

            // Opciones de paginación y ordenación.
            const paginationOptions = {
                limit: paramFilters?.limit ?? 10,
                page: paramFilters?.page ?? 1,
                sort: sort[paramFilters?.sort] ?? {},
                lean: true,
            };

            // Consulta paginada de users.
            const usersFound = await this.#user.paginate(filters, paginationOptions);
            return usersFound;
        } catch (error) {
            this.#handleError(error);
        }
    };

    // Obtiene un usere por su ID.
    getOneById = async (id) => {
        try {
            const userFound = await this.#user.findById(id);
            // const userFound = await this.#findOneById(id);
            return userFound.toObject();
        } catch (error) {
            this.#handleError(error);
        }
    };

    getOneByEmailAndPassword = async (email, password) => {
        try {
            const userFound = await this.#user.findOne({ email });
            if(!userFound){
                throw new Error(ERROR_NOT_FOUND_CREDENTIALS);
            }

            const hash = userFound.password;
            if(!isValidHash(password, hash)){
                throw new Error(ERROR_NOT_FOUND_CREDENTIALS);
            }

            return userFound.toObject();
        } catch (error) {
            this.#handleError(error);
        }
    };

    // Inserta un nuevo usere en la base de datos.
    insertOne = async (data) => {
        try {
            const user = new User({
                ...data,
                password: data.password ? createHash(data.password) : null,
            });

            await user.save();
            return user.toObject();
        } catch (error) {
            this.#handleError(error);
        }
    };

    // Actualiza un usere existente por su ID.
    updateOneById = async (id, data) => {
        try {
            const userFound = await this.#user.findById(id);
            // const userFound = await this.#findOneById(id);

            const newValues = {
                ...data,
                password: data.password ? createHash(data.password) : null,
            };

            userFound.set(newValues);
            await userFound.save();

            return userFound.toObject();
        } catch (error) {
            this.#handleError(error);
        }
    };

    // Elimina un usere por su ID.
    deleteOneById = async (id) => {
        try {
            // Tener en cuenta por si fallan los otros metodos con id
            const userFound = await this.#user.findById(id);
            // const userFound = await this.#findOneById(id);
            console.log(userFound);
            
            await this.#user.deleteOne({ _id: userFound._id });
            return userFound.toObject();
        } catch (error) {
            this.#handleError(error);
        }
    };
}