-- CreateTable
CREATE TABLE `admins` (
    `AdminID` INTEGER NOT NULL AUTO_INCREMENT,
    `UserID` INTEGER NOT NULL,
    `AdminName` VARCHAR(100) NULL,

    INDEX `UserID`(`UserID`),
    PRIMARY KEY (`AdminID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `menus` (
    `MenuID` INTEGER NOT NULL AUTO_INCREMENT,
    `MenuName` VARCHAR(100) NOT NULL,
    `Category` ENUM('food', 'drink', 'dessert') NOT NULL,
    `Price` DECIMAL(10, 2) NOT NULL,

    PRIMARY KEY (`MenuID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reservations` (
    `ReservationID` INTEGER NOT NULL AUTO_INCREMENT,
    `UserID` INTEGER NOT NULL,
    `TableID` INTEGER NOT NULL,
    `ReservationDate` DATE NOT NULL,
    `NumberOfGuests` INTEGER NOT NULL,
    `Status` ENUM('pending', 'confirmed', 'cancelled') NULL DEFAULT 'pending',

    INDEX `TableID`(`TableID`),
    INDEX `UserID`(`UserID`),
    PRIMARY KEY (`ReservationID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reviews` (
    `ReviewID` INTEGER NOT NULL AUTO_INCREMENT,
    `UserID` INTEGER NOT NULL,
    `ReservationID` INTEGER NULL,
    `Rating` INTEGER NULL,
    `Comment` VARCHAR(255) NULL,
    `ReviewDate` DATE NOT NULL DEFAULT (curdate()),

    INDEX `ReservationID`(`ReservationID`),
    INDEX `UserID`(`UserID`),
    PRIMARY KEY (`ReviewID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tables` (
    `TableID` INTEGER NOT NULL AUTO_INCREMENT,
    `TableNumber` INTEGER NOT NULL,
    `Capacity` INTEGER NOT NULL,

    UNIQUE INDEX `TableNumber`(`TableNumber`),
    PRIMARY KEY (`TableID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `UserID` INTEGER NOT NULL AUTO_INCREMENT,
    `Username` VARCHAR(50) NOT NULL,
    `Password` VARCHAR(255) NOT NULL,
    `Email` VARCHAR(100) NOT NULL,
    `Role` ENUM('user', 'admin') NOT NULL,

    UNIQUE INDEX `Username`(`Username`),
    UNIQUE INDEX `Email`(`Email`),
    PRIMARY KEY (`UserID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `admins` ADD CONSTRAINT `admins_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users`(`UserID`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `reservations` ADD CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users`(`UserID`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `reservations` ADD CONSTRAINT `reservations_ibfk_2` FOREIGN KEY (`TableID`) REFERENCES `tables`(`TableID`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users`(`UserID`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`ReservationID`) REFERENCES `reservations`(`ReservationID`) ON DELETE SET NULL ON UPDATE RESTRICT;
