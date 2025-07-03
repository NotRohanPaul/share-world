import { useState } from "react";
import { AccountSettings } from "./account";
import { AppearanceSettings } from "./appearance";

const settingsOptions = [{
    name: "Account",
    component: AccountSettings,
}, {
    name: "Appearance",
    component: AppearanceSettings,

}, {
    name: "Storage",
    component: null,

}] as const;

export const SettingsMain = () => {
    const [activeSettingsOption, setActiveSettingsOption] = useState<typeof settingsOptions[number]["name"]>("Account");
    const SettingsComponent = settingsOptions.find(({ name }) => name === activeSettingsOption)?.component ?? (() => null);

    return (
        <main className="w-full h-full flex flex-col items-center gap-5 p-2">
            <header className="text-5xl max-xs:text-4xl font-semibold">
                Settings
            </header>
            <main className="w-[80%] max-md:w-full h-full flex gap-3 text-2xl max-xs:text-base outline-2 outline-primary p-2">
                <aside className="min-w-[12rem] flex flex-col items-start gap-2 text-white bg-primary/50 p-2">
                    {settingsOptions.map(({ name }) => {
                        return (
                            <button
                                key={name}
                                className={`w-full text-left ${activeSettingsOption === name ? "shadow-[inset_0_0_3px_5px_white] bg-white text-primary cursor-default" : "hover:bg-primary"} p-2 transition-colors`}
                                onClick={() => setActiveSettingsOption(name)}
                            >
                                {name}
                            </button>
                        );
                    })}
                </aside>
                <section className="w-full p-2 flex flex-col gap-2">
                    <SettingsComponent />
                </section>
            </main>
        </main>
    );
};