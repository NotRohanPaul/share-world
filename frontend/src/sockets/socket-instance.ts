import { API_ORIGIN } from "@src/constants/env";
import { io } from "socket.io-client";

export const sharedSocketOptions = {
    path: "/socket/v1",
    autoConnect: false,
    reconnectionAttempts: 5,
    reconnectionDelay: 1e3,
    reconnectionDelayMax: 5e3,
};

export const shareViaIdSocketInstance = io(API_ORIGIN + "/share-via-id", sharedSocketOptions);

export const shareToFriendSocketInstance = io(API_ORIGIN + "/share-to-friend", {
    ...sharedSocketOptions,
    withCredentials: true,
});