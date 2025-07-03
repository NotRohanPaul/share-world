import { Footer } from "@src/components/common/layout/footer";
import { SettingsMain } from "@src/components/settings";
import { UserNavBar } from "@src/components/user/layout/user-navbar";

export const SettingsPage = () => {
    return (
        <article className="h-[100dvh] grid grid-rows-[auto_1fr_auto]">
            <UserNavBar />
            <SettingsMain />
            <Footer />
        </article>
    );
};