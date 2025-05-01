import ShareWorldIcon from "@src/assets/share-world.png";
import { Link } from "react-router";

export const LandingPage = () => {
    return (
        <article className="grid grid-rows-[auto_1fr_1fr]">
            <header className="h-15 flex justify-between items-center p-1 bg-blue-500">
                <Link to={"/"} className="bg-white rounded-full overflow-hidden">
                    <img
                        className=""
                        src={ShareWorldIcon}
                        alt="Share World"
                        width={50}
                        height={20}
                    />
                </Link>
                <nav className="">
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
            <main className="text-center">
                <h1 className="text-2xl">Share Files directly using Peer to Peer without sending it to ther sever.</h1>
            </main>
            <footer className="h-10 bg-blue-500">
                <i className="inline-block text-center align-middle  text-white">
                    @Copyright Share World
                </i>
            </footer>
        </article>
    );
};
