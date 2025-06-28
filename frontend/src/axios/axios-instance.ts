import { API_ORIGIN } from "@src/constants/env";
import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: API_ORIGIN + "/api/v1",
    withCredentials: true,
    validateStatus: () => true,
    timeout: 100000,
});

axiosInstance.interceptors.request.use(
    config => {
        console.log('Request:', config);
        return config;
    },
    error => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    response => {
        console.log('Response:', response);
        return response;
    },
    error => {
        console.error('Response error:', error);
        return Promise.reject(error);
    }
);