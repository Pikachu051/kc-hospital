-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "bed_status" AS ENUM ('VACANT', 'BUSY');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "firstName" VARCHAR(80) NOT NULL,
    "lastName" VARCHAR(80) NOT NULL,
    "doctor_id" INTEGER NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "LoginHistory" (
    "username" VARCHAR(255) NOT NULL,
    "loginDate" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "loginTime" TIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LoginHistory_pkey" PRIMARY KEY ("loginDate","loginTime")
);

-- CreateTable
CREATE TABLE "Patientinfo" (
    "hnid" SERIAL NOT NULL,
    "prefix" VARCHAR(15) NOT NULL,
    "firstName" VARCHAR(80) NOT NULL,
    "lastName" VARCHAR(80) NOT NULL,
    "idcard" VARCHAR(13) NOT NULL,
    "sex" VARCHAR(1) NOT NULL,
    "dob" DATE NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "tel" VARCHAR(10) NOT NULL,
    "workphone" VARCHAR(10) NOT NULL,
    "phone" VARCHAR(10) NOT NULL,
    "bloodType" VARCHAR(3) NOT NULL,
    "medCondi" VARCHAR(255) NOT NULL,
    "coverage_id" INTEGER NOT NULL,

    CONSTRAINT "Patientinfo_pkey" PRIMARY KEY ("hnid")
);

-- CreateTable
CREATE TABLE "MedicalCoverage" (
    "coverage_id" SERIAL NOT NULL,
    "coverage_name" VARCHAR(255) NOT NULL,
    "coverage_manager" VARCHAR(160) NOT NULL,

    CONSTRAINT "MedicalCoverage_pkey" PRIMARY KEY ("coverage_id")
);

-- CreateTable
CREATE TABLE "Admit" (
    "doctor_id" INTEGER NOT NULL,
    "hnid" INTEGER NOT NULL,
    "admit_date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "admit_time" TIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ward" VARCHAR(1) NOT NULL,
    "room_id" VARCHAR(3) NOT NULL,
    "dept_id" VARCHAR(10) NOT NULL,
    "bed_id" VARCHAR(7) NOT NULL,
    "contact" VARCHAR(160) NOT NULL,
    "symptom" VARCHAR(255) NOT NULL,
    "discharge_date" DATE,
    "discharge_time" TIME(3),

    CONSTRAINT "Admit_pkey" PRIMARY KEY ("hnid")
);

-- CreateTable
CREATE TABLE "TransferHistory" (
    "hnid" INTEGER NOT NULL,
    "doctor_id" INTEGER NOT NULL,
    "transfer_date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "transfer_time" TIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "oldBed_id" VARCHAR(7) NOT NULL,
    "newBed_id" VARCHAR(7) NOT NULL,
    "reason" VARCHAR(255) NOT NULL,

    CONSTRAINT "TransferHistory_pkey" PRIMARY KEY ("hnid","transfer_date")
);

-- CreateTable
CREATE TABLE "Bed" (
    "bed_id" VARCHAR(7) NOT NULL,
    "room_id" VARCHAR(3) NOT NULL,
    "ward" VARCHAR(1) NOT NULL,
    "bed_status" "bed_status" NOT NULL DEFAULT 'VACANT',

    CONSTRAINT "Bed_pkey" PRIMARY KEY ("bed_id")
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
    "dept_id" VARCHAR(10) NOT NULL,

    CONSTRAINT "Doctor_pkey" PRIMARY KEY ("doctor_id")
);

-- CreateTable
CREATE TABLE "Department" (
    "dept_id" VARCHAR(10) NOT NULL,
    "dept_name" VARCHAR(100) NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("dept_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_password_key" ON "User"("password");

-- CreateIndex
CREATE UNIQUE INDEX "User_doctor_id_key" ON "User"("doctor_id");

-- CreateIndex
CREATE UNIQUE INDEX "Admit_bed_id_key" ON "Admit"("bed_id");

-- CreateIndex
CREATE UNIQUE INDEX "TransferHistory_oldBed_id_key" ON "TransferHistory"("oldBed_id");

-- CreateIndex
CREATE UNIQUE INDEX "TransferHistory_newBed_id_key" ON "TransferHistory"("newBed_id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "Doctor"("doctor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoginHistory" ADD CONSTRAINT "LoginHistory_username_fkey" FOREIGN KEY ("username") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

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
