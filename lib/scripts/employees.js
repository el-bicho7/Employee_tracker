// Require the Employee and Role class 
const Employee = require('../classes/employee');
const Role = require('../classes/role');
const index = require('../../index');
const inquirer = require('inquirer');

// This function will show all the Employees
async function viewAllEmployees(){
  try {
    let employee = new Employee();
    const results = await employee.getAll();
    console.table(results);
    index.startApp();
  } catch (err) {
    console.error(err)
  }
};

// This function will add an employee
async function addEmployee(){
  try {
    let roles = new Role();
    const role = await roles.getAll();
    let employees = new Employee();
    const employee = await employees.getAll();
    // Run inquirer to get the values required for the creation of a new employee
    const answer = await inquirer.prompt([
      {
        type: 'input',
        name: 'firstName',
        message: "What's the employee's first name?"
      },
      {
        type: 'input',
        name: 'lastName',
        message: "What's the employee's last name?"
      },
      {
        type: 'list',
        name: 'employeeRole',
        message: "What's the employee's role?",
        // This choices will show the roles registered in the db, and return the id of the selected one
        choices: role.map(rl => ({
          name: `${rl.id} - ${rl.title}`,
          value: rl.id
        }))
      },
      {
        type: 'list',
        name: 'employeeManager',
        message: "What's the employee's manager?",
        // This choices will show one None value, and show the employees that are already opn the db, and return the value id of the selected one
        choices: [
          {name: 'None', value: null },
          ...employee.map(em => ({
          name: `${em.first_name} ${em.last_name}`,
          value: em.id
        }))
      ]
      }
    ]);
    // Get all the values for the class, and add them to the new employee class
    const { firstName, lastName, employeeRole, employeeManager } = answer;
    let newEmployee = new Employee(null, firstName, lastName, employeeRole, employeeManager);
    await newEmployee.addEmployee();
    console.log(`New employee added.`);
    index.startApp();
  } catch (err) {
    console.log(err);
  }
};

module.exports = { viewAllEmployees, addEmployee };