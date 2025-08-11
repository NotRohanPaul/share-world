import type { AxiosResponse } from "axios";
import { axiosInstance } from "../axios-instance";
import { friendRequestEndpoints } from "../endpoints/api-endpoints";

export const sendRequestHandler = (data: string): Promise<AxiosResponse> => {
    const res = axiosInstance.post(friendRequestEndpoints.send, data);
    return res;
};

export const acceptRequestHandler = (data: string): Promise<AxiosResponse> => {
    const res = axiosInstance.post(friendRequestEndpoints.accept, data);
    return res;
};

export const rejectRequestHandler = (data: string): Promise<AxiosResponse> => {
    const res = axiosInstance.post(friendRequestEndpoints.reject, data);
    return res;
};

export const deleteRequestHandler = (data: string): Promise<AxiosResponse> => {
    const res = axiosInstance.post(friendRequestEndpoints.delete, data);
    return res;
};

export const blockRequestHandler = (data: string): Promise<AxiosResponse> => {
    const res = axiosInstance.post(friendRequestEndpoints.block, data);
    return res;
};