/*
  Warnings:

  - You are about to drop the column `opis` on the `CechyTlumaczenie` table. All the data in the column will be lost.
  - You are about to drop the column `opis` on the `PrzewagiTlumaczenie` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CechyTlumaczenie" DROP COLUMN "opis";

-- AlterTable
ALTER TABLE "PrzewagiTlumaczenie" DROP COLUMN "opis";
