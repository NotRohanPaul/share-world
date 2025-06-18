import { API_ORIGIN } from "@src/constants/env";
import { io } from "socket.io-client";

export const socketInstance = io(API_ORIGIN, {
    path: '/socket/v1',
    autoConnect: false,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
});
