/*
  Warnings:

  - The primary key for the `Advantage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `AdvantageTranslation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `DecorationAdvantage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `DecorationFeature` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `DecorationTranslation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `DecorationType` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `DecorationTypeTranslation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Feature` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `FeatureTranslation` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "AdvantageTranslation" DROP CONSTRAINT "AdvantageTranslation_advantage_id_fkey";

-- DropForeignKey
ALTER TABLE "Decoration" DROP CONSTRAINT "Decoration_decoration_type_id_fkey";

-- DropForeignKey
ALTER TABLE "DecorationAdvantage" DROP CONSTRAINT "DecorationAdvantage_advantage_id_fkey";

-- DropForeignKey
ALTER TABLE "DecorationFeature" DROP CONSTRAINT "DecorationFeature_feature_id_fkey";

-- DropForeignKey
ALTER TABLE "DecorationTypeTranslation" DROP CONSTRAINT "DecorationTypeTranslation_decoration_type_id_fkey";

-- DropForeignKey
ALTER TABLE "FeatureTranslation" DROP CONSTRAINT "FeatureTranslation_feature_id_fkey";

-- AlterTable
ALTER TABLE "Advantage" DROP CONSTRAINT "Advantage_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Advantage_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Advantage_id_seq";

-- AlterTable
ALTER TABLE "AdvantageTranslation" DROP CONSTRAINT "AdvantageTranslation_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "advantage_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "AdvantageTranslation_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "AdvantageTranslation_id_seq";

-- AlterTable
ALTER TABLE "Decoration" ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "decoration_type_id" SET DATA TYPE TEXT;
DROP SEQUENCE "Decoration_id_seq";

-- AlterTable
ALTER TABLE "DecorationAdvantage" DROP CONSTRAINT "DecorationAdvantage_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "advantage_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "DecorationAdvantage_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "DecorationAdvantage_id_seq";

-- AlterTable
ALTER TABLE "DecorationFeature" DROP CONSTRAINT "DecorationFeature_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "feature_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "DecorationFeature_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "DecorationFeature_id_seq";

-- AlterTable
ALTER TABLE "DecorationTranslation" DROP CONSTRAINT "DecorationTranslation_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "DecorationTranslation_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "DecorationTranslation_id_seq";

-- AlterTable
ALTER TABLE "DecorationType" DROP CONSTRAINT "DecorationType_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "DecorationType_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "DecorationType_id_seq";

-- AlterTable
ALTER TABLE "DecorationTypeTranslation" DROP CONSTRAINT "DecorationTypeTranslation_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "decoration_type_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "DecorationTypeTranslation_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "DecorationTypeTranslation_id_seq";

-- AlterTable
ALTER TABLE "Feature" DROP CONSTRAINT "Feature_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Feature_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Feature_id_seq";

-- AlterTable
ALTER TABLE "FeatureTranslation" DROP CONSTRAINT "FeatureTranslation_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "feature_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "FeatureTranslation_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "FeatureTranslation_id_seq";

-- AddForeignKey
ALTER TABLE "Decoration" ADD CONSTRAINT "Decoration_decoration_type_id_fkey" FOREIGN KEY ("decoration_type_id") REFERENCES "DecorationType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DecorationTypeTranslation" ADD CONSTRAINT "DecorationTypeTranslation_decoration_type_id_fkey" FOREIGN KEY ("decoration_type_id") REFERENCES "DecorationType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeatureTranslation" ADD CONSTRAINT "FeatureTranslation_feature_id_fkey" FOREIGN KEY ("feature_id") REFERENCES "Feature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdvantageTranslation" ADD CONSTRAINT "AdvantageTranslation_advantage_id_fkey" FOREIGN KEY ("advantage_id") REFERENCES "Advantage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DecorationFeature" ADD CONSTRAINT "DecorationFeature_feature_id_fkey" FOREIGN KEY ("feature_id") REFERENCES "Feature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DecorationAdvantage" ADD CONSTRAINT "DecorationAdvantage_advantage_id_fkey" FOREIGN KEY ("advantage_id") REFERENCES "Advantage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
