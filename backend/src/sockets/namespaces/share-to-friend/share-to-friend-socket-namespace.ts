import { UsersModel } from "@src/models/core-models";
import { logEventInfoSocketEventMiddleware } from "@src/sockets/middlewares/event-middlewares/log-event-info-socket-event.middleware";
import { socketAuthMiddleware } from "@src/sockets/middlewares/socket-middlewares/auth-socket.middleware";
import { socketCookieMiddleware } from "@src/sockets/middlewares/socket-middlewares/cookie-parser-socket.middleware";
import type { Server } from "socket.io";
import type { ShareToFriendNamespaceType } from "./types/share-to-friend-types";


export const shareToFriendNamespace = (io: Server): void => {
    const ns = io
        .of("/share-to-friend")
        .use(socketCookieMiddleware)
        .use(socketAuthMiddleware) as ShareToFriendNamespaceType;

    const onlineUsers = new Map<string, string>();
    ns.on("connection", (socket) => {
        socket.use(logEventInfoSocketEventMiddleware);
        const userEmail = socket.data.context?.auth?.email;
        if (userEmail !== undefined) {
            onlineUsers.set(userEmail, socket.id);
        }

        socket.on("disconnect", () => {
            if (userEmail !== undefined) {
                onlineUsers.delete(userEmail);
            }
        });

        socket.on("online-friends-list-server", async () => {
            const userDoc = await UsersModel.findOne(
                { email: userEmail },
                { friendsEmailList: 1 }
            );
            
            if (userDoc === null) {
                return void socket.emit("online-friends-list-client", { onlineFriendsList: [] });
            }

            const onlineFriendsEmails = userDoc.friendsEmailList.filter(
                (friendEmail: string) => onlineUsers.has(friendEmail)
            );

            const onlineFriends = await UsersModel.find(
                { email: { $in: onlineFriendsEmails } },
                { email: 1, name: 1 }
            );
            console.log(onlineFriends);
            const results = onlineFriends.map((friend) => {
                return {
                    name: friend.name,
                    email: friend.email,
                };
            });

            socket.emit("online-friends-list-client", { onlineFriendsList: results });
        });
    });
};