import type { Server, Socket } from "socket.io";


export const shareToFriendNamespace = (io: Server): void => {
    const ns = io.of("/share-to-friends");

    ns.on("connection", (socket: Socket) => {
        socket.on("hello", () => {

        });
    });
};