import { socketInstance } from "@src/sockets/socket-instance";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import type { Socket } from "socket.io-client";

export const SendFiles = () => {
    const [userId, setUserId] = useState<string | null>(null);
    const [receiverIdInput, setReceiverIdInput] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const socketRef = useRef<Socket | null>(null);


    useEffect(() => {
        const socket = socketInstance.connect();
        socketRef.current = socket;
        socket.on("user-id-client", ({ userId }: { userId: string; }) => {
            setUserId(userId);
        });
        socket.on("paired-sender-client", ({ to }: { to: string; }) => {
            setSuccess(to);
        });
        socket.on("pair-failed-client", ({ message }: { message: string; }) => {
            setError(message);
        });

        return () => {
            socket.disconnect();
        };

    }, []);

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target;
        setReceiverIdInput(target.value);
    };

    const handleConnect = () => {
        if (receiverIdInput === null || socketRef.current === null)
            return void alert("No receiverId or socket");

        socketRef.current.emit("pair-request-server", { to: receiverIdInput });
    };

    return (
        <section>
            <p>Your User ID: {userId}</p>
            {success ?
                <p>Receiver Connected ID: {success}</p> :
                <div>
                    <label htmlFor="receiver-input">Receiver Id</label>
                    <input type="text" name="receiver" id="receiver-input" value={receiverIdInput ?? ""} onChange={handleInput} />
                    <button onClick={handleConnect}>Connect</button>
                </div>
            }
            {error && <p>Error: {error}</p>}
        </section>
    );
};