const inquirer = require('inquirer')
const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    port:3306,
    user:'root',
    password:'root',
    database:'employeeDB'
})
connection.connect((err) => {if(err) throw err})

var roles
getRoles()
async function getRoles(){
    connection.query("SELECT * FROM roles", (err,res) => {
        output = []
        for (role of res){
            output.push(`${role.id} ${role.title}`)
        }
        roles = output
    })
}

var managers
getManagers()
async function getManagers(){
    connection.query("SELECT * FROM managers", (err,res) => {
        output = []
        for (manager of res){
            output.push(`${manager.id} ${manager.firstName} ${manager.lastName}`)
        }
        managers = output
    })
}

var employees
getEmployees()
async function getEmployees(){
    connection.query("SELECT * FROM employees", (err,res) => {
        output = []
        for (employee of res){
            output.push(`${employee.id} ${employee.firstName} ${employee.lastName}`)
        }
        employees = output
    })
}

var departments
getDepartments()
async function getDepartments(){
    connection.query("SELECT * FROM departments", (err,res) => {
        output = []
        for (department of res){
            output.push(`${department.id} ${department.name}`)
        }
        departments = output
    })
}
async function viewEmployees(){
    connection.query("SELECT * FROM employees", (err,res) =>  {console.table(res); quitOrMenu()})
    return
}

async function viewDepartments(){
    connection.query("SELECT * FROM departments", (err,res) => {console.table(res); quitOrMenu()})
    return
}

async function viewRoles(){
    connection.query("SELECT * FROM roles", (err,res) => {console.table(res); quitOrMenu()})
    return
}

async function addEmployee(){
    prompts = [
    {
        message:"Add Employee First Name:",
        type:"input",
        name:"firstName"
    },
    {
        message:"Add Employee Last Name:",
        type:"input",
        name:"lastName"
    },
    {
        message:"Add Employee Role:",
        type:"list",
        choices: roles,
        name:'role'
    },
    {
        message:"Add Employee Manager:",
        type:"list",
        choices: managers,
        name:'manager'
    },
    ]
    inquirer.prompt(prompts).then(async answers => {
        newEmployee = [{
            firstName:answers.firstName,
            lastName:answers.lastName,
            role_id:Number(answers.role.split(' ')[0]),
            manager_id:Number(answers.manager.split(' ')[0])
        }]
        connection.query("INSERT INTO employees SET ?",newEmployee)
        quitOrMenu()
    })
    return
}

async function deleteEmployee(){
    inquirer.prompt([{
        message: "Who would you like to delete?",
        type:'list',
        name:'deleted',
        choices: employees
    }]).then(answer => {
        connection.query("DELETE FROM employees WHERE ?", {id:answer.deleted.split(' ')[0]})
        quitOrMenu()
    })
}

async function updateEmployeeRole(){
    inquirer.prompt([
        {
        type:'list',
        choices: employees,
        message:"Which employee would you like to update?",
        name: 'employee'
        },
        {
        type:'list',
        choices: roles,
        message:"Which role should they be assigned?",
        name: 'role'
        }
    ]).then(answers => {
        connection.query("UPDATE employees SET ? WHERE ?",
        [
         {role_id:Number(answers.role.split(' ')[0])},
         {id:Number(answers.employee.split(' ')[0])}
        ])
        quitOrMenu()
    })
}

async function updateEmployeeManager(){
    inquirer.prompt([
        {
        type:'list',
        choices: employees,
        message:"Which employee would you like to update?",
        name: 'employee'
        },
        {
        type:'list',
        choices: managers,
        message:"Which manager should they be assigned?",
        name: 'manager'
        }
    ]).then(answers => {
        connection.query("UPDATE employees SET ? WHERE ?",
        [
         {manager_id:Number(answers.manager.split(' ')[0])},
         {id:Number(answers.employee.split(' ')[0])}
        ])
        quitOrMenu()
    })
}

async function addDepartment(){
    prompts = [
    {
        message:"Add Department Name:",
        type:"input",
        name:"name"
    },
    ]
    inquirer.prompt(prompts).then(async answers => {
        newDepartment = [{
            name:answers.name
        }]
        connection.query("INSERT INTO departments SET ?",newDepartment)
        quitOrMenu()
    })
    return
}

async function addRole(){
    prompts = [
    {
        message:"Add Role Title:",
        type:"input",
        name:"title"
    },
    {
        message:"Add Role Salary:",
        type:"input",
        name:"salary"
    },
    {
        message:"Add Role Department:",
        type:'list',
        choices: departments,
        name:"department"
    },
    ]
    inquirer.prompt(prompts).then(async answers => {
        newDepartment = [{
            title: answers.title,
            salary: Number(answers.salary),
            department_id: Number(answers.department.split(' ')[0])
        }]
        connection.query("INSERT INTO roles SET ?",newDepartment)
        quitOrMenu()
    })
    return
}

async function init(){
    getRoles()
    getManagers()
    getEmployees()
    getDepartments()
    inquirer.prompt(
        {
            message: 'Select from the following options:',
            type: 'list',
            name: 'menuChoice',
            choices: ['----------------------------------',
            'View Employees', 'View Departments','View Roles', '----------------------------------',
            'Add Employee','Delete Employee','Update Employee Role','Update Employee Manager','----------------------------------',
            'Add Department','----------------------------------',
            'Add Role','----------------------------------',
            'Quit']
        }
    ).then(answers => {
        switch (answers.menuChoice){

            case 'View Employees':
                viewEmployees()
                break

            case 'View Departments':
                viewDepartments()
                break
        
            case 'View Roles':
                viewRoles()
                break
            
            case 'Add Employee':
                addEmployee()
                break

            case 'Delete Employee':
                deleteEmployee()
                break

            case 'Update Employee Role':
                updateEmployeeRole()
                break
            
            case 'Update Employee Manager':
                updateEmployeeManager()
                break
            
            case 'Add Department':
                addDepartment()
                break
            
            case 'Add Role':
                addRole()
                break
                
            case '----------------------------------':
                init()
                break

            case 'Quit':
                connection.end()
                break
        }
    })
}

function quitOrMenu(){
    inquirer.prompt([{
        message: 'Quit or Return to Menu?',
        type:'list',
        choices:['Quit',"Return to Menu"],
        name: 'response'
    }]).then(answer => {
        if (answer.response == "Quit"){
            connection.end()
        }
        else{
            init()
        }
    })
}

init()