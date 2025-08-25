import type { SocketNamespaceType, SocketType } from "@src/sockets/types/socket-types";

type PairEventsType = {
    listenEvents: {
        "pair-request-server": [{ to: string, }],
    },
    emitEvents: {
        "paired-sender-client": [{ to: string, }],
        "paired-receiver-client": [{ from: string, }],
        "pair-failed-client": [{ message: string, }],
    },
};

type WebRTCEventsType = {
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
    listenEvents: PairEventsType["listenEvents"] & WebRTCEventsType["listenEvents"],
    emitEvents: PairEventsType["emitEvents"] & WebRTCEventsType["emitEvents"] & {
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

export type PairSocketType = SocketType<{
    listenEvents: PairEventsType["listenEvents"],
    emitEvents: PairEventsType["emitEvents"],
    socketData: ShareEventsType["socketData"],
}>;

export type WebRTCSocketType = SocketType<{
    listenEvents: WebRTCEventsType["listenEvents"],
    emitEvents: WebRTCEventsType["emitEvents"],
    socketData: ShareEventsType["socketData"],
}>;