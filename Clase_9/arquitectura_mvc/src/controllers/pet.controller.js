import PetService from "../services/pet.service.js";

export default class PetController{
    #petService
    
    constructor(){
        this.#petService = new PetService();
    }

    async getAll(req, res){
        try {
            const petsFound = await this.#petService.findAll(req.query);
            res.sendSuccess200(petsFound);
        } catch (error) {
            res.sendError(error);
            
        }
    }

    async getOneById(req, res){
        try {
            const { id } = req.params;
            const petFound = await this.#petService.findOneById(id);
            res.sendSuccess200(petFound);
        } catch (error) {
            res.sendError(error);
        }
    }

    async create(req, res){
        try {
            const pet = await this.#petService.insertOne(req.body);
            res.sendSuccess201(pet);
        } catch (error) {
            res.sendError(error);
        }
    }

    async update(req, res){
        try {
            const petUpdated = await this.#petService.updateOneById(req.params.id, req.body);
            res.sendSuccess200(petUpdated);
        } catch (error) {
            res.sendError(error);
        }
    }

    async delete(req, res){
        try {
            const petDeleted = await this.#petService.deleteOneById(req.params.id);
            res.sendSuccess200(petDeleted);
        } catch (error) {
            res.sendError(error);
        }
    }
}