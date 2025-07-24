import { combineReducers, configureStore, type EnhancedStore } from "@reduxjs/toolkit";
import { loginReducer } from "./slices";
import { IS_SECURE_ENV } from "@src/constants/env";
import { userReducer } from "./slices/auth/user-slice";
import { signupReducer } from "./slices/auth/signup-slice";

const rootReducer = combineReducers({
    user: userReducer,
    signup: signupReducer,
    login: loginReducer,
});

export const setupStore = (preloadedState?: Partial<AppRootReducersType>): EnhancedStore => {
    return configureStore({
        reducer: rootReducer,
        devTools: IS_SECURE_ENV === false,
        preloadedState,
    });
};

export const store = setupStore();

export type AppRootReducersType = ReturnType<typeof rootReducer>;
export type AppStoreStateType = ReturnType<typeof setupStore>;
export type AppStoreDispatchType = AppStoreStateType["dispatch"];
