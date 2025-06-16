import { startSocket } from "@src/sockets/start-socket";
import { useEffect, useRef, useState } from 'react';
import { FilesInput } from "./files-input";
import type { ActionType } from "../types";

export const SendAndReceiveFiles = ({ action }: { action: ActionType; }) => {
    const dataChannel = useRef<RTCDataChannel | null>(null);
    const [userId, setUserId] = useState('');
    const [connectedUserId, setConnectedUserId] = useState('');
    const [inputReceiverId, setInputReceiverId] = useState('');
    const [hasConnected, setHasConnected] = useState(false);

    useEffect(() => {
        const initReceiver = async () => {
            console.log("test");
            if (action === "Receive") {
                const returned = await startSocket(null, "Receive");
                console.log(returned);
                if (returned) {
                    dataChannel.current = returned.dataChannel;
                    setUserId(returned.userId);
                    setConnectedUserId(returned.connectedUserId);
                    setHasConnected(true);
                }
            }
        };

        initReceiver();
    }, []);


    const handleConnect = async () => {
        const returned = await startSocket(inputReceiverId.trim(), action);
        console.log("hello");
        if (returned) {
            dataChannel.current = returned.dataChannel;
            setUserId(returned.userId);
            setConnectedUserId(returned.connectedUserId);
            setHasConnected(true);
        }
    };

    return (
        <section className="flex flex-col gap-2 items-center justify-center">
            {!hasConnected ? (
                action === 'Send' ? (
                    <div className="flex flex-col gap-2">
                        <p>Your User ID: {userId}</p>
                        <input
                            type="text"
                            placeholder="Enter Receiver ID"
                            value={inputReceiverId}
                            onChange={(e) => setInputReceiverId(e.target.value)}
                            className="border p-2"
                        />
                        <button onClick={handleConnect} className="bg-blue-500 text-white p-2">Connect</button>
                    </div>
                ) : (
                    <>
                        <p>Your User ID: {userId}</p>
                        <p className="text-lg font-semibold">Waiting for sender to connect...</p>
                    </>
                )
            ) : (
                <>
                    <section className="w-[300px] flex flex-col gap-2 bg-primary text-white p-2">
                        <div className="w-fit">Your User ID: {userId}</div>
                        <div className="w-fit">Connected User ID: {connectedUserId}</div>
                    </section>
                    {action === 'Send' && (
                        <section className="grid grid-cols-[repeat(1,200px)] grid-rows-[repeat(1,150px)] gap-2 p-2">
                            <FilesInput dataChannel={dataChannel} />
                        </section>
                    )}
                </>
            )}
        </section>
    );
};