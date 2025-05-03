import { AuthPage } from "@src/pages/auth-page";
import { LandingPage } from "@src/pages/landing-page";
import { createBrowserRouter, RouterProvider } from "react-router";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />
    },
    {
        path: "/auth",
        element: <AuthPage />
    }
]);

export const AppRouter = () => {
    return <RouterProvider router={router} />;
};