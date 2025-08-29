import { AppIcons } from "@src/assets/icons";
import { shareSelectors } from "@src/redux/slices/share";
import { useAppSelector } from "@src/redux/utils/hooks";


export const OnlineFriendsPane = () => {
    const { onlineFriendsList } = useAppSelector(shareSelectors.shareToFriend);
    const handleRefresh = () => {
        
    };

    return (
        <>
            <header className="flex gap-2">
                <h2>
                    Online Friends
                </h2>
            </header>
            <main className="relative w-[600px] max-sm:w-full h-[65vh] flex flex-col gap-2 overflow-auto p-4 outline outline-primary dark:outline-secondary rounded-sm">
                <button
                    className="absolute top-2 right-2 w-[20px] self-end"
                    onClick={handleRefresh}
                >
                    <AppIcons.Refresh className="w-full" />
                </button>
                <section className="pt-5">
                    {
                        onlineFriendsList.length === 0 ?
                            <p className="text-center text-xl max-sm:text-sm">No Online Friends</p> :
                            onlineFriendsList.map(({ name }, i) => {
                                return (
                                    <div key={`${name} ${i}`} className="flex items-center gap-2 p-2 outline outline-primary dark:outline-secondary rounded-sm">
                                        <div className="w-full flex items-center gap-2">
                                            <AppIcons.Avatar className="w-[50px] text-primary dark:text-secondary" />
                                            <p className="w-[300px] max-sm:w-[200px] text-xl max-sm:text-sm text-nowrap overflow-hidden text-ellipsis">
                                                {name}
                                            </p>
                                        </div>
                                        <button
                                            className="w-[50px] px-2"
                                            title="Send"
                                        >
                                            <AppIcons.Send className="rotate-45 text-primary dark:text-secondary" />
                                        </button>
                                    </div>
                                );
                            })
                    }
                </section>
            </main>
        </>
    );
};