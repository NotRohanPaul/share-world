import { AppIcons } from "@src/assets";
import { useReceiver } from "../hooks/useReceiver";
import { UserId } from "../../common/user-id";
import { SenderId } from "../ui/sender-id";
import { FileList } from "../../common/files-list";

export const ReceiverMain = () => {
    const {
        userId,
        senderId,
        error
    } = useReceiver();

    return (
        <section className="w-full h-[50rem] grid grid-rows-[100px_1fr]">
            <header className="self-start justify-self-center flex gap-2">
                <AppIcons.Receive className="w-[3rem] h-[3rem] relative -bottom-1" />
                <h1 className="text-5xl font-semibold">Receiver</h1>
            </header>
            <main className="w-full h-full flex flex-col items-center gap-6 text-4xl overflow-auto">
                <UserId userId={userId} peerType="receiver" />
                <SenderId senderId={senderId} />
                {error && <p>Error: {error}</p>}
                <FileList fileList={[]} />
            </main>
        </section>
    );
};