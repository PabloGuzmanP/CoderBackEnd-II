import { connectDB } from "../../config/mongoose.config.js";

export default class MongoDAO {  // Este dao sirve para todas las entidades
    static #connectionDB = false;
    #model;
    
    constructor(model){
        this.#model = model;
    }

    async findAll(filters){
        return await this.#model.find(filters);
    }

    async findOneById(id){
        return await this.#model.find({ _id: id });
    }

    // Busca un documento por su criterio
    async findOneByCriteria(criteria){
        return await this.#model.find(criteria);
    }

    async save(data){
        if(data.id){
            return await this.#model.findByIdAndUpdate(data.id, data, { runValidators: true });
        } else {
            const object = new this.#model(data);
            return await object.save();
        }
    }

    async deleteOneById(id){
        return await this.#model.deleteOne({ _id: id });
    }
}