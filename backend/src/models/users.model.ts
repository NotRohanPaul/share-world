import mongoose from "mongoose";


const UserDBSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    emailVerified: { type: Boolean, default: false }
});


export const UserModel = mongoose.model(
    "users-v1",
    UserDBSchema
);

