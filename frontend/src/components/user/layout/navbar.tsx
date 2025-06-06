import { AppIcons, AppImages } from "@src/assets";
import { appRoutes } from "@src/routes/app-routes";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

export const NavBar = () => {
    const [isAccountMenuVisible, setIsAccountMenuVisible] = useState<boolean>(false);

    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if ((e.target as HTMLButtonElement)?.closest("button")) return;
            if (!isAccountMenuVisible || menuRef.current === null) return;
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
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
            <Link to={appRoutes.home}>
                <AppImages.ShareWorld width={50} height="auto" className="w-10 h-auto aspect-square object-center object-contain p-1 bg-white rounded-full"
                />
            </Link>
            <nav className="relative font-semibold text-white">
                <button
                    onClick={() => setIsAccountMenuVisible(prev => !prev)}
                    aria-label="account avatar"
                    className="overflow-hidden"
                >
                    <AppIcons.Avatar
                        width={45}
                        height={45}
                    />
                </button>
                {isAccountMenuVisible === false ? null :
                    <div className="absolute -right-1 top-15 w-max flex flex-col p-1 bg-primary [&>a]:p-2 [&>a:hover]:bg-white [&>a:hover]:text-primary"
                        onClick={() => setIsAccountMenuVisible(false)}
                        ref={menuRef}
                    >
                        <Link
                            to={"#"}
                            children={"Manage Account"}
                        />
                        <Link
                            to={appRoutes.logout}
                            children={"Logout"}
                        />
                    </div>
                }
            </nav>
        </header>
    );
};