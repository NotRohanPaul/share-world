import type { PropsWithChildren } from "react";

export const Navbar = ({ children }: PropsWithChildren) => {
    return (
        <header className="h-15 max-xs:h-12 flex justify-between items-center p-2 max-xs:p-1 bg-transparent text-black]">
            {children}
        </header>
    );
};