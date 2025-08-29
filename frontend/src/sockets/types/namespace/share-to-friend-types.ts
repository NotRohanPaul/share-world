import type { SocketType } from "../socket-generic-types";

type FriendPairEventsType = {
    listenEvents: {
        "online-friends-list-client": [{ onlineFriendsList: { name: string, email: string; }[], }],
        "receiver-friend-connection-request-client": [{ sender: Record<string, string>, }],
    },
    emitEvents: {
        "online-friends-list-server": [],
        "receiver-friend-info-server": [{ receiver: Record<string, string>, }],
        "receiver-friend-accept-request-server": [{ sender: string, }],
    },
};

type WebRTCEventsType = {
    listenEvents: {
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
    emitEvents: {
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
};

export type ShareToFriendEventsType = SocketType<{
    listenEvents: FriendPairEventsType["listenEvents"] & WebRTCEventsType["listenEvents"] & {
        "error": [{ message: string, }],
    },
    emitEvents: FriendPairEventsType["emitEvents"] & WebRTCEventsType["emitEvents"];
}>;
