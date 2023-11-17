/*
  Warnings:

  - Made the column `quantidade` on table `Item_Cabo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `preco` on table `Item_Cabo` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Item_Cabo` MODIFY `quantidade` INTEGER NOT NULL,
    MODIFY `preco` DOUBLE NOT NULL;
