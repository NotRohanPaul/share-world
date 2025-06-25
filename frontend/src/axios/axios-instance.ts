import { API_ORIGIN } from "@src/constants/env";
import { appLogger } from "@src/utils/common";
import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: API_ORIGIN + "/api/v1",
    withCredentials: true,
    validateStatus: () => true,
    timeout: 10000,
});

axiosInstance.interceptors.request.use(
    config => {
        appLogger.log('Request:', config);
        return config;
    },
    error => {
        appLogger.error('Request error:', error);
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    response => {
        appLogger.log('Response:', response);
        return response;
    },
    error => {
        appLogger.error('Response error:', error);
        return Promise.reject(error);
    }
);