import { UsersModel } from "@src/models/core-models";
import type { FriendPairSocketType } from "../types/share-to-friend-types";
import { appLogger } from "@src/configs/app-logger";


export const friendPairEventsHandler = (
    socket: FriendPairSocketType,
    onlineUsers: Map<string, FriendPairSocketType>
): void => {
    const userEmail = socket.data.context?.auth?.email;
    if (userEmail === undefined) {
        return void socket.emit("error", { message: "No Auth Email" });
    }

    const userOnlineFriendsList: Map<string, { name: string, email: string, }[]> = new Map();

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

        const results = onlineFriends.map((friend) => {
            return {
                name: friend.name,
                email: friend.email,
            };
        });

        userOnlineFriendsList.set(userEmail, results);
        appLogger.info(results);
        socket.emit("online-friends-list-client", { onlineFriendsList: results });
    });

    socket.on("send-pair-request-server", ({ receiverEmail }) => {
        const isFriendWithSender = !!userOnlineFriendsList.get(userEmail)?.some(({ email }) => email === receiverEmail);

        if (isFriendWithSender === false) {
            return void socket.emit("error", { message: "The email sent is not your friend" });
        }

        socket.emit("pair-request-client", { senderEmail: userEmail });
    });


    socket.on("accept-pair-request-server", ({ senderEmail }) => {
        const isFriendWithReceiver = !!userOnlineFriendsList.get(userEmail)?.some(({ email }) => email === senderEmail);

        if (isFriendWithReceiver === false) {
            return void socket.emit("error", { message: "The email sent is not your friend" });
        }
    });

    socket.on("reject-pair-request-server", ({ senderEmail }) => {
        const isFriendWithReceiver = !!userOnlineFriendsList.get(userEmail)?.some(({ email }) => email === senderEmail);

        if (isFriendWithReceiver === false) {
            return void socket.emit("error", { message: "The email sent is not your friend" });
        }

        const senderSocket = onlineUsers.get(senderEmail);
        if (senderSocket === undefined) {
            return void socket.emit("error", { message: "Failed rejection request" });
        }
        senderSocket.emit("error", { message: "Receiver Rejected Pair Request" });
    });
};