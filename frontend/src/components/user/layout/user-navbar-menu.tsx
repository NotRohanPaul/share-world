import { AppIcons } from "@src/assets/icons";
import { appRoutes } from "@src/routes/app-routes";
import { motion } from "motion/react";
import type { Dispatch, MouseEvent, RefObject, SetStateAction } from "react";
import { Link, useLocation } from "react-router";
import { useLogout } from "../hooks/useLogout";

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
    to: null,
    Icon: AppIcons.Logout
}];


export const UserNavbarMenu = ({
    setIsMenuVisible,
    menuRef
}: {
    setIsMenuVisible: Dispatch<SetStateAction<boolean>>,
    menuRef: RefObject<HTMLDivElement>;
}) => {
    const location = useLocation();
    const { handleLogoutButtonClick } = useLogout();

    const handleMenuBtnClick = (e: MouseEvent<HTMLButtonElement>) => {
        const target = e.target as HTMLButtonElement;
        if (target.name === "Logout") {
            handleLogoutButtonClick();
        }
    };

    return (
        <div className="absolute -right-1 max-xs:-right-[1px] top-12 max-xs:top-10 z-10 min-w-[8rem] max-xs:min-w-[6rem] text-white overflow-hidden">
            <motion.div
                layout
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{
                    y: -100, opacity: 0
                }}
                className="flex flex-col text-center p-1 bg-primary [&>*]:p-2 [&>*:hover]:bg-white [&>*:hover]:text-primary"
                onClick={() => setIsMenuVisible(false)}
                ref={menuRef}
            >
                {menuOptions.map(({ name, to, Icon }) => {
                    if (location.pathname === to)
                        return null;
                    if (to === null) {
                        return (
                            <button
                                key={name}
                                name={name}
                                className="flex items-center gap-1 max-xs:text-sm"
                                onClick={handleMenuBtnClick}
                            >
                                <Icon className="w-[1.5rem] h-[1.5rem] max-xs:w-[1.25rem] max-xs:h-[1.25rem] pointer-events-none" />
                                {name}
                            </button>
                        );
                    }

                    return (
                        <Link
                            key={name}
                            to={to}
                            className="flex items-center gap-1 max-xs:text-sm"
                        >
                            <Icon className="w-[1.5rem] h-[1.5rem] max-xs:w-[1.25rem] max-xs:h-[1.25rem] pointer-events-none" />
                            {name}
                        </Link>
                    );
                })}
            </motion.div>
        </div>
    );
};