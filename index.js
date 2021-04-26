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
    connection.query("SELECT * FROM employees", (err,res) =>  {console.log(res); quitOrMenu()})
    return
}

async function viewDepartments(){
    connection.query("SELECT * FROM departments", (err,res) => {console.log(res); quitOrMenu()})
    return
}

async function viewRoles(){
    connection.query("SELECT * FROM roles", (err,res) => {console.log(res); quitOrMenu()})
    return
}

async function getRoles(){
    connection.query("SELECT * FROM roles", (err,res) => {
        output = []
        for (role of [...res]){
            output.push(role.title)
        }
        console.log(output)
        return output
    })
}

async function addEmployee(){
    roles = await getRoles()
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
        message:"Add Employee Role",
        type:"list",
        choices:['this','that'],
        name:'role'
    },
    ]
    inquirer.prompt(prompts).then(answers => {
        console.log(answers)
        console.log(roles)
    })
}


initPrompt = [
    {
        message: 'Select from the following options:',
        type: 'list',
        name: 'menuChoice',
        choices: ['View Employees', 'View Departments','View Roles','Add Employee']
    }
]

async function init(){
    inquirer.prompt(initPrompt).then(answers => {
        switch (answers.menuChoice){

            case 'View Employees':
                viewEmployees();
                break

            case 'View Departments':
                viewDepartments();
                break
        
            case 'View Roles':
                viewRoles();
                break
            
            case 'Add Employee':
                addEmployee();
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
            return
        }
        else{
            init()
        }
    })
}

init()
//getRoles()

