/*
  Warnings:

  - You are about to drop the column `categoryProduct` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryProduct_fkey";

-- DropIndex
DROP INDEX "Category_name_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "categoryProduct",
ADD COLUMN     "category" TEXT;
