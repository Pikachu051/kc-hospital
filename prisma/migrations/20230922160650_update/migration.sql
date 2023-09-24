/*
  Warnings:

  - The primary key for the `Patientinfo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `hnid` column on the `Patientinfo` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Patientinfo" DROP CONSTRAINT "Patientinfo_pkey",
DROP COLUMN "hnid",
ADD COLUMN     "hnid" SERIAL NOT NULL,
ADD CONSTRAINT "Patientinfo_pkey" PRIMARY KEY ("hnid");

ALTER SEQUENCE "Patientinfo_hnid_seq" MINVALUE 660000001 START 660000001 RESTART 660000001;
