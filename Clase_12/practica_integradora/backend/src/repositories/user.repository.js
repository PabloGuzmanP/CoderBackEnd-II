import { MONGO_DAO } from "../constants/dao.constant.js";
import { ERROR_NOT_FOUND_CREDENTIALS, ERROR_NOT_FOUND_ID } from "../constants/messages.constant.js";
import { isValidPassword } from "../utils/security.js";
import FactoryDAO from "../daos/factory.dao.js"
import UserDTO from "../dtos/user.dto.js";


export default class UserRepository {
    #userDAO
    #userDTO

    constructor() {
        const factory = new FactoryDAO();
        this.#userDAO = factory.createUser(MONGO_DAO)
        this.#userDTO = new UserDTO();
    }

    // En esta clase es que se crea el CRUD
    async findAll(filters) {
        const users = await this.#userDAO.findAll(filters);
        const usersDTO = users.map((user) => this.#userDTO.fromModel(user));
        return usersDTO;
    }

    async findOneById(id) {
        const user = await this.#userDAO.findOneById(id);
        if (!user) throw new Error(ERROR_NOT_FOUND_ID);

        return this.#userDTO.fromModel(user);
    }

    async findOneByEmailAndPassword(email, password) {
        const user = await this.#userDAO.findOneByCriteria({ email });
        if (!user) {
            throw new Error(ERROR_NOT_FOUND_CREDENTIALS);
        }

        const hash = user.password;
        if (!isValidPassword(password, hash)) {
            throw new Error(ERROR_NOT_FOUND_CREDENTIALS);
        }

        return this.#userDTO.fromModel(user);
    };

    async save(data) {
        const userDTO = this.#userDTO.fromData(data);
        const user = await this.#userDAO.save(userDTO)
        return this.#userDTO.fromModel(user);
    }

    async deleteOneById(id) {
        const user = await this.findOneById(id);
        await this.#userDAO.deleteOneById(id);
        return this.#userDTO.fromModel(user);
    }
}