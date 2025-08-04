import { APP_ORIGIN, IS_SECURE_ENV } from "@src/constants/env";
import { APP_TIMEOUTS } from "@src/constants/timeouts";
import type { Server as ServerType } from "node:http";
import { Server } from "socket.io";
import {
    shareToFriendNamespace,
    shareViaIdNamespace
} from "./namespaces";

export function initializeSocket(server: ServerType): void {
    const io = new Server(server, {
        path: "/socket/v1",
        pingTimeout: APP_TIMEOUTS.pingTimeout,
        pingInterval: APP_TIMEOUTS.pingInterval,
        cors: {
            origin: IS_SECURE_ENV ? APP_ORIGIN : true,
            methods: ["GET", "POST"],
            credentials: true,
        },
    });

    shareViaIdNamespace(io);
    shareToFriendNamespace(io);
}
