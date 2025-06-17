import { socketInstance } from "@src/sockets/socket-instance";
import { useEffect, useState, type ChangeEvent } from "react";

const socket = socketInstance.connect();
export const SendFiles = () => {
    const [userId, setUserId] = useState<string | null>(null);
    const [receiverIdInput, setReceiverIdInput] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    useEffect(() => {
        socket.on("user-id-client", ({ userId }: { userId: string; }) => {
            setUserId(userId);
        });
        socket.on("pair-failed-client", ({ message }: { message: string; }) => {
            setError(message);
        });
        socket.on("paired-sender-client", ({ to }: { to: string; }) => {
            setSuccess(to);
        });

    }, []);

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target;
        setReceiverIdInput(target.value);
    };

    const handleConnect = () => {
        if (receiverIdInput === null)
            return void alert("No receiverId");

        socket.emit("pair-request-server", { to: receiverIdInput });
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