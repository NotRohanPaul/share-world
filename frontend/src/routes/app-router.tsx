import { AuthPage } from "@src/pages/auth-page";
import { ErrorPage } from "@src/pages/error-page";
import { LandingPage } from "@src/pages/landing-page";
import { NotFoundPage } from "@src/pages/not-found";
import { SettingsPage } from "@src/pages/settings-page";
import { UserPage } from "@src/pages/user-page";
import { createBrowserRouter, RouterProvider } from "react-router";
import { appRoutes } from "./app-routes";
import { ProtectedRoute } from "./containers/protected-route";
import {
    friendsRoutes,
    toFriendsRoutes,
    viaIdRoutes
} from "./routers/user/user-routes";

const router = createBrowserRouter([
    {
        errorElement: <ErrorPage />,
        children: [
            {
                path: appRoutes.home.absolute,
                element: <LandingPage />,
            },
            {
                path: appRoutes.settings.absolute,
                element: <SettingsPage />,
            },
            {
                path: appRoutes.signup.absolute,
                element: <AuthPage />
            },
            {
                path: appRoutes.login.absolute,
                element: <AuthPage />
            },
            {
                path: appRoutes.user.absolute,
                element: <UserPage />,
                children: [
                    ...viaIdRoutes,
                    {
                        element: <ProtectedRoute />,
                        children: [
                            ...friendsRoutes,
                            ...toFriendsRoutes,
                        ]
                    }]
            },
            {
                path: "*",
                element: <NotFoundPage />
            }
        ]
    },
]);

export const AppRouter = () => {
    return <RouterProvider router={router} />;
};