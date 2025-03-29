/*
  Warnings:

  - Made the column `city` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `country` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `image` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `postalCode` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `streetAddress` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "city" SET NOT NULL,
ALTER COLUMN "city" SET DEFAULT '',
ALTER COLUMN "country" SET NOT NULL,
ALTER COLUMN "country" SET DEFAULT '',
ALTER COLUMN "image" SET NOT NULL,
ALTER COLUMN "image" SET DEFAULT '',
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" SET DEFAULT '',
ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "phone" SET DEFAULT '',
ALTER COLUMN "postalCode" SET NOT NULL,
ALTER COLUMN "postalCode" SET DEFAULT '',
ALTER COLUMN "streetAddress" SET NOT NULL,
ALTER COLUMN "streetAddress" SET DEFAULT '';
