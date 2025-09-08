import { logEventInfoSocketEventMiddleware } from "@src/sockets/middlewares/event-middlewares/log-event-info-socket-event.middleware";
import { socketAuthMiddleware } from "@src/sockets/middlewares/socket-middlewares/auth-socket.middleware";
import { socketCookieMiddleware } from "@src/sockets/middlewares/socket-middlewares/cookie-parser-socket.middleware";
import type { Server } from "socket.io";
import type { ShareToFriendNamespaceType, ShareToFriendSocketType } from "./types/share-to-friend-types";
import { friendPairEventsHandler } from "./handlers/friend-pair-events.handler";


export const shareToFriendNamespace = (io: Server): void => {
    const ns = io
        .of("/share-to-friend")
        .use(socketCookieMiddleware)
        .use(socketAuthMiddleware) as ShareToFriendNamespaceType;

    const onlineUsers = new Map<string, ShareToFriendSocketType>();
    ns.on("connection", (socket) => {
        socket.use(logEventInfoSocketEventMiddleware);

        const userEmail = socket.data.context?.auth?.email;
        if (userEmail !== undefined) {
            onlineUsers.set(userEmail, socket);
        }

        socket.on("disconnect", () => {
            if (userEmail !== undefined) {
                onlineUsers.delete(userEmail);
            }
        });

        friendPairEventsHandler(socket, onlineUsers)

    });
};