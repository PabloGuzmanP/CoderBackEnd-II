import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";

const userSchema = new Schema({
    name: {
        type: String,
        required: [ true, "El nombre es obligatorio" ],
        uppercase: true,
        trim: true,
    },
    email: {
        type: String,
        required: [ true, "El email es obligatorio" ],
        lowercase: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: [ true, "La contraseña es obligatoria" ],
        trim: true,
    },
    role: {
        type: String,
        required: [ true, "El role es obligatorio" ],
        trim: true,
        lowercase: true,
        default: "user",
        enum: [ "user", "admin" ]
    },
}, {
    timestamps: true, // Añade timestamps para generar createdAt y updatedAt
    versionKey: false, // Elimina el campo __v de versión
});


userSchema.plugin(paginate);

const User = model("users", userSchema);

export default User;