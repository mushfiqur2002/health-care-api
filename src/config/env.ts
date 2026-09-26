import dotenv from "dotenv"

dotenv.config()

interface EnvConfig {
    PORT: string,
    DATABASE_URL: string,
    BETTER_AUTH_SECRET: string,
    BETTER_AUTH_URL: string,
}

const loadEnviromentVars = (): EnvConfig => {
    return {
        PORT: process.env.PORT as string,
        DATABASE_URL: process.env.DATABASE_URL as string,
        BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET as string,
        BETTER_AUTH_URL: process.env.BETTER_AUTH_URL as string
    }
}

export const envVars = loadEnviromentVars();