DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;
USE employeeDB;

CREATE TABLE employee(
    id INTEGER PRIMARY KEY,
    firstName VARCHAR(30),
    lastName VARCHAR(30),
    role_id INTEGER,
    manager_id INTEGER
);

CREATE TABLE roles(
    id INTEGER PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL(10,2),
    department_id INTEGER
);

CREATE TABLE department(
    id INTEGER PRIMARY KEY,
    name VARCHAR(30)
);

