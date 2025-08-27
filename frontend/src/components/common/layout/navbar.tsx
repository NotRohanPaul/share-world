import type { PropsWithChildren } from "react";
import { ShareWorldImgLink } from "../ui/share-world-img-link";

export const Navbar = ({ children }: PropsWithChildren) => {
    return (
        <nav className="h-15 max-xs:h-12 flex justify-between items-center p-2 max-xs:p-1 bg-transparent text-black]">
            <ShareWorldImgLink />
            {children}
        </nav>
    );
};