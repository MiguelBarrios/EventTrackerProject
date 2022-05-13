-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema fitnesslogdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `fitnesslogdb` ;

-- -----------------------------------------------------
-- Schema fitnesslogdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `fitnesslogdb` DEFAULT CHARACTER SET utf8 ;
USE `fitnesslogdb` ;

-- -----------------------------------------------------
-- Table `exercise_set`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `exercise_set` ;

CREATE TABLE IF NOT EXISTS `exercise_set` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `exercise_name` VARCHAR(500) NULL,
  `weight` DECIMAL(8,2) NULL,
  `reps` INT NULL,
  `type` VARCHAR(45) NULL,
  `datetime` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS fitnessuser@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'fitnessuser'@'localhost' IDENTIFIED BY 'fitnessuser';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'fitnessuser'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `exercise_set`
-- -----------------------------------------------------
START TRANSACTION;
USE `fitnesslogdb`;
INSERT INTO `exercise_set` (`id`, `exercise_name`, `weight`, `reps`, `type`, `datetime`) VALUES (1, 'Bench Press', 135, 15, 'warmup', '2022-02-15T08:30:23');
INSERT INTO `exercise_set` (`id`, `exercise_name`, `weight`, `reps`, `type`, `datetime`) VALUES (2, 'Bench Press', 245, 4, 'strength', NULL);
INSERT INTO `exercise_set` (`id`, `exercise_name`, `weight`, `reps`, `type`, `datetime`) VALUES (3, 'Bench Press', 185, 12, 'endurance', NULL);
INSERT INTO `exercise_set` (`id`, `exercise_name`, `weight`, `reps`, `type`, `datetime`) VALUES (4, 'Squat', 225, 10, 'warmup', NULL);
INSERT INTO `exercise_set` (`id`, `exercise_name`, `weight`, `reps`, `type`, `datetime`) VALUES (5, 'Squat', 315, 6, 'strength', NULL);

COMMIT;

