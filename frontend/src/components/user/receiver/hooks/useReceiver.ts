import { useEffect, useState } from "react";
import { useReceiverSocket } from "./useReceiverSocket";
import { useReceiverWebRTC } from "./useReceiverWebRTC";


export const useReceiver = () => {
    const {
        userId,
        senderId,
        error,
    } = useReceiverSocket();
    const { dataChannel } = useReceiverWebRTC(senderId ?? "");
    const [fileList, setFileList] = useState<FileList | null>(null);

    useEffect(() => {
        if (!dataChannel) return;

        const receivedChunks: Uint8Array[] = [];

        dataChannel.onmessage = (event) => {
            if (typeof event.data === "string" && event.data === "_METADATA_END_") {
                const totalLength = receivedChunks.reduce((acc, chunk) => acc + chunk.length, 0);
                const combined = new Uint8Array(totalLength);
                let offset = 0;
                for (const chunk of receivedChunks) {
                    combined.set(chunk, offset);
                    offset += chunk.length;
                }

                const decoder = new TextDecoder();
                const metadataJSON = decoder.decode(combined);

                try {
                    const parsedMetadata = JSON.parse(metadataJSON);
                    console.log("📥 Received Metadata:", parsedMetadata);
                    setFileList(parsedMetadata);
                } catch (err) {
                    console.error("❌ Failed to parse metadata", err);
                }

                receivedChunks.length = 0;
            } else if (event.data instanceof ArrayBuffer) {
                receivedChunks.push(new Uint8Array(event.data));
            } else if (event.data instanceof Blob) {
                event.data.arrayBuffer().then(buffer => {
                    receivedChunks.push(new Uint8Array(buffer));
                });
            }
        };
    }, [dataChannel]);



    return {
        userId,
        senderId,
        error,
        fileList
    };
};