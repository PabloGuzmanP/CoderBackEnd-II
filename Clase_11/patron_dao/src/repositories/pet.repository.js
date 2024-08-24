import { FS_DAO, MONGO_DAO } from "../constants/dao.constant.js";
import { ERROR_NOT_FOUND_ID } from "../constants/messages.constant.js";
import FactoryDAO from "../daos/factory.dao.js"
import PetDTO from "../dtos/pet.dto.js";

export default class PetRepository {
    #petDAO
    #petDTO

    constructor(){
        const factory = new FactoryDAO();
        this.#petDAO = factory.createPet(FS_DAO)
        this.#petDTO = new PetDTO();
    }

    // En esta clase es que se crea el CRUD
    async findAll(filters){
        const pets = await this.#petDAO.findAll(filters);
        const petsDTO = pets.map((pet) => this.#petDTO.fromModel(pet));
        return petsDTO;
    }

    async findOneById(id){
        const pet = await this.#petDAO.findOneById(id);
        if(!pet) throw new Error (ERROR_NOT_FOUND_ID);

        return this.#petDTO.fromModel(pet);
    }

    // Se simplifica insert y update
    async save(data){
        const petDTO = this.#petDTO.fromData(data);
        const pet = await this.#petDAO.save(petDTO)
        return this.#petDTO.fromModel(pet);
    }

    async deleteOneById(id){
        const pet = await this.findOneById(id);
        await this.#petDAO.deleteOneById(id);
        return this.#petDTO.fromModel(pet);
    }
}