-- CreateTable
CREATE TABLE "Decoration" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "decoration_type_id" TEXT NOT NULL,
    "width" DOUBLE PRECISION NOT NULL,
    "length" DOUBLE PRECISION NOT NULL,
    "depth" DOUBLE PRECISION NOT NULL,
    "power" INTEGER NOT NULL,
    "led_quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Decoration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feature" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Feature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Advantage" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Advantage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DecorationType" (
    "id" TEXT NOT NULL,
    "type_name" TEXT NOT NULL,

    CONSTRAINT "DecorationType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DecorationFeature" (
    "id" TEXT NOT NULL,
    "decoration_id" TEXT NOT NULL,
    "feature_id" TEXT NOT NULL,

    CONSTRAINT "DecorationFeature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DecorationAdvantage" (
    "id" TEXT NOT NULL,
    "decoration_id" TEXT NOT NULL,
    "advantage_id" TEXT NOT NULL,

    CONSTRAINT "DecorationAdvantage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Translations" (
    "id" TEXT NOT NULL,
    "entity_type" TEXT NOT NULL,
    "entity_id" TEXT NOT NULL,
    "language_code" TEXT NOT NULL,
    "translated_text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Translations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Decoration" ADD CONSTRAINT "Decoration_decoration_type_id_fkey" FOREIGN KEY ("decoration_type_id") REFERENCES "DecorationType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DecorationFeature" ADD CONSTRAINT "DecorationFeature_decoration_id_fkey" FOREIGN KEY ("decoration_id") REFERENCES "Decoration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DecorationFeature" ADD CONSTRAINT "DecorationFeature_feature_id_fkey" FOREIGN KEY ("feature_id") REFERENCES "Feature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DecorationAdvantage" ADD CONSTRAINT "DecorationAdvantage_decoration_id_fkey" FOREIGN KEY ("decoration_id") REFERENCES "Decoration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DecorationAdvantage" ADD CONSTRAINT "DecorationAdvantage_advantage_id_fkey" FOREIGN KEY ("advantage_id") REFERENCES "Advantage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
