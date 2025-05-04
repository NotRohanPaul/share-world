const getEnv = (key: string, defaultValue?: string): string => {
    if (import.meta.env[key] !== undefined)
        return import.meta.env[key];

    if (defaultValue !== undefined) {
        return defaultValue;
    }

    throw new Error("Environment variables not present.");
};

export const API_URL = getEnv("VITE_API_URL", "/");
export const APP_ENV = import.meta.env.MODE;