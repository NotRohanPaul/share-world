import { useAppDispatch, useAppSelector } from "@src/redux/utils/hooks";
import { friendsActions, friendsSelectors } from "@src/redux/slices/friends";
import type { MenuButtonType } from "@src/redux/slices/friends/friends-menu-slice";
import type { MouseEvent } from "react";
import { friendsMenuButtons } from "../constants/menu-options";

export const FriendsMenu = () => {
    const activeMenuState = useAppSelector(friendsSelectors.friendsMenu);
    const dispatch = useAppDispatch();

    const handleMenuClick = (e: MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLButtonElement;
        if (target.tagName !== "BUTTON") return;
        const value = target.value as MenuButtonType;
        if (friendsMenuButtons.includes(value) === false) return;
        dispatch(friendsActions.friendsMenu.setActiveMenuType(value));
    };

    return (
        <div
            onClick={handleMenuClick}
            className="flex p-0.5 rounded-full border-2 border-gray-500 overflow-hidden">
            {
                friendsMenuButtons.map((menuName, i) => {
                    return (
                        <button
                            key={i}
                            className={`min-w-[100px] h-[40px] max-sm:w-[80px] flex items-center justify-center font-semibold text-xl max-sm:text-base ${menuName === activeMenuState ?
                                "cursor-auto bg-primary text-white" :
                                "text-primary hover:bg-blue-200"
                                } ${i === 0 ?
                                    "rounded-l-full" :
                                    i === friendsMenuButtons.length - 1 ?
                                        "rounded-r-full" :
                                        "px-5"
                                }`}
                            value={menuName}
                        >
                            {
                                menuName[0].toUpperCase()
                                +
                                menuName.slice(1)
                            }
                        </button>
                    );
                })
            }
        </div>
    );
}

