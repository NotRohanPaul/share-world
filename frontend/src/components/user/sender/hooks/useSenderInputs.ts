import { useEffect, useState, type ChangeEvent, type Dispatch, type KeyboardEvent, type MutableRefObject, type SetStateAction } from "react";
import type { Socket } from "socket.io-client";
import type { FileListType, MetadataType } from "../../types";
import { useSenderWebRTC } from "./useSenderWebRTC";

export const useSenderInputs = (
    userId: string | null,
    receiverId: string | null,
    setError: Dispatch<SetStateAction<string | null>>,
    socketRef: MutableRefObject<Socket | null>,
) => {
    const [fileList, setFileList] = useState<FileListType>([]);
    const [receiverIdInput, setReceiverIdInput] = useState<string | null>(null);
    const [isSuccessConnecting, setIsSuccessConnecting] = useState(false);

    const { dataChannel } = useSenderWebRTC(receiverId);

    useEffect(() => {
        if (dataChannel === null) return;

        dataChannel.onopen = () => {
            setIsSuccessConnecting(true);
        };
    }, [dataChannel]);

    const handleReceiverIdInput = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target;
        setReceiverIdInput(target.value);
    };
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = e.target.files;
            const filesList = [...files];

            const additionalFilesList: FileListType = await Promise.all(filesList.map(async (file) => {
                return {
                    id: crypto.randomUUID(),
                    metadata: {
                        name: file.name,
                        type: file.type,
                        size: file.size,
                    },
                    state: "pending",
                    data: file
                };
            }));

            setFileList((prev) => [...prev, ...additionalFilesList]);
            e.target.value = "";
        }
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

    const handleInputEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleConnectClick();
        }
    };

    const handleSendClick = () => {
        if (!fileList || !dataChannel || dataChannel.readyState !== "open") {
            setError("No file or DataChannel is not open");
            console.log("No file or DataChannel is not open", { fileList }, dataChannel?.readyState);
            return;
        }

        const metadataList: MetadataType = [];
        for (let i = 0; i < fileList.length; i++) {
            const file = fileList[i];
            metadataList.push({ id: file.id, ...file.metadata });
        }
        const metadataStr = JSON.stringify(metadataList);
        const encoder = new TextEncoder();
        console.log({ encoder });
        const encodedMetadata = encoder.encode(metadataStr);
        console.log({ encodedMetadata });

        const chunkSize = 8000;
        for (let offset = 0; offset < encodedMetadata.length; offset += chunkSize) {
            const chunk = encodedMetadata.slice(offset, offset + chunkSize);
            console.log({ chunk });
            dataChannel.send(chunk);
        }

        dataChannel.send("_METADATA_END_");
        console.log("📤 Metadata sent");

        const sendFileChunks = async (file: FileListType[number]) => {
            const chunkSize = 16000;
            let sentChunksSize = 0;
            for (let offset = 0; offset < file.metadata.size; offset += chunkSize) {
                console.log(offset, file.metadata.size);
                if (file.data === undefined) {
                    console.log("No File Data");
                    return;
                }
                const chunk = file.data.slice(offset, offset + chunkSize);
                sentChunksSize += chunk.size;
                const buffer = await chunk.arrayBuffer();
                dataChannel.send(buffer);

                const precent = ((sentChunksSize / file.metadata.size) * 100).toFixed(1);
                console.log({ precent });
                setFileList((prev) => prev.map(f => f.id === file.id ? { ...f, percentage: precent } : f));
            }

            dataChannel.send("_FILE_END_");
            setFileList((prev) => prev.map(f => f.id === file.id ? { ...f, state: "done" } : f));
            console.log("📤 File sent");
        };

        (async () => {
            for (let i = 0; i < fileList.length; i++) {
                const file = fileList[i];
                dataChannel.send(`_FILE_ID_${file.id}`);
                setFileList((prev) => prev.map(f => f.id === file.id ? { ...f, state: "processing" } : f));
                await sendFileChunks(file);
            }
        })();

    };

    return {
        fileList,
        receiverIdInput,
        isSuccessConnecting,
        handleReceiverIdInput,
        handleConnectClick,
        handleFileChange,
        handleSendClick,
        handleInputEnter
    };
};