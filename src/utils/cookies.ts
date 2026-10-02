import { CookieOptions, Request, Response } from "express";

const setCookies = (res: Response, value: string, key: string, options: CookieOptions) => {
    res.cookie(key, value, options)
}

const getCookies = (req: Request, key: string) => {
    return req.cookies([key])
}

const clearCookies = (res: Response, key: string, options: CookieOptions) => {
    res.clearCookie(key, options)
}


export const cookies = {
    setCookies,
    getCookies,
    clearCookies
}
