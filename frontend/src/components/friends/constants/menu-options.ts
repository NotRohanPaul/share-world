import { AppIcons } from "@src/assets/icons";
import { apiHandlers } from "@src/axios/handlers/api-handlers";

export const friendsMenuButtons = ["friends", "requests", "blocks"] as const;


export const userMenuOptions = {
    "friends": [{
        name: "Unfriend",
        Icon: AppIcons.UnFriend,
        handler: apiHandlers.friendActions.unfriend
    }, {
        name: "Block",
        Icon: AppIcons.Block,
        handler: apiHandlers.friendActions.blockFriend
    }],
    "requests-sent": [{
        name: "Delete",
        Icon: AppIcons.Delete,
        handler: apiHandlers.friendRequest.delete
    }],
    "requests-received": [{
        name: "Accept",
        Icon: AppIcons.Check,
        handler: apiHandlers.friendRequest.accept
    }, {
        name: "Reject",
        Icon: AppIcons.Reject,
        handler: apiHandlers.friendRequest.reject
    }, {
        name: "Block",
        Icon: AppIcons.Block,
        handler: apiHandlers.friendRequest.block
    }],
    "blocks": [{
        name: "Unblock",
        Icon: AppIcons.UnBlock,
        handler: apiHandlers.friendActions.unblockUser
    }]
};