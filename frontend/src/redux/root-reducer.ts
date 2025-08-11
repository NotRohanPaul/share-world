import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth";

export const rootReducer = combineReducers({
    auth: authReducer,
});

export type AppRootReducersType = ReturnType<typeof rootReducer>;

