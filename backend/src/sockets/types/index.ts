import type { ExtendedError, Socket } from "socket.io";
import type { EventsMap } from "socket.io/dist/typed-events";

export type SocketGenericsType = Partial<{
    context: Record<string, unknown>,
    listenEvents: Record<string, unknown>,
    emitEvents: Record<string, unknown>,
    serverSideEvents: Record<string, unknown>,
    socketData: Record<string, unknown>,
}>;

export type SocketType<
    G extends SocketGenericsType = SocketGenericsType,
> = Socket<
    G["listenEvents"] extends EventsMap ? G["listenEvents"] : Record<string, unknown>,
    G["emitEvents"] extends EventsMap ? G["emitEvents"] : Record<string, unknown>,
    G["serverSideEvents"] extends EventsMap ? G["serverSideEvents"] : Record<string, unknown>,
    (G["socketData"] extends undefined ? Record<string, unknown> : G["socketData"]) & {
        context?: (G["context"] extends undefined ? Record<string, unknown> : Partial<G["context"]>);
    }
>;


export type SocketMiddlewareType<
    G extends SocketGenericsType = SocketGenericsType
> = (
    socket: SocketType<G>,
    next: (err?: ExtendedError) => void
) => void;

export type EventMiddlewareType = Parameters<Socket["use"]>[0];
