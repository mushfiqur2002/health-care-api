import { Request, Response } from "express";
import { catchAsync } from "../shared/handeller";
import { DoctorService } from "./doctor.service";
import { sendResponse } from "../shared/sendResponse";
import { StatusCodes } from "http-status-codes";

const getAllDoctor = catchAsync(
    async (req: Request, res: Response) => {
        const result = await DoctorService.getAllDoctor()
        sendResponse(res, {
            httpCode: StatusCodes.OK,
            success: true,
            message: "get all doctor",
            data: result
        })
    }
)

const getDoctorByID = catchAsync(
    async (req: Request, res: Response) => {
        const { id } = req.params
        const result = await DoctorService.getDoctorByID(id as string)
        sendResponse(res, {
            httpCode: StatusCodes.OK,
            success: true,
            message: `get doctor by id ${id}`,
            data: result
        })
    }
)

export const DoctorController = {
    getAllDoctor, getDoctorByID
}