import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
type GuestUserStateType = {
    type: "guest",
};
type AuthUserStateType = {
    type: "auth-user",
    name: string | null,
    email: string | null,
};

export type UserStateType = GuestUserStateType | AuthUserStateType | null;

const initialState = null as UserStateType;;

export const userSlice = createSlice({
    name: "user",
    initialState: initialState,
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
        resetUserSliceToNull: () => {
            return null;
        },
    }

});

