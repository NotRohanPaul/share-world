import { AppImages } from "@src/assets";
import { appRoutes } from "@src/routes/app-router";
import { Link } from "react-router";

export const NavBar = () => {
    return (
        <header className="h-15 flex justify-between items-center p-1 bg-primary">
            <Link to={appRoutes.home}>
                <AppImages.ShareWorld width={50} height="auto" className="w-10 h-auto aspect-square object-center object-contain p-1 bg-white rounded-full"
                />
            </Link>
            <nav className="font-semibold text-white">
                <p>Avatar</p>

                <div className="flex gap-2">
                    <Link
                        to={appRoutes.login}
                        children={"Manage Account"}
                    />
                    <Link
                        to={appRoutes.logout}
                        children={"Logout"}
                    />
                </div>
            </nav>
        </header>
    );
};