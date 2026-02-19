Create database projeto_argos;
use projeto_argos;

CREATE TABLE `Unidade` (
  `id_unidade` INT PRIMARY KEY,
  `nome_unidade` VARCHAR(45),
  `sigla` VARCHAR(45),
  `telefone` CHAR(12));

CREATE TABLE `Endereco` (
  `id_unidade` INT PRIMARY KEY,
  `unidade_federal` VARCHAR(45) NOT NULL,
  `CEP` VARCHAR(45) NOT NULL,
  `cidade` VARCHAR(45) NOT NULL,
  `rua` VARCHAR(45) NOT NULL,
  `bairro` VARCHAR(45) NOT NULL,
  CONSTRAINT `fk_Endereco_Unidade`
    FOREIGN KEY (`id_unidade`)
    REFERENCES `Unidade` (`id_unidade`));
    
CREATE TABLE Servidor (
  `id_servidor` INT NOT NULL,
  `fk_unidade` INT NOT NULL,
  `fornecedor` VARCHAR(45),
  `modelo` VARCHAR(45),
  `numero_serie` VARCHAR(45) ,
  `ultima_manutencao` VARCHAR(45),
  `hostname` VARCHAR(45),
  `status` VARCHAR(45),
  PRIMARY KEY (`id_servidor`, `fk_unidade`),
  CONSTRAINT `fk_Servidor_Unidade`
    FOREIGN KEY (`fk_unidade`)
    REFERENCES `Unidade` (`id_unidade`));

CREATE TABLE `Configuracao` (
  `Servidor_id_servidor` INT NOT NULL,
  `CPU` VARCHAR(45),
  `RAM` VARCHAR(45),
  `DISCO` INT,
  PRIMARY KEY (`Servidor_id_servidor`),
  CONSTRAINT `fk_Configuracao_Servidor`
    FOREIGN KEY (`Servidor_id_servidor`)
    REFERENCES `Servidor` (`id_servidor`));


CREATE TABLE `Info_Serv` (
  `id_info` INT NOT NULL,
  `fk_servidor` INT NOT NULL,
  `uso_cpu` DECIMAL(4,1),
  `uso_ram` DECIMAL(4,1),
  `uso_disco` DECIMAL(4,1),
  `info_time` DATETIME,
  PRIMARY KEY (`id_info`, `fk_servidor`),
  CONSTRAINT `fk_Info_Serv_Servidor`
    FOREIGN KEY (`fk_servidor`)
    REFERENCES `Servidor` (`id_servidor`));

CREATE TABLE `funcionario` (
  `id_funcionario` INT NOT NULL,
  `fk_unidade` INT NOT NULL,
  `nome` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `senha` VARCHAR(45) NOT NULL,
  `token` VARCHAR(45) NOT NULL,
  `telefone` CHAR(12),
  `data_admissao` DATE,
  `funcao` VARCHAR(45),
  `id_responsavel` INT NOT NULL,
  PRIMARY KEY (`id_funcionario`, `fk_unidade`),
  CONSTRAINT `fk_funcionario_Unidade`
    FOREIGN KEY (`fk_unidade`)
    REFERENCES `sakila`.`Unidade` (`id_unidade`),
  CONSTRAINT `fk_funcionario_responsavel`
    FOREIGN KEY (`id_responsavel`)
    REFERENCES `funcionario` (`id_funcionario`));

CREATE TABLE `Administrador` (
  `id_funcionario` INT NOT NULL,
  `id_servidor` INT NOT NULL,
  `time_check` TIME NULL,
  `end_check` TIME NULL,
  PRIMARY KEY (`id_funcionario`, `id_servidor`),
  CONSTRAINT `fk_Administrador_funcionario`
    FOREIGN KEY (`id_funcionario`)
    REFERENCES `sakila`.`funcionario` (`id_funcionario`),
	CONSTRAINT `fk_Administrador_Servidor`
    FOREIGN KEY (`id_servidor`)
    REFERENCES`Servidor` (`id_servidor`));
