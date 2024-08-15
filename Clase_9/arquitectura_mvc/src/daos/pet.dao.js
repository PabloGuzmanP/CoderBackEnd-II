import PetModel from "../models/pet.model.js";

export default class PetDAO {
    #petModel 

    constructor(){
        this.#petModel = PetModel;
    }

    // En esta clase es que se crea el CRUD
    async findAll(filters){
        return await this.#petModel.find(filters);
    }

    async findById(id){
        return await this.#petModel.findOne({ _id: id });
    }

    // Se simplifica insert y update
    async save(data){
        const pet = new PetModel(data);
        return await pet.save();
    }

    async deleteOneById(id){
        return await this.#petModel.deleteOne({ _id: id });
    }
}