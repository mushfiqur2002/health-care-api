import { Request, Response } from "express"
import { SpecialtyService } from "./specialty.service"

// get all
const getSpecialty = async (req: Request, res: Response) => {
    const result = await SpecialtyService.getSpecialty()

    res.status(200).send({
        success: true,
        message: "specialty fetched successfully",
        data: result
    })
}

// get by id
// Controller
const getSpecialtyByID = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await SpecialtyService.getSpecialtyByID(id as string);

        if (!result) {
            return res.status(404).send({
                success: false,
                message: "Specialty not found",
                data: null
            });
        }

        return res.status(200).send({
            success: true,
            message: "Specialty fetched by ID successfully",
            data: result
        });
    } catch (error) {
        console.error("Error fetching specialty:", error);
        return res.status(500).send({
            success: false,
            message: "Internal server error",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
};


// delete by id
const deleteSpecialtyByID = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await SpecialtyService.deleteSpecialtyByID(id as string)

    res.status(200).send({
        success: true,
        message: "specialty deleted successfully",
        data: result
    })
}

// create 
const createSpecialty = async (req: Request, res: Response) => {
    const payLoad = req.body
    const result = await SpecialtyService.createSpecialty(payLoad)

    res.status(200).send({
        success: true,
        message: "specialty created successfully",
        data: result
    })
}

export const SpecialtyController = {
    getSpecialty,
    getSpecialtyByID,
    deleteSpecialtyByID,
    createSpecialty
}