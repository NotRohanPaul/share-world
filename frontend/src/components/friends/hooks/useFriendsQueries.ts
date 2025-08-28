import { apiHandlers } from "@src/axios/handlers/api-handlers";
import { useAppSelector } from "@src/redux/utils/hooks";
import { friendsSelectors } from "@src/redux/slices/friends";
import { useQuery, type QueryFunctionContext } from "@tanstack/react-query";
import { AxiosError, type AxiosResponse } from "axios";
import { useEffect } from "react";
import type { UserInfoListType } from "../ui/users/user-info";
import { HTTP_STATUS_CODES } from "@src/constants/http-status-codes";

export const useFriendsQueries = () => {
    const activeMenuState = useAppSelector(friendsSelectors.friendsMenu);

    const safeQuery =
        (fn: () => Promise<AxiosResponse>) =>
            async (
                ctx: QueryFunctionContext
            ): Promise<{ key?: string; response: AxiosResponse<UserInfoListType>; }> => {
                const res = await fn();
                const status = res.status;

                if (
                    status === HTTP_STATUS_CODES.OK ||
                    status === HTTP_STATUS_CODES.NOT_MODIFIED
                ) {
                    let queryKey: string | undefined = undefined;
                    if (typeof ctx.queryKey === "string") {
                        queryKey = ctx.queryKey;
                    }
                    else if (Array.isArray(ctx.queryKey) === true) {
                        const isAllString = ctx.queryKey.some((ele) => typeof ele !== "string") === false;
                        if (isAllString === true) {
                            queryKey = ctx.queryKey.join('-');
                        }
                    }
                    return { key: queryKey, response: res };
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
