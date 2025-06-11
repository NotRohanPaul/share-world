import { startSocket } from "@src/sockets/start-socket";
import { useRef, useState } from 'react';
import { FilesInput } from "../ui/files-input";
import { AppIcons } from "@src/assets";

export const Main = () => {
    const [userId, setUserId] = useState('');
    const [connectedUserId, setConnectedUserId] = useState('');
    const [isConnecting, setIsConnecting] = useState(false);

    const dataChannel = useRef<RTCDataChannel | null>(null);

    const handleStartConnection = async () => {
        setIsConnecting(true);
        const returnedItems = await startSocket();
        if (returnedItems === undefined) return;
        dataChannel.current = returnedItems.dataChannel;
        setUserId(returnedItems.userId);
        setConnectedUserId(returnedItems.connectedUserId);
        setIsConnecting(false);
    };

    return (
        <main className="flex flex-col gap-2 items-center justify-center">
            <section className="flex gap-2">
                <button
                    className="w-[10rem] h-[10rem] flex flex-col items-center justify-center text-2xl font-bold border-5 border-primary p-2 rounded-md bg-white text-primary transition-colors hover:bg-primary hover:text-white overflow-hidden"
                    onPointerDown={handleStartConnection}
                >
                    <AppIcons.Send className="w-[3rem] h-[3rem]" />
                    Send
                </button>
                <button
                    className="w-[10rem] h-[10rem] flex flex-col items-center justify-center text-2xl font-bold border-5 border-primary p-2 rounded-md bg-white text-primary transition-colors hover:bg-primary hover:text-white overflow-hidden"
                    onPointerDown={handleStartConnection}
                >
                    <AppIcons.Receive className="w-[3rem] h-[3rem]" />
                    Receive
                </button>
            </section>
            <section
                className="flex flex-col gap-2 items-center justify-center"
            >
                {isConnecting === false ? (
                    <>
                        <section className="w-[300px] flex flex-col gap-2 bg-primary text-white p-2">
                            <div className="w-fit">User ID: {userId}</div>
                            <div className="w-fit">Connected User ID: {connectedUserId}</div>
                        </section>
                        <section className="grid grid-cols-[repeat(1,200px)] grid-rows-[repeat(1,150px)] gap-2 p-2 [&>*]:w-full [&>*]:h-full [&>*]:bg-gray-600 [&>*]:text-white [&>*]:p-2 [&>*]:flex [&>*]:justify-center [&>*]:items-center [&>*]:text-2xl">
                            <FilesInput dataChannel={dataChannel} />
                        </section>
                    </>
                ) : (
                    <p className="font-bold text-2xl text-primary">
                        Connecting...
                    </p>
                )}
            </section>
        </main>
    );
};
