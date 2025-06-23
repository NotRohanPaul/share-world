import { AppIcons } from "@src/assets";
import { useReceiver } from "../hooks/useReceiver";
import { UserId } from "../../common/user-id";
import { SenderId } from "../ui/sender-id";
import { FileList } from "../../common/files-list";
import { UserHeader, UserMain, UserSection } from "../../common/layout/user-layouts";

export const ReceiverMain = () => {
    const {
        userId,
        senderId,
        error,
        fileList
    } = useReceiver();

    return (
        <UserSection>
            <UserHeader>
                <AppIcons.Receive className="w-[3rem] h-[3rem] relative -bottom-1" />
                <h1 className="text-5xl font-semibold">Receiver</h1>
            </UserHeader>
            <UserMain>
                <UserId userId={userId} peerType="receiver" />
                <SenderId senderId={senderId} />
                {error && <p>Error: {error}</p>}
                {fileList !== null && <FileList fileList={fileList} />}
            </UserMain>
        </UserSection>
    );
};