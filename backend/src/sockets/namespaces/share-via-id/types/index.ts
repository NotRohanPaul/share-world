import type { Socket, DefaultEventsMap } from "socket.io";

export type SocketWithUserIdType = Socket<
    DefaultEventsMap,
    DefaultEventsMap,
    DefaultEventsMap,
    { userId: string; }
>;