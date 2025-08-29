import { useEffect } from "react";
import type { AxiosInstance, AxiosResponse } from "axios";
import { HTTP_STATUS_CODES } from "@src/constants/http-status-codes";
import { useToastConsumer } from "@src/components/common/ui/toast/context/toasts-consumer";
import { apiHandlers } from "@src/axios/handlers/api-handlers";
import { apiEndpoints } from "@src/axios/endpoints/api-endpoints";

export const useRefreshTokenInterceptor = (axiosInstance: AxiosInstance) => {
    const showToast = useToastConsumer();

    useEffect(() => {
        const onFulfilled = async (response: AxiosResponse): Promise<AxiosResponse> => {
            if (response.config.url?.includes(apiEndpoints.authEndpoints.refresh.url)) {
                console.log("Same Refresh");
                return response;
            }

            if (response.status === HTTP_STATUS_CODES.UNAUTHORIZED) {
                try {
                    console.log("Refreshing token");
                    const refreshResponse = await apiHandlers.auth.refresh();
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
