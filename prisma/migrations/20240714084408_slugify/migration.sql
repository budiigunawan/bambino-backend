/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Made the column `imageUrl` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `slug` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "name" SET DATA TYPE VARCHAR(150),
ALTER COLUMN "imageUrl" SET NOT NULL,
ALTER COLUMN "slug" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");
