import { API_ORIGIN } from "@src/constants/env";
import { io } from "socket.io-client";
import type { ShareViaIDEventsType } from "./types/namespace/share-via-id-types";
import type { ShareToFriendEventsType } from "./types/namespace/share-to-friend-types";

export const sharedSocketOptions = {
    path: "/socket/v1",
    autoConnect: false,
    reconnectionAttempts: 5,
    reconnectionDelay: 1e3,
    reconnectionDelayMax: 5e3,
};

export const shareViaIdSocketInstance: ShareViaIDEventsType = io(API_ORIGIN + "/share-via-id", sharedSocketOptions);

export const shareToFriendSocketInstance: ShareToFriendEventsType = io(API_ORIGIN + "/share-to-friend", {
    ...sharedSocketOptions,
    withCredentials: true,
});