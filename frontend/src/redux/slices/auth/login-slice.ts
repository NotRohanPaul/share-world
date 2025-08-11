import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

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

export const loginSlice = createSlice({
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
