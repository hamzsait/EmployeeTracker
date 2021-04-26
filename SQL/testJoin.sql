USE employeeDB;

SELECT employees.id, employees.firstName, employees.lastName, departments.name as department, roles.title as role, roles.salary, concat(managers.firstName," ",managers.lastName) as manager
    FROM (((roles
    JOIN employees ON roles.id = employees.role_id)
    JOIN departments ON department_id = departments.id)
    JOIN managers ON manager_id = managers.id)
    ORDER BY employees.id;