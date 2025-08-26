import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


export type AppearanceStateType = {
    theme: "light" | "dark",
    disableAnimations: boolean;
};

const initialState: AppearanceStateType = {
    theme: "light",
    disableAnimations: false,
};

export const appearanceSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<AppearanceStateType["theme"]>) => {
            state.theme = action.payload;
        },
        setDisableAnimations: (state, action: PayloadAction<AppearanceStateType["disableAnimations"]>) => {
            state.disableAnimations = action.payload;
        }
    }
});