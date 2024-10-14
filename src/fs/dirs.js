import os from "os";

export const getCurrentDirectory = () => {
  console.log(`You are currently in ${process.cwd()}`);
};

export const changeToHomeDirectory = () => {
  try {
    process.chdir(os.homedir());
  } catch (error) {
    console.error('Error changing directory to home:', error);
  }
};