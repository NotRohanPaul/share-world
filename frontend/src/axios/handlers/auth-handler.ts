import type { LoginSchemaType } from "@src/types";
import { axiosInstance } from "../axios-instance";
import { authEndpoints } from "../endpoints";


export const loginHandler = async (data: LoginSchemaType) => {
  try {
    console.log(data);
    const res = await axiosInstance.post(authEndpoints.login, data);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};


export const logoutHandler = async () => {
  try {
    const res = await axiosInstance.get(authEndpoints.logout);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
