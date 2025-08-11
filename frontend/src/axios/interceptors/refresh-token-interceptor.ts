import type { AxiosInstance, AxiosResponse } from "axios";
import { HTTP_STATUS_CODES } from "@src/constants/http-status-codes";

export const createRefreshTokenInterceptor = (
    axiosInstance: AxiosInstance
): Record<
    "onFulfilled",
    (response: AxiosResponse) => Promise<AxiosResponse>
> => {
    return {
        onFulfilled: async (response: AxiosResponse): Promise<AxiosResponse> => {
            if (response.config.url?.includes("/auth/refresh-token")) {
                console.log("same refresh");
                return response;
            }

            if (response.status === HTTP_STATUS_CODES.UNAUTHORIZED) {
                try {
                    console.log("Refresh Endpoint");
                    await axiosInstance.get("/auth/refresh-token");
                } catch {
                    return response;
                }
            }
            return response;
        },
    };
};
