import { Request, Response } from "express";
import { catchAsync } from "../shared/handeller";
import { AuthService } from "./auth.service";
import { sendResponse } from "../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import { tokenUtils } from "../../../utils/token";

const registerPatient = catchAsync(
    async (req: Request, res: Response) => {
        const payload = req.body;
        const result = await AuthService.registerPatient(payload)

        if (!result) {
            throw new Error("Patient registration returned no result");
        }

        const { accessToken, refreshToken, token, ...rest } = result;

        tokenUtils.setAccessTokenCookie(res, accessToken);
        tokenUtils.setRefreshTokenCookie(res, refreshToken);
        tokenUtils.setBetterAuthSessionCookie(res, token as string);


        sendResponse(res, {
            httpCode: StatusCodes.OK,
            success: true,
            message: "register patient successfully",
            data: {
                token,
                accessToken,
                refreshToken,
                ...rest
            }
        })
    }
)

const logInUser = catchAsync(
    async (req: Request, res: Response) => {
        const payload = req.body;
        const result = await AuthService.logInUser(payload)

        if (!result) {
            throw new Error("User login returned no result");
        }

        const { accessToken, refreshToken, token, ...rest } = result;

        tokenUtils.setAccessTokenCookie(res, accessToken);
        tokenUtils.setRefreshTokenCookie(res, refreshToken);
        tokenUtils.setBetterAuthSessionCookie(res, token);

        sendResponse(res, {
            httpCode: StatusCodes.OK,
            success: true,
            message: "log in user successfully",
            data: {
                ...rest,
                accessToken,
                refreshToken,
                token
            }
        })
    }
)


export const AuthController = { registerPatient, logInUser }