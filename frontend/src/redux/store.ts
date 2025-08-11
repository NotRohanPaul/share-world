import {
    configureStore,
    type EnhancedStore
} from "@reduxjs/toolkit";
import { IS_SECURE_ENV } from "@src/constants/env";
import { rootReducer, type AppRootReducersType } from "./root-reducer";

export const setupStore = (preloadedState?: Partial<AppRootReducersType>): EnhancedStore => {
    return configureStore({
        reducer: rootReducer,
        devTools: IS_SECURE_ENV === false,
        preloadedState,
    });
};

export const store = setupStore();

export type AppStoreStateType = ReturnType<typeof setupStore>;
export type AppStoreDispatchType = AppStoreStateType["dispatch"];
