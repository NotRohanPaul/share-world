import { AppIcons } from "@src/assets/icons";
import { motion } from "motion/react";
import type { Dispatch, RefObject, SetStateAction } from "react";

const menuOptions = [{
    name: "Accept",
    Icon: AppIcons.Home
}, {
    name: "Reject",
    Icon: AppIcons.Settings
}, {
    name: "Block",
    Icon: AppIcons.Logout
}];

export const UserMenu = ({
    menuRef,
    setIsMenuVisible
}: {
    menuRef: RefObject<HTMLElement>,
    setIsMenuVisible: Dispatch<SetStateAction<boolean>>;
}) => {
    const handleMenuButtonClick = () => { };

    return (
        <motion.aside
            layout
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{
                y: -100, opacity: 0
            }}
            className="absolute top-[2.5rem] -right-2 flex flex-col text-center p-1 bg-primary text-white [&>*]:p-2 [&>*:hover]:bg-white [&>*:hover]:text-primary"
            onClick={() => setIsMenuVisible(false)}
            ref={menuRef}
        >
            {menuOptions.map(({ name, Icon }) => {
                return (
                    <button
                        key={name}
                        name={name}
                        className="flex items-center gap-1 max-xs:text-sm"
                        onClick={handleMenuButtonClick}
                    >
                        <Icon className="w-[1.5rem] h-[1.5rem] max-xs:w-[1.25rem] max-xs:h-[1.25rem]" />
                        {name}
                    </button>
                );
            })}
        </motion.aside>
    );
};