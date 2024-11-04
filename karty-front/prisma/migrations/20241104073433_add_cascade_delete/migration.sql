-- DropForeignKey
ALTER TABLE "CechyTlumaczenie" DROP CONSTRAINT "CechyTlumaczenie_cecha_id_fkey";

-- DropForeignKey
ALTER TABLE "DekoracjaCechy" DROP CONSTRAINT "DekoracjaCechy_cecha_id_fkey";

-- DropForeignKey
ALTER TABLE "DekoracjaCechy" DROP CONSTRAINT "DekoracjaCechy_dekoracja_id_fkey";

-- DropForeignKey
ALTER TABLE "DekoracjaPrzewagi" DROP CONSTRAINT "DekoracjaPrzewagi_dekoracja_id_fkey";

-- DropForeignKey
ALTER TABLE "DekoracjaPrzewagi" DROP CONSTRAINT "DekoracjaPrzewagi_przewaga_id_fkey";

-- DropForeignKey
ALTER TABLE "DekoracjaTlumaczenie" DROP CONSTRAINT "DekoracjaTlumaczenie_dekoracja_id_fkey";

-- DropForeignKey
ALTER TABLE "PrzewagiTlumaczenie" DROP CONSTRAINT "PrzewagiTlumaczenie_przewaga_id_fkey";

-- DropForeignKey
ALTER TABLE "TypDekoracjiTlumaczenie" DROP CONSTRAINT "TypDekoracjiTlumaczenie_typ_dekoracji_id_fkey";

-- AddForeignKey
ALTER TABLE "DekoracjaTlumaczenie" ADD CONSTRAINT "DekoracjaTlumaczenie_dekoracja_id_fkey" FOREIGN KEY ("dekoracja_id") REFERENCES "Dekoracja"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TypDekoracjiTlumaczenie" ADD CONSTRAINT "TypDekoracjiTlumaczenie_typ_dekoracji_id_fkey" FOREIGN KEY ("typ_dekoracji_id") REFERENCES "TypDekoracji"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CechyTlumaczenie" ADD CONSTRAINT "CechyTlumaczenie_cecha_id_fkey" FOREIGN KEY ("cecha_id") REFERENCES "Cechy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrzewagiTlumaczenie" ADD CONSTRAINT "PrzewagiTlumaczenie_przewaga_id_fkey" FOREIGN KEY ("przewaga_id") REFERENCES "Przewagi"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DekoracjaCechy" ADD CONSTRAINT "DekoracjaCechy_dekoracja_id_fkey" FOREIGN KEY ("dekoracja_id") REFERENCES "Dekoracja"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DekoracjaCechy" ADD CONSTRAINT "DekoracjaCechy_cecha_id_fkey" FOREIGN KEY ("cecha_id") REFERENCES "Cechy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DekoracjaPrzewagi" ADD CONSTRAINT "DekoracjaPrzewagi_dekoracja_id_fkey" FOREIGN KEY ("dekoracja_id") REFERENCES "Dekoracja"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DekoracjaPrzewagi" ADD CONSTRAINT "DekoracjaPrzewagi_przewaga_id_fkey" FOREIGN KEY ("przewaga_id") REFERENCES "Przewagi"("id") ON DELETE CASCADE ON UPDATE CASCADE;
