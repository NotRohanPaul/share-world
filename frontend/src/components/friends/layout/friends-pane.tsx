import { apiHandlers } from "@src/axios/handlers/api-handlers";
import { useAppSelector } from "@src/redux/hooks";
import { friendsSelectors } from "@src/redux/slices/friends";
import { useQueries } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { useEffect } from "react";
import { SendRequestBtn } from "../ui/send-request-btn";
import { UserInfo } from "../ui/user-info";

export const FriendsPane = () => {
    const activeMenuState = useAppSelector(friendsSelectors.friendsMenu);

    const safeQuery = (fn: () => Promise<AxiosResponse>) => async () => {
        const res = await fn();
        if (res.status !== 200 && res.status !== 304) {
            throw new Error(`Unexpected status: ${res.status}`);
        }
        return res;
    };

    const results = useQueries({
        queries: [
            {
                queryKey: ["friends"],
                queryFn: safeQuery(apiHandlers.friendList.friends),
                enabled: activeMenuState === "friends"
            },
            {
                queryKey: ["blocks"],
                queryFn: safeQuery(apiHandlers.friendList.blocks),
                enabled: activeMenuState === "blocks"
            },
            {
                queryKey: ["requests", "received"],
                queryFn: safeQuery(apiHandlers.friendList.receivedRequests),
                enabled: activeMenuState === "requests"
            },
            {
                queryKey: ["requests", "sent"],
                queryFn: safeQuery(apiHandlers.friendList.sentRequests),
                enabled: activeMenuState === "requests"
            }
        ]
    });

    const friendsQuery = results[0] as { data?: AxiosResponse; isLoading: boolean; refetch: () => void; };
    const blocksQuery = results[1] as { data?: AxiosResponse; isLoading: boolean; refetch: () => void; };
    const receivedQuery = results[2] as { data?: AxiosResponse; isLoading: boolean; refetch: () => void; };
    const sentQuery = results[3] as { data?: AxiosResponse; isLoading: boolean; refetch: () => void; };

    useEffect(() => {
        const handleFetch = () => {
            if (activeMenuState === "friends") {
                friendsQuery.refetch();
            } else if (activeMenuState === "blocks") {
                blocksQuery.refetch();
            } else if (activeMenuState === "requests") {
                receivedQuery.refetch();
                sentQuery.refetch();
            }
        };
        handleFetch();
    }, [activeMenuState]);

    return (
        <div> {activeMenuState === "friends" && (
            <>
                {friendsQuery.isLoading && <p>Loading friends...</p>}
                {friendsQuery.data?.data && <UserInfo data={friendsQuery.data.data} />}
            </>
        )}

            {activeMenuState === "blocks" && (
                <>
                    {blocksQuery.isLoading && <p>Loading blocks...</p>}
                    {blocksQuery.data?.data && <UserInfo data={blocksQuery.data.data} />}
                </>
            )}

            {activeMenuState === "requests" && (
                <>
                    <SendRequestBtn />
                    {receivedQuery.isLoading && <p>Loading received...</p>}
                    {sentQuery.isLoading && <p>Loading sent...</p>}
                    {receivedQuery.data?.data && <UserInfo data={receivedQuery.data.data} />}
                    {sentQuery.data?.data && <UserInfo data={sentQuery.data.data} />}
                </>
            )}
        </div>
    );
};