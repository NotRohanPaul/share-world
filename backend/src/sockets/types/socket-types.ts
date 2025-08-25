import type { ExtendedError, Namespace, Socket } from "socket.io";

export type SocketGenericsType = Partial<{
    context: Record<string, unknown>,
    listenEvents: Record<string, unknown[]>,
    emitEvents: Record<string, unknown[]>,
    serverSideEvents: Record<string, unknown[]>,
    socketData: Record<string, unknown>,
}>;

export type SocketType<
    G extends SocketGenericsType = SocketGenericsType,
> = Socket<
    G["listenEvents"] extends Record<string, unknown[]> ?
    { [K in keyof G["listenEvents"]]: (...args: G["listenEvents"][K]) => void } :
    Record<string, unknown>,
    G["emitEvents"] extends Record<string, unknown[]> ?
    { [K in keyof G["emitEvents"]]: (...args: G["emitEvents"][K]) => void } :
    Record<string, unknown>,
    G["serverSideEvents"] extends Record<string, unknown[]> ?
    { [K in keyof G["serverSideEvents"]]: (...args: G["serverSideEvents"][K]) => void } :
    Record<string, unknown>,
    (G["socketData"] extends undefined ? Record<string, unknown> : G["socketData"]) & {
        context?: Partial<NonNullable<G["context"]>>;
    }
>;

export type SocketNamespaceType<
   G extends SocketGenericsType = SocketGenericsType,
> = Namespace<
    G["listenEvents"] extends Record<string, unknown[]> ?
    { [K in keyof G["listenEvents"]]: (...args: G["listenEvents"][K]) => void } :
    Record<string, unknown>,
    G["emitEvents"] extends Record<string, unknown[]> ?
    { [K in keyof G["emitEvents"]]: (...args: G["emitEvents"][K]) => void } :
    Record<string, unknown>,
    G["serverSideEvents"] extends Record<string, unknown[]> ?
    { [K in keyof G["serverSideEvents"]]: (...args: G["serverSideEvents"][K]) => void } :
    Record<string, unknown>,
    (G["socketData"] extends undefined ? Record<string, unknown> : G["socketData"]) & {
        context?: Partial<NonNullable<G["context"]>>;
    }
>;

export type SocketMiddlewareType<
    G extends SocketGenericsType = SocketGenericsType
> = (
    socket: SocketType<G>,
    next: (err?: ExtendedError) => void
) => void;

export type EventMiddlewareType = (event: [string, ...unknown[]], next: (err?: Error) => void) => void;
