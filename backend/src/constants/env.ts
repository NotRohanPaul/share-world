const getEnv = (key: string, defaultValue?: string): string => {
    if (process.env[key] !== undefined && process.env[key] !== '')
        return process.env[key];

    if (defaultValue !== undefined) {
        return defaultValue;
    }

    throw new Error("Environment variables not present.");
};

export const PORT = Number(getEnv("PORT", "5000"));
export const MONGO_URI = getEnv("MONGO_URI");
export const JWT_SECRET = getEnv("JWT_SECRET", '');
export const NODE_ENV = getEnv("NODE_ENV", 'production');
export const APP_URL = getEnv("APP_URL", "self");