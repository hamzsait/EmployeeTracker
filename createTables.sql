DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;
USE employeeDB;

CREATE TABLE departments(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(30)
);

CREATE TABLE roles(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(30),
    salary DECIMAL(10,2),
    department_id INTEGER,
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE employees(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName VARCHAR(30),
    lastName VARCHAR(30),
    role_id INTEGER,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    manager_id INTEGER
);



