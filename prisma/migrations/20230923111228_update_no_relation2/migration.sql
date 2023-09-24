/*
  Warnings:

  - You are about to alter the column `ward` on the `Admit` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `VarChar(1)`.
  - You are about to alter the column `room_id` on the `Admit` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `VarChar(3)`.
  - You are about to alter the column `dept_id` on the `Admit` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `VarChar(10)`.
  - The primary key for the `Bed` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `ward` on the `Bed` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `VarChar(1)`.
  - You are about to alter the column `room_id` on the `Bed` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `VarChar(3)`.
  - You are about to alter the column `bed_id` on the `Bed` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `VarChar(7)`.
  - The primary key for the `Department` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `dept_id` on the `Department` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `VarChar(10)`.
  - You are about to alter the column `dept_name` on the `Department` table. The data in that column could be lost. The data in that column will be cast from `VarChar(120)` to `VarChar(100)`.
  - You are about to alter the column `dept_id` on the `Doctor` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `VarChar(10)`.
  - You are about to alter the column `coverage_manager` on the `MedicalCoverage` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(160)`.
  - You are about to alter the column `oldBed_id` on the `TransferHistory` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `VarChar(7)`.
  - You are about to alter the column `newBed_id` on the `TransferHistory` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `VarChar(7)`.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Admit" ALTER COLUMN "ward" SET DATA TYPE VARCHAR(1),
ALTER COLUMN "room_id" SET DATA TYPE VARCHAR(3),
ALTER COLUMN "dept_id" SET DATA TYPE VARCHAR(10);

-- AlterTable
ALTER TABLE "Bed" DROP CONSTRAINT "Bed_pkey",
ALTER COLUMN "ward" SET DATA TYPE VARCHAR(1),
ALTER COLUMN "room_id" SET DATA TYPE VARCHAR(3),
ALTER COLUMN "bed_id" DROP DEFAULT,
ALTER COLUMN "bed_id" SET DATA TYPE VARCHAR(7),
ADD CONSTRAINT "Bed_pkey" PRIMARY KEY ("bed_id");
DROP SEQUENCE "Bed_bed_id_seq";

-- AlterTable
ALTER TABLE "Department" DROP CONSTRAINT "Department_pkey",
ALTER COLUMN "dept_id" SET DATA TYPE VARCHAR(10),
ALTER COLUMN "dept_name" SET DATA TYPE VARCHAR(100),
ADD CONSTRAINT "Department_pkey" PRIMARY KEY ("dept_id");

-- AlterTable
ALTER TABLE "Doctor" ALTER COLUMN "dept_id" SET DATA TYPE VARCHAR(10);

-- AlterTable
ALTER TABLE "MedicalCoverage" ALTER COLUMN "coverage_manager" SET DATA TYPE VARCHAR(160);

-- AlterTable
ALTER TABLE "TransferHistory" ALTER COLUMN "oldBed_id" SET DATA TYPE VARCHAR(7),
ALTER COLUMN "newBed_id" SET DATA TYPE VARCHAR(7);

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("username");
