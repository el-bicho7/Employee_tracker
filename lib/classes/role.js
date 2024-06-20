const db = require('../../connection/connection');
// Create the Role class with, id, title, department, and salary
class Role {
  constructor(id, title, department, salary){
    this.id = id
    this.title = title,
    this.department = department,
    this.salary = salary;
  }
  // This method will get All the roles
  async getAll() {
    const sql = `
      SELECT 
      role.id, 
      role.title, 
      department.name 
      AS department, role.salary 
      FROM role 
      JOIN department ON role.department = department.id;`;
    try {
      const result = await db.query(sql);
      return result.rows
    } catch (err) {
      console.log(err)
    }};
  
// This will add new roles 
  async addRole() {
    const sql = `
      INSERT INTO role (title, department, salary)
      VALUES ('${this.title}', '${this.department}', ${this.salary}) 
    `;
    try {
      await db.query(sql);
    } catch (err) {
      console.log(err);
    }
  };
};

module.exports = Role;
