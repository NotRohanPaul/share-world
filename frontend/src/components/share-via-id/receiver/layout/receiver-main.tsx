import { AppIcons } from "@src/assets/icons";
import { useReceiver } from "../hooks/useReceiver";
import { UserId } from "../../common/user-id";
import { SenderId } from "../ui/sender-id";
import { FileList } from "../../common/files-list";
import { UserHeader, UserMain, UserSection } from "../../common/layout/user-layouts";

export const ReceiverViaIdMain = () => {
    const {
        userId,
        senderId,
        error,
        fileList
    } = useReceiver();

    return (
        <UserSection>
            <UserHeader>
                <AppIcons.Receive className="w-[3rem] h-[3rem] max-xs:w-[2rem] max-xs:h-[2rem] flex items-center relative -bottom-1 max-xs:-bottom-1" />
                <h1 className="text-5xl max-xs:text-4xl font-semibold">Receiver</h1>
                {error && <p className="text-orange-500">Error: {error}</p>}
            </UserHeader>
            <UserMain>
                <UserId userId={userId} peerType="receiver" />
                <SenderId senderId={senderId} />
                {fileList.length !== 0 && <FileList fileList={fileList} />}
            </UserMain>
        </UserSection>
    );
};