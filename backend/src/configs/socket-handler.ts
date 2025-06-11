import { APP_ORIGIN } from "@src/constants/env";
import { isSecureEnv } from "@src/utils/common";
import type { Server as ServerType } from "node:http";
import { Server } from "socket.io";
import { appLogger } from "./app-logger";

export function initializeSocket(server: ServerType): void {
    const io = new Server(server, {
        path: "/socket/v1",
        pingTimeout: 20000,
        pingInterval: 25000,
        cors: {
            origin: isSecureEnv() ? APP_ORIGIN : true,
            methods: ['GET', 'POST'],
            credentials: true,
        }
    });

    io.on('connection', (socket) => {
        appLogger.info('User connected');

        const userId = socket.id;
        socket.emit('user-id', userId);
        socket.broadcast.emit('connected-user-id', userId);

        socket.on('offer', (data) => {
            appLogger.info("Hello client");
            socket.broadcast.emit('offer', data);
        });

        socket.on('answer', (data) => {
            socket.broadcast.emit('answer', data);
        });

        socket.on('ice-candidate', (data) => {
            socket.broadcast.emit('ice-candidate', data);
        });

        socket.on('disconnect', () => {
            appLogger.info(`User ${socket.id} disconnected`);
        });
    });
}
