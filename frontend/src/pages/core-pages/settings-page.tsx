import { Footer } from "@src/components/common/layout/footer";
import { Navbar } from "@src/components/common/layout/navbar";
import { SettingsMain } from "@src/components/settings/settings-main";
import { UserNavBar } from "@src/components/user/layout/user-navbar";
import { Helmet } from "react-helmet-async";

export const SettingsPage = () => {
    return (
        <>
            <Helmet prioritizeSeoTags={true}>
                <title>Settings</title>
            </Helmet>
            <article className="h-[100dvh] grid grid-rows-[auto_1fr_auto] overflow-auto">
                <Navbar>
                    <UserNavBar />
                </Navbar>
                <SettingsMain />
                <Footer />
            </article>
        </>
    );
};