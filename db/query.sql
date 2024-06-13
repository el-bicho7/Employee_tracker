SELECT 
  role.title, role.department_id, role.salary, department.name 
FROM role 
JOIN department ON role.department_id = department.id;


SELECT * FROM department;

SELECT 
    role.id, role.title, department.name AS department, role.salary
FROM role JOIN department ON role.department_id = department.id;

SELECT 
  employee.id, employee.first_name, employee.last_name, department.name AS department, role.salary, employee.manager_id
FROM employee 
JOIN role ON employee.role_id = role.department_id
JOIN department ON role.department_id = department.id;