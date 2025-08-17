import { FriendsMenu } from "./layout/friends-menu";
import { FriendsPane } from "./layout/friends-pane";

export const FriendsMain = () => {
    return (
        <section className="w-full h-full grid grid-rows-[auto_1fr] place-items-center gap-5">
            <header className="text-5xl max-xs:text-4xl font-semibold">
                Friends
            </header>
            <main className="w-full h-full flex flex-col items-center gap-2">
                <header>
                    <FriendsMenu />
                </header>
                <main className="w-[700px] max-md:w-[90%] max-xs:w-full h-full">
                    <FriendsPane />
                </main>
            </main>
        </section >
    );
};