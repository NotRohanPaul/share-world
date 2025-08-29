import { AppIcons } from "@src/assets/icons";
import { useMenuOutsideClick } from "@src/components/common/hooks/useMenuOutsideClick";
import { UserMenu } from "./user-menu";
import { AnimatePresence } from "motion/react";
import { Fragment } from "react/jsx-runtime";

const UserRow = ({
    name,
    email,
    queryKey,
}: {
    name: string;
    email: string;
    queryKey?: string;
}) => {
    const {
        isMenuVisible,
        setIsMenuVisible,
        buttonRef,
        menuRef
    } = useMenuOutsideClick();

    return (
        <Fragment>
            <div className="flex items-center gap-2 p-2 outline outline-primary dark:outline-secondary rounded-sm">
                <AppIcons.Avatar className="text-primary dark:text-secondary" />
                <p className="w-full">{name}</p>
                <div className="relative flex items-center">
                    <button
                        onClick={() => setIsMenuVisible((prev) => !prev)}
                        ref={buttonRef}
                    >
                        <AppIcons.Ellipsis className="text-primary dark:text-secondary" />
                    </button>
                    <AnimatePresence>
                        {isMenuVisible && (
                            <UserMenu
                                menuRef={menuRef}
                                setIsMenuVisible={setIsMenuVisible}
                                receiverEmail={email}
                                menuType={queryKey}
                            />
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </Fragment>
    );
};


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

    return (
        <>
            {userInfoList.map(({ name, email }, i) => (
                <UserRow key={`${name}-${i}`} name={name} email={email} queryKey={queryKey} />
            ))}
        </>
    );
};