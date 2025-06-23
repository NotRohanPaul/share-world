import { socketInstance } from "@src/sockets/socket-instance";
import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react";
import type { Socket } from "socket.io-client";


export const useSenderSocket = (
    error: string | null,
    setError: Dispatch<SetStateAction<string | null>>
) => {
    const [userId, setUserId] = useState<string | null>(null);
    const [receiverId, setReceiverId] = useState<string | null>(null);

    const socketRef = useRef<Socket | null>(null);

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

    return {
        userId,
        receiverId,
        error,
        setError,
        socketRef
    };
};