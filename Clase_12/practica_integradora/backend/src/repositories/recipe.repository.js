import { MONGO_DAO } from "../constants/dao.constant.js";
import { ERROR_NOT_FOUND_ID } from "../constants/messages.constant.js";
import FactoryDAO from "../daos/factory.dao.js"
import RecipeDTO from "../dtos/recipe.dto.js";

export default class RecipeRepository {
    #recipeDAO
    #recipeDTO

    constructor(){
        const factory = new FactoryDAO();
        this.#recipeDAO = factory.createRecipe(MONGO_DAO)
        this.#recipeDTO = new RecipeDTO();
    }

    // En esta clase es que se crea el CRUD
    async findAll(filters){
        const recipes = await this.#recipeDAO.findAll(filters);
        const recipesDTO = recipes.map((recipe) => this.#recipeDTO.fromModel(recipe));
        return recipesDTO;
    }

    async findOneById(id){
        const recipe = await this.#recipeDAO.findOneById(id);
        if(!recipe) throw new Error (ERROR_NOT_FOUND_ID);

        return this.#recipeDTO.fromModel(recipe);
    }

    // Se simplifica insert y update
    async save(data){
        const recipeDTO = this.#recipeDTO.fromData(data);
        const recipe = await this.#recipeDAO.save(recipeDTO)
        return this.#recipeDTO.fromModel(recipe);
    }

    async deleteOneById(id){
        const recipe = await this.findOneById(id);
        await this.#recipeDAO.deleteOneById(id);
        return this.#recipeDTO.fromModel(recipe);
    }
}