const db = require('../connection/connection');

class Department {
  constructor(id, name){
    this.id = id,
    this.name =name;
  }

  getAll() {
    const sql = 'SELECT * FROM department';
    return db.query(sql).then(({rows}) => {
      return rows;
    });
  }
};

module.exports = Department;