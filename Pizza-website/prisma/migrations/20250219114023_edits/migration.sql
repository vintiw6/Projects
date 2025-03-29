/*
  Warnings:

  - You are about to drop the `ExtraPrice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MenuItemExtras` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MenuItemSizes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_MenuItemExtras" DROP CONSTRAINT "_MenuItemExtras_A_fkey";

-- DropForeignKey
ALTER TABLE "_MenuItemExtras" DROP CONSTRAINT "_MenuItemExtras_B_fkey";

-- DropForeignKey
ALTER TABLE "_MenuItemSizes" DROP CONSTRAINT "_MenuItemSizes_A_fkey";

-- DropForeignKey
ALTER TABLE "_MenuItemSizes" DROP CONSTRAINT "_MenuItemSizes_B_fkey";

-- DropTable
DROP TABLE "ExtraPrice";

-- DropTable
DROP TABLE "_MenuItemExtras";

-- DropTable
DROP TABLE "_MenuItemSizes";

-- CreateTable
CREATE TABLE "ExtraPriceSize" (
    "id" SERIAL NOT NULL,
    "size" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ExtraPriceSize_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MenuItemSizes" (
    "menuItemId" INTEGER NOT NULL,
    "extraPriceSizeId" INTEGER NOT NULL,

    CONSTRAINT "MenuItemSizes_pkey" PRIMARY KEY ("menuItemId","extraPriceSizeId")
);

-- CreateTable
CREATE TABLE "ExtraPriceSide" (
    "id" SERIAL NOT NULL,
    "side" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ExtraPriceSide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MenuItemSides" (
    "menuItemId" INTEGER NOT NULL,
    "extraPriceSideId" INTEGER NOT NULL,

    CONSTRAINT "MenuItemSides_pkey" PRIMARY KEY ("menuItemId","extraPriceSideId")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExtraPriceSize_size_key" ON "ExtraPriceSize"("size");

-- CreateIndex
CREATE UNIQUE INDEX "ExtraPriceSide_side_key" ON "ExtraPriceSide"("side");

-- AddForeignKey
ALTER TABLE "MenuItemSizes" ADD CONSTRAINT "MenuItemSizes_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "MenuItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuItemSizes" ADD CONSTRAINT "MenuItemSizes_extraPriceSizeId_fkey" FOREIGN KEY ("extraPriceSizeId") REFERENCES "ExtraPriceSize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuItemSides" ADD CONSTRAINT "MenuItemSides_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "MenuItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuItemSides" ADD CONSTRAINT "MenuItemSides_extraPriceSideId_fkey" FOREIGN KEY ("extraPriceSideId") REFERENCES "ExtraPriceSide"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
