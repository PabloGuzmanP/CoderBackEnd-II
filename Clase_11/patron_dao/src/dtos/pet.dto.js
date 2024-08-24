export default class PetDTO {
    fromModel(model){
        const name = model.name?.split(" ");
        return {
            id: model._id,
            first_name: name[0] || "",
            last_name: name[1] || "",
            specie: model.specie,
            age: model.age,
        }
    }

    fromData(data){
        return {
            id: data._id || null,
            name: `${data.first_name} ${data.last_name}`,
            specie: data.specie?.trim(),
            age: Number(data.age),
        }
    }
}