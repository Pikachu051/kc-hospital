/*
  Warnings:

  - The primary key for the `Bed` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `bed_id` column on the `Bed` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `bed_status` column on the `Bed` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `ward` on the `Bed` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `username` on the `LoginHistory` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the column `admitDoctor` on the `Patientinfo` table. All the data in the column will be lost.
  - You are about to drop the column `admit_date` on the `Patientinfo` table. All the data in the column will be lost.
  - You are about to drop the column `admit_length` on the `Patientinfo` table. All the data in the column will be lost.
  - You are about to drop the column `age` on the `Patientinfo` table. All the data in the column will be lost.
  - You are about to drop the column `bed` on the `Patientinfo` table. All the data in the column will be lost.
  - You are about to drop the column `contact` on the `Patientinfo` table. All the data in the column will be lost.
  - You are about to drop the column `department` on the `Patientinfo` table. All the data in the column will be lost.
  - You are about to drop the column `diagDoctor` on the `Patientinfo` table. All the data in the column will be lost.
  - You are about to drop the column `discharge_date` on the `Patientinfo` table. All the data in the column will be lost.
  - You are about to drop the column `dxtype` on the `Patientinfo` table. All the data in the column will be lost.
  - You are about to drop the column `icd10` on the `Patientinfo` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Patientinfo` table. All the data in the column will be lost.
  - You are about to drop the column `symptom` on the `Patientinfo` table. All the data in the column will be lost.
  - You are about to drop the column `transfer_history` on the `Patientinfo` table. All the data in the column will be lost.
  - You are about to alter the column `address` on the `Patientinfo` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `coverage` on the `Patientinfo` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the `Contact` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DxType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Physician` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Symptom` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Transfer_History` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `room_id` to the `Bed` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bloodType` to the `Patientinfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dob` to the `Patientinfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Patientinfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idcard` to the `Patientinfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Patientinfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `medCondi` to the `Patientinfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Patientinfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prefix` to the `Patientinfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sex` to the `Patientinfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tel` to the `Patientinfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workphone` to the `Patientinfo` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "bed_status" AS ENUM ('VACANT', 'BUSY');

-- AlterTable
ALTER TABLE "Bed" DROP CONSTRAINT "Bed_pkey",
ADD COLUMN     "room_id" VARCHAR(50) NOT NULL,
DROP COLUMN "bed_id",
ADD COLUMN     "bed_id" SERIAL NOT NULL,
DROP COLUMN "bed_status",
ADD COLUMN     "bed_status" "bed_status" NOT NULL DEFAULT 'VACANT',
ALTER COLUMN "ward" SET DATA TYPE VARCHAR(50),
ADD CONSTRAINT "Bed_pkey" PRIMARY KEY ("bed_id");

-- AlterTable
ALTER TABLE "LoginHistory" ALTER COLUMN "username" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "Patientinfo" DROP COLUMN "admitDoctor",
DROP COLUMN "admit_date",
DROP COLUMN "admit_length",
DROP COLUMN "age",
DROP COLUMN "bed",
DROP COLUMN "contact",
DROP COLUMN "department",
DROP COLUMN "diagDoctor",
DROP COLUMN "discharge_date",
DROP COLUMN "dxtype",
DROP COLUMN "icd10",
DROP COLUMN "name",
DROP COLUMN "symptom",
DROP COLUMN "transfer_history",
ADD COLUMN     "bloodType" VARCHAR(3) NOT NULL,
ADD COLUMN     "dob" DATE NOT NULL,
ADD COLUMN     "firstName" VARCHAR(80) NOT NULL,
ADD COLUMN     "idcard" VARCHAR(13) NOT NULL,
ADD COLUMN     "lastName" VARCHAR(80) NOT NULL,
ADD COLUMN     "medCondi" VARCHAR(255) NOT NULL,
ADD COLUMN     "phone" VARCHAR(10) NOT NULL,
ADD COLUMN     "prefix" VARCHAR(15) NOT NULL,
ADD COLUMN     "sex" VARCHAR(1) NOT NULL,
ADD COLUMN     "tel" VARCHAR(10) NOT NULL,
ADD COLUMN     "workphone" VARCHAR(10) NOT NULL,
ALTER COLUMN "address" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "coverage" SET DATA TYPE VARCHAR(255);

-- DropTable
DROP TABLE "Contact";

-- DropTable
DROP TABLE "DxType";

-- DropTable
DROP TABLE "Physician";

-- DropTable
DROP TABLE "Symptom";

-- DropTable
DROP TABLE "Transfer_History";

-- CreateTable
CREATE TABLE "MedicalCoverage" (
    "coverage_id" SERIAL NOT NULL,
    "coverage_name" VARCHAR(255) NOT NULL,
    "coverage_manager" VARCHAR(255) NOT NULL,

    CONSTRAINT "MedicalCoverage_pkey" PRIMARY KEY ("coverage_id")
);

-- CreateTable
CREATE TABLE "Admit" (
    "doctor_id" INTEGER NOT NULL,
    "hnid" INTEGER NOT NULL,
    "admit_date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "admit_time" TIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ward" VARCHAR(50) NOT NULL,
    "room_id" VARCHAR(50) NOT NULL,
    "dept_id" VARCHAR(20) NOT NULL,
    "contact" VARCHAR(160) NOT NULL,
    "symptom" VARCHAR(255) NOT NULL,

    CONSTRAINT "Admit_pkey" PRIMARY KEY ("hnid")
);

-- CreateTable
CREATE TABLE "TransferHistory" (
    "hnid" INTEGER NOT NULL,
    "doctor_id" INTEGER NOT NULL,
    "transfer_date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "transfer_time" TIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "oldBed_id" INTEGER NOT NULL,
    "newBed_id" INTEGER NOT NULL,
    "reason" VARCHAR(255) NOT NULL,

    CONSTRAINT "TransferHistory_pkey" PRIMARY KEY ("hnid","transfer_date")
);

-- CreateTable
CREATE TABLE "ICD10" (
    "icd_id" VARCHAR(10) NOT NULL,
    "description" VARCHAR(255) NOT NULL,

    CONSTRAINT "ICD10_pkey" PRIMARY KEY ("icd_id")
);

-- CreateTable
CREATE TABLE "Diagnosis" (
    "doctor_id" INTEGER NOT NULL,
    "hnid" INTEGER NOT NULL,
    "diag_date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "icd_id" VARCHAR(10) NOT NULL,
    "dxType" VARCHAR(30) NOT NULL,

    CONSTRAINT "Diagnosis_pkey" PRIMARY KEY ("doctor_id","hnid","diag_date")
);

-- CreateTable
CREATE TABLE "Doctor" (
    "doctor_id" SERIAL NOT NULL,
    "firstName" VARCHAR(80) NOT NULL,
    "lastName" VARCHAR(80) NOT NULL,
    "dept_id" VARCHAR(20) NOT NULL,

    CONSTRAINT "Doctor_pkey" PRIMARY KEY ("doctor_id")
);

-- CreateTable
CREATE TABLE "Department" (
    "dept_id" VARCHAR(20) NOT NULL,
    "dept_name" VARCHAR(120) NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("dept_id")
);

-- AddForeignKey
ALTER TABLE "LoginHistory" ADD CONSTRAINT "LoginHistory_username_fkey" FOREIGN KEY ("username") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER SEQUENCE "Doctor_doctor_id_seq" MINVALUE 10001 START WITH 10001 RESTART WITH 10001; 