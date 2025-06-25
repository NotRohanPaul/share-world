import type { DefaultEventsMap, ExtendedError, Socket } from "socket.io";

export const userIdHandler = (
    socket: Socket<
        DefaultEventsMap,
        DefaultEventsMap,
        DefaultEventsMap,
        {
            userId: string;
        }>,
    next: (err?: ExtendedError) => void
): void => {
    socket.data.userId = socket.id.slice(0, 5);
    next();
};