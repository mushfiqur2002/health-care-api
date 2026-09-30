import { auth } from "../../../lib/auth";
import { prisma } from "../../../lib/prisma";

interface IRegister {
    name: string,
    email: string,
    password: string
}
interface ILogIn {
    email: string,
    password: string
}
const registerPatient = async (payload: IRegister) => {
    const { name, email, password } = payload;
    const data = await auth.api.signUpEmail({
        body: { name, email, password }
    })

    if (!data.user) {
        throw new Error("Failed to register patient");
    }

    try {
        // patient profile with prisma transaction
        const patient = await prisma.$transaction(async (tx: any) => {
            const patientTX = await tx.patient.create({
                data: {
                    userID: data.user.id,
                    name: payload.name,
                    email: payload.email
                }
            })

            return patientTX
        })

        return {
            ...data,
            patient
        }

    } catch (error) {
        console.log('something wrong!!!', error);

        // roll back
        await prisma.user.delete({
            where: {
                id: data.user.id
            }
        })
    }
}

const logInUser = async (payload: ILogIn) => {
    const { email, password } = payload;
    const data = await auth.api.signInEmail({
        body: { email, password }
    })
    return data;
}

export const AuthService = {
    registerPatient,
    logInUser
}