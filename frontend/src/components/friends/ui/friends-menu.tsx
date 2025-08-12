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
        <div onClick={handleMenuClick}>
            {
                friendsMenuButtons.map((menuName, i) => {
                    return (
                        <button key={i} className={`${menuName === activeMenuState ? "text-black cursor-auto" : "text-primary outline-2 outline-primary"} p-2 text-xl font-semibold`}
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

