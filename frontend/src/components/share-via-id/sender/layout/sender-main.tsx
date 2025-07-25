import { AppIcons } from "@src/assets/icons";
import { UserId } from "../../common/user-id";
import { useSender } from "../hooks/useSender";
import { FilesInput } from "../ui/files-input";
import { ReceiverIdInput } from "../ui/receiver-id-input";
import { FileList } from "../../common/files-list";
import { UserHeader, UserMain, UserSection } from "../../common/layout/user-layouts";
import { useToastConsumer } from "@src/components/common/ui/toast/context/toasts-consumer";
import { useEffect } from "react";

export const SenderViaIdMain = () => {
    const {
        userId,
        receiverId,
        receiverIdInput,
        isSuccessConnecting,
        error,
        fileList,
        handleReceiverIdInput,
        handleFileChange,
        handleSendClick,
        handleInputEnter,
        handleConnectClick
    } = useSender();

    const showToast = useToastConsumer();

    useEffect(() => {
        if (error === null || error.trim() === "") return;

        showToast({
            text: error,
            exitDelay: 1e3
        });

    }, [error]);

    return (
        <UserSection>
            <UserHeader>
                <AppIcons.Send className="w-[3rem] h-[3rem] max-xs:w-[2rem] max-xs:h-[2rem] relative -bottom-1" />
                <h1 className="text-5xl max-xs:text-4xl font-semibold">Sender</h1>
            </UserHeader>
            <UserMain>
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
                        <p className="flex gap-2 font-bold max-xs:text-xl">
                            <span>
                                Receiver's ID:
                            </span>
                            <span className="text-primary tracking-widest">{receiverId}</span>
                        </p>
                        <div
                            className="flex flex-col items-center gap-6"
                        >
                            <button
                                className="self-center text-2xl max-sm:text-xl py-2 px-4 max-sm:px-2 max-sm:py-1 rounded-full text-white  bg-primary transition-colors duration-300 hover:bg-white hover:text-primary hover:outline-2 hover:outline-primary active:outline-offset-2"
                                onClick={handleSendClick}
                            >
                                Send
                            </button>
                            {fileList.length === 0 ?
                                <FilesInput
                                    handleFileChange={handleFileChange}
                                />
                                :
                                <FileList fileList={fileList} />
                            }
                        </div>

                    </>
                )}
            </UserMain>
        </UserSection>
    );
};