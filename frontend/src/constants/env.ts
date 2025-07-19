const getEnv = (key: string, defaultValue?: string): string => {
    if (import.meta.env[key] !== undefined && import.meta.env[key] !== '')
        return import.meta.env[key];

    if (defaultValue !== undefined) {
        return defaultValue;
    }

    throw new Error("Environment variables not present.");
};

export const APP_ENV = import.meta.env.MODE;
export const APP_ORIGIN = getEnv("VITE_APP_ORIGIN", location.origin);
export const API_ORIGIN = getEnv("VITE_API_ORIGIN", APP_ORIGIN);
export const WS_API_ORIGIN = API_ORIGIN.replace(/^http/, "ws");
export const IS_SECURE_ENV = ((): boolean => {
    const insecureEnvs = ["development", "test"];
    return insecureEnvs.includes(APP_ENV) === false;
})();
