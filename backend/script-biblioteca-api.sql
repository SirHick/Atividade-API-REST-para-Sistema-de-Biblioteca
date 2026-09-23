-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema biblioteca-api
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema biblioteca-api
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `biblioteca-api` DEFAULT CHARACTER SET utf8 ;
USE `biblioteca-api` ;

-- -----------------------------------------------------
-- Table `biblioteca-api`.`livro`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `biblioteca-api`.`livro` (
  `id_livro` INT NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(45) NULL,
  `autor` VARCHAR(100) NULL,
  `isbn` VARCHAR(15) NULL,
  `ano_publicacao` DATE NULL,
  `categoria` VARCHAR(100) NULL,
  `qtd` INT NULL,
  PRIMARY KEY (`id_livro`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `biblioteca-api`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `biblioteca-api`.`usuario` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NULL,
  `cpf` VARCHAR(15) NULL,
  `email` VARCHAR(100) NULL,
  `telefone` VARCHAR(10) NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE INDEX `cpf_UNIQUE` (`cpf` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `biblioteca-api`.`emprestimo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `biblioteca-api`.`emprestimo` (
  `id_emprestimo` INT NOT NULL AUTO_INCREMENT,
  `id_livro_emprestimo` INT NULL,
  `id_usuario_emprestimo` INT NULL,
  `data_emprestimo` DATE NULL,
  `data_prevista_devolucao_emprestimo` DATE NULL,
  `data_devolucao_emprestimo` DATE NULL,
  `status` VARCHAR(50) NULL,
  `livro_id` INT NOT NULL,
  `usuario_id` INT NOT NULL,
  PRIMARY KEY (`id_emprestimo`, `livro_id`, `usuario_id`),
  INDEX `fk_emprestimo_livro_idx` (`livro_id` ASC) VISIBLE,
  INDEX `fk_emprestimo_usuario1_idx` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_emprestimo_livro`
    FOREIGN KEY (`livro_id`)
    REFERENCES `biblioteca-api`.`livro` (`id_livro`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_emprestimo_usuario1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `biblioteca-api`.`usuario` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
