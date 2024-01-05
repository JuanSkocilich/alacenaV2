-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "folder" TEXT;

-- CreateTable
CREATE TABLE "Folder" (
    "id" SERIAL NOT NULL,
    "folder" TEXT NOT NULL,

    CONSTRAINT "Folder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Folder_folder_key" ON "Folder"("folder");
