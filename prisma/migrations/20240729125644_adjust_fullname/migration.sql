/*
  Warnings:

  - You are about to alter the column `fullName` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(50)`.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "fullName" SET DATA TYPE VARCHAR(50);
