import ShareWorldIcon from "@src/assets/share-world.png";
import { Link } from "react-router";

export const LandingPage = () => {

    return (
        <article className="h-[100dvh] grid grid-rows-[auto_1fr_auto]">
            <header className="h-15 flex justify-between items-center p-1 bg-blue-500">
                <Link to={"/"}>
                    <img
                        className="w-10 h-auto aspect-square object-center object-contain p-1 bg-white rounded-full"
                        src={ShareWorldIcon}
                        alt="Share World"
                    />
                </Link>
                <nav className="font-semibold text-white">
                    <div className="flex gap-2">
                        <Link
                            to={"/auth"}
                            children={"Login/Signup"}
                        />
                        <Link
                            to={"/contact"}
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
            <footer className="h-10 grid place-content-center text-center bg-blue-500 text-white">
                @Copyright Share World
            </footer>
        </article>
    );
};
