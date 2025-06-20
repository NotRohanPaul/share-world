import { useEffect, useRef, useState, type ChangeEvent, type KeyboardEvent } from "react";
import { useSenderWebRTC } from "./useSenderWebRTC";
import type { Socket } from "socket.io-client";
import { socketInstance } from "@src/sockets/socket-instance";


export const useSender = () => {
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

    const handleReceiverIdInput = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target;
        setReceiverIdInput(target.value);
    };

    const handleConnectClick = () => {
        if (receiverIdInput === null || socketRef.current === null)
            return setError("No receiverId or socket");

        if (receiverIdInput === userId)
            return setError("You cant use your own userId as receiverId");

        console.log({ receiverIdInput });
        socketRef.current.emit(
            "pair-request-server",
            { to: receiverIdInput }
        );
        setError(null);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };
    const handleSendClick = () => {
        if (!file || !dataChannel || dataChannel.readyState !== "open") {
            console.log("No file or DataChannel is not open", { file }, dataChannel?.readyState);
            return;
        }

        const reader = new FileReader();

        reader.onload = () => {
            const arrayBuffer = reader.result as ArrayBuffer;
            const chunkSize = 16 * 1024;
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

                setTimeout(sendChunk, 10);
            };


            dataChannel.bufferedAmountLowThreshold = 1 * 1024 * 1024;
            sendChunk();
        };

        reader.readAsArrayBuffer(file);
    };

    const handleInputEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleConnectClick();
        }
    };

    return {
        userId,
        receiverId,
        receiverIdInput,
        isSuccessConnecting,
        error,
        handleReceiverIdInput,
        handleFileChange,
        handleSendClick,
        handleInputEnter,
        handleConnectClick
    };
};