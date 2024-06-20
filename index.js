// const express = require('express');
const db = require('./connection/connection');
// Require the functions from the scripts and inquirer
const { viewAllDepartments, addDepartment } = require('./lib/scripts/dpts');
const { viewAllEmployees, addEmployee } = require('./lib/scripts/employees');
const { viewAllRoles, addRole } = require('./lib/scripts/roles');
const inquirer = require('inquirer');
const actions = [
  'Add Department',
  'View All Departments',
  'Add Employee',
  'View All Employees',
  'Add Role',
  'View All Roles',
  'Quit'
];
const employeeManagerArt = `Welcome to the employee database`;

// Connect to the dataBase
db.connect(err => {
  if (err) throw err;
  console.log(employeeManagerArt);
  startApp();
})

// Export the startApp function
exports.startApp = startApp;

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
    // Use the switch case to execute to execute the function based on the value 
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
        case 'Add Role':
          addRole()
          break;
        case 'Quit':
          console.log("Press ctrl + c to close.")
          break;
      }
  })};

