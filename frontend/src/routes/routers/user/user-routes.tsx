import { ShareToFriend } from "@src/components/share-to-friend/share-to-friend";
import { ShareViaId } from "@src/components/share-via-id/share-via-id";
import { ReceiverViaIdMain } from "@src/components/share-via-id/receiver/layout/receiver-main";
import { SenderViaIdMain } from "@src/components/share-via-id/sender/layout/sender-main";
import { SenderToFriendMain } from "@src/components/share-to-friend/sender/layout/sender-friend-main";
import { ReceiverToFriendMain } from "@src/components/share-to-friend/receiver/layout/receiver-main";
import { appRoutes } from "@src/routes/app-routes";
import { FriendsMain } from "@src/components/friends/friends-main";

export const viaIdRoutes = [
    {
        path: appRoutes["via-id"].relative,
        element: <ShareViaId />,
    },
    {
        path: appRoutes["via-id"].send.relative,
        element: <SenderViaIdMain />
    },
    {
        path: appRoutes["via-id"].receive.relative,
        element: <ReceiverViaIdMain />
    },
];

export const toFriendsRoutes = [
    {
        path: appRoutes["to-friend"].relative,
        element: <ShareToFriend />,
    },
    {
        path: appRoutes["to-friend"].send.relative,
        element: <SenderToFriendMain />
    },
    {
        path: appRoutes["to-friend"].receive.relative,
        element: <ReceiverToFriendMain />
    },
];


export const friendsRoutes = [
    {
        path: appRoutes.friends.relative,
        element: <FriendsMain />,
    },
];