import { model, Schema } from "mongoose";


const BlockedRefreshTokensDBSchema = new Schema({
    token: {
        type: String,
        required: true,
        unique: true,
    },
    expiresAt: {
        type: Date,
        required: true,
        index: {
            expires: 0,
        }
    }
});


export const BlockedRefreshTokensModel = model("blocked-refreshed-tokens", BlockedRefreshTokensDBSchema);