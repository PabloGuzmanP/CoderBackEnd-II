import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: {type: String, required: [true, "La nombre es obligatorio"], uppercase: true, tirm: true
    },
    age: {type: Number, required: [18, "La edad es obligatoria"], min: [18, "La edad minima es de 18 años"], max: []},
    email: {unique: true, type: String, required: [true, "El email es obligatorio"], lowercase: true, tirm: true}
});

const UserModel = model("users", userSchema);

export default UserModel;