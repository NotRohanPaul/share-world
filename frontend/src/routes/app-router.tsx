import { AuthPage } from "@src/pages/auth-page";
import { ErrorPage } from "@src/pages/error-page";
import { LandingPage } from "@src/pages/landing-page";
import { NotFoundPage } from "@src/pages/not-found";
import { UserPage } from "@src/pages/user-page";
import { createBrowserRouter, RouterProvider } from "react-router";

const router = createBrowserRouter([
    {
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <LandingPage />,
            },
            {
                path: "auth",
                element: <AuthPage />
            },
            {
                path: "user",
                element: <UserPage />
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