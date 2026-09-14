import { RequestHandler, Request, Response, NextFunction } from "express";
export const catchAsync = (fn: RequestHandler) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next);
        } catch (error: any) {
            res.status(500).send({
                success: false,
                message: "Failed to request",
                data: error.message
            })
        }
    }
}