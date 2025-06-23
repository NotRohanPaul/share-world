import { useEffect, useState, type ChangeEvent, type Dispatch, type KeyboardEvent, type MutableRefObject, type SetStateAction } from "react";
import type { Socket } from "socket.io-client";
import { useSenderWebRTC } from "./useSenderWebRTC";

export const useSenderInputs = (
    userId: string | null,
    receiverId: string | null,
    setError: Dispatch<SetStateAction<string | null>>,
    socketRef: MutableRefObject<Socket | null>,
) => {
    const [fileList, setFileList] = useState<FileList | null>(null);
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
            setFileList(e.target.files);
        }
    };
    const handleSendClick = () => {
        if (!fileList || !dataChannel || dataChannel.readyState !== "open") {
            setError("No file or DataChannel is not open");
            console.log("No file or DataChannel is not open", { fileList }, dataChannel?.readyState);
            return;
        }

        const metadataList = [];

        for (let i = 0; i < fileList.length; i++) {
            const file = fileList[i];
            metadataList.push({
                name: file.name,
                size: file.size,
                type: file.type,
            });
        }
        console.log({ metadataList });

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
    };

    const handleInputEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleConnectClick();
        }
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