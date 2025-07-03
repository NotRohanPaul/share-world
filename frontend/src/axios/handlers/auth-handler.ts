import type { LoginSchemaType } from "@src/schemas/auth-schemas";
import type { AxiosResponse } from "axios";
import { axiosInstance } from "../axios-instance";
import { authEndpoints } from "../endpoints/api-endpoints";


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

