import type { AxiosResponse } from "axios";
import { axiosInstance } from "../axios-instance";
import { friendListEndpoints } from "../endpoints/api-endpoints";


export const listFriendsHandler = (): Promise<AxiosResponse> => {
    const res = axiosInstance.get(friendListEndpoints.friends);
    return res;
};

export const listBlocksHandler = (): Promise<AxiosResponse> => {
    const res = axiosInstance.get(friendListEndpoints.blocks);
    return res;
};
export const listSentRequestsHandler = (): Promise<AxiosResponse> => {
    const res = axiosInstance.get(friendListEndpoints.sentRequests);
    return res;
};
export const listReceivedRequestsHandler = (): Promise<AxiosResponse> => {
    const res = axiosInstance.get(friendListEndpoints.receivedRequests);
    return res;
};