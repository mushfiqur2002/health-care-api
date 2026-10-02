import { JwtPayload, SignOptions } from "jsonwebtoken";
import { JWTUtils } from "./jwt";
import { Response } from "express";
import { cookies } from "./cookies";
import ms, { StringValue } from "ms";

// Define fallback string constants to avoid repetition
const DEFAULT_ACCESS_TOKEN_EXPIRES = (process.env.ACCESS_TOKEN_EXPIRES || '1d') as StringValue;
const DEFAULT_REFRESH_TOKEN_EXPIRES = (process.env.REFRESH_TOKEN_EXPIRES || '7d') as StringValue;
const DEFAULT_SESSION_TOKEN_EXPIRES = (process.env.BETTER_AUTH_SESSION_TOKEN_EXPIRES || '7d') as StringValue;

// Cookie maxAge values in milliseconds
const accessTokenExpiresIn = ms(DEFAULT_ACCESS_TOKEN_EXPIRES);
const refreshTokenExpiresIn = ms(DEFAULT_REFRESH_TOKEN_EXPIRES);
const sessionExpiresIn = ms(DEFAULT_SESSION_TOKEN_EXPIRES);

const getAccessToken = (payload: JwtPayload) => {
    const token = JWTUtils.createToken(
        payload,
        process.env.ACCESS_TOKEN_SECRET as string,
        {
            // Always pass a fallback string so it never evaluates to undefined
            expiresIn: DEFAULT_ACCESS_TOKEN_EXPIRES as SignOptions["expiresIn"]
        }
    );

    return token;
};

const getRefreshToken = (payload: JwtPayload) => {
    const token = JWTUtils.createToken(
        payload,
        process.env.REFRESH_TOKEN_SECRET as string,
        {
            // Always pass a fallback string so it never evaluates to undefined
            expiresIn: DEFAULT_REFRESH_TOKEN_EXPIRES as SignOptions["expiresIn"]
        }
    );

    return token;
};

const setAccessTokenCookie = (res: Response, token: string) => {
    cookies.setCookies(res, 'accessToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: true,
        maxAge: accessTokenExpiresIn
    });
};

const setRefreshTokenCookie = (res: Response, token: string) => {
    cookies.setCookies(res, 'refreshToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: true,
        maxAge: refreshTokenExpiresIn
    });
};

const setBetterAuthSessionCookie = (res: Response, token: string) => {
    cookies.setCookies(res, 'better-auth.session-cookie', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: true,
        maxAge: sessionExpiresIn
    });
};

export const tokenUtils = {
    getAccessToken,
    getRefreshToken,
    setAccessTokenCookie,
    setRefreshTokenCookie,
    setBetterAuthSessionCookie
};