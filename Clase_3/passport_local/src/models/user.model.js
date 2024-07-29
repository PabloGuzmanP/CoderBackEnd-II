import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String, 
        required: [true, "La nombre es obligatorio"], 
        uppercase: true, 
        trim: true,
    },
    surname: {
        type: String, 
        required: [true, "La apellido es obligatorio"], 
        uppercase: true, 
        trim: true,
    },
    age: {
        type: Number, 
        required: [true, "La edad es obligatoria"], 
    },
    email: {
        type: String, 
        required: [true, "El email es obligatorio"], 
        unique: true, 
        lowercase: true, 
        trim: true,
    },
    password: {
        type: String, 
        required: [true, "La contraseña es obligatoria."],
        trim: true,
    }
}, {
    timestamps: true,
});

const UserModel = model("users", userSchema);

export default UserModel;