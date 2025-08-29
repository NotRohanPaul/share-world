import type { SocketType } from "../socket-generic-types";

type PairEventsType = {
    listenEvents: {
        "paired-sender-client": [{ to: string, }],
        "paired-receiver-client": [{ from: string, }],
        "pair-failed-client": [{ message: string, }],
    },
    emitEvents: {
        "pair-request-server": [{ to: string, }],
    },
};

type WebRTCEventsType = {
    listenEvents: {
        "webrtc-offer-client": [{
            offer: RTCSessionDescriptionInit,
        }],

        "webrtc-answer-client": [{
            answer: RTCSessionDescriptionInit,
        }],

        "webrtc-ice-candidate-client": [{
            candidate: RTCIceCandidateInit,
        }],
    },

    emitEvents: {
        "webrtc-offer-server": [{
            to: string,
            offer: RTCSessionDescriptionInit,
        }],

        "webrtc-answer-server": [{
            to: string,
            answer: RTCSessionDescriptionInit,
        }],

        "webrtc-ice-candidate-server": [{
            to: string,
            candidate: RTCIceCandidateInit,
        }],
    },
};

export type ShareViaIDEventsType = SocketType<{
    listenEvents: PairEventsType["listenEvents"] & WebRTCEventsType["listenEvents"] & {
        "user-id-client": [{ userId: string, }],
        "error": [{ message: string, }],
    },
    emitEvents: PairEventsType["emitEvents"] & WebRTCEventsType["emitEvents"],
}>;