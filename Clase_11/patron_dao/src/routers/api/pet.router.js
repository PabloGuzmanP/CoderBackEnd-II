import BaseRouter from "../base.router.js";
import PetController from "../../controllers/pet.controller.js";

export default class PetRouter extends BaseRouter{
    #petController

    constructor(){
        super();
        this.#petController = new PetController();
    }

    initialize(){
        const router = this.getRouter();

        router.get("/", (req, res) => this.#petController.getAll(req, res));
        router.get("/:id", (req, res) => this.#petController.getOneById(req, res));
        router.post("/", (req, res) => this.#petController.create(req, res));
        router.put("/:id", (req, res) => this.#petController.update(req, res));
        router.delete("/:id", (req, res) => this.#petController.delete(req, res));

        router.use((error, req, res, next) => {
            res.sendError(error);
        });
    }
}