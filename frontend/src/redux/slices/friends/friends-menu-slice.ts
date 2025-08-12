import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { friendsMenuButtons } from "@src/components/friends/constants/menu-options";

export type MenuButtonType = typeof friendsMenuButtons[number];

const initialState = "friends" as MenuButtonType;

export const friendsMenuSlice = createSlice({
    name: "friendsMenu",
    initialState,
    reducers: {
        setActiveMenuType: (_state, action: PayloadAction<MenuButtonType>) => {
            return action.payload;
        },
    }
});
