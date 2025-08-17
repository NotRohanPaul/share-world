import { AppIcons } from "@src/assets/icons";
import { useMenuOutsideClick } from "@src/components/common/hooks/useMenuOutsideClick";
import { Navbar } from "@src/components/common/layout/navbar";
import { ShareWorldImgLink } from "@src/components/common/ui/share-world-img-link";
import { AnimatePresence } from "motion/react";
import { UserNavbarMenu } from "./user-navbar-menu";
import { useAppSelector } from "@src/redux/utils/hooks";
import { authSelectors } from "@src/redux/slices/auth";


export const UserNavBar = () => {
    const {
        isMenuVisible,
        setIsMenuVisible,
        buttonRef,
        menuRef
    } = useMenuOutsideClick();

    const userState = useAppSelector(authSelectors.user);

    return (
        <Navbar>
            <ShareWorldImgLink />
            <nav className="relative flex items-center font-semibold text-black">
                <h2 className="w-[6rem] text-right text-xl max-xs:text-base text-ellipsis pr-2 overflow-hidden">
                    {
                        userState.type === "auth-user" ?
                            userState.name.split("-")[0] :
                            "Guest"
                    }
                </h2>
                <button
                    onClick={() => setIsMenuVisible(prev => !prev)}
                    aria-label="account avatar"
                    className="w-[2.5rem] max-xs:w-9 overflow-hidden"
                    title="User"
                    ref={buttonRef}
                >
                    <AppIcons.Avatar
                        className="w-full h-full text-primary"
                    />
                </button>
                <AnimatePresence>
                    {isMenuVisible === false ? null :
                        <UserNavbarMenu
                            setIsMenuVisible={setIsMenuVisible}
                            menuRef={menuRef}
                        />
                    }
                </AnimatePresence>
            </nav>
        </Navbar>
    );
};