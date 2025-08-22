import { shareActions } from "@src/redux/slices/share";
import { useAppDispatch } from "@src/redux/utils/hooks";
import { shareToFriendSocketInstance } from "@src/sockets/socket-instance";
import { useEffect, useRef } from "react";
import type { Socket } from "socket.io-client";


export const useSenderFriendSocket = () => {
    const socketRef = useRef<Socket | null>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const io = shareToFriendSocketInstance.connect();
        socketRef.current = io;

        io.on("connect", () => {
            console.log("coonected");
        });

        io.on("online-friends-list-client", ({
            onlineFriendsEmailList
        }: {
            onlineFriendsEmailList: string[];
        }) => {
            dispatch(shareActions
                .shareToFriend
                .setOnlineFriendsEmailList(
                    onlineFriendsEmailList
                ));
        });

        io.on("receiver-friend-conformation-client", ({
            onlineFriendsEmailList
        }: {
            onlineFriendsEmailList: string[];
        }) => {
            dispatch(shareActions
                .shareToFriend
                .setOnlineFriendsEmailList(
                    onlineFriendsEmailList
                ));
        });

        return () => {
            io.disconnect();
        };

    }, []);

    return {

    };
};