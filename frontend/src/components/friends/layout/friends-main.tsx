import { FriendsMenu } from "../ui/friends-menu";
import { FriendsPane } from "./friends-pane";

export const FriendsMain = () => {
    return (
        <section className="w-full h-full grid grid-rows-[auto_1fr] place-items-center gap-10">
            <header className="text-4xl font-semibold p-2">
                Friends
            </header>
            <main className="w-full h-full flex flex-col items-center gap-2">
                <header className="flex gap-2">
                    <FriendsMenu />
                </header>
                <main className="w-[500px] max-md:w-[80%] max-xs:w-full h-full flex flex-col gap-2 outline-2 outline-primary shadow-2xl p-2 overflow-auto">
                    <FriendsPane />
                </main>
            </main>
        </section >
    );
};