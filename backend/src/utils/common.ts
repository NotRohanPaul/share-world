import { NODE_ENV } from "@src/constants/env";

export const isSecureEnv = (): boolean => {
    const insecureEnvs = ['development', 'test'];
    const isSecure = insecureEnvs.includes(NODE_ENV) === false;

    return isSecure;
};
