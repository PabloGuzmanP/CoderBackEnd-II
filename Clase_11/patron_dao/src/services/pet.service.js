import PetRepository from "../repositories/pet.repository.js";

export default class PetService {
    #petRepository 

    constructor(){
        this.#petRepository = new PetRepository();
    }

    // En esta clase es que se crea el CRUD
    async findAll(paramFilters){
        const $and = [];

        if (paramFilters?.name) $and.push({ name: { $regex: paramFilters.name, $options: "i" } });
        const filters = $and.length > 0 ? { $and } : {};

        return await this.#petRepository.findAll(filters);
    }

    async findOneById(id){
        return await this.#petRepository.findOneById(id);
    }

    // Se simplifica insert y update
    async insertOne(data){
        return await this.#petRepository.save(data);
    }

    async updateOneById(id, data){
        const pet = await this.findOneById(id);
        const newValues = { ...pet, ...data } // Las nuevas propiedas que envie por data, se le asignan a pet
        return await this.#petRepository.save(newValues);
    }

    async deleteOneById(id){
        return await this.#petRepository.deleteOneById(id);
    }
}