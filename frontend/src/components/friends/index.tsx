import { AppIcons } from "@src/assets/icons";
import { useState, type MouseEvent } from "react";

const menuButtons = ["friends", "requests", "blocks"] as const;
type menuButtonType = typeof menuButtons[number];

export const FriendsMain = () => {
    const [activeMenuType, setActiveMenuType] = useState<menuButtonType>("friends");

    const handleMenuClick = (e: MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLButtonElement;
        if (target.tagName !== "BUTTON") return;
        const value = target.value as menuButtonType;
        if (menuButtons.includes(value) === false) return;
        setActiveMenuType(value);
    };


    return (
        <section className="w-full h-full grid grid-rows-[auto_1fr] place-items-center gap-10">
            <header className="text-4xl font-semibold p-2">
                Friends
            </header>
            <main className="w-full h-full flex flex-col items-center gap-2">
                <header className="flex gap-2"
                    onClick={handleMenuClick}
                >{
                        menuButtons.map((menuName, i) => {
                            return (
                                <button key={i} className={`${menuName === activeMenuType ? "text-black cursor-auto" : "text-primary outline-2 outline-primary"} p-2 text-xl font-semibold`}
                                    value={menuName}
                                >
                                    {
                                        menuName[0].toUpperCase()
                                        +
                                        menuName.slice(1)
                                    }
                                </button>
                            );
                        })
                    }
                </header>
                <main className="w-[50%] flex flex-col gap-2 outline-2 outline-primary shadow-2xl p-2">
                    {Array.from({ length: 20 }, (_, i) => i + 1).map((name) => {
                        return (
                            <div key={name} className="flex gap-2 p-2 bg-primary/50">
                                <AppIcons.Avatar className="text-white" />
                                <p className="w-full">
                                    Name
                                </p>
                                ...
                            </div>
                        );
                    })}
                </main>
            </main>
        </section >
    );
};