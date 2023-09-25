-- creacion de la base de datos
CREATE DATABASE IF NOT EXISTS companydb;

USE companydb;

-- crear tabala
CREATE TABLE employee(
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) DEFAULT NULL,
    salary INT(5) DEFAULT NULL,
    PRIMARY KEY (id)
);

SHOW TABLES;

-- mostrar estructura de la tabla
DESCRIBE employee;

-- insertar datos
INSERT INTO employee VALUES
    (1,'Joes', 1000),
    (2, 'Henry', 2000),
    (3, 'Sam', 2500),
    (4, 'Max', 1500);