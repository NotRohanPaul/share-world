import { AppIcons } from "@src/assets/icons";
import { AppImages } from "@src/assets/images";
import { appRoutes } from "@src/routes/app-routes";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

export const NavBar = () => {
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
        <header className="h-15 flex justify-between items-center p-2 bg-primary">
            <Link to={appRoutes.home.absolute} title="Share World">
                <AppImages.ShareWorldFade width={50} height={10} className="w-10 h-10 aspect-square object-center object-contain p-1 bg-white rounded-full"
                />
            </Link>
            <nav className="relative flex items-center font-semibold text-white">
                <button
                    onClick={() => setIsAccountMenuVisible(prev => !prev)}
                    aria-label="account avatar"
                    className="w-[2.5rem] overflow-hidden"
                    title="User"
                    ref={buttonRef}
                >
                    <AppIcons.Avatar
                        className="w-full h-full"
                    />
                </button>
                {isAccountMenuVisible === false ? null :
                    <div className="absolute -right-1 top-13 z-10 min-w-[10rem] flex flex-col text-center p-1 bg-primary [&>a]:p-2 [&>a:hover]:bg-white [&>a:hover]:text-primary"
                        onClick={() => setIsAccountMenuVisible(false)}
                        ref={menuRef}
                    >
                        <Link
                            to={appRoutes.user.absolute}
                            children={"Home"}
                        />
                        <Link
                            to={appRoutes.setting.absolute}
                            children={"Setting"}
                        />
                        <Link
                            to={appRoutes.logout.absolute}
                            children={"Logout"}
                        />
                    </div>
                }
            </nav>
        </header>
    );
};