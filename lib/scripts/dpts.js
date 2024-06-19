// Call the Department class
const Department = require('../classes/dpt');
// Call the module in the index page 
const index = require('../../index');
// Call the inquirer module
const inquirer = require('inquirer');

// This function will return all the departments stored in the db
async function viewAllDepartments(){
  try {
    // Create a new Department to get it's methods
    let department = new Department();
    // GetAll the info in the department db and stored in result
    const result = await department.getAll();
    // Console table the results
    console.table(result);
    // Start the app again
    index.startApp();
  } catch (err) {
    console.log(err);
  }
};

// This function will add a new Department
async function addDepartment(){
  try {
    // Run inquirer and get an answer for the new Department
    const answer = await inquirer.prompt([
      {
        type: 'input',
        name: 'newDpt',
        message: 'What is the name of the department?'
      }
    ]);
    // Extract the newDpt property from the answer
    const { newDpt } = answer;
    // Create a new Department to add the newDpt
    let department = new Department(null, newDpt);
    // Await to add the department with the addDpt method
    await department.addDpt();
    // Start the app again
    index.startApp();
  } catch (err) {
    console.error(err);
  }
}

module.exports = { viewAllDepartments, addDepartment };