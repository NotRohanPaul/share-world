import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppRootReducersType } from "@src/redux/store";

export type UserStateType = {
    name: string | null;
    email: string | null;
};

const initialState: UserStateType = {
    name: null,
    email: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setNameAndEmail: (state, action: PayloadAction<{ name: string, email: string; }>) => {
            state = action.payload;
        }
    }
});

export const userReducer = userSlice.reducer;

export const selectUserState = (state: AppRootReducersType): UserStateType => state.user;
export const userStateActions = userSlice.actions;