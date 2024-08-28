import { convertToBoolean } from "../utils/converter.js"

export default class IngredientDTO {
    fromModel(model){
        return {
            id: model._id,
            title: model.title,
            description: model.description,
            stock: model.stock,
            status: model.status,
            thumbnail: model.thumbnail
        }
    }

    fromData(data){
        return {
            id: data._id || null,
            title: data.title,
            description: data.description,
            stock: Number(data.stock),
            status: convertToBoolean(data.status),
            thumbnail: data.thumbnail
        }
    }
}