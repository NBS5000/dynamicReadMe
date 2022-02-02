// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require("fs");
const fileName = "README.md";

// TODO: Create an array of questions for user input
const questions = [
    console.log("If you need help with a question, simply press return without any input"),
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
        message: "AS A ........",
        name: "asa",
        validate(answer) {
            if(!answer) {
                return "The User Story.....what is the role of the user?"
            }
            return true
        }
    },
    {
        type: "input",
        message: "I WANT ........",
        name: "iwant",
        validate(answer) {
            if(!answer) {
                return "The User Story Strikes Back!.....what do you want to achieve?"
            }
            return true
        }
    },
    {
        type: "input",
        message: "SO THAT ........",
        name: "sothat",
        validate(answer) {
            if(!answer) {
                return "Return of the The User Story .....how will this make the users life easier?"
            }
            return true
        }
    },
    {
        type: "input",
        message: "What is the intended usage of the project?",
        name: "usage",
        validate(answer) {
            if(!answer) {
                return "You do need to say what the usage is!"
            }
            return true
        }
    },
    {
        type: "input",
        message: "What is the end goal of this project?",
        name: "goal",
        validate(answer) {
            if(!answer) {
                return "What will this project achieve?"
            }
            return true
        }
    },
    {
        type: "input",
        message: "What did you do to achieve the end goal?",
        name: "action",
        validate(answer) {
            if(!answer) {
                return "List the tasks and actions you did to achieve the end result"
            }
            return true
        }
    },
    {
        type: "input",
        message: "How did it go? Were the targets met? How so?",
        name: "result",
        validate(answer) {
            if(!answer) {
                return "List the tasks and actions you did to achieve the end result"
            }else if(answer.length < 30){
                return "You'll need to be a bit more detailed than that."
            }
            return true
        }
    },




    console.log("And now the technical stuff"),
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
function build(data) {
    let theCode = ({license,title,desc,asa,iwant,sothat,usage,goal,action,result,git}) =>
    `
    ${license}
    ## ${title}
    
    ## <span style="color:green">The Description</span>
    
    ${desc}
    
    ### ⭐ ⭐ S.T.A.R. ⭐ ⭐
    
    **SITUATION**
    
    The provided user story was: 
    
    > <span style="font-style:italic">AS A ${asa}</span>
    > 
    > <span style="font-style:italic">I WANT ${iwant}</span>
    >
    > <span style="font-style:italic">SO THAT ${sothat}</span>
    
    **TASK**
    
    ${usage}
    
    ${goal}
    
    **ACTION**
    
    ${action}
    
    **RESULT**
    
    ${result}
    
    ## <span style="color:green"> The Outcome</span>
    
    You can view the finished product [HERE](https://${git}.github.io/${title}/)
    
    Alternatively, here is a screenshot:
    
    > ![Screenshot of The Weather page](./assets/images/screen.png "Screenshot of The Weather page")

    If you have any questions regarding this, feel free to contact me at [${email}](mailto:${email})

    
    <p style="text-align:center;">${git}</p>
    <p style="text-align:center;">[![Github icon](https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png)](https://github.com/${git})</p>
    
    ---
    

    `
    return theCode;
}

// TODO: Create a function to initialize app
function init() {
    inquirer
    .prompt(questions)
    .then((data) => {
        build(data)
    })
    .then((code) => {
        fs.writeFile(fileName, code, (err) =>
        err ? console.log(err) : console.log('Huzzah!')
        );
    });
}

// Function call to initialize app
init();
