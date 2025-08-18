import { UnauthorizedPage } from "@src/pages/unauthorized-page";
import { authSelectors } from "@src/redux/slices/auth";
import { useAppSelector } from "@src/redux/utils/hooks";
import { Outlet } from "react-router";

export const ProtectedRoute = () => {
    const userState = useAppSelector(authSelectors.user);

    if (userState.type !== "auth-user")
        return <UnauthorizedPage />;

    return <Outlet />;
};