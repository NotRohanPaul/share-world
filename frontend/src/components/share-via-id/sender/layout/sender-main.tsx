import { AppIcons } from "@src/assets/icons";
import { UserId } from "../../common/user-id";
import { useSender } from "../hooks/useSender";
import { FilesInput } from "../ui/files-input";
import { ReceiverIdInput } from "../ui/receiver-id-input";
import { FileList } from "../../common/files-list";
import { UserHeader, UserMain, UserSection } from "../../common/layout/user-layouts";

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

    return (
        <UserSection>
            <UserHeader>
                <AppIcons.Send className="w-[3rem] h-[3rem] max-xs:w-[2rem] max-xs:h-[2rem] relative -bottom-2" />
                <h1 className="text-5xl max-xs:text-4xl font-semibold">Sender</h1>
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
                        <p className="flex gap-2 font-bold max-xs:text-base">
                            <span>
                                Receiver's ID:
                            </span>
                            <span className="text-primary">{receiverId}</span>
                        </p>
                        <div
                            className="flex flex-col items-center gap-6"
                        >
                            <button
                                className="self-center text-2xl py-2 px-4 max-sm:px-2 max-sm:py-1 rounded-full text-white max-sm:text-base bg-primary transition-colors duration-300 hover:bg-white hover:text-primary hover:outline-2 hover:outline-primary active:outline-offset-2"
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