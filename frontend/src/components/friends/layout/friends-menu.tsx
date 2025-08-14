import { useAppDispatch, useAppSelector } from "@src/redux/hooks";
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
            className="flex text-xl p-0.5 rounded-full border-2 border-gray-500 overflow-hidden max-sm:text-xl [&>button]:w-[100px] [&>button]:p-2 max-sm:[&>button]:w-[80px] max-sm:[&>button]:text-base">
            {
                friendsMenuButtons.map((menuName, i) => {
                    return (
                        <button
                            key={i}
                            className={`font-semibold ${menuName === activeMenuState ?
                                "cursor-auto bg-primary text-white" :
                                "text-primary hover:bg-blue-200"
                                } ${i === 0 ?
                                    "rounded-l-full" :
                                    i === friendsMenuButtons.length - 1 ?
                                        "rounded-r-full" :
                                        ''
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

