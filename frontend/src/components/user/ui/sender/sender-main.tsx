import { AppIcons } from "@src/assets";
import { useSender } from "../../hooks/useSender";
import { UserId } from "../common/user-id";
import { FilesInput } from "./files-input";
import { ReceiverIdInput } from "./receiver-id-input";

export const SenderMain = () => {
    const {
        userId,
        receiverId,
        receiverIdInput,
        isSuccessConnecting,
        error,
        handleReceiverIdInput,
        handleFileChange,
        handleSendClick,
        handleInputEnter,
        handleConnectClick
    } = useSender();

    return (
        <section className="h-full grid grid-rows-3">
            <header className="self-center justify-self-center flex gap-2">
                <AppIcons.Send className="w-[3rem] h-[3rem] relative -bottom-2" />
                <h1 className="text-5xl font-semibold">Sender</h1>
            </header>
            <main className="self-center justify-self-center flex flex-col justify-center gap-6 text-4xl">
                <UserId userId={userId} peerType="sender" />
                {isSuccessConnecting === false ? (
                    <ReceiverIdInput
                        receiverIdInput={receiverIdInput}
                        handleReceiverIdInput={handleReceiverIdInput}
                        handleInputEnter={handleInputEnter}
                        handleConnectClick={handleConnectClick}
                    />
                ) : (
                    <FilesInput
                        receiverId={receiverId}
                        handleFileChange={handleFileChange}
                        handleSendClick={handleSendClick}
                    />
                )}
                {error && <p className="text-orange-500">Error: {error}</p>}
            </main>
        </section>
    );
};;