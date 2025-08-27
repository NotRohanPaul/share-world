import { useState } from "react";
import {
    AboutSection,
    AccountSection,
    AppearanceSection,
    StorageSection
} from "./ui/sections";

const settingsOptions = [{
    name: "Account",
    component: AccountSection,
}, {
    name: "Appearance",
    component: AppearanceSection,
}, {
    name: "Storage",
    component: StorageSection,
}, {
    name: "About",
    component: AboutSection,
}] as const;

export const SettingsMain = () => {
    const [
        activeSettingsOption,
        setActiveSettingsOption
    ] = useState<
        typeof settingsOptions[number]["name"]
    >("Account");

    const SettingsComponent = settingsOptions.find(
        ({ name }) => name === activeSettingsOption
    )?.component ?? (() => null);

    return (
        <main className="w-full h-full flex flex-col items-center gap-5 p-2">
            <header className="text-5xl max-xs:text-4xl font-semibold">
                Settings
            </header>
            <main className="w-[700px] max-md:w-full h-full flex text-2xl max-xs:text-base outline-2 outline-primary dark:outline-secondary p-2 max-xs:p-1">
                <aside className="w-[30%] flex flex-col items-start gap-2 text-white border-r-2 border-primary dark:border-secondary pr-2 max-xs:pr-1">
                    {settingsOptions.map(({ name }) => {
                        return (
                            <button
                                key={name}
                                className={`w-full text-left ${activeSettingsOption === name ?
                                    "bg-primary dark:bg-primary text-white cursor-default" :
                                    "text-primary dark:text-white hover:bg-secondary/90 hover:dark:bg-secondary hover:dark:text-primary"} p-2 max-xs:p-1 transition-colors`}
                                onClick={() => setActiveSettingsOption(name)}
                            >
                                {name}
                            </button>
                        );
                    })}
                </aside>
                <section className="w-[70%] flex flex-col gap-2 overflow-hidden p-2 max-xs:p-1">
                    <SettingsComponent />
                </section>
            </main>
        </main>
    );
};