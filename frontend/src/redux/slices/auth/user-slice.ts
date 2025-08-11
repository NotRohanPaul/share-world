import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type GuestUserStateType = {
    type: "guest",
};
type AuthUserStateType = {
    type: "auth-user",
    name: string,
    email: string,
};

export type UserStateType = GuestUserStateType | AuthUserStateType;

const initialState = {
    type: "guest",
} as UserStateType;

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setNameAndEmail: (_state, action: PayloadAction<{ name: string; email: string; }>): AuthUserStateType => {
            return {
                type: "auth-user",
                name: action.payload.name,
                email: action.payload.email,
            };

        },
        setGuestUser: (): GuestUserStateType => {
            return {
                type: "guest",
            };
        },
    }

});

