import { appLogger } from "@src/configs/app-logger";
import type { PairSocketType } from "../types/share-via-id-namespace-types";


export const pairEventsHandler = (
    socket: PairSocketType,
    userMap: Map<string, PairSocketType>
): void => {
    socket.on("pair-request-server", ({ to }) => {
        appLogger.info(userMap.keys());
        const peer = userMap.get(to);

        if (peer) {
            socket.emit("paired-sender-client", { to });
            peer.emit("paired-receiver-client", { from: socket.data.userId });
        } else {
            socket.emit("pair-failed-client", { message: "User not found." });
        }
    });
};