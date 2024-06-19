// Require the connection to the DataBase
const db = require('../../connection/connection');

// Create a class call Department with id, and name
class Department {
  constructor(id, name){
    this.id = id,
    this.name =name;
  }
  // This function will get all the departments using sql
  async getAll() {
    const sql = 'SELECT * FROM department';
    try {
      const result = await db.query(sql);
      return result.rows;
    } catch (err) {
      console.error(err);
    }};
  
  // This function will Add a new Dpt to the Database using sql
  async addDpt() {
    const sql = `
      INSERT INTO department (name)
      VALUES ('${this.name}')
    `;
    try {
      await db.query(sql);
    } catch (err) {
      console.log(err);
    }
  };
};

module.exports = Department;