import { AppIcons } from "@src/assets";
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
                        menuButtons.map((menuName) => {
                            return (
                                <button className={`${menuName === activeMenuType ? "text-black cursor-auto" : "text-primary outline-2 outline-primary"} p-2 text-xl font-semibold`}
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
                <main className="w-[50%] bg-primary/50">
                    <div className="flex gap-2 p-2">
                        <AppIcons.Avatar className="text-white" />
                        <p className="w-full">
                            Name
                        </p>
                        ...
                    </div>
                    <div className="flex gap-2 p-2">
                        <AppIcons.Avatar className="text-white" />
                        <p className="w-full">
                            Name
                        </p>
                        ...
                    </div>
                    <div className="flex gap-2 p-2">
                        <AppIcons.Avatar className="text-white" />
                        <p className="w-full">
                            Name
                        </p>
                        ...
                    </div>
                    <div className="flex gap-2 p-2">
                        <AppIcons.Avatar className="text-white" />
                        <p className="w-full">
                            Name
                        </p>
                        ...
                    </div>
                </main>
            </main>
        </section >
    );
};