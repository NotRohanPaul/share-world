import type { Socket } from "socket.io";
import type { SocketWithUserIdType } from "../types";

export const pairEventsHandler = (
    socket: SocketWithUserIdType,
    userMap: Map<string, Socket>,
): void => {
    socket.on("pair-request-server", ({ to }: { to: string; }) => {
        console.log({ to });
        console.log(userMap.keys());
        const peer = userMap.get(to);
        if (peer) {
            socket.emit("paired-sender-client", { to });
            peer.emit("paired-receiver-client", { from: socket.data.userId });
        } else {
            socket.emit("pair-failed-client", { message: "User not found." });
        }
    });
};