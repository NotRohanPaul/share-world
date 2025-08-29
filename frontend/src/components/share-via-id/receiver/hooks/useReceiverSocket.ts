import { shareViaIdSocketInstance } from "@src/sockets/socket-instances";
import { useEffect, useState } from "react";


export const useReceiverSocket = () => {

    const [userId, setUserId] = useState<string | null>(null);
    const [senderId, setSenderId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const socket = shareViaIdSocketInstance.connect();
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
    return {
        userId,
        senderId,
        error,

    };
};