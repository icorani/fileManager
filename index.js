import * as readline from 'node:readline/promises';

import {commandList} from "./src/commands.js";

import {getUsernameFromArgs} from "./src/cli/args.js";
import {changeToHomeDirectory, getCurrentDirectory} from "./src/fs/dirs.js";

const rl = readline.createInterface({
    input: process.stdin, output: process.stdout, prompt: '> ',
});

const userName = getUsernameFromArgs()

const prepairToStart = () => {
    changeToHomeDirectory();
    greetingUser();
    getCurrentDirectory();
    rl.prompt();
}

const greetingUser = () => {
    console.log(`Welcome to the File Manager, ${userName}!`)
    if (userName === 'Anon') {
        console.log("You can provide your username by '--username=yourName'")
    }
}

const adieuUser = () => {
    console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
    process.exit(0);
}


// main program
prepairToStart()
rl.on('line', async (chunk) => {
    const input = chunk.toString().trim();
    const [command, ...args] = input.split(' ');
    // console.log(`Received command: ${command}\nReceived args: ${args}`);
    // console.log(commandList);

    try {
        if (commandList[input]) {
            await commandList[input]();
        } else if (commandList[command]) {
            await commandList[command](args);
        } else {
            console.log(`Error in input: ${input}`)
        }
    } catch (err) {
        console.error(`Operation failed.`)
        console.error(err)
    } finally {
        getCurrentDirectory();
    }

    (command === '.exit') && rl.close();
    rl.prompt()
}).on('close', adieuUser);


