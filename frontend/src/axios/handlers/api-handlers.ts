import type { AxiosRequestConfig, AxiosResponse, Method } from "axios";
import { axiosInstance } from "../axios-instance";
import {
    authEndpoints,
    friendListEndpoints,
    friendRequestEndpoints
} from "../endpoints/api-endpoints";

type EndpointConfigType = {
    method: Method;
    url: string;
};

type HandlerReturnType<T extends Record<string, EndpointConfigType>, TData> = {
    [K in keyof T]: (data?: TData, config?: AxiosRequestConfig) => Promise<AxiosResponse<TData>>;
};

const createHandler = <T extends Record<string, EndpointConfigType>, TData>(
    endpoints: T
): HandlerReturnType<T, TData> => {
    const result = {} as HandlerReturnType<T, TData>;
    const endpointsKeysList = Object.keys(endpoints) as Array<keyof T>;

    endpointsKeysList.forEach((key) => {
        const { method, url } = endpoints[key];

        result[key] = (data, config): Promise<AxiosResponse> => {
            return ["get", "delete", "head", "options"].includes(method.toLowerCase())
                ? axiosInstance.request({ method, url, ...config })
                : axiosInstance.request({ method, url, data, ...config });
        };
    });

    return result;
};

export const apiHandlers = {
    auth: createHandler(authEndpoints),
    friendList: createHandler(friendListEndpoints),
    friendRequest: createHandler(friendRequestEndpoints),
};
