import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    onlineFriendsEmailList: []
};

export const shareToFriendSlice = createSlice({
    name: "shareToFriend",
    initialState,
    reducers: {
        setOnlineFriendsEmailList: (state, action) => {
            state.onlineFriendsEmailList = action.payload;
        }
    }
});