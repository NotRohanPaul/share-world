import type { SocketNamespaceType, SocketType } from "@src/sockets/types/socket-generic-types";

type IdPairEventsType = {
    listenEvents: {
        "pair-request-server": [{ to: string, }],
    },
    emitEvents: {
        "paired-sender-client": [{ to: string, }],
        "paired-receiver-client": [{ from: string, }],
        "pair-failed-client": [{ message: string, }],
    },
};

type IdWebRTCEventsType = {
    listenEvents: {
        "webrtc-offer-server": [{
            to: string,
            offer: Record<string, unknown>,
        }],

        "webrtc-answer-server": [{
            to: string,
            answer: Record<string, unknown>,
        }],

        "webrtc-ice-candidate-server": [{
            to: string,
            candidate: Record<string, unknown>,
        }],
    },

    emitEvents: {
        "webrtc-offer-client": [{
            offer: Record<string, unknown>,
        }],

        "webrtc-answer-client": [{
            answer: Record<string, unknown>,
        }],

        "webrtc-ice-candidate-client": [{
            candidate: Record<string, unknown>,
        }],
    },
};

type ShareEventsType = {
    listenEvents: IdPairEventsType["listenEvents"] & IdWebRTCEventsType["listenEvents"],
    emitEvents: IdPairEventsType["emitEvents"] & IdWebRTCEventsType["emitEvents"] & {
        "user-id-client": [{ userId: string, }],
        "error": [{ message: string, }],
    },
    socketData: { userId: string, },
};


export type ShareViaIdNamespaceType = SocketNamespaceType<{
    listenEvents: ShareEventsType["listenEvents"],
    emitEvents: ShareEventsType["emitEvents"],
    socketData: ShareEventsType["socketData"],
}>;

export type ShareViaIdSocketType = SocketType<{
    listenEvents: ShareEventsType["listenEvents"],
    emitEvents: ShareEventsType["emitEvents"],
    socketData: ShareEventsType["socketData"],
}>;

export type IdPairSocketType = SocketType<{
    listenEvents: IdPairEventsType["listenEvents"],
    emitEvents: IdPairEventsType["emitEvents"],
    socketData: ShareEventsType["socketData"],
}>;

export type IdWebRTCSocketType = SocketType<{
    listenEvents: IdWebRTCEventsType["listenEvents"],
    emitEvents: IdWebRTCEventsType["emitEvents"],
    socketData: ShareEventsType["socketData"],
}>;