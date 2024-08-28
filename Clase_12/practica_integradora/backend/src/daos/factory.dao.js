
import { MONGO_DAO } from "../constants/dao.constant.js";
import Ingredient from "./mongo/models/ingredient.model.js";
import Recipe from "./mongo/models/recipe.model.js";
import User from "./mongo/models/user.model.js";
import MongoDAO from "./mongo/mongo.dao.js";

export default class FactoryDAO {
    createIngredient(className){
        if (className === MONGO_DAO){
            return new MongoDAO(Ingredient)
        }
    };
    createRecipe(className){
        if (className === MONGO_DAO){
            return new MongoDAO(Recipe)
        }
    };
    createUser(className){
        if (className === MONGO_DAO){
            return new MongoDAO(User)
        }
    };
}