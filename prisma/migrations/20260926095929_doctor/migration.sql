/*
  Warnings:

  - A unique constraint covering the columns `[userID]` on the table `doctors` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userID` to the `doctors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "doctors" ADD COLUMN     "userID" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "doctors_userID_key" ON "doctors"("userID");

-- AddForeignKey
ALTER TABLE "doctors" ADD CONSTRAINT "doctors_userID_fkey" FOREIGN KEY ("userID") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
