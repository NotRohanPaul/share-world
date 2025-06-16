import { ReceiveFiles } from "@src/components/user/ui/receive-files";
import { SendFiles } from "@src/components/user/ui/send-files";
import { AuthPage } from "@src/pages/auth-page";
import { ErrorPage } from "@src/pages/error-page";
import { LandingPage } from "@src/pages/landing-page";
import { NotFoundPage } from "@src/pages/not-found";
import { UserPage } from "@src/pages/user-page";
import { createBrowserRouter, RouterProvider } from "react-router";
import { appRoutes } from "./app-routes";


const router = createBrowserRouter([
    {
        errorElement: <ErrorPage />,
        children: [
            {
                path: appRoutes.home.absolute,
                element: <LandingPage />,
            },
            {
                path: appRoutes.login.absolute,
                element: <AuthPage />
            },
            {
                path: appRoutes.logout.absolute,
                element: <AuthPage />
            },
            {
                path: appRoutes.user.absolute,
                element: <UserPage />,
                children: [
                    {
                        path: appRoutes.user.send.relative,
                        element: <SendFiles />
                    },
                    {
                        path: appRoutes.user.receive.relative,
                        element: <ReceiveFiles />
                    }
                ]
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