import { model, Schema, Types } from "mongoose";


const FriendRequestDBSchema = new Schema({
    sender: {
        type: Types.ObjectId,
        ref: "users",
        required: true,
    },
    receiver: {
        type: Types.ObjectId,
        ref: "users",
        required: true,
    },
}, { timestamps: true, strict: true, });

FriendRequestDBSchema.index({ sender: 1, receiver: 1 }, { unique: true });
FriendRequestDBSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 });

export const FriendRequestModel = model("friend-requests-v1", FriendRequestDBSchema);