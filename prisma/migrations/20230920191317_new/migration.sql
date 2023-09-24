/*
  Warnings:

  - The primary key for the `Transfer_History` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `hn_id` on the `Transfer_History` table. All the data in the column will be lost.
  - You are about to drop the `PatientInfo` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `hnid` to the `Transfer_History` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transfer_History" DROP CONSTRAINT "Transfer_History_pkey",
DROP COLUMN "hn_id",
ADD COLUMN     "hnid" TEXT NOT NULL,
ADD CONSTRAINT "Transfer_History_pkey" PRIMARY KEY ("hnid");

-- DropTable
DROP TABLE "PatientInfo";

-- CreateTable
CREATE TABLE "Patientinfo" (
    "hnid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "admit_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "discharge_date" TIMESTAMP(3) NOT NULL,
    "age" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "coverage" TEXT NOT NULL,
    "admit_length" INTEGER NOT NULL,
    "symptom" TEXT NOT NULL,
    "icd10" TEXT NOT NULL,
    "dxtype" TEXT NOT NULL,
    "diagDoctor" TEXT NOT NULL,
    "admitDoctor" TEXT NOT NULL,
    "bed" TEXT NOT NULL,
    "transfer_history" TEXT NOT NULL,

    CONSTRAINT "Patientinfo_pkey" PRIMARY KEY ("hnid")
);