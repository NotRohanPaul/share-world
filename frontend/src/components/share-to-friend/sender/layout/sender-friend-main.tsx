import { AppIcons } from "@src/assets/icons";
import { UserHeader, UserMain, UserSection } from "@src/components/common/layout/user-layout/user-layouts";
import { useSenderFriendMain } from "../hooks/useSenderFriendMain";

export const SenderToFriendMain = () => {
    useSenderFriendMain();

    return (
        <UserSection>
            <UserHeader>
                <AppIcons.Send className="w-[3rem] h-[3rem] max-xs:w-[2rem] max-xs:h-[2rem] relative -bottom-1" />
                <h1 className="text-5xl max-xs:text-4xl font-semibold">
                    Sender
                </h1>
            </UserHeader>
            <UserMain>
                <h2>
                    Online Friends
                </h2>
                <div>

                </div>
            </UserMain>
        </UserSection>
    );
};