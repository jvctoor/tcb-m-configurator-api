-- CreateTable
CREATE TABLE `Pedido` (
    `idPedido` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `nome` VARCHAR(191) NOT NULL,
    `empresa` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `observacoes` VARCHAR(191) NULL,

    UNIQUE INDEX `Pedido_telefone_key`(`telefone`),
    UNIQUE INDEX `Pedido_email_key`(`email`),
    PRIMARY KEY (`idPedido`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Interface` (
    `idInterface` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `quantidade` INTEGER NOT NULL,
    `valor` DOUBLE NOT NULL,
    `imagem` VARCHAR(191) NOT NULL,
    `idPedido` INTEGER NOT NULL,

    PRIMARY KEY (`idInterface`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ambiente` (
    `idAmbiente` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `idInterface` INTEGER NOT NULL,
    `ambiente` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idAmbiente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Item_Interface` (
    `idItemInterface` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `idInterface` INTEGER NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `preco` DOUBLE NOT NULL,
    `quantidade` INTEGER NOT NULL,

    PRIMARY KEY (`idItemInterface`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Item_Cabo` (
    `idItemCabo` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `quantidade` INTEGER NOT NULL,
    `preco` DOUBLE NOT NULL,
    `idPedido` INTEGER NOT NULL,

    PRIMARY KEY (`idItemCabo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Interface` ADD CONSTRAINT `Interface_idPedido_fkey` FOREIGN KEY (`idPedido`) REFERENCES `Pedido`(`idPedido`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ambiente` ADD CONSTRAINT `Ambiente_idInterface_fkey` FOREIGN KEY (`idInterface`) REFERENCES `Interface`(`idInterface`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item_Interface` ADD CONSTRAINT `Item_Interface_idInterface_fkey` FOREIGN KEY (`idInterface`) REFERENCES `Interface`(`idInterface`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item_Cabo` ADD CONSTRAINT `Item_Cabo_idPedido_fkey` FOREIGN KEY (`idPedido`) REFERENCES `Pedido`(`idPedido`) ON DELETE RESTRICT ON UPDATE CASCADE;
