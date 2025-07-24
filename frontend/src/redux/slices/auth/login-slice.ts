import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppRootReducersType } from "@src/redux/store";

export type LoginFormStateType = {
    email: string;
    password: string;
    emailError: string;
    isPasswordVisible: boolean;
};

const initialState: LoginFormStateType = {
    email: '',
    password: '',
    emailError: '',
    isPasswordVisible: false,
};

const loginSlice = createSlice({
    name: "loginForm",
    initialState,
    reducers: {
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
        setEmailError: (state, action: PayloadAction<string>) => {
            state.emailError = action.payload;
        },
        setIsPasswordVisible: (state, action: PayloadAction<boolean | undefined>) => {
            state.isPasswordVisible = action.payload ?? !state.isPasswordVisible;
        },
        resetForm: () => initialState,
    }
});

export const loginReducer = loginSlice.reducer;

export const selectLoginState = (state: AppRootReducersType): LoginFormStateType => state.login;
export const loginStateActions = loginSlice.actions;

