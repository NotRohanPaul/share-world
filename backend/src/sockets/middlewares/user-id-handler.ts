import type { ExtendedError, Socket } from "socket.io";

export const userIdHandler = (
    socket: Socket,
    next: (err?: ExtendedError) => void
) => {
    socket.data.userId = socket.id.slice(0, 5);
    next();
};