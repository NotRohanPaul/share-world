import { apiHandlers } from "@src/axios/handlers/api-handlers";
import { useToastConsumer } from "@src/components/common/ui/toast/context/toasts-consumer";
import { HTTP_STATUS_CODES } from "@src/constants/http-status-codes";
import { shareActions } from "@src/redux/slices/share";
import { useAppDispatch } from "@src/redux/utils/hooks";
import { shareToFriendSocketInstance } from "@src/sockets/socket-instances";
import { useEffect, useRef } from "react";
import type { Socket } from "socket.io-client";


export const useSenderFriendSocket = () => {
    const socketRef = useRef<Socket | null>(null);
    const dispatch = useAppDispatch();
    const showToast = useToastConsumer();

    useEffect(() => {
        const socket = shareToFriendSocketInstance.connect();
        socketRef.current = socket;

        socket.on("connect", () => {
            console.log("connected");
            socket.emit("online-friends-list-server");
        });

        socket.on("connect_error", async (err) => {
            console.log("Connection error:", { err });
            if (err.message === "Unautorized Access") {
                try {
                    console.log("Refreshing token");
                    const refreshResponse = await apiHandlers.auth.refresh();
                    if (refreshResponse.status === HTTP_STATUS_CODES.UNAUTHORIZED) {
                        showToast({ text: "Session expired. Please login again" });
                    }
                } catch {
                    showToast({ text: "Network Error" });
                }
            }
        });


        socket.on("online-friends-list-client", ({
            onlineFriendsList
        }: {
            onlineFriendsList: Record<string, string>[];
        }) => {
            console.log(onlineFriendsList);
            dispatch(shareActions
                .shareToFriend
                .setOnlineFriendsList(
                    onlineFriendsList
                ));
        });

        /* socket.on("receiver-friend-conformation-client", () => {
           
        }); */

        return () => {
            socket.disconnect();
        };

    }, []);

    return {
        socketRef
    };
};