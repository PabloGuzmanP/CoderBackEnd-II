import UserService from "../services/user.service.js";

export default class UserController{
    #userService
    
    constructor(){
        this.#userService = new UserService();
    }

    async getAll(req, res){
        try {
            const usersFound = await this.#userService.findAll(req.query);
            res.sendSuccess200(usersFound);
        } catch (error) {
            res.sendError(error);
            
        }
    }

    async getOneById(req, res){
        try {
            const { id } = req.params;
            const userFound = await this.#userService.findOneById(id);
            res.sendSuccess200(userFound);
        } catch (error) {
            res.sendError(error);
        }
    }

    async create(req, res){
        try {
            const user = await this.#userService.insertOne(req.body);
            res.sendSuccess201(user);
        } catch (error) {
            res.sendError(error);
        }
    }

    async update(req, res){
        try {
            const userUpdated = await this.#userService.updateOneById(req.params.id, req.body);
            res.sendSuccess200(userUpdated);
        } catch (error) {
            res.sendError(error);
        }
    }

    async delete(req, res){
        try {
            const userDeleted = await this.#userService.deleteOneById(req.params.id);
            res.sendSuccess200(userDeleted);
        } catch (error) {
            res.sendError(error);
        }
    }
}