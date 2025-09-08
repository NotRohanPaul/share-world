import type { SocketNamespaceType, SocketType } from "@src/sockets/types/socket-generic-types";

type FriendPairEventsType = {
    listenEvents: {
        "online-friends-list-server": [],
        "receiver-friend-info-server": [{ receiver: Record<string, string>, }],
        "receiver-friend-accept-request-server": [{ sender: string, }],
    },
    emitEvents: {
        "online-friends-list-client": [{ onlineFriendsList: { name: string, email: string; }[], }],
        "receiver-friend-connection-request-client": [{ sender: Record<string, string>, }],
    },
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
    },
};

type ShareEventsType = {
    listenEvents: FriendPairEventsType["listenEvents"] & FriendWebRTCEventsType["listenEvents"],
    emitEvents: FriendPairEventsType["emitEvents"] & FriendWebRTCEventsType["emitEvents"] & {
        "error": [{ message: string, }],
    },
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