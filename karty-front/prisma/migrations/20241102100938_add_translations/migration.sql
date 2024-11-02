/*
  Warnings:

  - The primary key for the `Advantage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `description` on the `Advantage` table. All the data in the column will be lost.
  - The `id` column on the `Advantage` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Decoration` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Decoration` table. All the data in the column will be lost.
  - You are about to drop the column `length` on the `Decoration` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Decoration` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Decoration` table. All the data in the column will be lost.
  - The `id` column on the `Decoration` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `decoration_type_id` column on the `Decoration` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `DecorationAdvantage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `DecorationAdvantage` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `DecorationFeature` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `DecorationFeature` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `DecorationType` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `type_name` on the `DecorationType` table. All the data in the column will be lost.
  - The `id` column on the `DecorationType` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Feature` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Feature` table. All the data in the column will be lost.
  - You are about to drop the column `language_code` on the `Feature` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Feature` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Feature` table. All the data in the column will be lost.
  - The `id` column on the `Feature` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Translations` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `height` to the `Decoration` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `decoration_id` on the `DecorationAdvantage` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `advantage_id` on the `DecorationAdvantage` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `decoration_id` on the `DecorationFeature` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `feature_id` on the `DecorationFeature` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Decoration" DROP CONSTRAINT "Decoration_decoration_type_id_fkey";

-- DropForeignKey
ALTER TABLE "DecorationAdvantage" DROP CONSTRAINT "DecorationAdvantage_advantage_id_fkey";

-- DropForeignKey
ALTER TABLE "DecorationAdvantage" DROP CONSTRAINT "DecorationAdvantage_decoration_id_fkey";

-- DropForeignKey
ALTER TABLE "DecorationFeature" DROP CONSTRAINT "DecorationFeature_decoration_id_fkey";

-- DropForeignKey
ALTER TABLE "DecorationFeature" DROP CONSTRAINT "DecorationFeature_feature_id_fkey";

-- AlterTable
ALTER TABLE "Advantage" DROP CONSTRAINT "Advantage_pkey",
DROP COLUMN "description",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Advantage_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Decoration" DROP CONSTRAINT "Decoration_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "length",
DROP COLUMN "title",
DROP COLUMN "updatedAt",
ADD COLUMN     "height" DOUBLE PRECISION NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "decoration_type_id",
ADD COLUMN     "decoration_type_id" INTEGER,
ALTER COLUMN "power" SET DATA TYPE DOUBLE PRECISION,
ADD CONSTRAINT "Decoration_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "DecorationAdvantage" DROP CONSTRAINT "DecorationAdvantage_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "decoration_id",
ADD COLUMN     "decoration_id" INTEGER NOT NULL,
DROP COLUMN "advantage_id",
ADD COLUMN     "advantage_id" INTEGER NOT NULL,
ADD CONSTRAINT "DecorationAdvantage_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "DecorationFeature" DROP CONSTRAINT "DecorationFeature_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "decoration_id",
ADD COLUMN     "decoration_id" INTEGER NOT NULL,
DROP COLUMN "feature_id",
ADD COLUMN     "feature_id" INTEGER NOT NULL,
ADD CONSTRAINT "DecorationFeature_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "DecorationType" DROP CONSTRAINT "DecorationType_pkey",
DROP COLUMN "type_name",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "DecorationType_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Feature" DROP CONSTRAINT "Feature_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "language_code",
DROP COLUMN "name",
DROP COLUMN "updatedAt",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Feature_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Translations";

-- CreateTable
CREATE TABLE "DecorationTranslation" (
    "id" SERIAL NOT NULL,
    "decoration_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "language_code" TEXT NOT NULL,

    CONSTRAINT "DecorationTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DecorationTypeTranslation" (
    "id" SERIAL NOT NULL,
    "decoration_type_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "language_code" TEXT NOT NULL,

    CONSTRAINT "DecorationTypeTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeatureTranslation" (
    "id" SERIAL NOT NULL,
    "feature_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "language_code" TEXT NOT NULL,

    CONSTRAINT "FeatureTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdvantageTranslation" (
    "id" SERIAL NOT NULL,
    "advantage_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "language_code" TEXT NOT NULL,

    CONSTRAINT "AdvantageTranslation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Decoration" ADD CONSTRAINT "Decoration_decoration_type_id_fkey" FOREIGN KEY ("decoration_type_id") REFERENCES "DecorationType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DecorationTranslation" ADD CONSTRAINT "DecorationTranslation_decoration_id_fkey" FOREIGN KEY ("decoration_id") REFERENCES "Decoration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DecorationTypeTranslation" ADD CONSTRAINT "DecorationTypeTranslation_decoration_type_id_fkey" FOREIGN KEY ("decoration_type_id") REFERENCES "DecorationType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeatureTranslation" ADD CONSTRAINT "FeatureTranslation_feature_id_fkey" FOREIGN KEY ("feature_id") REFERENCES "Feature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdvantageTranslation" ADD CONSTRAINT "AdvantageTranslation_advantage_id_fkey" FOREIGN KEY ("advantage_id") REFERENCES "Advantage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DecorationFeature" ADD CONSTRAINT "DecorationFeature_decoration_id_fkey" FOREIGN KEY ("decoration_id") REFERENCES "Decoration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DecorationFeature" ADD CONSTRAINT "DecorationFeature_feature_id_fkey" FOREIGN KEY ("feature_id") REFERENCES "Feature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DecorationAdvantage" ADD CONSTRAINT "DecorationAdvantage_decoration_id_fkey" FOREIGN KEY ("decoration_id") REFERENCES "Decoration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DecorationAdvantage" ADD CONSTRAINT "DecorationAdvantage_advantage_id_fkey" FOREIGN KEY ("advantage_id") REFERENCES "Advantage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
