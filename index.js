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

async function getDepartmentTitles(){
    connection.query("SELECT * FROM departments", (err,res) => {
        output = []
        for (department of [...res]){
            output.push(department.title)
        }
        departmentTitles = output
    })
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

initPrompt = [
    {
        message: 'Select from the following options:',
        type: 'list',
        name: 'menuChoice',
        choices: ['View Employees', 'View Departments','View Roles','Add Employee','Delete Employee','Update Employee Role','Quit']
    }
]

async function init(){
    getRoles()
    getManagers()
    getEmployees()
    inquirer.prompt(initPrompt).then(answers => {
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
//getRoles()

