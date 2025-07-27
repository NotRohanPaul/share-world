import { AppIcons } from "@src/assets/icons";
import { Navbar } from "@src/components/common/layout/navbar";
import { ShareWorldImgLink } from "@src/components/common/ui/share-world-img-link";
import { AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { UserNavbarMenu } from "./user-navbar-menu";


export const UserNavBar = () => {
    const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);

    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isMenuVisible === false) return;

        const handleOutsideClick = (e: globalThis.MouseEvent) => {
            if (
                menuRef.current === null ||
                buttonRef.current === null
            ) return;

            if (buttonRef.current.contains(e.target as Node)) return;

            if (menuRef.current.contains(e.target as Node) === false) {
                setIsMenuVisible(false);
            }
        };

        document.addEventListener("click", handleOutsideClick);
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, [isMenuVisible]);


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