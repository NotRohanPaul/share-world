import { model, Schema, Types } from "mongoose";


const FriendDBSchema = new Schema({
    userId: {
        type: Types.ObjectId,
        ref: "users",
        required: true,
    },
    friendUserId: {
        type: Types.ObjectId,
        ref: "users",
        required: true,
    },
    status: {
        type: String,
        enum: ["confirmed", "pending", "ignored", "blocked"]
    }
}, { timestamps: true, strict: true, });


export const FriendsModel = model("friends", FriendDBSchema);