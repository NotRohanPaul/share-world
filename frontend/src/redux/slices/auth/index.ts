import { combineReducers } from "@reduxjs/toolkit";
import { loginSlice, type LoginFormStateType } from "./login-slice";
import { signupSlice, type SignupFromStateType } from "./signup-slice";
import { userSlice, type UserStateType } from "./user-slice";
import type { AppRootReducersType } from "@src/redux/slices/root-reducer";

export const authReducer = combineReducers({
    login: loginSlice.reducer,
    signup: signupSlice.reducer,
    user: userSlice.reducer,
});

export const authSelectors = {
    login: (state: AppRootReducersType): LoginFormStateType => state.auth.login,
    signup: (state: AppRootReducersType): SignupFromStateType => state.auth.signup,
    user: (state: AppRootReducersType): UserStateType => state.auth.user,
};

export const authActions = {
    login: loginSlice.actions,
    signup: signupSlice.actions,
    user: userSlice.actions,
};
