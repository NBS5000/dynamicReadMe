// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require("fs");

// TODO: Create an array of questions for user input
const questions = [
    {
        type: "input",
        message: "What is the title of your project?",
        name: "title",
        validate(answer) {
            if(!answer) {
                return "Please enter the name of your project!"
            }
            return true
        }
    },    
    {
        type: "input",
        message: "Please describe the project",
        name: "description",
        validate(answer) {
            if(!answer) {
                return "A description isn't too hard, is it?"
            }else if(answer.length < 30){
                return "Please enter a bit more detail, at least 30 characters!"
            }
            return true
        }
    },
    {
        type: "input",
        message: "What is the intended usage of the project?",
        name: "title",
        validate(answer) {
            if(!answer) {
                return "You do need to say what the usage is!"
            }
            return true
        }
    },
    {
        type: "list",
        message: "What type of license does the project have?",
        choices: [
            "GNU AGPLv3",
            "GNU GPLv3",
            "GNU LGPLv3",
            "Mozilla Public License 2.0",
            "Apache License 2.0",
            "MIT License",
            "Boost Software License 1.0",
            "The Unlicense",
        ],
        name: 'license',
    },
    {
        type: "input",
        message: "What is your Github name?",
        name: "github",
        validate(answer) {
            if(!answer) {
                return "Don 't make me repeat myself!"
            }
            return true
        }
    },
    {
        type: "input",
        message: "what is your email address?",
        name: "email",
        validate: (answer) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if(!emailRegex.test(answer)) {
                return "You have to provide a valid email address!"
            }
            return true
        }
    },
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
function init() {
    inquirer
    .prompt(questions)
    .then((data) => {
        const filename = "README.md";
        // fs.writeFile(filename, JSON.stringify(data, null, '\t'), (err) =>
        // err ? console.log(err) : console.log('Huzzah!')
        // );
    });
}

// Function call to initialize app
init();
