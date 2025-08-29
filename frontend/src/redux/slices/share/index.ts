import { combineReducers } from "@reduxjs/toolkit";
import { shareToFriendSlice, type ShareToFriendStateType } from "./share-to-friend-slice";
import type { AppRootReducersType } from "../root-reducer";


export const shareReducer = combineReducers({
    shareToFriend: shareToFriendSlice.reducer,
});


export const shareSelectors = {
    shareToFriend: (state: AppRootReducersType): ShareToFriendStateType => state.share.shareToFriend
};

export const shareActions = {
    shareToFriend: shareToFriendSlice.actions
};