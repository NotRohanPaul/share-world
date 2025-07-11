import { Footer } from "@src/components/common/layout/footer";
import { UserMain } from "@src/components/user/layout/user-main";
import { UserNavBar } from "@src/components/user/layout/user-navbar";
import { Helmet } from "react-helmet-async";

export const UserPage = () => {
    return (
        <>
            <Helmet prioritizeSeoTags={true}>
                <title>User</title>
            </Helmet>
            <article className="h-[100dvh] grid grid-rows-[auto_1fr_auto]">
                <UserNavBar />
                <UserMain />
                <Footer />
            </article>
        </>
    );
};