-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateTable
CREATE TABLE "doctors" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "profilePhoto" TEXT,
    "contactnumber" TEXT,
    "address" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "registrationNumber" TEXT NOT NULL,
    "experience" INTEGER NOT NULL DEFAULT 0,
    "gender" "Gender" NOT NULL,
    "appointmentFees" DOUBLE PRECISION NOT NULL,
    "qualification" TEXT NOT NULL,
    "workingPlace" TEXT[],
    "designation" TEXT NOT NULL,
    "averageRating" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "doctors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "doctorspecailty" (
    "id" TEXT NOT NULL,
    "doctorID" TEXT NOT NULL,
    "specialtyID" TEXT NOT NULL,

    CONSTRAINT "doctorspecailty_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "doctors_registrationNumber_key" ON "doctors"("registrationNumber");

-- CreateIndex
CREATE INDEX "deleted_doctor" ON "doctors"("isDeleted");

-- AddForeignKey
ALTER TABLE "doctorspecailty" ADD CONSTRAINT "doctorspecailty_doctorID_fkey" FOREIGN KEY ("doctorID") REFERENCES "doctors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctorspecailty" ADD CONSTRAINT "doctorspecailty_specialtyID_fkey" FOREIGN KEY ("specialtyID") REFERENCES "specialties"("id") ON DELETE CASCADE ON UPDATE CASCADE;
