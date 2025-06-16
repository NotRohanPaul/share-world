import type { Socket } from "socket.io";

export const pairEventsHandler = (
    socket: Socket,
    userMap: Map<string, Socket>,
) => {
    socket.on('pair-request-server', ({ to, from }) => {
        const peer = userMap.get(to);
        if (peer) {
            socket.emit('paired-client', to);
            peer.emit('paired-client', from);
        } else {
            socket.emit('pair-failed-client', { message: 'User not found.' });
        }
    });
};