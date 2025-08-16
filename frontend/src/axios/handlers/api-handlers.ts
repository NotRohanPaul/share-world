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


export type NoBodyHandlerType<TResponse = unknown> = (config?: AxiosRequestConfig) => Promise<AxiosResponse<TResponse>>;

export type WithBodyHandlerType<TRequest = unknown, TResponse = unknown> = (data: TRequest, config?: AxiosRequestConfig) => Promise<AxiosResponse<TResponse>>;

export type HandlerFunctionType<
    TMethod extends Method,
    TRequest,
    TResponse
> = TMethod extends "get" | "head" | "options"
    ? NoBodyHandlerType<TResponse>
    : WithBodyHandlerType<TRequest, TResponse>;

type HandlerReturnType<
    T extends Record<string, EndpointConfigType>,
    TRequest,
    TResponse
> = {
        [K in keyof T]: HandlerFunctionType<T[K]["method"], TRequest, TResponse>;
    };

const createHandler = <
    T extends Record<string, EndpointConfigType>,
    TRequest,
    TResponse
>(
    endpoints: T
): HandlerReturnType<T, TRequest, TResponse> => {
    const result = {} as HandlerReturnType<T, TRequest, TResponse>;
    const endpointsKeysList = Object.keys(endpoints) as Array<keyof T>;

    endpointsKeysList.forEach((key) => {
        const { method, url } = endpoints[key];

        result[key] = (
            dataOrConfig?: AxiosRequestConfig | TRequest,
            maybeConfig?: AxiosRequestConfig
        ): Promise<AxiosResponse<TResponse>> => {
            if (["get", "delete", "head", "options"].includes(method.toLowerCase())) {
                return axiosInstance.request({
                    method,
                    url,
                    ...dataOrConfig
                });
            } else {
                return axiosInstance.request({
                    method,
                    url,
                    data: dataOrConfig,
                    ...maybeConfig
                });
            }
        };
    });

    return result;
};

export const apiHandlers = {
    auth: createHandler(authEndpoints),
    friendList: createHandler(friendListEndpoints),
    friendRequest: createHandler(friendRequestEndpoints),
};
