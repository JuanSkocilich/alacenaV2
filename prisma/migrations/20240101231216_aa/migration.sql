-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryProduct_fkey";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "categoryProduct" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryProduct_fkey" FOREIGN KEY ("categoryProduct") REFERENCES "Category"("name") ON DELETE SET NULL ON UPDATE CASCADE;
