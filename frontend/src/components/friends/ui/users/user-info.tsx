import { AppIcons } from "@src/assets/icons";
import { useMenuOutsideClick } from "@src/components/common/hooks/useMenuOutsideClick";
import { UserMenu } from "./user-menu";
import { AnimatePresence } from "motion/react";

export type UserInfoListType = {
    name: string,
    email: string,
}[];

export const UserInfo = ({
    userInfoList,
    queryKey,
}: {
    userInfoList: UserInfoListType;
    queryKey?: string;
}) => {
    const {
        isMenuVisible,
        setIsMenuVisible,
        buttonRef,
        menuRef
    } = useMenuOutsideClick();


    return (
        <>
            {
                userInfoList.map(({ name, email }, i) => {
                    return (
                        <div key={`${name} ${i}`} className="flex items-center gap-2 p-2 outline outline-primary rounded-sm">
                            <AppIcons.Avatar className="text-primary" />
                            <p className="w-full">
                                {name}
                            </p>
                            <div className="relative flex items-center">
                                <button
                                    onClick={() => setIsMenuVisible(prev => !prev)}
                                    ref={buttonRef}
                                >
                                    <AppIcons.Ellipsis className="text-primary" />
                                </button>
                                <AnimatePresence>
                                    {
                                        isMenuVisible === true
                                        &&
                                        <UserMenu
                                            menuRef={menuRef}
                                            setIsMenuVisible={setIsMenuVisible}
                                            receiverEmail={email}
                                            menuType={queryKey}

                                        />
                                    }
                                </AnimatePresence>
                            </div>
                        </div>
                    );
                })
            }
        </>
    );
};