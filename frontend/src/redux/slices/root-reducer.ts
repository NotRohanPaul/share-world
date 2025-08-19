import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./auth";
import { friendsReducer } from "./friends";
import { shareReducer } from "./share";

export const rootReducer = combineReducers({
    auth: authReducer,
    friends: friendsReducer,
    share: shareReducer,
});

export type AppRootReducersType = ReturnType<typeof rootReducer>;

