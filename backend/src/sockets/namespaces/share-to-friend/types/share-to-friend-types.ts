import type { SocketNamespaceType, SocketType } from "@src/sockets/types/socket-generic-types";

type CommonEventsType = {
    "error": [{ message: string; }];
};

type FriendPairEventsType = {
    listenEvents: {
        "online-friends-list-server": [],
        "send-pair-request-server": [{ receiverEmail: string; }],
        "accept-pair-request-server": [{ senderEmail: string, }],
        "reject-pair-request-server": [{ senderEmail: string, }],
    },
    emitEvents: {
        "online-friends-list-client": [{ onlineFriendsList: { name: string, email: string; }[], }],
        "pair-request-client": [{ senderEmail: string, }],
    } & CommonEventsType,
};

type FriendWebRTCEventsType = {
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
    } & CommonEventsType,
};

type ShareEventsType = {
    listenEvents: FriendPairEventsType["listenEvents"] & FriendWebRTCEventsType["listenEvents"],
    emitEvents: FriendPairEventsType["emitEvents"] & FriendWebRTCEventsType["emitEvents"],
    context: { auth: { email: string; }, },
};


export type ShareToFriendNamespaceType = SocketNamespaceType<{
    listenEvents: ShareEventsType["listenEvents"],
    emitEvents: ShareEventsType["emitEvents"],
    context: ShareEventsType["context"],
}>;

export type ShareToFriendSocketType = SocketType<{
    listenEvents: ShareEventsType["listenEvents"],
    emitEvents: ShareEventsType["emitEvents"],
    context: ShareEventsType["context"],
}>;

export type FriendPairSocketType = SocketType<{
    listenEvents: FriendPairEventsType["listenEvents"],
    emitEvents: FriendPairEventsType["emitEvents"],
    context: ShareEventsType["context"],
}>;

export type WebRTCSocketType = SocketType<{
    listenEvents: FriendWebRTCEventsType["listenEvents"],
    emitEvents: FriendWebRTCEventsType["emitEvents"],
    context: ShareEventsType["context"],
}>;