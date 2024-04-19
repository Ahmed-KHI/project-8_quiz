#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
const apiLink = "https://opentdb.com/api.php?amount=11&category=9&difficulty=easy&type=multiple";
let fetchData = async (data) => {
    let fetchQuiz = await fetch(data);
    let res = await fetchQuiz.json();
    return res.results;
};
let data = await fetchData(apiLink);
let startQuiz = async () => {
    let score = 0;
    // for user name
    let name = await inquirer.prompt({
        type: "input",
        name: "fname",
        message: "What Is Your Name?"
    });
    for (let i = 1; i <= 10; i++) {
        let answers = [...data[i].incorrect_answers, data[i].correct_answer];
        let ans = await inquirer.prompt({
            type: "list",
            name: "quiz",
            message: data[i].question,
            choices: answers.map((val) => val),
        });
        if (ans.quiz == data[i].correct_answer) {
            ++score;
            console.log(chalk.bold.italic.green("Correct"));
        }
        else {
            console.log(`Correct Answer Is ${chalk.bold.italic.red(data[i].correct_answer)}`);
        }
    }
    console.log(`Dear ${chalk.yellow.bold(name.fname)}, Your Score is ${chalk.blue.bold(score)} Out Of ${chalk.green.bold("10")}`);
};
startQuiz();
