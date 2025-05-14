import type { LoginSchemaType } from "@src/types";
import { axiosInstance } from "../axios-instance";
import { authEndpoints } from "../endpoints";


export const loginHandler = async (data: LoginSchemaType) => {
  const res = await axiosInstance.post(authEndpoints.login, data);
  return res;
};


export const logoutHandler = async () => {
  const res = await axiosInstance.get(authEndpoints.logout);
  return res.data;
};


export const signupHandler = async (data: LoginSchemaType) => {
  const res = await axiosInstance.post(authEndpoints.signup, data);
  return res;
};

