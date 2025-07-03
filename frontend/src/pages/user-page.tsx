import { Footer } from "@src/components/common/layout/footer";
import { Main } from "@src/components/user/layout/main";
import { NavBar } from "@src/components/user/layout/navbar";

export const UserPage = () => {
    return (
        <article className="h-[100dvh] grid grid-rows-[auto_1fr_auto]">
            <NavBar />
            <Main />
            <Footer />
        </article>
    );
};