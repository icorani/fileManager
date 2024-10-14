import {argv} from "node:process";

export const getUsernameFromArgs = () => {
    const userInArgs = argv.slice(2,).find((arg) => arg.startsWith('--'))
    return userInArgs ? userInArgs.split('=')[1] : 'Anon'
};

export const checkArgsCount = (args, expectedCount) => {
  if (args.length !== expectedCount) {
    console.error(`Expected ${expectedCount} argument(s), but got ${args.length}.`);
    return false;
  }
  return true;
};