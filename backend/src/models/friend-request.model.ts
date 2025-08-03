import { model, Schema } from "mongoose";


const FriendRequestDBSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    expiresAt: {
        type: Date,
        default: (): Date => new Date(Date.now() + 24 * 60 * 60 * 1000)
    }
}, { timestamps: true, strict: true, });

FriendRequestDBSchema.index({ sender: 1, receiver: 1 }, { unique: true });
FriendRequestDBSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const FriendRequestModel = model("friend-requests-v1", FriendRequestDBSchema);