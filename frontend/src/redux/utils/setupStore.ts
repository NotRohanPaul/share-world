import {
    configureStore,
    type EnhancedStore
} from "@reduxjs/toolkit";
import { IS_SECURE_ENV } from "@src/constants/env";
import type { DeepPartial } from "@src/types";
import { rootReducer, type AppRootReducersType } from "../slices/root-reducer";

export type PreloadedStateType = DeepPartial<AppRootReducersType>;

export const setupStore = (
    preloadedState?: PreloadedStateType
): EnhancedStore<AppRootReducersType> => {
    return configureStore({
        reducer: rootReducer,
        devTools: IS_SECURE_ENV === false,
        preloadedState: preloadedState as AppRootReducersType,
    });
};


export type AppStoreStateType = ReturnType<typeof setupStore>;
export type AppStoreDispatchType = AppStoreStateType["dispatch"];



