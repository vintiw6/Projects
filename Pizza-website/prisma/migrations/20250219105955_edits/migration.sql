-- CreateTable
CREATE TABLE "ExtraPrice" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "price" DOUBLE PRECISION,

    CONSTRAINT "ExtraPrice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MenuItem" (
    "id" SERIAL NOT NULL,
    "image" TEXT,
    "name" TEXT,
    "description" TEXT,
    "basePrice" DOUBLE PRECISION,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "MenuItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MenuItemSizes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_MenuItemSizes_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_MenuItemExtras" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_MenuItemExtras_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE INDEX "_MenuItemSizes_B_index" ON "_MenuItemSizes"("B");

-- CreateIndex
CREATE INDEX "_MenuItemExtras_B_index" ON "_MenuItemExtras"("B");

-- AddForeignKey
ALTER TABLE "MenuItem" ADD CONSTRAINT "MenuItem_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MenuItemSizes" ADD CONSTRAINT "_MenuItemSizes_A_fkey" FOREIGN KEY ("A") REFERENCES "ExtraPrice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MenuItemSizes" ADD CONSTRAINT "_MenuItemSizes_B_fkey" FOREIGN KEY ("B") REFERENCES "MenuItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MenuItemExtras" ADD CONSTRAINT "_MenuItemExtras_A_fkey" FOREIGN KEY ("A") REFERENCES "ExtraPrice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MenuItemExtras" ADD CONSTRAINT "_MenuItemExtras_B_fkey" FOREIGN KEY ("B") REFERENCES "MenuItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
