import { AppImages } from "@src/assets/images";
import { appRoutes } from "@src/routes/app-routes";
import { Link } from "react-router";

export const ShareWorldImgLink = ({ className }: { className?: string; }) => {
    return (
        <Link to={appRoutes.home.absolute}>
            <AppImages.ShareWorldFade className={className === undefined ? "w-10 h-10 max-xs:w-8 max-xs:h-8 aspect-square object-center object-contain p-1 bg-white rounded-full outline-2 outline-primary" : className}
            />
        </Link>
    );
};