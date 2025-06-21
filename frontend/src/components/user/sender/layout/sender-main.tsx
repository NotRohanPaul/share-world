import { AppIcons } from "@src/assets";
import { UserId } from "../../common/user-id";
import { useSender } from "../hooks/useSender";
import { FilesInput } from "../ui/files-input";
import { ReceiverIdInput } from "../ui/receiver-id-input";
import { FileList } from "../../common/files-list";

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
        <section className="w-full h-[50rem] grid grid-rows-[100px_1fr]">
            <header className="self-start justify-self-center flex gap-2">
                <AppIcons.Send className="w-[3rem] h-[3rem] relative -bottom-2" />
                <h1 className="text-5xl font-semibold">Sender</h1>
            </header>
            <main className="w-full h-full flex flex-col items-center gap-6 text-4xl overflow-auto">
                <UserId userId={userId} peerType="sender" />
                {isSuccessConnecting === false ? (
                    <ReceiverIdInput
                        receiverIdInput={receiverIdInput}
                        handleReceiverIdInput={handleReceiverIdInput}
                        handleInputEnter={handleInputEnter}
                        handleConnectClick={handleConnectClick}
                    />
                ) : (
                    <>
                        <FilesInput
                            receiverId={receiverId}
                            handleFileChange={handleFileChange}
                            handleSendClick={handleSendClick}
                        />
                        <FileList fileList={[{
                            name: "hello.png",
                            size: "1GiB",
                            type: "image/png"
                        }, {
                            name: "hello.png",
                            size: "1GiB",
                            type: "image/png"
                        },
                        {
                            name: "hello.png",
                            size: "1GiB",
                            type: "image/png"
                        },
                        {
                            name: "hello.png",
                            size: "1GiB",
                            type: "image/png"
                        },
                        {
                            name: "hello.png",
                            size: "1GiB",
                            type: "image/png"
                        },
                        {
                            name: "hello.png",
                            size: "1GiB",
                            type: "image/png"
                        },
                        ]} />
                    </>
                )}
                {error && <p className="text-orange-500">Error: {error}</p>}
            </main>
        </section>
    );
};;