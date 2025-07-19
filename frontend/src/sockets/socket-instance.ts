import { API_ORIGIN } from "@src/constants/env";
import { io } from "socket.io-client";

export const sharedSocketOptions = {
    path: "/socket/v1",
    autoConnect: false,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
};

export const shareViaIdSocketInstance = io(API_ORIGIN + "/share-via-id", sharedSocketOptions);
export const shareViaFriendsSocketInstance = io(API_ORIGIN + "/share-via-friend", sharedSocketOptions);