-- DropForeignKey
ALTER TABLE "MenuItemSides" DROP CONSTRAINT "MenuItemSides_menuItemId_fkey";

-- DropForeignKey
ALTER TABLE "MenuItemSizes" DROP CONSTRAINT "MenuItemSizes_menuItemId_fkey";

-- AddForeignKey
ALTER TABLE "MenuItemSizes" ADD CONSTRAINT "MenuItemSizes_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "MenuItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuItemSides" ADD CONSTRAINT "MenuItemSides_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "MenuItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
