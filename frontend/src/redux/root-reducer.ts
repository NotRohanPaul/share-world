import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth";
import { friendsReducer } from "./slices/friends";

export const rootReducer = combineReducers({
    auth: authReducer,
    friends: friendsReducer,
});

export type AppRootReducersType = ReturnType<typeof rootReducer>;

