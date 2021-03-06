// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require("fs");
const { finished } = require('stream');
const fileName = "README.md";

// TODO: Create an array of questions for user input
const questions = () => {
    return inquirer.prompt([
    {
        type: "input",
        message: "\n\x1b[4m\x1b[33m**If you need help with a question, simply press return without any input**\x1b[0m \x1b[0m \n\nWhat is the name of your project in Github?\n",
        name: "title",
        validate(answer) {
            if(!answer) {
                return "Please enter the name of your project as it is named in Github"
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
                return "Please enter a bit more detail, at least 30 characters"
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
                return "The User Story Strikes Back!.....what does the user want to achieve?"
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
        message: " \nWhat is the intended usage of the project?\n",
        name: "usage",
        validate(answer) {
            if(!answer) {
                return "How will the project be used?"
            }
            return true
        }
    },
    {
        type: "list",
        message: "\n\n\x1b[32mAnd now the technical stuff!\x1b[0m\n\nWhat type of license does the project have?",
        choices: [
            "GNU AGPLv3",
            "CC0",
            "GNU LGPLv3",
            "Mozilla Public License 2.0",
            "Apache License 2.0",
            "MIT License",
            "Boost Software License 1.0",
        ],
        name: 'license',
    },
    {
        type: "confirm",
        message: " \nIs there a screenshot in the ./assets/images folder?\n",
        name: "screenConf",
        validate(answer) {
            if(!answer) {
                return "Yes or no"
            }
            return true
        }
    },
    {
        // If previous answer was yes, then ask for details of the image
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
        message: " \nWhat is the extension of the file?\n",
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
                return "You have to provide a valid email address format"
            }
            return true
        }
    },
])};


const build = ({license,title,desc,asa,iwant,sothat,usage,git,email, screenName,screenExt}) => {
    // transform repo name to readable title
    let friendly, camel, correct;
    camel = title;
    friendly = camel.replace(/([A-Z]+)/g, " $1");
    friendly = friendly[0].charAt(0).toUpperCase() + friendly.slice(1);
    friendly = friendly.replace(/_/g, ' ');
    friendly = friendly.replace(/-/g, ' ');
    friendly = friendly.replace(/\s\s+/g, ' ');
    correct = friendly;

    // If there is a screenshot, add it to the file
    let screenshot;
    if(!screenName){
        screenshot = "";
    }else{
        screenshot = 
        `<p>Alternatively, here is a screenshot:</p>
        <img style='width:400px;height:auto;' src='./assets/images/${screenName}${screenExt}' alt='Screenshot of project'></img>`;
    }

    // Display badge and link to info for the selected license
    let licLink, licInfo;
    switch (license){
        case "GNU AGPLv3":
            licLink = "<img style='height:15px;width:80px;' src='https://img.shields.io/badge/License-AGPL_v3-blue.svg' alt='License badge'/>";
            licInfo = "<a href='https://www.gnu.org/licenses/agpl-3.0' style='text-deocration:none;'>Click here for more information on this license.</a>";
            break;
        case "GNU LGPLv3":
            licLink = "<img style='height:15px;width:80px;' src='https://img.shields.io/badge/License-LGPL_v3-blue.svg' alt='License badge'/>";
            licInfo = "<a href='https://www.gnu.org/licenses/lgpl-3.0' style='text-deocration:none;'>Click here for more information on this license.</a>";
            break;    
        case "CC0":
            licLink = "<img style='height:15px;width:80px;' src='License: CC0-1.0](https://licensebuttons.net/l/zero/1.0/80x15.png' alt='License badge'/>";
            licInfo = "<a href='http://creativecommons.org/publicdomain/zero/1.0/' style='text-deocration:none;'>Click here for more information on this license.</a>";
            break;
        case "Mozilla Public License 2.0":
            licLink = "<img src='https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg' alt='License badge'/>";
            licInfo = "<a href='https://opensource.org/licenses/MPL-2.0' style='text-deocration:none;'>Click here for more information on this license.</a>";
            break;
        case "Apache License 2.0":
            licLink = "<img style='height:15px;width:80px;' src='https://img.shields.io/badge/License-Apache_2.0-blue.svg' alt='License badge'/>";
            licInfo = "<a href='https://opensource.org/licenses/Apache-2.0' style='text-deocration:none;'>Click here for more information on this license.</a>";
            break;
        case "MIT License":
            licLink = "<img style='height:15px;width:80px;' src='https://img.shields.io/badge/License-MIT-yellow.svg' alt='License badge'/>";
            licInfo = "<a href='https://opensource.org/licenses/MIT' style='text-deocration:none;'>Click here for more information on this license.</a>";
            break;
        case "Boost Software License 1.0":
            licLink = "<img style='height:15px;width:80px;' src='https://img.shields.io/badge/License-Boost_1.0-lightblue.svg' alt='License badge'/>";
            licInfo = "<a href='https://www.boost.org/LICENSE_1_0.txt' style='text-deocration:none;'>Click here for more information on this license.</a>";
            break;
    }


// The readme file structure with input variables
let file =  `
<h1 style="font-size: 200%;font-weight: bold;">${correct}</h1>

${licLink}

<h2 style="color: green;font-size: 150%;font-weight: bold;">Table of Contents</h2>

<div id="table" style="margin-left:3%; color:white">

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Questions & Contact](#questions)

</div>

<h2 id="description" style="color: green;font-size: 150%;font-weight: bold;">Description</h2>

<p>${desc}</p>

<h2 id="installation" style="color: green;font-size: 150%;font-weight: bold;">Installation</h2>

<p>To install this, ensure you have Node.js. Inquirer is also required:</p>

> <p style="font-family: monospace, monospace;">npm install inquirer</p>

<h2 id="usage" style="color: green;font-size: 150%;font-weight: bold;">Usage</h2>

> <span style="font-style:italic">AS A ${asa}</span>
> 
> <span style="font-style:italic">I WANT ${iwant}</span>
>
> <span style="font-style:italic">SO THAT ${sothat}</span>

<p>${usage}</p>

<h2 id="contributing" style="color: green;font-size: 150%;font-weight: bold;">Contributing</h2>

<p>To fork this project, click the "fork" button at the top of the repository. Once you've made any amendments, click "Create Pull Request" and your contributions will be reviewed.</p>

<p>You can view the project <a style="text-decoration: none;color:green;" href="https://${git}.github.io/${title}/" target="_blank">HERE</a>.</p>

${screenshot}

<h2 id="license" style="color: green;font-size: 150%;font-weight: bold;">License</h2>

${licLink}

${license} ????? ${git}

${licInfo}

<h2 id="questions" style="color: green;font-size: 150%;font-weight: bold;">Questions & Contact</h2>

<p>If you have any questions regarding this, feel free to email <a style="text-decoration: none;color:green;" href="mailto:${email}">${email}</a>, or visit my Github by clicking below.</p>

---

<p style="text-align:center;">${git}</p>
<p style="text-align:center;"><a href="https://github.com/${git}"><img style="height: 50px;width: 50px;" src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="Github icon"></a></p>


    
`
console.log("\n\x1b[32m** Your readme file has successfully been created **\x1b[0m\n\n")
// Return and create file
return file;
};


// TODO: Create a function to initialize app
function init() {
    questions()
    .then((answers)=>fs.writeFileSync(fileName, build(answers)))
    .catch((err) =>
    err ? console.log(err) : console.log('Huzzah!') )
}

// Function call to initialize app
init()
