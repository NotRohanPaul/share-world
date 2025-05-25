import { Footer } from "@src/components/user/layout/footer";
import { Main } from "@src/components/user/layout/main";
import { NavBar } from "@src/components/user/layout/navbar";

export const UserPage = () => {

    return (
        <article className="h-[100dvh] grid grid-rows-[auto_1fr_auto]">
            <NavBar />
            <main className="grid place-content-center gap-5">
                <h1 className="w-[80%] justify-self-center text-4xl text-center font-bold">
                    Send/Receive
                </h1>
                <Main/>
            </main>
            <Footer />
        </article>
    );
};