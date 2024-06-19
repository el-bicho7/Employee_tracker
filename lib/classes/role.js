const db = require('../../connection/connection');

class Role {
  constructor(id, title, department, salary){
    this.id = id
    this.title = title,
    this.department = department,
    this.salary = salary;
  }

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
