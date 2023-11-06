/*
  Warnings:

  - Added the required column `cod` to the `Item_Cabo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imagem` to the `Item_Cabo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cod` to the `Item_Interface` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imagem` to the `Item_Interface` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Item_Cabo` ADD COLUMN `cod` INTEGER NOT NULL,
    ADD COLUMN `imagem` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Item_Interface` ADD COLUMN `cod` INTEGER NOT NULL,
    ADD COLUMN `imagem` VARCHAR(191) NOT NULL;
