-- MySQL Script generated by MySQL Workbench
-- Sun Jun 10 00:27:46 2018
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Users` (
  `userid` INT NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NULL,
  `phone` VARCHAR(45) NOT NULL,
  `useraddress` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`userid`),
  UNIQUE INDEX `id_UNIQUE` (`userid` ASC),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC),
  UNIQUE INDEX `phone_UNIQUE` (`phone` ASC),
  UNIQUE INDEX `address_UNIQUE` (`useraddress` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`WorldCupMatch`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`WorldCupMatch` (
  `matchid` INT NOT NULL,
  `hostid` INT NOT NULL,
  `guestid` INT NOT NULL,
  `result` INT NOT NULL,
  `matchstarttime` DATETIME NOT NULL,
  `matchendtime` DATETIME NULL,
  PRIMARY KEY (`matchid`),
  UNIQUE INDEX `id_UNIQUE` (`matchid` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`WorldCupTeams`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`WorldCupTeams` (
  `teamid` INT NOT NULL,
  `teamname` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`teamid`, `teamname`),
  UNIQUE INDEX `id_UNIQUE` (`teamid` ASC),
  UNIQUE INDEX `name_UNIQUE` (`teamname` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Contracts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Contracts` (
  `contractid` INT NOT NULL,
  `contractaddress` VARCHAR(45) NOT NULL,
  `contracttype` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`contractid`, `contractaddress`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`ContractsType`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`ContractsType` (
  `congtracttypeid` INT NOT NULL,
  `contracttypedesc` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`congtracttypeid`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`UsersContracts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`UsersContracts` (
  `ucid` INT NOT NULL,
  `userid` VARCHAR(45) NOT NULL,
  `contractid` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ucid`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
