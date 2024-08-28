import RecipeService from "../services/recipe.service.js";

export default class RecipeController{
    #recipeService
    
    constructor(){
        this.#recipeService = new RecipeService();
    }

    async getAll(req, res){
        try {
            const recipesFound = await this.#recipeService.findAll(req.query);
            res.sendSuccess200(recipesFound);
        } catch (error) {
            res.sendError(error);
            
        }
    }

    async getOneById(req, res){
        try {
            const { id } = req.params;
            const recipeFound = await this.#recipeService.findOneById(id);
            res.sendSuccess200(recipeFound);
        } catch (error) {
            res.sendError(error);
        }
    }

    async create(req, res){
        try {
            const recipe = await this.#recipeService.insertOne(req.body);
            res.sendSuccess201(recipe);
        } catch (error) {
            res.sendError(error);
        }
    }

    async update(req, res){
        try {
            const recipeUpdated = await this.#recipeService.updateOneById(req.params.id, req.body);
            res.sendSuccess200(recipeUpdated);
        } catch (error) {
            res.sendError(error);
        }
    }

    async delete(req, res){
        try {
            const recipeDeleted = await this.#recipeService.deleteOneById(req.params.id);
            res.sendSuccess200(recipeDeleted);
        } catch (error) {
            res.sendError(error);
        }
    }

    async addOneIngredient(req, res) {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;
            const recipeUpdated = await this.#recipeService.addOneIngredient(cid, pid, quantity ?? 1);
            res.sendSuccess200(recipeUpdated);
        } catch (error) {
            res.sendError(error);
        }
    }

    async removeOneIngredient(req, res) {
        try {
            const { cid, pid } = req.params;
            const recipeDeleted = await this.#recipeService.removeOneIngredient(cid, pid, 1);
            res.sendSuccess200(recipeDeleted);
        } catch (error) {
            res.sendError(error);
        }
    }

    async removeAllIngredients(req, res) {
        try {
            const recipeDeleted = await this.#recipeService.removeAllIngredients(req.params.cid);
            res.sendSuccess200(recipeDeleted);
        } catch (error) {
            res.sendError(error);
        }
    }
}