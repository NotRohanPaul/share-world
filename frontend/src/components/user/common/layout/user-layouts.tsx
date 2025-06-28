import type { FC, ReactNode } from "react";

export const UserSection: FC<{ children: ReactNode; }> = ({ children }) => {
    return (
        <section className="w-full h-full grid grid-rows-[100px_1fr] overflow-auto">
            {children}
        </section>
    );
};


export const UserHeader: FC<{ children: ReactNode; }> = ({ children }) => {
    return (
        <header className="self-center justify-self-center flex gap-2">
            {children}
        </header>
    );
};


export const UserMain: FC<{ children: ReactNode; }> = ({ children }) => {
    return (
        <main className="w-full h-full flex flex-col items-center gap-6 text-4xl max-md:text-2xl p-2">
            {children}
        </main>
    );
};