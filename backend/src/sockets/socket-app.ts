import { APP_ORIGIN } from "@src/constants/env";
import { APP_TIMEOUTS } from "@src/constants/timeouts";
import { isSecureEnv } from "@src/utils/common";
import type { Server as ServerType } from "node:http";
import { Server, Socket } from "socket.io";
import { appLogger } from "../configs/app-logger";
import { pairEventsHandler } from "./handlers/pair-events-handler";
import { rtcEventsHandler } from "./handlers/rtc-events-handlers";

export function initializeSocket(server: ServerType): void {
    const io = new Server(server, {
        path: "/socket/v1",
        pingTimeout: APP_TIMEOUTS.pingTimeout,
        pingInterval: APP_TIMEOUTS.pingInterval,
        cors: {
            origin: isSecureEnv() ? APP_ORIGIN : true,
            methods: ['GET', 'POST'],
            credentials: true,
        },
    });

    const userMap = new Map<string, Socket>();
    io.on('connection', (socket) => {
        const userId = socket.id;
        userMap.set(userId, socket);

        socket.emit('user-id-client', userId);
        appLogger.info({ socketId: userId }, 'User connected');

        socket.on('disconnect', () => {
            appLogger.info("User disconnected", userId);
            userMap.delete(userId);
        });

        pairEventsHandler(socket, userMap);
        rtcEventsHandler(socket, userMap);
    });

}
