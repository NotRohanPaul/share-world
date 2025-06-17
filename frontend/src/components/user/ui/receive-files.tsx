import { socketInstance } from "@src/sockets/socket-instance";
import { useEffect, useState } from "react";

export const ReceiveFiles = () => {
    const [userId, setUserId] = useState<string | null>(null);
    const [senderId, setSenderId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const socket = socketInstance.connect();
        console.log("hello");
        console.log(userId);
        socket.on("user-id-client", ({ userId }: { userId: string; }) => {
            setUserId(userId);
        });
        socket.on("pair-failed-client", ({ message }: { message: string; }) => {
            setError(message);
        });
        socket.on("paired-receiver-client", ({ from }: { from: string; }) => {
            setSenderId(from);
        });

    }, []);

    return (
        <section>
            <p>Your User ID: {userId}</p>
            {senderId === null ?
                <p>Connecting</p>
                :
                <p>Send User ID: {senderId}</p>
            }
            {error && <p>Error: {error}</p>}
        </section>
    );
};