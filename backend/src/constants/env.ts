const getEnv = (key: string, defaultValue?: string): string => {
    if (process.env[key] !== undefined && process.env[key] !== '')
        return process.env[key];

    if (defaultValue !== undefined) {
        return defaultValue;
    }

    throw new Error("Environment variables not present.");
};

export const NODE_ENV = getEnv("NODE_ENV", "production");
export const IS_SECURE_ENV = ((): boolean => {
    const insecureEnvs = ["development", "test"];
    return insecureEnvs.includes(NODE_ENV) === false;
})();

export const PORT = Number(getEnv("PORT", "5000"));
export const HOST = getEnv("HOST", "localhost");
export const MONGO_URI = getEnv("MONGO_URI");
export const JWT_SECRET = getEnv("JWT_SECRET");

export const APP_ORIGIN = getEnv("APP_ORIGIN", '');
export const API_ORIGIN = getEnv("API_ORIGIN", '');
export const WS_API_ORIGIN = API_ORIGIN.replace(/^http/, "ws");

