import UserModel from "../models/user.model.js";

export default class UserManager {
    #userModel;

    constructor () {
        this.#userModel = UserModel;
    }

    getAll = async () => {
        try {
            const usersFound = await this.#userModel.find({}).lean();
            return usersFound;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    getOneById = async (id) => {
        try {
            const userFound = await this.#userModel.findById(id).lean();
            if(!userFound){
                throw new Error("Id no encontrado.");
            }
            return userFound;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    insertOne = async (data) => {
        try {
            const user = new UserModel(data);
            await user.save();
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    updateOneById = async (id, data) => {
        try {
            const userFound = await this.#userModel.updateOneById(id);
            if(!userFound){
                throw new Error("Id no encontrado.");
            }
            userFound.name = data.name;
            userFound.surname = data.surname;
            userFound.age = data.age;
            userFound.email = data.email;
            userFound.password = data.password;
            
            await userFound.save();
            return userDeleted;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    deleteOneById = async (id) => {
        try {
            const userDeleted = await this.#userModel.findByIdAndDelete(id);
            if(!userFound){
                throw new Error("Id no encontrado.");
            }
            return userDeleted;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    getOneByEmailAndPassword = async (email, password) => {
        try {
            const userFound = await this.#userModel.findOne({ $and: [ {email}, {password}]}).lean();
            if(!userFound){
                throw new Error("Email o Contraseña incorrecta.");
            }
            return userFound;
        } catch (error) {
            throw new Error(error.message);
        }
    };
}