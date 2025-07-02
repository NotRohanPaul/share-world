import {
    useState
} from "react";
import { useSenderInputs } from "./useSenderInputs";
import { useSenderSocket } from "./useSenderSocket";


export const useSender = () => {
    const [error, setError] = useState<string | null>(null);

    const {
        userId,
        receiverId,
        socketRef
    } = useSenderSocket(error, setError);

    const {
        fileList,
        receiverIdInput,
        isSuccessConnecting,
        handleReceiverIdInput,
        handleFileChange,
        handleSendClick,
        handleInputEnter,
        handleConnectClick
    } = useSenderInputs(
        userId,
        receiverId,
        setError,
        socketRef
    );

    return {
        userId,
        receiverId,
        receiverIdInput,
        isSuccessConnecting,
        error,
        fileList,
        handleReceiverIdInput,
        handleFileChange,
        handleSendClick,
        handleInputEnter,
        handleConnectClick
    };
};