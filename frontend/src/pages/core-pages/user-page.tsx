import { Footer } from "@src/components/common/layout/footer";
import { UserMain } from "@src/components/user/user-main";
import { UserNavBar } from "@src/components/user/layout/user-navbar";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@src/components/common/layout/navbar";

export const UserPage = () => {
    return (
        <>
            <Helmet prioritizeSeoTags={true}>
                <title>User</title>
            </Helmet>
            <article className="h-[100dvh] grid grid-rows-[auto_1fr_auto]">
                <Navbar>
                    <UserNavBar />
                </Navbar>
                <UserMain />
                <Footer />
            </article>
        </>
    );
};