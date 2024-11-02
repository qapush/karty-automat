/*
  Warnings:

  - You are about to drop the `Advantage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AdvantageTranslation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Decoration` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DecorationAdvantage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DecorationFeature` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DecorationTranslation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DecorationType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DecorationTypeTranslation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Feature` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FeatureTranslation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AdvantageTranslation" DROP CONSTRAINT "AdvantageTranslation_advantage_id_fkey";

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

-- DropForeignKey
ALTER TABLE "DecorationTranslation" DROP CONSTRAINT "DecorationTranslation_decoration_id_fkey";

-- DropForeignKey
ALTER TABLE "DecorationTypeTranslation" DROP CONSTRAINT "DecorationTypeTranslation_decoration_type_id_fkey";

-- DropForeignKey
ALTER TABLE "FeatureTranslation" DROP CONSTRAINT "FeatureTranslation_feature_id_fkey";

-- DropTable
DROP TABLE "Advantage";

-- DropTable
DROP TABLE "AdvantageTranslation";

-- DropTable
DROP TABLE "Decoration";

-- DropTable
DROP TABLE "DecorationAdvantage";

-- DropTable
DROP TABLE "DecorationFeature";

-- DropTable
DROP TABLE "DecorationTranslation";

-- DropTable
DROP TABLE "DecorationType";

-- DropTable
DROP TABLE "DecorationTypeTranslation";

-- DropTable
DROP TABLE "Feature";

-- DropTable
DROP TABLE "FeatureTranslation";

-- CreateTable
CREATE TABLE "Dekoracja" (
    "id" INTEGER NOT NULL,
    "szerokosc" DOUBLE PRECISION NOT NULL,
    "wysokosc" DOUBLE PRECISION NOT NULL,
    "glebokosc" DOUBLE PRECISION NOT NULL,
    "moc" DOUBLE PRECISION NOT NULL,
    "ilosc_led" INTEGER NOT NULL,
    "typ_dekoracji_id" TEXT,

    CONSTRAINT "Dekoracja_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DekoracjaTlumaczenie" (
    "id" TEXT NOT NULL,
    "dekoracja_id" INTEGER NOT NULL,
    "tytul" TEXT NOT NULL,
    "kod_jezyka" TEXT NOT NULL,

    CONSTRAINT "DekoracjaTlumaczenie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TypDekoracji" (
    "id" TEXT NOT NULL,

    CONSTRAINT "TypDekoracji_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TypDekoracjiTlumaczenie" (
    "id" TEXT NOT NULL,
    "typ_dekoracji_id" TEXT NOT NULL,
    "nazwa" TEXT NOT NULL,
    "kod_jezyka" TEXT NOT NULL,

    CONSTRAINT "TypDekoracjiTlumaczenie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cechy" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Cechy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CechyTlumaczenie" (
    "id" TEXT NOT NULL,
    "cecha_id" TEXT NOT NULL,
    "nazwa" TEXT NOT NULL,
    "opis" TEXT,
    "kod_jezyka" TEXT NOT NULL,

    CONSTRAINT "CechyTlumaczenie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Przewagi" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Przewagi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrzewagiTlumaczenie" (
    "id" TEXT NOT NULL,
    "przewaga_id" TEXT NOT NULL,
    "nazwa" TEXT NOT NULL,
    "opis" TEXT,
    "kod_jezyka" TEXT NOT NULL,

    CONSTRAINT "PrzewagiTlumaczenie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DekoracjaCechy" (
    "id" TEXT NOT NULL,
    "dekoracja_id" INTEGER NOT NULL,
    "cecha_id" TEXT NOT NULL,

    CONSTRAINT "DekoracjaCechy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DekoracjaPrzewagi" (
    "id" TEXT NOT NULL,
    "dekoracja_id" INTEGER NOT NULL,
    "przewaga_id" TEXT NOT NULL,

    CONSTRAINT "DekoracjaPrzewagi_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Dekoracja" ADD CONSTRAINT "Dekoracja_typ_dekoracji_id_fkey" FOREIGN KEY ("typ_dekoracji_id") REFERENCES "TypDekoracji"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DekoracjaTlumaczenie" ADD CONSTRAINT "DekoracjaTlumaczenie_dekoracja_id_fkey" FOREIGN KEY ("dekoracja_id") REFERENCES "Dekoracja"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TypDekoracjiTlumaczenie" ADD CONSTRAINT "TypDekoracjiTlumaczenie_typ_dekoracji_id_fkey" FOREIGN KEY ("typ_dekoracji_id") REFERENCES "TypDekoracji"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CechyTlumaczenie" ADD CONSTRAINT "CechyTlumaczenie_cecha_id_fkey" FOREIGN KEY ("cecha_id") REFERENCES "Cechy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrzewagiTlumaczenie" ADD CONSTRAINT "PrzewagiTlumaczenie_przewaga_id_fkey" FOREIGN KEY ("przewaga_id") REFERENCES "Przewagi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DekoracjaCechy" ADD CONSTRAINT "DekoracjaCechy_dekoracja_id_fkey" FOREIGN KEY ("dekoracja_id") REFERENCES "Dekoracja"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DekoracjaCechy" ADD CONSTRAINT "DekoracjaCechy_cecha_id_fkey" FOREIGN KEY ("cecha_id") REFERENCES "Cechy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DekoracjaPrzewagi" ADD CONSTRAINT "DekoracjaPrzewagi_dekoracja_id_fkey" FOREIGN KEY ("dekoracja_id") REFERENCES "Dekoracja"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DekoracjaPrzewagi" ADD CONSTRAINT "DekoracjaPrzewagi_przewaga_id_fkey" FOREIGN KEY ("przewaga_id") REFERENCES "Przewagi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
