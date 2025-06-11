import { API_ORIGIN } from "@src/constants/env";
import { io } from "socket.io-client";


export const startSocket = async (): Promise<{
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

    const socket = io(API_ORIGIN, {
        path: '/socket/v1',
    });

    pc = new RTCPeerConnection({
        iceServers: [{ urls: ['stun:stun.l.google.com:19302'] }],
    });
    dataChannel = pc.createDataChannel('fileTransfer');

    dataChannel.onopen = () => {
        console.log('Data channel opened');
    };

    dataChannel.onmessage = (event) => {
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
                const received = new Blob(receiveBuffer);
                const url = URL.createObjectURL(received);

                const a = document.createElement('a');
                a.href = url;
                a.download = incomingFileName;
                document.body.appendChild(a);
                a.click();
                a.remove();
                URL.revokeObjectURL(url);
            }
        }
    };

    pc.onicecandidate = (event) => {
        if (event.candidate) {
            socket.emit('ice-candidate', event.candidate);
        }
    };

    pc.ondatachannel = (event) => {
        const receiveChannel = event.channel;
        receiveChannel.onmessage = (msgEvent) => {
            if (typeof msgEvent.data === 'string') {
                const message = JSON.parse(msgEvent.data);
                if (message.type === 'file-meta') {
                    incomingFileName = message.name;
                    incomingFileSize = message.size;
                    receiveBuffer = [];
                    receivedSize = 0;
                }
            } else {
                receiveBuffer.push(new Uint8Array(msgEvent.data));
                receivedSize += msgEvent.data.byteLength;

                if (receivedSize === incomingFileSize) {
                    const received = new Blob(receiveBuffer);
                    const url = URL.createObjectURL(received);

                    const a = document.createElement('a');
                    a.href = url;
                    a.download = incomingFileName;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    URL.revokeObjectURL(url);
                }
            }
        };
    };

    socket.on('offer', async (offer) => {
        if (!pc) return;
        await pc.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socket.emit('answer', answer);
    });

    socket.on('answer', async (answer) => {
        if (!pc) return;
        await pc.setRemoteDescription(new RTCSessionDescription(answer));
    });

    socket.on('ice-candidate', async (candidate) => {
        if (!pc) return;
        try {
            await pc.addIceCandidate(new RTCIceCandidate(candidate));
        } catch (e) {
            console.error('Error adding received ice candidate', e);
        }
    });

    socket.on('user-id', (id) => {
        userId = id;
    });

    socket.on('connected-user-id', (id) => {
        connectedUserId = id;
    });


    if (!pc) return;
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    socket.emit('offer', offer);

    // return () => {
    //     pc?.close();
    //     socket.off('offer');
    //     socket.off('answer');
    //     socket.off('ice-candidate');
    // };

    return {
        dataChannel,
        userId,
        connectedUserId,
    };
};