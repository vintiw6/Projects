/*
  Warnings:

  - You are about to drop the column `side` on the `ExtraPriceSide` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `ExtraPriceSize` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `ExtraPriceSide` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `ExtraPriceSize` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `ExtraPriceSide` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `ExtraPriceSize` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ExtraPriceSide_side_key";

-- DropIndex
DROP INDEX "ExtraPriceSize_size_key";

-- AlterTable
ALTER TABLE "ExtraPriceSide" DROP COLUMN "side",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ExtraPriceSize" DROP COLUMN "size",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ExtraPriceSide_name_key" ON "ExtraPriceSide"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ExtraPriceSize_name_key" ON "ExtraPriceSize"("name");
