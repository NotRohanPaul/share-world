import { logEventInfoSocketEventMiddleware } from "@src/sockets/middlewares/event-middlewares/log-event-info-socket-event.middleware";
import { socketAuthMiddleware } from "@src/sockets/middlewares/socket-middlewares/auth-socket.middleware";
import { socketCookieMiddleware } from "@src/sockets/middlewares/socket-middlewares/cookie-parser-socket.middleware";
import type { SocketType } from "@src/sockets/types/socket-types";
import type { Server } from "socket.io";


export const shareToFriendNamespace = (io: Server): void => {
    const ns = io
        .of("/share-to-friend")
        .use(socketCookieMiddleware)
        .use(socketAuthMiddleware);

    ns.on("connection", (socket: SocketType) => {
        socket.use(logEventInfoSocketEventMiddleware);


    });
};