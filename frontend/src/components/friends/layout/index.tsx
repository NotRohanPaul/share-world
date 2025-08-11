import {
    listBlocksHandler,
    listFriendsHandler,
    listReceivedRequestsHandler,
    listSentRequestsHandler
} from "@src/axios/handlers/friend-list-handlers";
import { useState, type MouseEvent } from "react";
import { UserInfo } from "../ui/user-info";
import { useQueries } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

const menuButtons = ["friends", "requests", "blocks"] as const;
type menuButtonType = typeof menuButtons[number];

export const FriendsMain = () => {
    const [activeMenuType, setActiveMenuType] = useState<menuButtonType>("friends");
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
                queryFn: safeQuery(listFriendsHandler),
                enabled: activeMenuType === "friends"
            },
            {
                queryKey: ["blocks"],
                queryFn: safeQuery(listBlocksHandler),
                enabled: activeMenuType === "blocks"
            },
            {
                queryKey: ["requests", "received"],
                queryFn: safeQuery(listReceivedRequestsHandler),
                enabled: activeMenuType === "requests"
            },
            {
                queryKey: ["requests", "sent"],
                queryFn: safeQuery(listSentRequestsHandler),
                enabled: activeMenuType === "requests"
            }
        ]
    });

    const friendsQuery = results[0] as { data?: AxiosResponse; isLoading: boolean; refetch: () => void; };
    const blocksQuery = results[1] as { data?: AxiosResponse; isLoading: boolean; refetch: () => void; };
    const receivedQuery = results[2] as { data?: AxiosResponse; isLoading: boolean; refetch: () => void; };
    const sentQuery = results[3] as { data?: AxiosResponse; isLoading: boolean; refetch: () => void; };

    const handleMenuClick = (e: MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLButtonElement;
        if (target.tagName !== "BUTTON") return;
        const value = target.value as menuButtonType;
        if (menuButtons.includes(value) === false) return;
        setActiveMenuType(value);
        void handleFetch();
    };

    const handleFetch = () => {
        if (activeMenuType === "friends") {
            friendsQuery.refetch();
        } else if (activeMenuType === "blocks") {
            blocksQuery.refetch();
        } else if (activeMenuType === "requests") {
            receivedQuery.refetch();
            sentQuery.refetch();
        }
    };


    return (
        <section className="w-full h-full grid grid-rows-[auto_1fr] place-items-center gap-10">
            <header className="text-4xl font-semibold p-2">
                Friends
            </header>
            <main className="w-full h-full flex flex-col items-center gap-2">
                <header className="flex gap-2"
                    onClick={handleMenuClick}
                >{
                        menuButtons.map((menuName, i) => {
                            return (
                                <button key={i} className={`${menuName === activeMenuType ? "text-black cursor-auto" : "text-primary outline-2 outline-primary"} p-2 text-xl font-semibold`}
                                    value={menuName}
                                >
                                    {
                                        menuName[0].toUpperCase()
                                        +
                                        menuName.slice(1)
                                    }
                                </button>
                            );
                        })
                    }
                </header>
                <main className="w-[500px] max-md:w-[80%] max-xs:w-full h-full flex flex-col gap-2 outline-2 outline-primary shadow-2xl p-2 overflow-auto">
                    {activeMenuType === "friends" && (
                        <>
                            {friendsQuery.isLoading && <p>Loading friends...</p>}
                            {friendsQuery.data?.data && <UserInfo data={friendsQuery.data.data} />}
                        </>
                    )}

                    {activeMenuType === "blocks" && (
                        <>
                            {blocksQuery.isLoading && <p>Loading blocks...</p>}
                            {blocksQuery.data?.data && <UserInfo data={blocksQuery.data.data} />}
                        </>
                    )}

                    {activeMenuType === "requests" && (
                        <>
                            {receivedQuery.isLoading && <p>Loading received...</p>}
                            {sentQuery.isLoading && <p>Loading sent...</p>}
                            {receivedQuery.data?.data && <UserInfo data={receivedQuery.data.data} />}
                            {sentQuery.data?.data && <UserInfo data={sentQuery.data.data} />}
                        </>
                    )}
                </main>
            </main>
        </section >
    );
};