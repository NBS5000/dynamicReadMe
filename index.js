// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require("fs");
const fileName = "README.md";
let licLink;

// TODO: Create an array of questions for user input
const questions = () => {
    return inquirer.prompt([
    // console.log("If you need help with a question, simply press return without any input"),
    {
        type: "input",
        message: "What is the title of your project?\n",
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
        message: " \nPlease describe the project\n",
        name: "desc",
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
        message: " \nAS A ........\n",
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
        message: " \nI WANT ........\n",
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
        message: " \nSO THAT ........\n",
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
        message: " \nWhat is the intended usage of the project?",
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
        message: " \nWhat is the end goal of this project?\n",
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
        message: " \nWhat did you do to achieve the end goal?\n",
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
        message: " \nHow did it go? Were the targets met? How so?\n",
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
    // console.log("And now the technical stuff"),
    {
        type: "list",
        message: " \nAnd now the technical stuff\n\nWhat type of license does the project have?",
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
        type: "confirm",
        message: " \Is there a screenshot in the images folder?\n",
        name: "screenConf",
        validate(answer) {
            if(!answer) {
                return "Yes or no"
            }
            return true
        }
    },
    {
        type: "input",
        message: " \nWhat is the file name (not including ext)?\n",
        name: "screenName",
        when: (answers) => answers.screenConf === true,
        validate(answer) {
            if(!answer) {
                return "Enter the file name"
            }
            return true
        }
    },
    {
        type: "list",
        message: " \Is there a screenshot in the images folder?\n",
        name: "screenExt",
        when: (answers) => answers.screenName,
        choices: [
            ".png",
            ".jpg",
            ".gif",
            ".webp",
        ],
    },
    {
        type: "input",
        message: " \nWhat is your Github name?\n",
        name: "git",
        validate(answer) {
            if(!answer) {
                return "Don't make me repeat myself!"
            }
            return true
        }
    },
    {
        type: "input",
        message: " \nwhat is your email address?\n",
        name: "email",
        validate: (answer) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if(!emailRegex.test(answer)) {
                return "You have to provide a valid email address!"
            }
            return true
        }
    },
])};



// TODO: Create a function to write README file
const build = ({license,title,desc,asa,iwant,sothat,usage,goal,action,result,git,email, screenName,screenExt}) => {
    let screenshot;
    if(!screenName){
        screenshot = "";
    }else{
        screenshot = 
        `<p>Alternatively, here is a screenshot:</p>
        <img style='width:400px;height:auto;' src='./assets/images/${screenName}${screenExt}' alt='Screenshot of project'></img>`;
    }

    return `<h1 style="font-size: 200%;font-weight: bold;">${title}</h1>

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

<h2 style="color: green;font-size: 150%;font-weight: bold;">The Description</h2>

<p>${desc}</p>

<span style="font-size: 150%;font-weight: bold;">⭐ ⭐ S.T.A.R. ⭐ ⭐</span>

<h3>SITUATION</h3>

The provided user story was: 

> <span style="font-style:italic">AS A ${asa}</span>
> 
> <span style="font-style:italic">I WANT ${iwant}</span>
>
> <span style="font-style:italic">SO THAT ${sothat}</span>

<h3>TASK</h3>

<p>${usage}</p>

<p>${goal}</p>

<h3>ACTION</h3>

<p>${action}</p>

<h3>RESULT<h3>

<p>${result}</p>

<h2> The Outcome</h2>

<p>You can view the finished product <a style="text-decoration: none;color:green;" href="https://${git}.github.io/${title}/" target="_blank">HERE</a>.</p>

${screenshot}

<p>If you have any questions regarding this, feel free to contact me at <a style="text-decoration: none;color:green;" href="mailto:${email}">${email}</a>.</p>

---

<p style="text-align:center;">${git}</p>
<p style="text-align:center;"><a href="https://github.com/${git}"><img style="height: 50px;width: 50px;" src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="Github icon"></a></p>


`};


// TODO: Create a function to initialize app
function init() {
    questions()
    .then((answers)=>fs.writeFileSync(fileName, build(answers)))
    .catch((err) =>
    err ? console.log(err) : console.log('Huzzah!') )
}

// Function call to initialize app
init()
