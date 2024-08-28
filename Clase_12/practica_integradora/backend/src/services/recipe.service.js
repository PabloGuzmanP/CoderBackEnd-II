import RecipeRepository from "../repositories/recipe.repository.js";

export default class RecipeService {
    #recipeRepository

    constructor() {
        this.#recipeRepository = new RecipeRepository();
    }

    // En esta clase es que se crea el CRUD
    async findAll(paramFilters) {
        const $and = [];

        if (paramFilters?.name) $and.push({ name: { $regex: paramFilters.name, $options: "i" } });
        const filters = $and.length > 0 ? { $and } : {};

        return await this.#recipeRepository.findAll(filters);
    }

    async findOneById(id) {
        return await this.#recipeRepository.findOneById(id);
    }

    // Se simplifica insert y update
    async insertOne(data) {
        return await this.#recipeRepository.save(data);
    }

    async updateOneById(id, data) {
        const recipe = await this.findOneById(id);
        const newValues = { ...recipe, ...data }
        return await this.#recipeRepository.save(newValues);
    }

    async deleteOneById(id) {
        return await this.#recipeRepository.deleteOneById(id);
    }

    async addOneIngredient (id, ingredientId, quantity = 0) {
        const recipeFound = await this.findOneById(id);

        const ingredientIndex = recipeFound.ingredients.findIndex((item) => item.ingredient.toString() === ingredientId);

        if (ingredientIndex >= 0) {
            recipeFound.ingredients[ingredientIndex].quantity += quantity;
        } else {
            recipeFound.ingredients.push({ ingredient: ingredientId, quantity });
        }

        return await this.#recipeRepository.save(recipeFound);
    };

    async removeOneIngredient (id, ingredientId, quantity = 0) {
        const recipeFound = await this.findOneById(id);

        const ingredientIndex = recipeFound.ingredients.findIndex((item) => item.ingredient.toString() === ingredientId);
        if (ingredientIndex < 0) {
            throw new Error(ERROR_NOT_FOUND_INDEX);
        }

        if (recipeFound.ingredients[ingredientIndex].quantity > quantity) {
            recipeFound.ingredients[ingredientIndex].quantity -= quantity;
        } else {
            recipeFound.ingredients.splice(ingredientIndex, 1);
        }

        return await this.#recipeRepository.save(recipeFound);
    };

    async removeAllIngredients (id) {
        const recipeFound = await this.findOneById(id);
        recipeFound.ingredients = [];

        return await this.#recipeRepository.save(recipeFound);
    };
}