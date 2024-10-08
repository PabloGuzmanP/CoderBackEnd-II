
import mongoose from "mongoose";
import UserModel from "../models/user.model.js";
import { isValidID } from "../config/mongoose.config.js";

import {
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND_ID,
    ERROR_NOT_FOUND_GITHUB_ID,
} from "../constants/messages.constant.js";

export default class UserManager {
    #userModel;

    constructor () {
        this.#userModel = UserModel;
    }

    #validateId = (id) => {
        if (!isValidID(id)) {
            throw new Error(ERROR_INVALID_ID);
        }
    };

    #findById = async (id) => {
        const userFound = await this.#userModel.findById(id);
        if (!userFound) {
            throw new Error(ERROR_NOT_FOUND_ID);
        }

        return userFound;
    };

    getAll = async (paramFilters) => {
        try {
            const $and = [];

            if (paramFilters?.name) $and.push({ name: { $regex: paramFilters.name, $options: "i" } });
            const filters = $and.length > 0 ? { $and } : {};

            const usersFound = await this.#userModel.find(filters).lean();
            return usersFound;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    getOneById = async (id) => {
        try {
            this.#validateId(id);
            const userFound = await this.#findById(id);
            return userFound;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    getOneByGitHubId = async (id) => {
        try {
            const userFound = await this.#userModel.findOne({ gitHubId: id });
            if (!userFound) {
                throw new Error(ERROR_NOT_FOUND_GITHUB_ID);
            }
            return userFound;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    insertOne = async (data) => {
        try {
            const userCreated = new UserModel(data);
            await userCreated.save();

            return userCreated;
        } catch (error) {
            if (error instanceof mongoose.Error.ValidationError) {
                error.message = Object.values(error.errors)[0];
            }

            throw new Error(error.message);
        }
    };

    updateOneById = async (id, data) => {
        try {
            this.#validateId(id);
            const userFound = await this.#findById(id);

            userFound.set(data);
            await userFound.save();

            return userFound;
        } catch (error) {
            if (error instanceof mongoose.Error.ValidationError) {
                error.message = Object.values(error.errors)[0];
            }

            throw new Error(error.message);
        }
    };

    deleteOneById = async (id) => {
        try {
            this.#validateId(id);
            const userFound = await this.#findById(id);

            await this.#userModel.findByIdAndDelete(id);

            return userFound;
        } catch (error) {
            throw new Error(error.message);
        }
    };
}