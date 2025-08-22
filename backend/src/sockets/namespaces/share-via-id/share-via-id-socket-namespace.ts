import type { Server } from "socket.io";
import type { SocketWithUserIdType } from "./types";
import { appLogger } from "@src/configs/app-logger";
import { pairEventsHandler } from "./handlers/pair-events.handler";
import { webrtcEventsHandler } from "./handlers/webrtc-events.handler";
import { userIdHandler } from "./middlewares/user-id.middleware";


export const shareViaIdNamespace = (io: Server): void => {

    const ns = io.of("/share-via-id");

    ns.use(userIdHandler);

    const userMap = new Map<string, SocketWithUserIdType>();
    ns.on("connection", (socket: SocketWithUserIdType) => {
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

};