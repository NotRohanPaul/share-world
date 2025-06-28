import { AppIcons } from "@src/assets";
import { UserId } from "../../common/user-id";
import { useSender } from "../hooks/useSender";
import { FilesInput } from "../ui/files-input";
import { ReceiverIdInput } from "../ui/receiver-id-input";
import { FileList } from "../../common/files-list";
import { UserHeader, UserMain, UserSection } from "../../common/layout/user-layouts";

export const SenderMain = () => {
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

    return (
        <UserSection>
            <UserHeader>
                <AppIcons.Send className="w-[3rem] h-[3rem] relative -bottom-2" />
                <h1 className="text-5xl font-semibold">Sender</h1>
                {error && <p className="text-orange-500">Error: {error}</p>}
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
                        <p className="flex gap-2 font-bold">
                            <span>
                                Receiver's ID:
                            </span>
                            <span className="text-primary">{receiverId}</span>
                        </p>
                        <div
                            className="flex flex-col items-center gap-6"
                        >
                            <button
                                className="self-center text-2xl py-2 px-4 rounded-full text-white bg-primary transition-colors duration-300 hover:bg-white hover:text-primary hover:outline-2 hover:outline-primary active:outline-offset-2"
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