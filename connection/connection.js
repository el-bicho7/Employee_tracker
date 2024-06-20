// Create a connection to the db
const { Pool } = require('pg');
require('dotenv').config();

const db = new Pool(
  {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: 'localhost',
  database: process.env.DB_NAME,
  },
  console.log('Connected to the employees_db')
);

module.exports = db;