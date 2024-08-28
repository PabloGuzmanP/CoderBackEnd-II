import IngredientService from "../services/ingredient.service.js";
import paths from "../utils/paths.js";

export default class IngredientController{
    #ingredientService
    
    constructor(){
        this.#ingredientService = new IngredientService();
    }

    async getAll(req, res){
        try {
            const ingredientsFound = await this.#ingredientService.findAll(req.query);
            res.sendSuccess200(ingredientsFound);
        } catch (error) {
            res.sendError(error);
            
        }
    }

    async getOneById(req, res){
        try {
            const { id } = req.params;
            const ingredientFound = await this.#ingredientService.findOneById(id);
            res.sendSuccess200(ingredientFound);
        } catch (error) {
            res.sendError(error);
        }
    }

    async create(req, res){
        try {
            const ingredient = await this.#ingredientService.insertOne(req.body, req.file?.filename);
            res.sendSuccess201(ingredient);
        } catch (error) {
            if (req.file?.filename) await deleteFile(paths.images, req.file?.filename);
            res.sendError(error);
        }
    }

    async update(req, res){
        try {
            const ingredientUpdated = await this.#ingredientService.updateOneById(req.params.id, req.body, req.file?.filename);
            res.sendSuccess200(ingredientUpdated);
        } catch (error) {
            if (req.file?.filename) await deleteFile(paths.images, req.file?.filename);
            res.sendError(error);
        }
    }

    async delete(req, res){
        try {
            const ingredientDeleted = await this.#ingredientService.deleteOneById(req.params.id);
            res.sendSuccess200(ingredientDeleted);
        } catch (error) {
            res.sendError(error);
        }
    }
}