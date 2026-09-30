import { prisma } from "../../../lib/prisma"

const getAllDoctor = async () => {
    const doctor = await prisma.doctor.findMany({
        select: {
            name: true,
            email: true,
            specailty: true
        }
    })

    return doctor
}

const getDoctorByID = async (id: string) => {
    const doctor = await prisma.doctor.findUnique({
        where: {
            id: id
        }
    })

    return doctor
}

export const DoctorService = {
    getAllDoctor,
    getDoctorByID

}