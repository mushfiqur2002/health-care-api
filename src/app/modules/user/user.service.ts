import { Prisma, Specialty, UserRole } from "../../../generated/client";
import { auth } from "../../../lib/auth";
import { prisma } from "../../../lib/prisma";

// Updated interface to include the specialties array
interface IDoctor {
    name: string;
    email: string;
    password: string;
    specialties: string[]; // 👈 Array of Specialty IDs (UUIDs)
}

const createDoctor = async (payload: IDoctor) => {
    const { name, email, password, specialties: specialtyIds } = payload;

    // 1. Fetch and verify all requested specialties in a single batch query
    const verifiedSpecialties = await prisma.specialty.findMany({
        where: {
            id: { in: specialtyIds }
        }
    });

    if (verifiedSpecialties.length !== specialtyIds.length) {
        throw new Error("One or more provided specialty IDs were not found");
    }
    
    const userExist = await prisma.user.findUnique({
        where: { email: email }
    });
    if (userExist) {
        throw new Error("User with this email already exists");
    }

    // 3. Create Better Auth Account
    const userData = await auth.api.signUpEmail({
        body: {
            name,
            email,
            password,
            role: UserRole.DOCTOR
        }
    });

    if (!userData || !userData.user) {
        throw new Error("Doctor authentication creation failed");
    }

    try {
        // 4. Secure Transaction to link Doctor and Specialties together
        const result = await prisma.$transaction(async (tx) => {

            // Sync user role
            await tx.user.update({
                where: { id: userData.user.id },
                data: { role: UserRole.DOCTOR }
            });

            // Create Doctor Profile
            const doctorData = await tx.doctor.create({
                data: {
                    userID: userData.user.id,
                    name: name,
                    email: email
                }
            });

            // 5. Map rows for the doctorspecailty table
            const doctorSpecialtyData = verifiedSpecialties.map((specialty) => ({
                doctorID: doctorData.id,     // Generated from tx.doctor.create
                specialtyID: specialty.id,   // Verified database ID
            }));

            // 6. Insert many-to-many relation records smoothly
            await tx.doctorSpecialty.createMany({
                data: doctorSpecialtyData
            });

            return doctorData;
        });

        return {
            user: userData.user,
            doctor: result
        };

    } catch (error) {
        console.error("❌ Prisma Transaction Failed:", error);

        // Cleanup Better Auth user if transaction fails
        try {
            await prisma.user.delete({
                where: { id: userData.user.id }
            });
        } catch (cleanupError) {
            console.error("Failed to clean up orphaned Better Auth record:", cleanupError);
        }

        throw error; // Propagate down to catchAsync
    }
};

export const UserService = {
    createDoctor
};
