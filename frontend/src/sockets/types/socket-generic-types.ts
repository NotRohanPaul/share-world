import type { Socket } from "socket.io-client";

export type SocketGenericsType = Partial<{
    listenEvents: Record<string, unknown[]>,
    emitEvents: Record<string, unknown[]>,
}>;

export type SocketType<
    G extends SocketGenericsType = SocketGenericsType,
> = Socket<
    G["listenEvents"] extends Record<string, unknown[]> ?
    { [K in keyof G["listenEvents"]]: (...args: G["listenEvents"][K]) => void } :
    Record<string, unknown>,
    G["emitEvents"] extends Record<string, unknown[]> ?
    { [K in keyof G["emitEvents"]]: (...args: G["emitEvents"][K]) => void } :
    Record<string, unknown>
>;