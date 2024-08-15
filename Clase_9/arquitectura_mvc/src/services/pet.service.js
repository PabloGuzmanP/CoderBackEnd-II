import PetDAO from "../daos/pet.dao.js";
import { ERROR_NOT_FOUND_ID } from "../constants/messages.constant.js";

export default class PetService {
    #petDAO 

    constructor(){
        this.#petDAO = new PetDAO();
    }

    // En esta clase es que se crea el CRUD
    async findAll(paramFilters){
        const $and = [];

        if (paramFilters?.name) $and.push({ name: { $regex: paramFilters.name, $options: "i" } });
        const filters = $and.length > 0 ? { $and } : {};

        return await this.#petDAO.findAll(filters);
    }

    async findOneById(id){
        const pet = await this.#petDAO.findById(id);
        if(!pet) throw new Error (ERROR_NOT_FOUND_ID);

        return pet;
    }

    // Se simplifica insert y update
    async insertOne(data){
        return await this.#petDAO.save(data);
    }

    async updateOneById(id, data){
        const pet = await this.findOneById(id);
        const newValues = { ...pet, ...data } // Las nuevas propiedas que envie por data, se le asignan a pet

        return await this.#petDAO.save(newValues);
    }

    async deleteOneById(id){
        const pet = await this.findOneById(id);
        await this.#petDAO.deleteOneById(id);

        return await pet;
    }
}