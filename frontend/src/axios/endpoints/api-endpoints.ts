export const authEndpoints = {
    signup: "/auth/signup",
    login: "/auth/login",
    logout: "/auth/logout",
};

export const friendListEndpoints = {
    sentRequests: "/friend/list/sent-requests",
    receivedRequests: "/friend/list/received-requests",
    blocks: "/friend/list/blocks",
    friends: "/friend/list/friends",
};

export const friendRequestEndpoints = {
    send: "/friend/request/send",
    delete: "/friend/request/delete",
    reject: "/friend/request/reject",
    accept: "/friend/request/accept",
    block: "/friend/request/block",
};
