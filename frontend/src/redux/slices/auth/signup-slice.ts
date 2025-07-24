import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppRootReducersType } from "@src/redux/store";

export type SignupFromStateType = {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    isPasswordVisible: boolean,
    isConfirmPasswordVisible: boolean;
    inputErrors: {
        name: string;
        email: string;
        password: string;
        confirmPassword: string;
    };
};

const initialState: SignupFromStateType = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    isPasswordVisible: false,
    isConfirmPasswordVisible: false,
    inputErrors: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    },
};


const signupSlice = createSlice({
    name: "signupForm",
    initialState,
    reducers: {
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
        setConfirmPassword: (state, action: PayloadAction<string>) => {
            state.confirmPassword = action.payload;
        },
        setIsPasswordVisible: (state, action: PayloadAction<boolean | undefined>) => {
            state.isPasswordVisible = action.payload ?? !state.isPasswordVisible;
        },
        setIsConfirmPasswordVisible: (state, action: PayloadAction<boolean | undefined>) => {
            state.isConfirmPasswordVisible = action.payload ?? !state.isConfirmPasswordVisible;
        },
        setInputErrors: (state, action: PayloadAction<typeof initialState.inputErrors>) => {
            state.inputErrors = action.payload;
        },
    }
});

export const signupReducer = signupSlice.reducer;

export const selectSignupState = (state: AppRootReducersType): SignupFromStateType => state.signup;
export const signupStateActions = signupSlice.actions;
