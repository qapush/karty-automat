/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Przewagi` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Przewagi" ADD COLUMN     "slug" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Przewagi_slug_key" ON "Przewagi"("slug");
