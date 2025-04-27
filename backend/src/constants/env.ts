const getEnv = (key: string, defaultValue?: string): string => {
    if (process.env[key] !== undefined)
        return process.env[key];

    return defaultValue ?? "";
};

export const PORT = Number(getEnv("PORT", "5000"));
export const MONGO_URI = getEnv("MONGO_URI");
export const JWT_SECRET = getEnv("JWT_SECRET", '');
export const NODE_ENV = getEnv("NODE_ENV", 'PRODUCTION');