import { Request, Response } from "express";
import { catchAsync } from "../shared/handeller";
import { UserService } from "./user.service";
import { sendResponse } from "../shared/sendResponse";
import { StatusCodes } from "http-status-codes";

const createDoctor = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body
    const result = await UserService.createDoctor(payload);

    sendResponse(res, {
        httpCode: StatusCodes.CREATED,
        data: result,
        success: true,
        message: `doctor created successfully ${result}`,
    })
})

export const UserController = {
    createDoctor
}