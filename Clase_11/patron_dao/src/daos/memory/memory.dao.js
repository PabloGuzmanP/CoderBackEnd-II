import { ObjectId } from "bson";

export default class MemoryDAO {
    static collections = {};
    #collectionName;

    constructor(collectionName){
        this.#collectionName = collectionName;
        MemoryDAO.collections[this.#collectionName] = [];
    }

    findAll() {
        const documents = MemoryDAO.collections[this.#collectionName];
        return documents;
    }

    findOneById(id){
        const documents = this.findAll();
        const document = documents.find((item) => item.id === id);
        return document;
    }

    save(document){
        const documents = this.findAll();

        if (!document.id) {
            document.id = new ObjectId().toString();
            documents.push(document);
        } else {
            const index = documents.findIndex((item) => item.id === document.id);
            documents[index] = document;
        }

        MemoryDAO.collections[this.#collectionName] = documents;
        return document;
    }

    deleteOneById(id){
        const documents = this.findAll();
        const index = documents.findIndex((item) => item.id === id);

        const document = documents[index];
        documents.splice(index, 1);

        MemoryDAO.collections[this.#collectionName] = documents;
        
        return document;
    }
}