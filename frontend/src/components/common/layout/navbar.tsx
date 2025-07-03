import type { ReactNode } from "react";

export const Navbar = ({ children }: { children: ReactNode; }) => {
    return (
        <header className="h-15 flex justify-between items-center p-2 bg-primary">
            {children}
        </header>
    );
};