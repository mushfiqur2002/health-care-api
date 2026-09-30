import { RequestHandler, Request, Response, NextFunction } from "express";
import { gloabalErrorHandler } from "../../middleware/globalErrorHandler";
export const catchAsync = (fn: RequestHandler) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next);
        } catch (error: any) {
            next(gloabalErrorHandler)
        }
    }
}