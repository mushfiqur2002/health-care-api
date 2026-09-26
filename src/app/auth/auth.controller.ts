import { Request, Response } from "express";
import { catchAsync } from "../shared/handeller";
import { AuthService } from "./auth.service";
import { sendResponse } from "../shared/sendResponse";

const registerPatient = catchAsync(
    async (req: Request, res: Response) => {
        const payload = req.body;
        const result = await AuthService.registerPatient(payload)

        sendResponse(res, {
            httpCode: 201,
            success: true,
            message: "register patient successfully",
            data: result
        })
    }
)

const logInUser = catchAsync(
    async (req: Request, res: Response) => {
        const payload = req.body;
        const result = await AuthService.logInUser(payload)

        sendResponse(res, {
            httpCode: 201,
            success: true,
            message: "log in user successfully",
            data: result
        })
    }
)


export const AuthController = { registerPatient, logInUser }