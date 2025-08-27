import { useFriendsQueries } from "../hooks/useFriendsQueries";
import { FriendPaneQueryResult } from "../ui/friends/friends-pane-query-result";
import { SendRequestBtn } from "../ui/requests/send-request-btn";

export const FriendsPane = () => {
    const {
        activeMenuState,
        friendsQuery,
        blocksQuery,
        receivedQuery,
        sentQuery
    } = useFriendsQueries();

    return (
        <section className="h-[75dvh] max-xs:h-[70dvh] flex flex-col gap-2 outline-2 outline-primary dark:outline-secondary p-2 pb-4">
            {activeMenuState === "friends" && (
                <FriendPaneQueryResult queryResult={friendsQuery} />
            )}

            {activeMenuState === "blocks" && (
                <FriendPaneQueryResult queryResult={blocksQuery} />
            )}

            {activeMenuState === "requests" && (
                <div className="h-full flex flex-col gap-2">
                    <div className="h-[50%] flex flex-col gap-2">
                        <h2 className="text-2xl max-xs:text-xl font-semibold text-primary dark:text-secondary">
                            Received Requests
                        </h2>
                        <FriendPaneQueryResult queryResult={receivedQuery} />
                    </div>
                    <div className="h-[50%] flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl max-xs:text-xl font-semibold text-primary dark:text-secondary">
                                Sent Requests
                            </h2>
                            <SendRequestBtn className="self-end" />
                        </div>
                        <FriendPaneQueryResult queryResult={sentQuery} />
                    </div>
                </div>
            )}
        </section>
    );
};;