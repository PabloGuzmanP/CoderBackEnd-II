import { FS_DAO, MEMORY_DAO, MONGO_DAO } from "../constants/dao.constant.js";
import FsDAO from "./fs/fs.dao.js";
import MemoryDAO from "./memory/memory.dao.js";
import PetModel from "./mongo/models/pet.model.js";
import MongoDAO from "./mongo/mongo.dao.js";

export default class FactoryDAO {
    createPet(className){
        switch (className) {
            case MONGO_DAO:
                return new MongoDAO(PetModel);
            case FS_DAO:
                return new FsDAO("pet.json");
            case MEMORY_DAO:
                return new MemoryDAO();
        }
    };
}