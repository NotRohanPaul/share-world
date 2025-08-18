export const appRoutes = {
    home: {
        relative: "",
        absolute: "/"
    },
    settings: {
        relative: "settings",
        absolute: "/settings"
    },
    login: {
        relative: "login",
        absolute: "/login"
    },
    signup: {
        relative: "signup",
        absolute: "/signup"
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
    "to-friend": {
        relative: "to-friend",
        absolute: "/user/to-friend",
        send: {
            relative: "to-friend/send",
            absolute: "/user/to-friend/send"
        },
        receive: {
            relative: "to-friend/receive",
            absolute: "/user/to-friend/receive"
        }
    }
} as const;
