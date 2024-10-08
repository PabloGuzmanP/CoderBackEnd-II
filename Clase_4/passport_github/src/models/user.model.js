import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        // required: [ true, "El nombre es obligatorio" ],
        uppercase: true,
        trim: true,
    },
    // surname: {
    //     type: String,
    //     required: [ true, "El apellido es obligatorio" ],
    //     uppercase: true,
    //     trim: true,
    // },
    // age: {
    //     type: Number,
    //     required: [ true, "La edad es obligatoria" ],
    // },
    // email: {
    //     type: String,
    //     required: [ true, "El email es obligatorio" ],
    //     unique: true,
    //     lowercase: true,
    //     trim: true,
    // },
    gitHubId: {
        type: String,
        required: [ true, "El id de GitHub es obligatorio" ],
    },
}, {
    timestamps: true, // Añade timestamps para generar createdAt y updatedAt
});

const UserModel = model("users", userSchema);

export default UserModel;