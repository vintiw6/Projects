-- DropForeignKey
ALTER TABLE "MenuItem" DROP CONSTRAINT "MenuItem_orderId_fkey";

-- AlterTable
ALTER TABLE "MenuItem" ALTER COLUMN "orderId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "MenuItem" ADD CONSTRAINT "MenuItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
