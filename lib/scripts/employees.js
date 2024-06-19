// Require the Employee class and the index export
const Employee = require('../classes/employee');
const index = require('../../index');
const Role = require('../classes/role');
const inquirer = require('inquirer');

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

async function addEmployee(){
  try {
    let roles = new Role();
    const role = await roles.getAll();
    let employees = new Employee();
    const employee = await employees.getAll();

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
        choices: role.map(rl => ({
          name: `${rl.id} - ${rl.title}`,
          value: rl.id
        }))
      },
      {
        type: 'list',
        name: 'employeeManager',
        message: "What's the employee's manager?",
        choices: [
          {name: 'None', value: null },
          ...employee.map(em => ({
          name: `${em.first_name} ${em.last_name}`,
          value: em.id
        }))
      ]
      }
    ]);
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