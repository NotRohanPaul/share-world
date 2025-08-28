import { axiosInstance } from "@src/axios/axios-instance";
import { useAppApperance } from "@src/components/context/hooks/use-app-appearance";
import { useRefreshTokenInterceptor } from "@src/components/context/hooks/use-refresh-token-interceptor";
import { type PropsWithChildren } from "react";


export const AppContextProvider = ({ children }: PropsWithChildren) => {
    useAppApperance();
    useRefreshTokenInterceptor(axiosInstance);

    return (
        <>
            {children}
        </>
    );
};
