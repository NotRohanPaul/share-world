import { Footer } from "@src/components/common/layout/footer";
import { SettingsMain } from "@src/components/settings";
import { UserNavBar } from "@src/components/user/layout/user-navbar";
import { Helmet } from "react-helmet-async";

export const SettingsPage = () => {
    return (
        <>
            <Helmet prioritizeSeoTags={true}>
                <title>Settings</title>
            </Helmet>
            <article className="h-[100dvh] grid grid-rows-[auto_1fr_auto]">
                <UserNavBar />
                <SettingsMain />
                <Footer />
            </article>
        </>
    );
};