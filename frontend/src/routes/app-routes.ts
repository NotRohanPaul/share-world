export const appRoutes = {
    home: {
        relative: "",
        absolute: "/"
    },
    setting: {
        relative: "setting",
        absolute: "/setting"
    },
    contact: {
        relative: "contact",
        absolute: "/contact"
    },
    login: {
        relative: "login",
        absolute: "/login"
    },
    logout: {
        relative: "logout",
        absolute: "/logout"
    },
    user: {
        relative: "user",
        absolute: "/user",
    },
    friends: {
        relative: "friends",
        absolute: "/user/friends",
    },
    "via-id": {
        relative: "via-id",
        absolute: "/user/via-id",
        send: {
            relative: "via-id/send",
            absolute: "/user/via-id/send"
        },
        receive: {
            relative: "via-id/receive",
            absolute: "/user/via-id/receive"
        }
    },
    "via-friends": {
        relative: "via-friends",
        absolute: "/user/via-friends",
        send: {
            relative: "via-friends/send",
            absolute: "/user/via-friends/send"
        },
        receive: {
            relative: "via-friends/receive",
            absolute: "/user/via-friends/receive"
        }
    }
};
