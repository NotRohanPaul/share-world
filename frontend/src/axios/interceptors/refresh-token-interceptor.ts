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
            type ResponseWithRetryType = AxiosResponse & { _retry: boolean; };
            if (response.status === HTTP_STATUS_CODES.UNAUTHORIZED && (response as ResponseWithRetryType)._retry === false) {
                try {
                    (response as ResponseWithRetryType)._retry = true;

                    await axiosInstance.get("/auth/refresh-token");

                    return axiosInstance(response.config);
                } catch {
                    return response;
                }
            }

            return response;
        },
    };
};
