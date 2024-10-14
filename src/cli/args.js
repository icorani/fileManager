import {argv} from "node:process";

export const getUsernameFromArgs = () => {
    const userInArgs = argv.slice(2,).find((arg) => arg.startsWith('--'))
    const userName = userInArgs ? userInArgs.split('=')[1] : 'Anon'


    return userName
};