import { Request, Response } from "express"
import { SpecialtyService } from "./specialty.service"
import { catchAsync } from "../shared/handeller"
import { sendResponse } from "../shared/sendResponse"
import { StatusCodes } from "http-status-codes"


// get all
const getSpecialty = catchAsync(async (req, res) => {
    const result = await SpecialtyService.getSpecialty()
    sendResponse(res, {
        httpCode: StatusCodes.OK,
        data: result,
        success: true,
        message: "Specialty all fetched successfully"
    })
})


// get by id
const getSpecialtyByID = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await SpecialtyService.getSpecialtyByID(id as string);

    if (!result) {
        sendResponse(res, {
            httpCode: StatusCodes.NOT_FOUND,
            success: false,
            message: "Specialty not found",
            data: null
        })
    }

    sendResponse(res, {
        httpCode: StatusCodes.OK,
        success: true,
        message: "Specialty fetched by ID successfully",
        data: result
    });
})


// delete by id
const deleteSpecialtyByID = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await SpecialtyService.deleteSpecialtyByID(id as string)

    sendResponse(res, {
        httpCode: StatusCodes.OK,
        success: true,
        message: "specialty deleted successfully",
        data: result
    })
})

// create 
const createSpecialty = catchAsync(async (req: Request, res: Response) => {
    const payLoad = req.body
    const result = await SpecialtyService.createSpecialty(payLoad)

    sendResponse(res, {
        httpCode: StatusCodes.CREATED,
        success: true,
        message: "specialty created successfully",
        data: result
    })
})

export const SpecialtyController = {
    getSpecialty,
    getSpecialtyByID,
    deleteSpecialtyByID,
    createSpecialty
}