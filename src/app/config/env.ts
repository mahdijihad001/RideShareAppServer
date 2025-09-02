import dotEnv from "dotenv";
dotEnv.config();

interface IEnv {
    PORT: string,
    MONGO_URI: string,
    DEV_ENVIRONMENT: string,
    JWT: {
        ACCESS_SECRATE: string,
        REFRESH_SECRATE: string
    }
};

const loadEnvironmentVariables = (): IEnv => {

    const requiredEnv: string[] = ["PORT", "MONGO_URI", "ACCESS_SECRATE", "REFRESH_SECRATE"];

    requiredEnv.forEach((key) => {
        if (!process.env[key]) {
            throw new Error(`Required env mission : ${key}`);
        }
    });

    return {
        PORT: process.env.PORT as string,
        MONGO_URI: process.env.MONGO_URI as string,
        DEV_ENVIRONMENT: process.env.DEV_ENVIRONMENT as string,
        JWT: {
            ACCESS_SECRATE: process.env.ACCESS_SECRATE as string,
            REFRESH_SECRATE: process.env.REFRESH_SECRATE as string
        }
    }
};

export const envVars = loadEnvironmentVariables();