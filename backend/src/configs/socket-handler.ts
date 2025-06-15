import { APP_ORIGIN } from "@src/constants/env";
import { isSecureEnv } from "@src/utils/common";
import type { Server as ServerType } from "node:http";
import { Server, Socket } from "socket.io";
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

    const userMap = new Map<string, Socket>();

    io.on('connection', (socket) => {
        const userId = socket.id;
        userMap.set(userId, socket);
        socket.emit('user-id', userId);
        appLogger.info({ socketId: userId }, 'User connected');

        socket.on('pair-request', ({ to, from }) => {
            const peer = userMap.get(to);
            if (peer) {
                socket.emit('paired', to);
                peer.emit('paired', from);
            } else {
                socket.emit('pair-failed', { message: 'User not found.' });
            }
        });

        socket.on('offer', ({ to, offer }) =>
            userMap.get(to)?.emit('offer', offer)
        );
        socket.on('answer', ({ to, answer }) =>
            userMap.get(to)?.emit('answer', answer)
        );
        socket.on('ice-candidate', ({ to, candidate }) =>
            userMap.get(to)?.emit('ice-candidate', { candidate })
        );

        socket.on('disconnect', () => {
            appLogger.info("User disconnected", userId);
            userMap.delete(userId);
        });
    });

}
