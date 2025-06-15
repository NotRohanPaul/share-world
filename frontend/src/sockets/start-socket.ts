import type { ActionType } from "@src/components/user/types";
import { API_ORIGIN } from "@src/constants/env";
import { io } from "socket.io-client";

export const startSocket = async (receiverId: string | null,
    action: ActionType): Promise<{
        dataChannel: RTCDataChannel;
        userId: string;
        connectedUserId: string;
    } | void> => {
    let pc: RTCPeerConnection | null = null;
    let dataChannel: RTCDataChannel | null = null;
    let receiveBuffer: Uint8Array[] = [];
    let receivedSize = 0;
    let incomingFileSize = 0;
    let incomingFileName = '';
    let userId = '';
    let connectedUserId = '';
    let isInitiator = false;
    let isRemoteDescriptionSet = false;
    let iceCandidatesQueue: RTCIceCandidate[] = [];

    const socket = io(API_ORIGIN, { path: '/socket/v1' });

    pc = new RTCPeerConnection({ iceServers: [{ urls: ['stun:stun.l.google.com:19302'] }] });

    pc.onicecandidate = (event) => {
        if (event.candidate) {
            socket.emit('ice-candidate', { to: connectedUserId, candidate: event.candidate });
        }
    };

    const setDataChannelHandlers = (channel: RTCDataChannel) => {
        channel.onopen = () => console.log('Data channel open');
        channel.onmessage = (event) => {
            if (typeof event.data === 'string') {
                const message = JSON.parse(event.data);
                if (message.type === 'file-meta') {
                    incomingFileName = message.name;
                    incomingFileSize = message.size;
                    receiveBuffer = [];
                    receivedSize = 0;
                }
            } else {
                receiveBuffer.push(new Uint8Array(event.data));
                receivedSize += event.data.byteLength;
                if (receivedSize === incomingFileSize) {
                    const blob = new Blob(receiveBuffer);
                    const a = document.createElement('a');
                    a.href = URL.createObjectURL(blob);
                    a.download = incomingFileName;
                    a.click();
                }
            }
        };
    };

    return new Promise((resolve) => {
        socket.on('user-id', (id) => {
            userId = id;
            if (action === 'Send' && receiverId) {
                isInitiator = true;
                socket.emit('pair-request', { to: receiverId, from: id });
            }
        });

        socket.on('paired', async (id) => {
            connectedUserId = id;
            if (!pc) return;

            if (isInitiator) {
                dataChannel = pc.createDataChannel('fileTransfer');
                setDataChannelHandlers(dataChannel);
                const offer = await pc.createOffer();
                await pc.setLocalDescription(offer);
                socket.emit('offer', { to: connectedUserId, offer });
            }
        });

        socket.on('offer', async (offer) => {
            await pc!.setRemoteDescription(new RTCSessionDescription(offer));
            isRemoteDescriptionSet = true;
            const answer = await pc!.createAnswer();
            await pc!.setLocalDescription(answer);
            socket.emit('answer', { to: connectedUserId, answer });
        });

        socket.on('answer', async (answer) => {
            if (pc!.signalingState !== 'have-local-offer') return;
            await pc!.setRemoteDescription(new RTCSessionDescription(answer));
            isRemoteDescriptionSet = true;
            for (const candidate of iceCandidatesQueue) {
                await pc!.addIceCandidate(candidate);
            }
        });

        socket.on('ice-candidate', async ({ candidate }) => {
            if (isRemoteDescriptionSet) {
                await pc!.addIceCandidate(new RTCIceCandidate(candidate));
            } else {
                iceCandidatesQueue.push(new RTCIceCandidate(candidate));
            }
        });

        pc.ondatachannel = (e) => {
            if (!isInitiator) {
                dataChannel = e.channel;
                setDataChannelHandlers(dataChannel);
            }
            resolve({ dataChannel: dataChannel!, userId, connectedUserId });
        };
    });
};
