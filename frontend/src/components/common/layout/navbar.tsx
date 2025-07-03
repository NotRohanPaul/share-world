import type { ReactNode } from "react";

export const Navbar = ({ children }: { children: ReactNode; }) => {
    return (
        <header className="h-15 max-xs:h-10 flex justify-between items-center p-2 max-xs:p-1 bg-primary">
            {children}
        </header>
    );
};