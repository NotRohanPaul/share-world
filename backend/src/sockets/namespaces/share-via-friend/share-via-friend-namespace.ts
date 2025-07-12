import type { Server, Socket } from "socket.io";


export const shareViaFriendNamespace = (io: Server): void => {
    const ns = io.of("/share-via-friends");

    ns.on("connection", (socket: Socket) => {
        socket.on("hello", () => {

        });
    });
};