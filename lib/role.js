const db = require('../connection/connection');

class Role {
  constructor(id, title, department, salary){
    this.id = id
    this.title = title,
    this.department = department,
    this.salary = salary;
  }

  getAll() {
    const sql = `
      SELECT 
      role.id, 
      role.title, 
      department.name 
      AS department, role.salary 
      FROM role 
      JOIN department ON role.department = department.id;`
    return db.query(sql).then(({rows}) => {
      return rows;
    });
  }
};

module.exports = Role;
