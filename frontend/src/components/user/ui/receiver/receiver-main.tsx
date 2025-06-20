import { AppIcons } from "@src/assets";
import { useReceiver } from "../../hooks/useReceiver";
import { UserId } from "../common/user-id";
import { SenderId } from "./sender-id";

export const ReceiverMain = () => {
    const {
        userId,
        senderId,
        error
    } = useReceiver();

    return (
        <section className="h-full grid grid-rows-3">
            <header className="self-center justify-self-center flex gap-2">
                <AppIcons.Receive className="w-[3rem] h-[3rem] relative -bottom-1" />
                <h1 className="text-5xl font-semibold">Receiver</h1>
            </header>
            <main className="self-start flex flex-col gap-6 text-4xl">
                <UserId userId={userId} peerType="receiver" />
                <SenderId senderId={senderId} />
                {error && <p>Error: {error}</p>}
            </main>
        </section>
    );
};