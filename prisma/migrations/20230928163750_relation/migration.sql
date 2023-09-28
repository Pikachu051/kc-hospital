/*
  Warnings:

  - You are about to drop the column `coverage` on the `Patientinfo` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[bed_id]` on the table `Admit` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[oldBed_id]` on the table `TransferHistory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[newBed_id]` on the table `TransferHistory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[doctor_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bed_id` to the `Admit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coverage_id` to the `Patientinfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `doctor_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Admit" ADD COLUMN     "bed_id" VARCHAR(7) NOT NULL;

-- AlterTable
ALTER TABLE "Patientinfo" DROP COLUMN "coverage",
ADD COLUMN     "coverage_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "doctor_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Admit_bed_id_key" ON "Admit"("bed_id");

-- CreateIndex
CREATE UNIQUE INDEX "TransferHistory_oldBed_id_key" ON "TransferHistory"("oldBed_id");

-- CreateIndex
CREATE UNIQUE INDEX "TransferHistory_newBed_id_key" ON "TransferHistory"("newBed_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_doctor_id_key" ON "User"("doctor_id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "Doctor"("doctor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patientinfo" ADD CONSTRAINT "Patientinfo_coverage_id_fkey" FOREIGN KEY ("coverage_id") REFERENCES "MedicalCoverage"("coverage_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admit" ADD CONSTRAINT "Admit_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "Doctor"("doctor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admit" ADD CONSTRAINT "Admit_bed_id_fkey" FOREIGN KEY ("bed_id") REFERENCES "Bed"("bed_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admit" ADD CONSTRAINT "Admit_dept_id_fkey" FOREIGN KEY ("dept_id") REFERENCES "Department"("dept_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admit" ADD CONSTRAINT "Admit_hnid_fkey" FOREIGN KEY ("hnid") REFERENCES "Patientinfo"("hnid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransferHistory" ADD CONSTRAINT "TransferHistory_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "Doctor"("doctor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransferHistory" ADD CONSTRAINT "TransferHistory_oldBed_id_fkey" FOREIGN KEY ("oldBed_id") REFERENCES "Bed"("bed_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransferHistory" ADD CONSTRAINT "TransferHistory_newBed_id_fkey" FOREIGN KEY ("newBed_id") REFERENCES "Bed"("bed_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransferHistory" ADD CONSTRAINT "TransferHistory_hnid_fkey" FOREIGN KEY ("hnid") REFERENCES "Patientinfo"("hnid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diagnosis" ADD CONSTRAINT "Diagnosis_icd_id_fkey" FOREIGN KEY ("icd_id") REFERENCES "ICD10"("icd_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diagnosis" ADD CONSTRAINT "Diagnosis_hnid_fkey" FOREIGN KEY ("hnid") REFERENCES "Patientinfo"("hnid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_dept_id_fkey" FOREIGN KEY ("dept_id") REFERENCES "Department"("dept_id") ON DELETE RESTRICT ON UPDATE CASCADE;
