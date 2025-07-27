import { API_ORIGIN } from "@src/constants/env";
import { APP_TIMEOUTS } from "@src/constants/timeouts";
import axios from "axios";
import { loggingRequestInterceptor, loggingResponseInterceptor } from "./interceptors/logging-interceptor";
import { createRefreshTokenInterceptor } from "./interceptors/refresh-token-interceptor";

export const axiosInstance = axios.create({
    baseURL: API_ORIGIN + "/api/v1",
    withCredentials: true,
    validateStatus: () => true,
    timeout: APP_TIMEOUTS.axiosResponseTimeout,
});

axiosInstance.interceptors.request.use(
    loggingRequestInterceptor.onFulfilled,
    loggingRequestInterceptor.onRejected,
);

axiosInstance.interceptors.response.use(
    loggingResponseInterceptor.onFulfilled,
    loggingResponseInterceptor.onRejected,
);

const refreshTokenInterceptor = createRefreshTokenInterceptor(axiosInstance);
axiosInstance.interceptors.response.use(
    refreshTokenInterceptor.onFulfilled
);