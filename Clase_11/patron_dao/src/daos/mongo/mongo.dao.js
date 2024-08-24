import { connectDB } from "../../config/mongoose.config.js";

export default class MongoDAO {  // Este dao sirve para todas las entidades
    static #connectionDB = false;
    #model;
    
    constructor(model){
        this.#model = model;
        if(!MongoDAO.#connectionDB){
            connectDB();
            MongoDAO.#connectionDB = true;
        }
    }

    async findAll(filters){
        return await this.#model.find(filters);
    }

    async findOneById(id){
        return await this.#model.find({ _id: id });
    }

    async save(data){
        const pet = new this.#model(data);
        return await pet.save();
    }

    async deleteOneById(id){
        return await this.#model.deleteOne({ _id: id });
    }
}