import { API_ORIGIN } from "@src/constants/env";
import { io } from "socket.io-client";

export const socketInstance = () => {
    const socket = io(API_ORIGIN, {
        path: '/socket/v1',
        autoConnect: false
    });

    return socket;
};