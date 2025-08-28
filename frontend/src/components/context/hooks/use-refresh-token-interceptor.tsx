import { useEffect } from "react";
import type { AxiosInstance, AxiosResponse } from "axios";
import { HTTP_STATUS_CODES } from "@src/constants/http-status-codes";
import { useToastConsumer } from "@src/components/common/ui/toast/context/toasts-consumer";

export const useRefreshTokenInterceptor = (axiosInstance: AxiosInstance) => {
    const showToast = useToastConsumer();

    useEffect(() => {
        const onFulfilled = async (response: AxiosResponse): Promise<AxiosResponse> => {
            if (response.config.url?.includes("/auth/refresh-token")) {
                console.log("Same Refresh");
                return response;
            }

            if (response.status === HTTP_STATUS_CODES.UNAUTHORIZED) {
                try {
                    console.log("Refreshing token");
                    const refreshResponse = await axiosInstance.get("/auth/refresh-token");
                    if (refreshResponse.status === HTTP_STATUS_CODES.UNAUTHORIZED) {
                        showToast({ text: "Session expired. Please login again" });
                    }
                } catch {
                    showToast({ text: "Network Error" });
                    return response;
                }
            }

            return response;
        };

        const interceptor = axiosInstance.interceptors.response.use(onFulfilled);

        return () => {
            axiosInstance.interceptors.response.eject(interceptor);
        };
    }, [axiosInstance, showToast]);
};
