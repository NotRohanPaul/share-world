import { AppImages } from "@src/assets";
import { appRoutes } from "@src/routes/app-routes";
import { Link } from "react-router";

export const LandingPage = () => {

    return (
        <article className="h-[100dvh] grid grid-rows-[auto_1fr_auto]">
            <header className="h-15 flex justify-between items-center p-1 bg-primary">
                <Link to={appRoutes.home}>
                    <AppImages.ShareWorld width={50} height="auto" className="w-10 h-auto aspect-square object-center object-contain p-1 bg-white rounded-full"
                    />
                </Link>
                <nav className="font-semibold text-white">
                    <div className="flex gap-2">
                        <Link
                            to={appRoutes.login}
                            children={"Login/Signup"}
                        />
                        <Link
                            to={appRoutes.contact}
                            children={"Contact"}
                        />
                    </div>
                </nav>
            </header>
            <main className="grid place-content-center gap-5">
                <h1 className="w-[80%] justify-self-center text-4xl text-center font-bold">
                    Share Files directly using Peer to Peer without sending it to the sever.
                </h1>
                <div className="features-container">
                    <div>File Transfer</div>
                    <div>Direct Message</div>
                    <div>Video/Audio Call</div>
                </div>
            </main>
            <footer className="h-10 grid place-content-center text-center bg-primary text-white">
                @Copyright Share World
            </footer>
        </article>
    );
};
