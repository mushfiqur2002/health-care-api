import { Specialty } from "../generated/prisma/client"
import { prisma } from "../lib/prisma"

// get all
const getSpecialty = async (): Promise<Specialty[]> => {
    const specialties = await prisma.specialty.findMany()
    return specialties;
}

// get by id
const getSpecialtyByID = async (id: string): Promise<Specialty | null> => {
    const specialties = await prisma.specialty.findUnique({
        where: { id }
    })
    return specialties;
}
// create
const createSpecialty = async (payload: Specialty): Promise<Specialty> => {
    const specialty = await prisma.specialty.create({
        data: payload
    })

    return specialty
}
// delete by id
const deleteSpecialtyByID = async (id: string): Promise<Specialty | null> => {
    const specialties = await prisma.specialty.delete({
        where: {
            id: id
        }
    })
    return specialties;
}

export const SpecialtyService = {
    getSpecialty,
    getSpecialtyByID,
    deleteSpecialtyByID,
    createSpecialty
}