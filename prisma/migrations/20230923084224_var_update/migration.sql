/*
  Warnings:

  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - You are about to alter the column `username` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `password` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `firstName` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(80)`.
  - You are about to alter the column `lastName` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(80)`.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ALTER COLUMN "username" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "firstName" SET DATA TYPE VARCHAR(80),
ALTER COLUMN "lastName" SET DATA TYPE VARCHAR(80);

-- CreateTable
CREATE TABLE "LoginHistory" (
    "username" TEXT NOT NULL,
    "loginDate" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "loginTime" TIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LoginHistory_pkey" PRIMARY KEY ("loginDate","loginTime")
);
