import { appLogger } from "@src/configs/app-logger";
import type { IdWebRTCSocketType } from "../types/share-via-id-namespace-types";

export const webrtcEventsHandler = (
    socket: IdWebRTCSocketType,
    userMap: Map<string, IdWebRTCSocketType>
): void => {
    socket.on("webrtc-offer-server", ({ to, offer }) => {
        appLogger.info({ to, offer });
        userMap.get(to)?.emit("webrtc-offer-client", { offer });
    });

    socket.on("webrtc-answer-server", ({ to, answer }) => {
        appLogger.info({ socketId: socket.data.userId, answer });
        userMap.get(to)?.emit("webrtc-answer-client", { answer });
    });

    socket.on("webrtc-ice-candidate-server", ({ to, candidate }) => {
        appLogger.info({ socketId: socket.data.userId, candidate });
        userMap.get(to)?.emit("webrtc-ice-candidate-client", { candidate });
    });
};