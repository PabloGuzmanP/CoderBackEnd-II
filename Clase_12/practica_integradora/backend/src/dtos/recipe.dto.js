export default class RecipeDTO {
    fromModel(model){
        return {
            id: model._id,
            ingredients: model.ingredients,
        }
    }

    fromData(data){
        return {
            id: data._id || null,
            ingredients: data.ingredients,
        }
    }
}