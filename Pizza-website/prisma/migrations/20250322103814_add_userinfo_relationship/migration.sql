/*
  Warnings:

  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `UserInfo` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `UserInfo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `UserInfo` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "UserInfo_email_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
DROP COLUMN "image",
DROP COLUMN "name";

-- AlterTable
ALTER TABLE "UserInfo" DROP COLUMN "email",
ADD COLUMN     "image" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "name" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserInfo_userId_key" ON "UserInfo"("userId");

-- AddForeignKey
ALTER TABLE "UserInfo" ADD CONSTRAINT "UserInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
