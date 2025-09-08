import { appLogger } from "@src/configs/app-logger";
import { logEventInfoSocketEventMiddleware } from "@src/sockets/middlewares/event-middlewares/log-event-info-socket-event.middleware";
import type { Server } from "socket.io";
import { idPairEventsHandler } from "./handlers/id-pair-events.handler";
import { idWebrtcEventsHandler } from "./handlers/id-webrtc-events.handler";
import { userIdSocketMiddleware, } from "./middlewares/user-id-socket.middleware";
import type { ShareViaIdNamespaceType, ShareViaIdSocketType } from "./types/share-via-id-namespace-types";


export const shareViaIdNamespace = (io: Server): void => {
    const ns = io
        .of("/share-via-id")
        .use(userIdSocketMiddleware) as ShareViaIdNamespaceType;

    const userMap = new Map<string, ShareViaIdSocketType>();
    ns.on("connection", (socket) => {
        socket.use(logEventInfoSocketEventMiddleware);

        const userId = socket.data.userId;
        if (userId === undefined) {
            socket.emit("error", { message: "Socket ID creation error" });
            socket.disconnect(true);
            return;
        }

        userMap.set(userId, socket);
        socket.emit("user-id-client", { userId });
        appLogger.info({ socketId: userId }, "User connected");

        socket.on("disconnect", () => {
            appLogger.info({ socketId: userId }, "User disconnected");
            userMap.delete(userId);
        });

        idPairEventsHandler(socket, userMap);
        idWebrtcEventsHandler(socket, userMap);
    });

};