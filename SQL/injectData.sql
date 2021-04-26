USE employeeDB;

-- Adding departments

INSERT INTO departments(name)
VALUES ("Security");

INSERT INTO departments(name)
VALUES ("DevOps");

INSERT INTO departments(name)
VALUES ("Engineers");

-- Adding managers

INSERT INTO managers(firstName,lastName,department_id)
VALUES ('Chad','Smith',1);

INSERT INTO managers(firstName,lastName,department_id)
VALUES ('Patesh','Ghandi',2);

-- Add roles

INSERT INTO roles (title,salary,department_id)
VALUES ("Intern",20000,1);

INSERT INTO roles (title,salary,department_id)
VALUES ("Engineer",60000,2);

INSERT INTO roles (title,salary,department_id)
VALUES ("Developer",40000,3);

-- Adding employees

INSERT INTO employees (firstName,lastName,role_id,manager_id)
VALUES ("Hamza","Sait",1,1);

INSERT INTO employees (firstName,lastName,role_id,manager_id)
VALUES ("Monica","Flores",2,2);

INSERT INTO employees (firstName,lastName,role_id,manager_id)
VALUES ("Amanda","Juarez", 1,2);