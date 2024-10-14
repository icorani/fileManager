import * as readline from 'node:readline/promises';
import {stdin as input, stdout as output} from 'node:process';

import {getUsernameFromArgs} from "./src/cli/args.js";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> ',
});

const userName = getUsernameFromArgs()


const greetingUser = (userName) => {
    console.log(`Welcome to the File Manager, ${userName}!`)
    if (userName === 'Anon') {
        console.log("You can provide your username by '--username=yourName'")
    }
}

const adieuUser = () => {
    console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
    process.exit(0);
}

greetingUser()
rl.on('line', async (chunk) => {
    const input = chunk.toString().trim();
    console.log(`Received: ${chunk}`);
}).on('close', adieuUser);


