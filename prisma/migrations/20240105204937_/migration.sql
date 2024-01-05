/*
  Warnings:

  - You are about to drop the column `folder` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the `Folder` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "folder";

-- DropTable
DROP TABLE "Folder";
