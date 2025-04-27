import { createPasswordHash } from "@src/utils/bcrypt-utils";
import mongoose from "mongoose";


const UserDBSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    emailVerified: { type: Boolean, default: false }
});

UserDBSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        try {
            const hash = await createPasswordHash(this.password);
            if (hash !== null) {
                this.password = hash;
            } else {
                throw new Error("Password hashing failed");
            }
        } catch (error) {
            console.error("Error during password hashing:", error);
            return void next(error as mongoose.CallbackError);
        }
    }
    next();
});
export const UserModel = mongoose.model(
    "users-v1",
    UserDBSchema
);
