import { Response } from "express"
interface ResponseData<T> {
    httpCode: number,
    data?: T,
    message: string,
    success: boolean,
}
export const sendResponse = <T>(res: Response, responseData: ResponseData<T>) => {
    const { httpCode, data, message, success } = responseData;

    return res.status(httpCode).json({
        data: data,
        message: message,
        success: success
    })
}