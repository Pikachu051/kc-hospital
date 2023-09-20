-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PatientInfo" (
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

    CONSTRAINT "PatientInfo_pkey" PRIMARY KEY ("hnid")
);

-- CreateTable
CREATE TABLE "Transfer_History" (
    "hn_id" TEXT NOT NULL,
    "transfer_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "transfer_from" TEXT NOT NULL,
    "transfer_to" TEXT NOT NULL,

    CONSTRAINT "Transfer_History_pkey" PRIMARY KEY ("hn_id")
);

-- CreateTable
CREATE TABLE "Bed" (
    "bed_id" TEXT NOT NULL,
    "bed_status" TEXT NOT NULL,
    "ward" TEXT NOT NULL,

    CONSTRAINT "Bed_pkey" PRIMARY KEY ("bed_id")
);

-- CreateTable
CREATE TABLE "Symptom" (
    "icd10" TEXT NOT NULL,
    "desc" TEXT NOT NULL,

    CONSTRAINT "Symptom_pkey" PRIMARY KEY ("icd10")
);

-- CreateTable
CREATE TABLE "DxType" (
    "dxtype" TEXT NOT NULL,
    "desc" TEXT NOT NULL,

    CONSTRAINT "DxType_pkey" PRIMARY KEY ("dxtype")
);

-- CreateTable
CREATE TABLE "Physician" (
    "physician_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "department" TEXT NOT NULL,

    CONSTRAINT "Physician_pkey" PRIMARY KEY ("physician_id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "contact_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "relation" TEXT NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("contact_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_password_key" ON "User"("password");
