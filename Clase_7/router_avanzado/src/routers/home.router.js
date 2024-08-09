import { Router } from "express"; 
import BaseRouter from "./base.router.js";

export default class HomeRouter extends BaseRouter{ //Asi se declara una clase hija

    constructor(){
        super();
        this.initialize
    }

    initialize(){
        const router = this.getRouter();

        this.addGetRoute("/", (req, res) => this.#getTemplateHome(req, res));

        router.use((error, req, res, next) => {
            res.sendError(error);
        });
    }

    #getTemplateHome(req, res){
        res.status(200).render("home", { title: "Inicio"});
    }
}