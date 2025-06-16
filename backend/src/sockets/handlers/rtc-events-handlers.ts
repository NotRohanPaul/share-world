import type { Socket } from "socket.io";


export const rtcEventsHandler = (socket: Socket, userMap: Map<string, Socket>) => {
    socket.on('offer-server', ({ to, offer }) =>
        userMap.get(to)?.emit('offer-client', offer)
    );
    socket.on('answer-server', ({ to, answer }) =>
        userMap.get(to)?.emit('answer-client', answer)
    );
    socket.on('ice-candidate-server', ({ to, candidate }) =>
        userMap.get(to)?.emit('ice-candidate-client', { candidate })
    );
};