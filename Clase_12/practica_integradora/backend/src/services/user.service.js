import UserRepository from "../repositories/user.repository.js";

export default class UserService {
    #userRepository 

    constructor(){
        this.#userRepository = new UserRepository();
    }

    // En esta clase es que se crea el CRUD
    async findAll(paramFilters){
        const $and = [];

        if (paramFilters?.name) $and.push({ name: { $regex: paramFilters.name, $options: "i" } });
        const filters = $and.length > 0 ? { $and } : {};

        return await this.#userRepository.findAll(filters);
    }

    async findOneById(id){
        return await this.#userRepository.findOneById(id);
    }

    async findOneByEmailAndPassword(email, password){
        return await this.#userRepository.findOneByEmailAndPassword(email, password);
    }

    // Se simplifica insert y update
    async insertOne(data){
        return await this.#userRepository.save(data);
    }

    async updateOneById(id, data){
        const user = await this.findOneById(id);
        const newValues = { ...user, ...data } 
        return await this.#userRepository.save(newValues);
    }

    async deleteOneById(id){
        return await this.#userRepository.deleteOneById(id);
    }
}