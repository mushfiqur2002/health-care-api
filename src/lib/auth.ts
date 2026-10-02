import { betterAuth, boolean } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import ms, { StringValue } from "ms";

const sessionExpiresIn = ms(
    (process.env.BETTER_AUTH_SESSION_TOKEN_EXPIERS || '7d') as StringValue
);

const sessionUpdateAge = ms(
    (process.env.BETTER_AUTH_SESSION_TOKEN_UPDATE || '1d') as StringValue
);

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "sqlite", ...etc
    }),

    emailAndPassword: {
        enabled: true,
    },

    user: {
        additionalFields: {
            role: {
                type: "string",
                required: true,
                defaultValue: "USER"
            },
            status: {
                type: "string",
                required: true,
                defaultValue: "ACTIVE"
            },
            password: {
                type: "string",
                required: true,
                defaultValue: null
            },
            needPasswordChange: {
                type: "boolean",
                required: true,
                defaultValue: false
            },
            isDeleted: {
                type: "boolean",
                required: true,
                defaultValue: false
            },
            deletedAt: {
                type: "date",
                required: true,
                defaultValue: new Date()
            }
        }
    },
    session: {
        expiresIn: Number(sessionExpiresIn) / 1000, // Better Auth expects seconds
        updateAge: Number(sessionUpdateAge) / 1000,
        cookieCache: {
            enabled: true,
            maxAge: Number(sessionExpiresIn) / 1000,
        }
    }

});