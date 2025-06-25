import { APP_ORIGIN, IS_SECURE_ENV } from "@src/constants/env";
import { APP_TIMEOUTS } from "@src/constants/timeouts";
import type { Server as ServerType } from "node:http";
import { Server } from "socket.io";
import { appLogger } from "../configs/app-logger";
import { pairEventsHandler } from "./handlers/pair-events-handler";
import { webrtcEventsHandler } from "./handlers/webrtc-events-handlers";
import { userIdHandler } from "./middlewares/user-id-handler";
import type { SocketWithUserIdType } from "./types";

export function initializeSocket(server: ServerType): void {
    const io = new Server(server, {
        path: "/socket/v1",
        pingTimeout: APP_TIMEOUTS.pingTimeout,
        pingInterval: APP_TIMEOUTS.pingInterval,
        cors: {
            origin: IS_SECURE_ENV ? APP_ORIGIN : true,
            methods: ['GET', 'POST'],
            credentials: true,
        },
    });

    io.use(userIdHandler);

    const userMap = new Map<string, SocketWithUserIdType>();
    io.on('connection', (socket: SocketWithUserIdType) => {
        const userId = socket.data.userId;
        userMap.set(userId, socket);
        socket.emit("user-id-client", { userId });
        appLogger.info({ socketId: userId }, "User connected");

        socket.on("disconnect", () => {
            appLogger.info({ socketId: userId }, "User disconnected");
            userMap.delete(userId);
        });

        pairEventsHandler(socket, userMap);
        webrtcEventsHandler(socket, userMap);
    });

}
