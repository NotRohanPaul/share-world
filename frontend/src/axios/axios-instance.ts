import { API_URL } from "@src/constants/env";
import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: API_URL + "/api/v1",
    withCredentials: true,
});