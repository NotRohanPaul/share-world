import { AppImages } from "@src/assets/images";
import { appRoutes } from "@src/routes/app-routes";
import { Link } from "react-router";

export const ShareWorldImgLink = ({ className }: { className?: string; }) => {
    const newClassName = className === undefined ? "w-10 h-10 max-xs:w-7 max-xs:h-7 aspect-square object-center object-contain p-1 bg-white rounded-full" : className;
    return (
        <Link to={appRoutes.home.absolute}>
            <AppImages.ShareWorldFade className={newClassName}
            />
        </Link>
    );
};