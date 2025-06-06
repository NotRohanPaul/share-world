import { API_ORIGIN } from '@src/constants/env';
import { useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { FilesInput } from "../ui/files-input";

export const Main = () => {
    const pc = useRef<RTCPeerConnection | null>(null);
    const dataChannel = useRef<RTCDataChannel | null>(null);
    const receiveBuffer = useRef<Uint8Array[]>([]);
    const receivedSize = useRef(0);
    const incomingFileSize = useRef(0);
    const incomingFileName = useRef('');

    const [userId, setUserId] = useState('');
    const [connectedUserId, setConnectedUserId] = useState('');
    const socketRef = useRef<any>(null);

    const handleStartConnection = () => {
        const socket = io(API_ORIGIN, {
            path: '/socket/v1',
        });
        socketRef.current = socket;

        pc.current = new RTCPeerConnection({
            iceServers: [{ urls: ['stun:stun.l.google.com:19302'] }],
        });
        dataChannel.current = pc.current.createDataChannel('fileTransfer');

        dataChannel.current.onopen = () => {
            console.log('Data channel opened');
        };

        dataChannel.current.onmessage = (event) => {
            if (typeof event.data === 'string') {
                const message = JSON.parse(event.data);
                if (message.type === 'file-meta') {
                    incomingFileName.current = message.name;
                    incomingFileSize.current = message.size;
                    receiveBuffer.current = [];
                    receivedSize.current = 0;
                }
            } else {
                receiveBuffer.current.push(new Uint8Array(event.data));
                receivedSize.current += event.data.byteLength;

                if (receivedSize.current === incomingFileSize.current) {
                    const received = new Blob(receiveBuffer.current);
                    const url = URL.createObjectURL(received);

                    const a = document.createElement('a');
                    a.href = url;
                    a.download = incomingFileName.current;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    URL.revokeObjectURL(url);
                }
            }
        };

        pc.current.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit('ice-candidate', event.candidate);
            }
        };

        pc.current.ondatachannel = (event) => {
            const receiveChannel = event.channel;
            receiveChannel.onmessage = (msgEvent) => {
                if (typeof msgEvent.data === 'string') {
                    const message = JSON.parse(msgEvent.data);
                    if (message.type === 'file-meta') {
                        incomingFileName.current = message.name;
                        incomingFileSize.current = message.size;
                        receiveBuffer.current = [];
                        receivedSize.current = 0;
                    }
                } else {
                    receiveBuffer.current.push(new Uint8Array(msgEvent.data));
                    receivedSize.current += msgEvent.data.byteLength;

                    if (receivedSize.current === incomingFileSize.current) {
                        const received = new Blob(receiveBuffer.current);
                        const url = URL.createObjectURL(received);

                        const a = document.createElement('a');
                        a.href = url;
                        a.download = incomingFileName.current;
                        document.body.appendChild(a);
                        a.click();
                        a.remove();
                        URL.revokeObjectURL(url);
                    }
                }
            };
        };

        socket.on('offer', async (offer) => {
            if (!pc.current) return;
            await pc.current.setRemoteDescription(new RTCSessionDescription(offer));
            const answer = await pc.current.createAnswer();
            await pc.current.setLocalDescription(answer);
            socket.emit('answer', answer);
        });

        socket.on('answer', async (answer) => {
            if (!pc.current) return;
            await pc.current.setRemoteDescription(new RTCSessionDescription(answer));
        });

        socket.on('ice-candidate', async (candidate) => {
            if (!pc.current) return;
            try {
                await pc.current.addIceCandidate(new RTCIceCandidate(candidate));
            } catch (e) {
                console.error('Error adding received ice candidate', e);
            }
        });

        socket.on('user-id', (id) => {
            setUserId(id);
        });

        socket.on('connected-user-id', (id) => {
            setConnectedUserId(id);
        });


        const startConnection = async () => {
            if (!pc.current) return;
            const offer = await pc.current.createOffer();
            await pc.current.setLocalDescription(offer);
            socket.emit('offer', offer);
        };

        startConnection();

        return () => {
            pc.current?.close();
            socket.off('offer');
            socket.off('answer');
            socket.off('ice-candidate');
        };
    };

    return (
        <main className="flex flex-col gap-2 items-center justify-center">
            <button
                className="w-fit bg-primary text-white p-2 rounded-md"
                onPointerDown={handleStartConnection}
            >
                Start Connection
            </button>
            <section className="w-[300px] flex flex-col gap-2 bg-primary text-white p-2">
                <div className="w-fit">User ID: {userId}</div>
                <div className="w-fit">Connected User ID: {connectedUserId}</div>
            </section>
            <section className="grid grid-cols-[repeat(1,200px)] grid-rows-[repeat(1,150px)] gap-2 p-2 [&>*]:w-full [&>*]:h-full [&>*]:bg-gray-600 [&>*]:text-white [&>*]:p-2 [&>*]:flex [&>*]:justify-center [&>*]:items-center [&>*]:text-2xl">
                <FilesInput dataChannel={dataChannel} />
            </section>
        </main>
    );
};
