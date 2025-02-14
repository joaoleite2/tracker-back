/*
  Warnings:

  - You are about to drop the `expansetypes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `expansetypes` DROP FOREIGN KEY `ExpanseTypes_folderId_fkey`;

-- DropTable
DROP TABLE `expansetypes`;

-- CreateTable
CREATE TABLE `TrackerType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `folderId` INTEGER NOT NULL,

    UNIQUE INDEX `TrackerType_name_folderId_key`(`name`, `folderId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TrackerType` ADD CONSTRAINT `TrackerType_folderId_fkey` FOREIGN KEY (`folderId`) REFERENCES `Folder`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
