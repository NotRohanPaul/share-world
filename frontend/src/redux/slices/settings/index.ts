import { combineReducers } from "@reduxjs/toolkit";
import type { AppRootReducersType } from "../root-reducer";
import { appearanceSlice, type AppearanceStateType } from "./appearance-slice";


export const settingsReducer = combineReducers({
    appearance: appearanceSlice.reducer,
});

export const settingsSelectors = {
    appearance: (state: AppRootReducersType): AppearanceStateType => state.settings.appearance,
};

export const settingsActions = {
    appearance: appearanceSlice.actions
};