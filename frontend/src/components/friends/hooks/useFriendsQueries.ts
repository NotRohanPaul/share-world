import { apiHandlers } from "@src/axios/handlers/api-handlers";
import { useToastConsumer } from "@src/components/common/ui/toast/context/toasts-consumer";
import { useAppSelector } from "@src/redux/hooks";
import { friendsSelectors } from "@src/redux/slices/friends";
import { useQuery } from "@tanstack/react-query";
import { AxiosError, type AxiosResponse } from "axios";
import { useEffect } from "react";
import type { UserInfoListType } from "../ui/users/user-info";

export const useFriendsQueries = () => {
    const activeMenuState = useAppSelector(friendsSelectors.friendsMenu);
    const showToast = useToastConsumer();

    const safeQuery =
        (fn: () => Promise<AxiosResponse>) =>
            async (): Promise<AxiosResponse<UserInfoListType>> => {
                const res = await fn();
                const status = res.status;
                if (status === 200 || status === 304) {
                    return res;
                }
                if (status === 401) {
                    showToast({
                        text: "Session expired",
                    });
                } else {
                    showToast({
                        text: "Server Error",
                    });
                }
                throw new AxiosError(`Unexpected status: ${res.status}`);
            };

    const friendsQuery = useQuery({
        queryKey: ["friends"],
        queryFn: safeQuery(apiHandlers.friendList.friends),
        enabled: activeMenuState === "friends",
        retry: 1,
    });

    const blocksQuery = useQuery({
        queryKey: ["blocks"],
        queryFn: safeQuery(apiHandlers.friendList.blocks),
        enabled: activeMenuState === "blocks",
        retry: 1,
    });

    const receivedQuery = useQuery({
        queryKey: ["requests", "received"],
        queryFn: safeQuery(apiHandlers.friendList.receivedRequests),
        enabled: activeMenuState === "requests",
        retry: 1,
    });

    const sentQuery = useQuery({
        queryKey: ["requests", "sent"],
        queryFn: safeQuery(apiHandlers.friendList.sentRequests),
        enabled: activeMenuState === "requests",
        retry: 1,
    });

    useEffect(() => {
        if (activeMenuState === "friends") {
            void friendsQuery.refetch();
        } else if (activeMenuState === "blocks") {
            void blocksQuery.refetch();
        } else if (activeMenuState === "requests") {
            void receivedQuery.refetch();
            void sentQuery.refetch();
        }
    }, [activeMenuState]);

    return {
        activeMenuState,
        friendsQuery,
        blocksQuery,
        receivedQuery,
        sentQuery,
    };
};
