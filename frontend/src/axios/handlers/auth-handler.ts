import type { LoginSchemaType } from "@src/types";
import { axiosInstance } from "../axios-instance";
import { authEndpoints } from "../../constants/api-endpoints";
import type { AxiosResponse } from "axios";


export const loginHandler = async (data: LoginSchemaType): Promise<AxiosResponse> => {
  const res = await axiosInstance.post(authEndpoints.login, data);
  return res;
};


export const logoutHandler = async (): Promise<AxiosResponse> => {
  const res = await axiosInstance.get(authEndpoints.logout);
  return res;
};


export const signupHandler = async (data: LoginSchemaType): Promise<AxiosResponse> => {
  const res = await axiosInstance.post(authEndpoints.signup, data);
  return res;
};

