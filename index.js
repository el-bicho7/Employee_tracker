// const express = require('express');
const db = require('./connection/connection');
const { viewAllDepartments, addDepartment } = require('./lib/scripts/dpts');
const { viewAllEmployees, addEmployee } = require('./lib/scripts/employees');
const { viewAllRoles, addRole } = require('./lib/scripts/roles');
const inquirer = require('inquirer');
const actions = [
  'Add Department',
  'Add Employee',
  'Add Role',
  'View All Employees',
  'View All Departments',
  'View All Roles',
  'Quit'
];
const employeeManagerArt = `Welcome to the employee database`;

db.connect(err => {
  if (err) throw err;
  console.log(employeeManagerArt);
  startApp();
})

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

