import { UnauthorizedPage } from "@src/pages/unauthorized-page";
import { authSelectors } from "@src/redux/slices/auth";
import { useAppSelector } from "@src/redux/utils/hooks";
import { type PropsWithChildren } from "react";

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
    const userState = useAppSelector(authSelectors.user);
    if (userState.type !== "auth-user") {
        return (
            <UnauthorizedPage />
        );
    }

    return (
        <>
            {children}
        </>
    );
};