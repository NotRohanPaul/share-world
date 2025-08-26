import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./auth";
import { friendsReducer } from "./friends";
import { shareReducer } from "./share";
import { settingsReducer } from "./settings";

export const rootReducer = combineReducers({
    auth: authReducer,
    friends: friendsReducer,
    share: shareReducer,
    settings: settingsReducer,
});

export type AppRootReducersType = ReturnType<typeof rootReducer>;

