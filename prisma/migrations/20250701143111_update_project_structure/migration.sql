/*
  Warnings:

  - You are about to drop the column `category` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Project` table. All the data in the column will be lost.
  - Added the required column `date` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `details` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `summary` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "category",
DROP COLUMN "description",
DROP COLUMN "endDate",
DROP COLUMN "image",
DROP COLUMN "location",
DROP COLUMN "startDate",
DROP COLUMN "status",
DROP COLUMN "title",
ADD COLUMN     "challenges" TEXT[],
ADD COLUMN     "date" TEXT NOT NULL,
ADD COLUMN     "details" TEXT NOT NULL,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "summary" TEXT NOT NULL;
