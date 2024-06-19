const Role = require('../classes/role');
const Department = require('../classes/dpt');
const index = require('../../index');
const inquirer = require('inquirer');

async function viewAllRoles(){
  try {
    let role = new Role();
    const results = await role.getAll();
    console.table(results);
    index.startApp();
  } catch (err) {
    console.log(err);
  }
};

async function addRole(){
  try {
    const departments = new Department();
    const department = await departments.getAll()

    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'newRole',
        message: "What's the name of the new Role?"
      },
      {
        type: 'input',
        name: 'roleSalary',
        message: "What's the salary of this Role?"
      },
      {
        type: 'list',
        name: 'roleDpt',
        message: "Wich department does the role belong to?",
        choices: department.map(dpt => ({
          name: `${dpt.id} - ${dpt.name}`,
          value: dpt.id
        }))
      }
    ]);
    const { newRole, roleSalary, roleDpt } = answers;
    let role = new Role(null,newRole, roleDpt, roleSalary);
    await role.addRole();
    console.log(`${newRole} role added!`);
    index.startApp();

  } catch (err) {
    console.error(err)
  }
    
}

module.exports = { viewAllRoles, addRole };