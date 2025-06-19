import type { Socket } from "socket.io";

export const webrtcEventsHandler = (socket: Socket, userMap: Map<string, Socket>) => {
    socket.on("webrtc-offer-server", ({
        to,
        offer
    }: {
        to: string,
        offer: Record<string, unknown>,
    }) => {
        console.log({ to, offer });
        userMap.get(to)?.emit("webrtc-offer-client", { offer });
    });
    socket.on("webrtc-answer-server", ({
        to,
        answer
    }: {
        to: string,
        answer: Record<string, unknown>,
    }) => {
        console.log({ socketId: socket.data.userId, answer });
        userMap.get(to)?.emit("webrtc-answer-client", { answer });
    }
    );
    socket.on("webrtc-ice-candidate-server", ({
        to,
        candidate
    }: {
        to: string,
        candidate: Record<string, unknown>,
    }) => {
        console.log({ socketId: socket.data.userId, candidate });
        userMap.get(to)?.emit("webrtc-ice-candidate-client", { candidate });
    }
    );
};