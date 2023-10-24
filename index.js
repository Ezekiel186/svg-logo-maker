const inquirer = require("inquirer");
const fs = require("fs");

const questions = [{
    type: "input",
    name: "text",
    message: "What do you want your logo's text to be?"
},
{ 
    type: "input",
    name: "color-txt",
    message: "What do you want your logo's text color to be?"
}, 
{
    type: "list",
    name: "shape",
    message: "What do you want your logo's shape to be?",
    choices: ["circle", "triangle", "square"]
},
{ 
    type: "input",
    name: "main-color",
    message: "What do you want your logo's shape color to be?"
},];

function init() {
    inquirer
        .prompt(questions)
        .then(input => {
            writeToSVG(input.shape, makeSVG(input))
        })
}

function writeToSVG(fileName,input) {
    return new Promise((resolve, reject) => {
        fs.writeFile(`${fileName}.svg`,input,err => {
            if (err) {
                reject(err);
                return;
            } resolve({
                ok: true,
                message: console.log("New file created")
            }) 
        })
    })
}


function makeSVG(input) {
    return `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">
        <${input['shape']} cx="150" cy="100" r="80" fill="${input['main-color']}" />
        <text x="150" y="125" font-size="60" text-anchor="middle" fill="${input['color-txt']}">${input['text']}</text>
    </svg>`;
}


init()
