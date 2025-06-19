import type { Socket } from "socket.io";

export const pairEventsHandler = (
    socket: Socket,
    userMap: Map<string, Socket>,
) => {
    socket.on("pair-request-server", ({ to }: { to: string; }) => {
        console.log({ to });
        console.log(userMap.keys());
        const peer = userMap.get(to);
        if (peer) {
            socket.emit("paired-sender-client", { to });
            peer.emit("paired-receiver-client", { from: socket.id.slice(0, 5) });
        } else {
            socket.emit("pair-failed-client", { message: "User not found." });
        }
    });
};