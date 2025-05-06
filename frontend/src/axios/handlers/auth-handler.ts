import type { LoginSchemaType } from "@src/types";
import axios from "axios";
import { authEndpoints } from "../endpoints";


export const loginHandler = async (data: LoginSchemaType) => {
  try {
    console.log(data);
    const res = await axios.post(authEndpoints.login, data);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};


export const logoutHandler = async () => {
  try {
    const res = await axios.get(authEndpoints.logout);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
