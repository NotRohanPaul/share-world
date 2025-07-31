import { model, Schema, Types } from "mongoose";


const FriendRequestDBSchema = new Schema({
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
}, { timestamps: true, strict: true, });


export const FriendRequestModel = model("friend-requests", FriendRequestDBSchema);