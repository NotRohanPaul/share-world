const getEnv = (key: string, defaultValue?: string): string => {
    if (process.env[key] !== undefined)
        return process.env[key];

    return defaultValue ?? "";
};

export const MONGO_URI = getEnv("MONGO_URI");
export const PORT = Number(getEnv("PORT", "5000"));