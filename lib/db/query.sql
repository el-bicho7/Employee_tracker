SELECT 
  role.title, role.salary, department.name 
FROM role 
JOIN department ON role.department = department.id;


SELECT 
  * 
FROM department;

SELECT role.id, role.title, department.name AS department, role.salary FROM role JOIN department ON role.department = department.id;

SELECT 
  e.id, 
  e.first_name, 
  e.last_name, 
  r.title, 
  d.name AS department,
  r.salary, 
  CASE 
    WHEN m.first_name IS NOT NULL AND m.last_name IS NOT NULL THEN m.first_name || ' ' || m.last_name ELSE NULL 
  END AS manager_id
FROM employee e
JOIN role r ON e.role_id = r.id
JOIN department d ON r.department = d.id
LEFT JOIN employee m ON e.manager_id = m.id;

