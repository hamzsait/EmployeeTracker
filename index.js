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


initPrompt = [
    {
        message: 'Select from the following options:',
        type: 'list',
        name: 'menuChoice',
        choices: ['View Employees', 'View Departments','View Roles']
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

