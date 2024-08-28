import { MONGO_DAO } from "../constants/dao.constant.js";
import { ERROR_NOT_FOUND_ID } from "../constants/messages.constant.js";
import FactoryDAO from "../daos/factory.dao.js"
import IngredientDTO from "../dtos/ingredient.dto.js";

export default class IngredientRepository {
    #ingredientDAO
    #ingredientDTO

    constructor(){
        const factory = new FactoryDAO();
        this.#ingredientDAO = factory.createIngredient(MONGO_DAO)
        this.#ingredientDTO = new IngredientDTO();
    }

    // En esta clase es que se crea el CRUD
    async findAll(filters){
        const ingredients = await this.#ingredientDAO.findAll(filters);
        const ingredientsDTO = ingredients.map((ingredient) => this.#ingredientDTO.fromModel(ingredient));
        return ingredientsDTO;
    }

    async findOneById(id){
        const ingredient = await this.#ingredientDAO.findOneById(id);
        if(!ingredient) throw new Error (ERROR_NOT_FOUND_ID);

        return this.#ingredientDTO.fromModel(ingredient);
    }

    // Se simplifica insert y update
    async save(data){
        const ingredientDTO = this.#ingredientDTO.fromData(data);
        const ingredient = await this.#ingredientDAO.save(ingredientDTO)
        return this.#ingredientDTO.fromModel(ingredient);
    }

    async deleteOneById(id){
        const ingredient = await this.findOneById(id);
        await this.#ingredientDAO.deleteOneById(id);
        return this.#ingredientDTO.fromModel(ingredient);
    }
}