import { combineReducers } from "@reduxjs/toolkit";
import { friendsMenuSlice, type MenuButtonType } from "./friends-menu-slice";
import type { AppRootReducersType } from "@src/redux/slices/root-reducer";


export const friendsReducer = combineReducers({
    friendsMenu: friendsMenuSlice.reducer,
});

export const friendsSelectors = {
    friendsMenu: (state: AppRootReducersType): MenuButtonType => state.friends.friendsMenu,
};

export const friendsActions = {
    friendsMenu: friendsMenuSlice.actions,
};
