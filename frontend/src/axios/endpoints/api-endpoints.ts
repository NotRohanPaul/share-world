export const apiEndpoints = {
    authEndpoints: {
        signup: { method: "post", url: "/auth/signup" },
        login: { method: "post", url: "/auth/login" },
        logout: { method: "get", url: "/auth/logout" },
        refresh: { method: "get", url: "/auth/refresh-token" },
    },
    friendListEndpoints: {
        sentRequests: { method: "get", url: "/friend/list/sent-requests" },
        receivedRequests: { method: "get", url: "/friend/list/received-requests" },
        blocks: { method: "get", url: "/friend/list/blocks" },
        friends: { method: "get", url: "/friend/list/friends" },
    },
    friendRequestEndpoints: {
        send: { method: "post", url: "/friend/request/send" },
        delete: { method: "delete", url: "/friend/request/delete" },
        reject: { method: "post", url: "/friend/request/reject" },
        accept: { method: "post", url: "/friend/request/accept" },
        block: { method: "post", url: "/friend/request/block" },
    },
    friendActionsEndpoints: {
        unfriend: { method: "post", url: "/friend/actions/unfriend" },
        blockFriend: { method: "post", url: "/friend/actions/block-friend" },
        unblockUser: { method: "post", url: "/friend/actions/unblock-user" },
    },
} as const;




