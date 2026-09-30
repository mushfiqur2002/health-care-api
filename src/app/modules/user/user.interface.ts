/*
name          String
    email         String
    profilePhoto  String?
    contactnumber String?
    address       String?
    isDeleted     Boolean   @default(false)
    deletedAt     DateTime?

    registrationNumber String   @unique
    experience         Int      @default(0)
    gender             Gender
    appointmentFees    Float
    qualification      String
    workingPlace       String[]
    designation        String
    averageRating      Float    @default(0.0)
*/

import { Gender } from "../../../generated/enums";

export interface ICreateDoctorPayload {
    password: string;
    doctor: {
        name: string;
        email: string;
        profilePhoto?: string;
        contactNumber?: string;
        address?: string;
        registrationNumber?: string;
        experience?: number;
        gender?: Gender
        appointmentFess?: number;
        qualification?: string;
        workingPlace?: string;
        designation?: string;
    };
    specialties: string[]
}