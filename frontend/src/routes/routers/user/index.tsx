import { ShareViaFriends } from "@src/components/share-via-friends";
import { ShareViaId } from "@src/components/share-via-id";
import { ReceiverViaIdMain } from "@src/components/share-via-id/receiver/layout/receiver-main";
import { SenderViaIdMain } from "@src/components/share-via-id/sender/layout/sender-main";
import { SenderViaFriendsMain } from "@src/components/share-via-friends/sender/layout/sender-main";
import { ReceiverViaFriendsMain } from "@src/components/share-via-friends/receiver/layout/receiver-main";
import { appRoutes } from "@src/routes/app-routes";
import { FriendsMain } from "@src/components/friends";

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

export const viaFriendsRoutes = [
    {
        path: appRoutes["via-friends"].relative,
        element: <ShareViaFriends />,
    },
    {
        path: appRoutes["via-friends"].send.relative,
        element: <SenderViaFriendsMain />
    },
    {
        path: appRoutes["via-friends"].receive.relative,
        element: <ReceiverViaFriendsMain />
    },
];


export const friendsRoutes = [
    {
        path: appRoutes.friends.relative,
        element: <FriendsMain />,
    },
];