// import { socketAuthMiddleware } from "@src/sockets/middlewares/socket-auth-middleware";
import { socketCookieMiddleware } from "@src/sockets/middlewares/express-middleware-for-socket";
import type { Server, Socket } from "socket.io";


export const shareToFriendNamespace = (io: Server): void => {
    const ns = io.of("/share-to-friend");
    ns.use(socketCookieMiddleware);
    // ns.use(socketAuthMiddleware);
    ns.on("connection", (socket: Socket) => {
        console.log(socket.cookies);
        console.log("connected");
        socket.on("hello", () => {

        });
    });
};