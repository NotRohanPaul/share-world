import { socketInstance } from "@src/sockets/socket-instance";
import { useEffect, useState } from "react";
import { useReceiverWebRTC } from "../hooks/useReceiverWebRTC";
import { UserId } from "./other/user-id";

export const ReceiveFiles = () => {
    const [userId, setUserId] = useState<string | null>(null);
    const [senderId, setSenderId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { dataChannel } = useReceiverWebRTC(senderId ?? "");

    useEffect(() => {
        if (!dataChannel) return;

        const receivedChunks: BlobPart[] = [];

        dataChannel.onmessage = (event) => {
            if (typeof event.data === "string" && event.data === "_END_") {
                console.log(event.data);
                const blob = new Blob(receivedChunks);
                const downloadUrl = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = downloadUrl;
                a.download = "received_file";
                a.click();
                console.log("📥 File received");
                receivedChunks.length = 0;
            } else {
                receivedChunks.push(event.data);
                console.count(event.data);
                console.log(dataChannel.readyState);
            }
        };
    }, [dataChannel]);


    useEffect(() => {
        const socket = socketInstance.connect();
        socket.on("user-id-client", ({ userId }: { userId: string; }) => {
            setUserId(userId);
        });
        socket.on("paired-receiver-client", ({ from }: { from: string; }) => {
            setSenderId(from);
        });
        socket.on("pair-failed-client", ({ message }: { message: string; }) => {
            setError(message);
        });

        return () => {
            socket.disconnect();
        };

    }, []);

    return (
        <section>
            <UserId userId={userId} peerType="receiver" />
            {senderId === null ?
                <p className="font-semibold">Share this ID with the Sender</p>
                :
                <p>Send User ID: {senderId}</p>
            }
            {error && <p>Error: {error}</p>}
        </section>
    );
};