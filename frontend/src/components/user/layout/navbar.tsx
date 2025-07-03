import { AppIcons } from "@src/assets/icons";
import { AppImages } from "@src/assets/images";
import { Navbar } from "@src/components/common/layout/navbar";
import { appRoutes } from "@src/routes/app-routes";
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


export const NavBar = () => {
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
                    <div className="absolute -right-1 top-13 z-10 min-w-[8rem] flex flex-col text-center p-1 bg-primary [&>a]:p-2 [&>a:hover]:bg-white [&>a:hover]:text-primary"
                        onClick={() => setIsAccountMenuVisible(false)}
                        ref={menuRef}
                    >
                        {menuOptions.map(({ name, to, Icon }) => {
                            if (location.pathname === to)
                                return null;

                            return (
                                <Link key={name} to={to} className="flex items-center gap-1">
                                    <Icon />
                                    {name}
                                </Link>
                            );
                        })}
                    </div>
                }
            </nav>
        </Navbar>
    );
};