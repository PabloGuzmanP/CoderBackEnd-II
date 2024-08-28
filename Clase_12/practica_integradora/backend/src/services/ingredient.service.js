import IngredientRepository from "../repositories/ingredient.repository.js";
import { convertToBoolean } from "../utils/converter.js";
import { deleteFile } from "../utils/fileSystem.js";
import paths from "../utils/paths.js";

export default class IngredientService {
    #ingredientRepository 

    constructor(){
        this.#ingredientRepository = new IngredientRepository();
    }

    // En esta clase es que se crea el CRUD
    async findAll(paramFilters){
        const $and = [];

        if (paramFilters?.name) $and.push({ name: { $regex: paramFilters.name, $options: "i" } });
        const filters = $and.length > 0 ? { $and } : {};

        return await this.#ingredientRepository.findAll(filters);
    }

    async findOneById(id){
        return await this.#ingredientRepository.findOneById(id);
    }

    // Se simplifica insert y update
    async insertOne(data, filename){
        return await this.#ingredientRepository.save({
            ...data,
            status: convertToBoolean(data.status),
            thumbnail: filename ?? null,
        });
    }

    async updateOneById(id, data, filename){
        const ingredient = await this.findOneById(id);
        const currentThumbnail = ingredient.thumbnail;
        const newThumbnail = filename;

        const ingredientUpdated = await this.#ingredientRepository.save({
            ...ingredient,
            ...data,
            status: convertToBoolean(data.status),
            thumbnail: newThumbnail ?? currentThumbnail,
        });

        if (filename && newThumbnail !== currentThumbnail) {
            await deleteFile(paths.images, currentThumbnail);
        }

        return ingredientUpdated;
    }

    async deleteOneById(id){
        const ingredient = await this.findOneById(id);
        if (ingredient.thumbnail) {
            await deleteFile(paths.images, ingredient.thumbnail);
        }
        return await this.#ingredientRepository.deleteOneById(id);
    }
}