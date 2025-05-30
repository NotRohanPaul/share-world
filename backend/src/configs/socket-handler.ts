import type { Server } from "socket.io";

export function initializeSocket(io: Server): void {
    io.on('connection', (socket) => {
        console.log('User connected');

        socket.on('offer', (data) => {
            console.log("Hello client");
            socket.broadcast.emit('offer', data);
        });

        socket.on('answer', (data) => {
            socket.broadcast.emit('answer', data);
        });

        socket.on('ice-candidate', (data) => {
            socket.broadcast.emit('ice-candidate', data);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
}
