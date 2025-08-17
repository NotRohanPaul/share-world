import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./auth";
import { friendsReducer } from "./friends";

export const rootReducer = combineReducers({
    auth: authReducer,
    friends: friendsReducer,
});

export type AppRootReducersType = ReturnType<typeof rootReducer>;

