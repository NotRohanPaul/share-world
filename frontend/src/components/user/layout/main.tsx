import { API_ORIGIN } from '@src/constants/env';
import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

export const Main = () => {
    const pc = useRef<RTCPeerConnection | null>(null);
    const dataChannel = useRef<RTCDataChannel | null>(null);
    const fileReader = useRef<FileReader | null>(null);
    const receiveBuffer = useRef<Uint8Array[]>([]);
    const receivedSize = useRef(0);
    const incomingFileSize = useRef(0);
    const incomingFileName = useRef('');

    const socket = io(API_ORIGIN, {
        path: '/socket/v1',
    });

    useEffect(() => {
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
    }, []);

    const CHUNK_SIZE = 16 * 1024;

    const sendFile = (file: File) => {
        if (!dataChannel.current || dataChannel.current.readyState !== 'open') {
            return;
        }

        dataChannel.current.send(
            JSON.stringify({
                type: 'file-meta',
                name: file.name,
                size: file.size,
            })
        );

        let offset = 0;
        fileReader.current = new FileReader();

        fileReader.current.onload = (e) => {
            if (e.target?.result && dataChannel.current) {
                dataChannel.current.send(e.target.result as ArrayBuffer);
                offset += (e.target.result as ArrayBuffer).byteLength;

                if (offset < file.size) {
                    readSlice(offset);
                }
            }
        };

        const readSlice = (o: number) => {
            const slice = file.slice(o, o + CHUNK_SIZE);
            fileReader.current?.readAsArrayBuffer(slice);
        };

        readSlice(0);
    };

    return (
        <main>
            <div>Main - WebRTC File Sharing</div>
            <label htmlFor="file-input">Upload File: </label>
            <input
                type="file"
                name="file"
                id="file-input"
                onChange={(e) => {
                    if (e.target.files?.length) {
                        sendFile(e.target.files[0]);
                    }
                }}
            />
        </main>
    );
};
