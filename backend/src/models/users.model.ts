import { appLogger } from "@src/configs/app-logger";
import { createPasswordHash } from "@src/utils/bcrypt-utils";
import mongoose from "mongoose";

const UserDBSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 21
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minLength: 5,
        maxLength: 255,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    friendsEmailList: {
        type: [String],
        required: true,
        unique: true,
        default: [],
        validate: {
            validator: (val: string[]): boolean => {
                return val.length <= 50;
            },
            message: "A user can have at most 50 friends."
        }
    },
    blockedEmailList: {
        type: [String],
        required: true,
        unique: true,
        default: [],
        validate: {
            validator: (val: string[]): boolean => {
                return val.length <= 50;
            },
            message: "A user can have at most 50 blocked emails."
        }
    },
}, { strict: true, timestamps: true, });

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
            appLogger.error("Error during password hashing:", error);
            return void next(error as mongoose.CallbackError);
        }
    }
    next();
});

export const UserModel = mongoose.model(
    "users-v1",
    UserDBSchema
);
