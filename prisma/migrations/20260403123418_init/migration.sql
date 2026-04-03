-- CreateTable
CREATE TABLE `Profile` (
    `id` INTEGER NOT NULL DEFAULT 1,
    `fullName` VARCHAR(191) NOT NULL,
    `nickname` VARCHAR(191) NOT NULL,
    `headline` VARCHAR(191) NOT NULL,
    `subheadline` TEXT NOT NULL,
    `summary` TEXT NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `availability` VARCHAR(191) NOT NULL,
    `resumeFocus` VARCHAR(191) NOT NULL,
    `yearsExperience` VARCHAR(191) NOT NULL,
    `projectCount` VARCHAR(191) NOT NULL,
    `currentRole` VARCHAR(191) NOT NULL,
    `expectedSalary` VARCHAR(191) NOT NULL,
    `startWindow` VARCHAR(191) NOT NULL,
    `avatarPath` VARCHAR(191) NOT NULL,
    `primaryColor` VARCHAR(191) NOT NULL,
    `secondaryColor` VARCHAR(191) NOT NULL,
    `personalDetails` JSON NOT NULL,
    `highlightItems` JSON NOT NULL,
    `skillGroups` JSON NOT NULL,
    `languages` JSON NOT NULL,
    `strengths` JSON NOT NULL,
    `typingSpeed` VARCHAR(191) NOT NULL,
    `transport` VARCHAR(191) NOT NULL,
    `socials` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Experience` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `profileId` INTEGER NOT NULL,
    `period` VARCHAR(191) NOT NULL,
    `company` VARCHAR(191) NOT NULL,
    `position` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `salary` VARCHAR(191) NULL,
    `highlights` JSON NOT NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Project` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `profileId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `stack` VARCHAR(191) NOT NULL,
    `summary` TEXT NOT NULL,
    `impact` TEXT NOT NULL,
    `link` VARCHAR(191) NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Education` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `profileId` INTEGER NOT NULL,
    `period` VARCHAR(191) NOT NULL,
    `school` VARCHAR(191) NOT NULL,
    `degree` VARCHAR(191) NOT NULL,
    `major` VARCHAR(191) NULL,
    `faculty` VARCHAR(191) NULL,
    `gpa` VARCHAR(191) NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Certificate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `profileId` INTEGER NOT NULL,
    `period` VARCHAR(191) NOT NULL,
    `issuer` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Experience` ADD CONSTRAINT `Experience_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Education` ADD CONSTRAINT `Education_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Certificate` ADD CONSTRAINT `Certificate_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
