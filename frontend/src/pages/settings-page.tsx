import { Footer } from "@src/components/common/layout/footer";
import { SettingsMain } from "@src/components/settings";
import { NavBar } from "@src/components/user/layout/navbar";

export const SettingsPage = () => {
    return (
        <article className="h-[100dvh] grid grid-rows-[auto_1fr_auto]">
            <NavBar>

            </NavBar>
            <SettingsMain />
            <Footer />
        </article>
    );
};