import { socketInstance } from "@src/sockets/socket-instance";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import type { Socket } from "socket.io-client";
import { useSenderWebRTC } from "../hooks/useSenderWebRTC";

export const SendFiles = () => {
    const [file, setFile] = useState<File | null>(null);

    const [userId, setUserId] = useState<string | null>(null);
    const [receiverIdInput, setReceiverIdInput] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [receiverId, setReceiverId] = useState<string | null>(null);
    const [isSuccessConnecting, setIsSuccessConnecting] = useState(false);

    const { dataChannel } = useSenderWebRTC(receiverId ?? "");
    const socketRef = useRef<Socket | null>(null);
    useEffect(() => {
        if (dataChannel === null) return;

        dataChannel.onopen = () => {
            setIsSuccessConnecting(true);
        };
    }, [dataChannel]);

    useEffect(() => {
        const socket = socketInstance.connect();
        socketRef.current = socket;
        socket.on("user-id-client", ({ userId }: { userId: string; }) => {
            setUserId(userId);
        });
        socket.on("paired-sender-client", ({ to }: { to: string; }) => {
            setReceiverId(to);
        });
        socket.on("pair-failed-client", ({ message }: { message: string; }) => {
            setError(message);
        });

        return () => {
            socket.disconnect();
        };

    }, []);

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target;
        setReceiverIdInput(target.value);
    };

    const handleConnect = () => {
        if (receiverIdInput === null || socketRef.current === null)
            return console.log("No receiverId or socket");

        socketRef.current.emit("pair-request-server", { to: receiverIdInput });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };
    const handleFileSend = () => {
        if (!file || !dataChannel || dataChannel.readyState !== "open") {
            console.log("No file or DataChannel is not open", { file }, dataChannel?.readyState);
            return;
        }

        const reader = new FileReader();

        reader.onload = () => {
            const arrayBuffer = reader.result as ArrayBuffer;
            const chunkSize = 16 * 1024; // 16 KB
            let offset = 0;

            const sendChunk = () => {
                if (
                    offset >= arrayBuffer.byteLength
                ) {
                    dataChannel.send("_END_");
                    console.log("📤 File sent:", file.name);
                    return;
                }

                if (dataChannel.bufferedAmount < dataChannel.bufferedAmountLowThreshold) {
                    const chunk = arrayBuffer.slice(offset, offset + chunkSize);
                    dataChannel.send(chunk);
                    offset += chunkSize;
                }

                setTimeout(sendChunk, 10); // ~10ms throttle to avoid flooding
            };


            dataChannel.bufferedAmountLowThreshold = 1 * 1024 * 1024; // 1MB
            sendChunk();
        };

        reader.readAsArrayBuffer(file);
    };


    return (
        <section>
            <p>Your User ID: {userId}</p>
            {isSuccessConnecting ? (
                <div>
                    <p>Receiver Connected ID: {receiverId}</p>
                    {<input id="input-file" type="file" onChange={handleFileChange} />}
                    <button onClick={handleFileSend}>Send File</button>
                </div>
            ) : (
                <div>
                    <label htmlFor="receiver-input">Receiver Id</label>
                    <input type="text" name="receiver" id="receiver-input" value={receiverIdInput ?? ""} onChange={handleInput} />
                    <button onClick={handleConnect}>Connect</button>
                </div>
            )}
            {error && <p>Error: {error}</p>}
        </section>
    );
};