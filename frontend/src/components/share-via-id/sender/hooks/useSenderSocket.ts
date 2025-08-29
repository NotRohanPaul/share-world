import { shareViaIdSocketInstance } from "@src/sockets/socket-instances";
import type { ShareViaIDEventsType } from "@src/sockets/types/namespace/share-via-id-types";
import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react";


export const useSenderSocket = (
    error: string | null,
    setError: Dispatch<SetStateAction<string | null>>
) => {
    const [userId, setUserId] = useState<string | null>(null);
    const [receiverId, setReceiverId] = useState<string | null>(null);

    const socketRef = useRef<ShareViaIDEventsType | null>(null);

    useEffect(() => {
        const socket = shareViaIdSocketInstance.connect();
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

    }, [setError]);

    return {
        userId,
        receiverId,
        error,
        setError,
        socketRef
    };
};