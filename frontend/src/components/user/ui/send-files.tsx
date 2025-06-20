import { socketInstance } from "@src/sockets/socket-instance";
import { useEffect, useRef, useState, type ChangeEvent, type KeyboardEvent } from "react";
import type { Socket } from "socket.io-client";
import { useSenderWebRTC } from "../hooks/useSenderWebRTC";
import { UserId } from "./other/user-id";

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
    const handleFileSend = () => {
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

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleConnect();
        }
    };

    return (
        <section className="flex flex-col gap-2">
            <UserId userId={userId} peerType="sender" />
            {isSuccessConnecting === false ? (
                <>
                    <div className="flex gap-2 text-lg">
                        <label
                            htmlFor="receiver-input"
                            className="font-bold"
                        >
                            Enter Receiver's ID:
                        </label>
                        <input
                            className="w-25 outline outline-primary rounded-full caret-primary px-3 py-.5 focus:outline-2"
                            id="receiver-input"
                            type="text"
                            name="receiver"
                            value={receiverIdInput ?? ""}
                            onChange={handleInput}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                    <button onClick={handleConnect}>Connect</button>
                </>
            ) : (
                <>
                    <p>Receiver's ID: {receiverId}</p>
                    {<input
                        id="input-file"
                        type="file"
                        onChange={handleFileChange}
                    />
                    }
                    <button onClick={handleFileSend}>Send File</button>
                </>
            )}
            {error && <p className="text-orange-500">Error: {error}</p>}
        </section>
    );
};;