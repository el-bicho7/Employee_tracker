const db = require('../../connection/connection');

// Create employeee class
class Employee {
  constructor(id, first_name, last_name, role_id, manager_id){
    this.id = id,
    this.first_name = first_name,
    this.last_name = last_name,
    this.role_id = role_id,
    this.manager_id = manager_id;
  }
  // This method will select the first and last name, role title, department and salary
  async getAll() {
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
    try {
      const result = await db.query(sql);
      return result.rows
    } catch (err) {
      console.error(err);
    }
  }
  // This will add a new employee
  addEmployee() {
    const sql = `
      INSERT INTO employee (first_name, last_name, role_id, manager_id)
      VALUES ('${this.first_name}', '${this.last_name}', ${this.role_id}, ${this.manager_id})  
    `
    return db.query(sql);
  }
};

module.exports = Employee;