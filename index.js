const express = require('express');
const { Pool } = require('pg');
const inquirer = require('inquirer');
const actions = [
  'Add Department',
  'Add Employee',
  'Update Employee Role',
  'View All Employees',
  'View All Departments',
  'View All Roles',
  'Quit'
];
const employeeManagerArt = `
_____ _____ _____ _____ _____ _____ _____ _____ _____ _____ _____ _____ _____ _____ 
\____\\____\\____\\____\\____\\____\\____\\____\\____\\____\\____\\____\\____\\____\
                                                                                    
                                                                                    
 _                  _____ _      ____  _     ____ ___  _ _____ _____         _      
| |                /  __// \__/|/  __\/ \   /  _ \\  \///  __//  __/        | |     
\_/                |  \  | |\/|||  \/|| |   | / \| \  / |  \  |  \          \_/     
 _                 |  /_ | |  |||  __/| |_/\| \_/| / /  |  /_ |  /_          _      
/ \                \____\\_/  \|\_/   \____/\____//_/   \____\\____\        / \     
|_|                                                                         |_|     
 _                  _      ____  _      ____  _____ _____ ____                _     
| |                / \__/|/  _ \/ \  /|/  _ \/  __//  __//  __\              | |    
\_/                | |\/||| / \|| |\ ||| / \|| |  _|  \  |  \/|              \_/    
 _                 | |  ||| |-||| | \||| |-||| |_//|  /_ |    /               _     
/ \                \_/  \|\_/ \|\_/  \|\_/ \|\____\\____\\_/\_\              / \    
|_|                                                                          |_|    
                                                                                    
                                                                                    
_____ _____ _____ _____ _____ _____ _____ _____ _____ _____ _____ _____ _____ _____ 
\____\\____\\____\\____\\____\\____\\____\\____\\____\\____\\____\\____\\____\\____\
`;
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const pool = new Pool(
  {
    host: 'localhost',
    user: 'postgres',
    password: 'ylakesso',
    database: 'employees_db'
  },
  console.log(employeeManagerArt)
)

pool.connect(err => {
  if (err) throw err;
  startApp();
})


function viewAllDepartments(){
  pool.query('SELECT * FROM department;', function (err, { rows }) {
    if(err) throw err;
    console.log(rows);
    startApp(); 
  })
}


function startApp(){
  inquirer
  .prompt([
    {
      type: "list",
      message: 'What would you like to do?',
      name: 'action',
      choices: actions
    }]
  ).then((response) =>{
      switch (response.action) {
        case 'View All Departments':
          viewAllDepartments()
          break;
        case 'View All Employees':
          viewAllEmployees()
          break;
        case 'View All Roles':
          viewAllRoles()
          break;
        case 'Add Department':
          addDepartment()
          break;
        case 'Add Employee':
          addEmployee()
          break;
        case 'Update Employee Role':
          updateEmployee()
          break;
        case 'Quit':
          console.log("Press ctrl + c to close.")
          break;
      }
  })};