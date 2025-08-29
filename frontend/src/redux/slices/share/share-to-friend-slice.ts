import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


type FileListType = {
    id: string,
    metadata: {
        name: string,
        type: string,
        size: number,
    },
    state: "done" | "pending" | "processing",
    percentage?: string,
    data?: File,
}[];

/* type FileItem = FileListType[number];
 type MetadataType = {
    id: FileItem["id"],
    name: FileItem["metadata"]["name"],
    size: FileItem["metadata"]["size"],
    type: FileItem["metadata"]["type"],
}[]; */

export type ShareToFriendStateType = {
    onlineFriendsList: Record<string, string>[];
    selectedFriendEmail: null | string,
    filesList: FileListType,
};

const initialState: ShareToFriendStateType = {
    onlineFriendsList: [],
    selectedFriendEmail: null,
    filesList: [],
};

export const shareToFriendSlice = createSlice({
    name: "shareToFriend",
    initialState,
    reducers: {
        setOnlineFriendsList: (state, action: PayloadAction<ShareToFriendStateType["onlineFriendsList"]>) => {
            state.onlineFriendsList = action.payload;
        },
        addFilesToFilesList: (state, action: PayloadAction<ShareToFriendStateType["filesList"]>) => {
            state.filesList.concat(action.payload);
        },
    },

});