import { AppIcons, AppImages } from "@src/assets";
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
                <AppImages.ShareWorld width={50} height="auto" className="w-10 h-auto aspect-square object-center object-contain p-1 bg-white rounded-full"
                />
            </Link>
            <nav className="relative font-semibold text-white">
                <button
                    onClick={() => setIsAccountMenuVisible(prev => !prev)}
                    aria-label="account avatar"
                    className="overflow-hidden"
                    title="User"
                    ref={buttonRef}
                >
                    <AppIcons.Avatar
                        className="w-[2rem] h-[2rem]"
                    />
                </button>
                {isAccountMenuVisible === false ? null :
                    <div className="absolute -right-1 top-10 z-10 w-max flex flex-col p-1 bg-primary [&>a]:p-2 [&>a:hover]:bg-white [&>a:hover]:text-primary"
                        onClick={() => setIsAccountMenuVisible(false)}
                        ref={menuRef}
                    >
                        <Link
                            to={appRoutes.user.absolute}
                            children={"Send/Receive"}
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