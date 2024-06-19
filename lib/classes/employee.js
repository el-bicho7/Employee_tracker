const db = require('../../connection/connection');

class Employee {
  constructor(id, first_name, last_name, role_id, manager_id){
    this.id = id,
    this.first_name = first_name,
    this.last_name = last_name,
    this.role_id = role_id,
    this.manager_id = manager_id;
  }

  getAll() {
    const sql = `SELECT 
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
      LEFT JOIN employee m ON e.manager_id = m.id;`;
    return db.query(sql).then(({rows}) => {
      return rows;
    });
  }

  addEmployee() {
    const sql = `
      INSERT INTO employee (first_name, last_name, role_id, manager_id)
      VALUES ('${this.first_name}', '${this.last_name}', ${this.role_id}, ${this.manager_id})  
    `
    return db.query(sql);
  }
};

module.exports = Employee;