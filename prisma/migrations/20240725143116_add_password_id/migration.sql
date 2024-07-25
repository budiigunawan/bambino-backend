/*
  Warnings:

  - You are about to drop the column `userId` on the `Password` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[passwordId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Password" DROP CONSTRAINT "Password_userId_fkey";

-- DropIndex
DROP INDEX "Password_userId_key";

-- AlterTable
ALTER TABLE "Password" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "passwordId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_passwordId_key" ON "User"("passwordId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_passwordId_fkey" FOREIGN KEY ("passwordId") REFERENCES "Password"("id") ON DELETE SET NULL ON UPDATE CASCADE;
