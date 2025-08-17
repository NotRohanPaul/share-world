import { AppIcons } from "@src/assets/icons";
import { apiHandlers, type WithBodyHandlerType } from "@src/axios/handlers/api-handlers";
import { motion } from "motion/react";
import type { Dispatch, RefObject, SetStateAction } from "react";

const menuOptions = {
    "friends": [{
        name: "Unfriend",
        Icon: AppIcons.UnFriend,
        handler: apiHandlers.friendActions.unfriend
    }, {
        name: "Block",
        Icon: AppIcons.Block,
        handler: apiHandlers.friendActions.blockFriend
    }],
    "requests-sent": [{
        name: "Delete",
        Icon: AppIcons.Delete,
        handler: apiHandlers.friendRequest.delete
    }, {
        name: "Block",
        Icon: AppIcons.Block,
        handler: apiHandlers.friendRequest.block
    }],
    "requests-received": [{
        name: "Accept",
        Icon: AppIcons.Check,
        handler: apiHandlers.friendRequest.accept
    }, {
        name: "Reject",
        Icon: AppIcons.Reject,
        handler: apiHandlers.friendRequest.reject
    }, {
        name: "Block",
        Icon: AppIcons.Block,
        handler: apiHandlers.friendRequest.block
    }],
    "blocks": [{
        name: "Unblock",
        Icon: AppIcons.UnBlock,
        handler: apiHandlers.friendActions.unblockUser
    }]
};

export const UserMenu = ({
    menuRef,
    setIsMenuVisible,
    receiverEmail,
    menuType
}: {
    menuRef: RefObject<HTMLElement>,
    setIsMenuVisible: Dispatch<SetStateAction<boolean>>;
    receiverEmail: string,
    menuType?: string,
}) => {
    const handleMenuButtonClick = async (handler?: WithBodyHandlerType) => {
        if (handler !== undefined) {
            const response = await handler({ receiverEmail });
            console.log(response);
        }
    };

    return (
        <div className="absolute top-[2.25rem] -right-2  z-10 overflow-hidden">
            <motion.aside
                layout
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{
                    y: -100, opacity: 0
                }}
                className="flex flex-col text-center p-1 bg-primary text-white [&>*]:p-2 [&>*:hover]:bg-white [&>*:hover]:text-primary"
                onClick={() => setIsMenuVisible(false)}
                ref={menuRef}
            >
                {menuType !== undefined && menuOptions[menuType as keyof typeof menuOptions].map(({ name, Icon, handler }) => {
                    return (
                        <button
                            key={name}
                            name={name}
                            className="flex items-center gap-1 max-xs:text-sm"
                            onClick={() => void handleMenuButtonClick(handler)}
                        >
                            <Icon className="w-[1.5rem] h-[1.5rem] max-xs:w-[1.25rem] max-xs:h-[1.25rem]" />
                            {name}
                        </button>
                    );
                })}
            </motion.aside>
        </div>
    );
};