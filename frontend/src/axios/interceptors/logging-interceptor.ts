import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";


export const loggingRequestInterceptor = {
    onFulfilled: (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        console.log("Request:", config);
        return config;
    },
    onRejected: (error: unknown): Promise<unknown> => {
        console.error("Request error:", error);
        return Promise.reject(error);
    },
};

export const loggingResponseInterceptor = {
    onFulfilled: (response: AxiosResponse): AxiosResponse => {
        console.log("Response:", response);
        return response;
    },
    onRejected: (error: unknown): Promise<unknown> => {
        console.error("Response error:", error);
        return Promise.reject(error);
    },
};