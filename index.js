// const express = require('express');
const db = require('./connection/connection');
const Department = require('./lib/dpt');
const Role = require('./lib/role');
const Employee = require('./lib/employee');;
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
\_/                | |\/||| / \|| |\ ||| / \|| |  _|  \    |  \/|              \_/    
 _                 | |  ||| |-||| | \||| |-||| |_//|  /_ |    /               _     
/ \                \_/  \|\_/ \|\_/  \|\_/ \|\____\\____\\_/\_\              / \    
|_|                                                                          |_|    
                                                                                    
                                                                                    
_____ _____ _____ _____ _____ _____ _____ _____ _____ _____ _____ _____ _____ _____ 
\____\\____\\____\\____\\____\\____\\____\\____\\____\\____\\____\\____\\____\\____\
`;

db.connect(err => {
  if (err) throw err;
  startApp();
})


function viewAllDepartments(){
  let department = new Department();
  department.getAll().then((rows) => {
    console.table(rows);
  })
  .then(() => {
    startApp();
  })
  .catch((err) => {
    console.error(err)
  });
};

function viewAllRoles(){
  let role = new Role();
  role.getAll().then((rows) => {
    console.table(rows);
  })
  .then(() => {
    startApp();
  })
  .catch((err) => {
    console.error(err)
  });
};

function viewAllEmployees(){
  let employee = new Employee();
  employee.getAll().then((rows) => {
    console.table(rows);
  })
  .then(() => {
    startApp();
  })
  .catch((err) => {
    console.error(err)
  });
};

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