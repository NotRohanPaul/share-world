import { AppIcons } from "@src/assets/icons";
import { Navbar } from "@src/components/common/layout/navbar";
import { ShareWorldImgLink } from "@src/components/common/ui/share-world-img-link";
import { appRoutes } from "@src/routes/app-routes";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";


const menuOptions = [{
    name: "Home",
    to: appRoutes.user.absolute,
    Icon: AppIcons.Home
}, {
    name: "Settings",
    to: appRoutes.settings.absolute,
    Icon: AppIcons.Settings
}, {
    name: "Logout",
    to: appRoutes.logout.absolute,
    Icon: AppIcons.Logout
}];


export const UserNavBar = () => {
    const location = useLocation();
    const [isAccountMenuVisible, setIsAccountMenuVisible] = useState<boolean>(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isAccountMenuVisible === false) return;

        const handleOutsideClick = (e: MouseEvent) => {
            if (
                menuRef.current === null ||
                buttonRef.current === null
            ) return;

            if (buttonRef.current.contains(e.target as Node)) return;

            if (menuRef.current.contains(e.target as Node) === false) {
                setIsAccountMenuVisible(false);
            }
        };

        document.addEventListener("click", handleOutsideClick);
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, [isAccountMenuVisible]);

    return (
        <Navbar>
            <ShareWorldImgLink />
            <nav className="relative flex items-center font-semibold text-white">
                <button
                    onClick={() => setIsAccountMenuVisible(prev => !prev)}
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
                    {isAccountMenuVisible === false ? null :
                        <div className="absolute -right-1 max-xs:-right-[1px] top-12 max-xs:top-10 z-10 min-w-[8rem] max-xs:min-w-[6rem] overflow-hidden">
                            <motion.div
                                layout
                                initial={{ y: -100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{
                                    y: -100, opacity: 0
                                }}
                                className=" flex flex-col text-center p-1 bg-primary/80 [&>a]:p-2 [&>a:hover]:bg-white [&>a:hover]:text-primary"
                                onClick={() => setIsAccountMenuVisible(false)}
                                ref={menuRef}
                            >
                                {menuOptions.map(({ name, to, Icon }) => {
                                    if (location.pathname === to)
                                        return null;
                                    return (
                                        <Link key={name} to={to} className="flex items-center gap-1 max-xs:text-sm">
                                            <Icon className="w-[1.5rem] h-[1.5rem] max-xs:w-[1.25rem] max-xs:h-[1.25rem]" />
                                            {name}
                                        </Link>
                                    );
                                })}
                            </motion.div>
                        </div>
                    }
                </AnimatePresence>
            </nav>
        </Navbar>
    );
};