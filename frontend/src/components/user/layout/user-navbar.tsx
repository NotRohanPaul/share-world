import { AppIcons } from "@src/assets/icons";
import { useMenuOutsideClick } from "@src/components/common/hooks/useMenuOutsideClick";
import { Navbar } from "@src/components/common/layout/navbar";
import { ShareWorldImgLink } from "@src/components/common/ui/share-world-img-link";
import { AnimatePresence } from "motion/react";
import { UserNavbarMenu } from "./user-navbar-menu";


export const UserNavBar = () => {
    const {
        isMenuVisible,
        setIsMenuVisible,
        buttonRef,
        menuRef
    } = useMenuOutsideClick();


    return (
        <Navbar>
            <ShareWorldImgLink />
            <nav className="relative flex items-center font-semibold text-white">
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