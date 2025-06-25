import { useEffect, useState } from "react";
import { useReceiverSocket } from "./useReceiverSocket";
import { useReceiverWebRTC } from "./useReceiverWebRTC";
import type { FileListType, MetadataType } from "../../types";
import { appLogger } from "@src/utils/common";


export const useReceiver = () => {
    const {
        userId,
        senderId,
        error,
    } = useReceiverSocket();
    const { dataChannel } = useReceiverWebRTC(senderId);
    const [fileList, setFileList] = useState<FileListType>([]);

    useEffect(() => {
        if (!dataChannel) return;

        let parsedMetadata: MetadataType = [];

        const receivedChunks: Uint8Array[] = [];
        let currentFileId: string | null = null;
        let isMetadataReceived = false;
        let currentFileSize = 0;

        dataChannel.onmessage = (event): void => {
            if (!isMetadataReceived) {
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
                        parsedMetadata = JSON.parse(metadataJSON);
                        appLogger.log("📥 Metadata parsed:", parsedMetadata);
                        isMetadataReceived = true;
                        setFileList((prev) => {
                            const additionalFileListWithState: FileListType = parsedMetadata.map((metadata) => {
                                return {
                                    id: metadata.id,
                                    metadata: { ...metadata },
                                    state: "pending"
                                };
                            });

                            return [...prev, ...additionalFileListWithState];
                        });
                    } catch (err) {
                        appLogger.error("❌ Failed to parse metadata", err);
                    } finally {
                        receivedChunks.length = 0;
                    }
                    return;
                }

                if (event.data instanceof ArrayBuffer) {
                    receivedChunks.push(new Uint8Array(event.data));
                }

                return;
            }
            if (typeof event.data === "string" && event.data.startsWith("_FILE_ID_")) {
                currentFileId = event.data.slice("_FILE_ID_".length);
                currentFileSize = 0;
                receivedChunks.length = 0;
                return;
            }

            if (event.data instanceof ArrayBuffer) {
                const chunk = new Uint8Array(event.data);
                receivedChunks.push(chunk);
                currentFileSize += chunk.length;

                if (currentFileId === null) return;
                const metaIndex = parsedMetadata.findIndex(m => m.id === currentFileId);
                const meta = parsedMetadata[metaIndex];
                const percent = ((currentFileSize / meta.size) * 100).toFixed(1);
                appLogger.log(`📦 Receiving "${meta.name}" — ${percent}%`);
                setFileList((prev) =>
                    prev.map((f) =>
                        f.id === meta.id && f.state !== "done"
                            ? { ...f, state: "processing", percentage: percent }
                            : f
                    )
                );
                return;
            }

            if (typeof event.data === "string" && event.data === "_FILE_END_") {
                if (!currentFileId) return;

                const meta = parsedMetadata.find((m) => m.id === currentFileId);
                if (!meta) return;
                const totalLength = receivedChunks.reduce((acc, chunk) => acc + chunk.length, 0);
                const combined = new Uint8Array(totalLength);

                let offset = 0;
                for (const chunk of receivedChunks) {
                    combined.set(chunk, offset);
                    offset += chunk.length;
                }

                const blob = new Blob([combined], { type: meta.type });
                const file = new File([blob], meta.name, { type: meta.type });

                setFileList((prev) =>
                    prev.map((f) =>
                        f.id === meta.id
                            ? { ...f, state: "done", data: file }
                            : f
                    )
                );
                appLogger.log("✅ File received: ", currentFileId, file.name);

                currentFileId = null;
                currentFileSize = 0;
                receivedChunks.length = 0;

                if (fileList.length === parsedMetadata.length) {
                    appLogger.log("🎉 All files received");
                }

                return;
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