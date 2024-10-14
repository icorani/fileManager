import {normalize, resolve} from 'path';
import {chdir, cwd} from 'node:process';
import fs from 'fs/promises';
import {dirname} from 'path';


export const cd = async (pathToDirectory) => {
    const cdDirectory = resolve(cwd(), normalize(pathToDirectory));
    try {
        chdir(cdDirectory);
        console.log(`Changed directory to ${cdDirectory}`);
    } catch (err) {
        console.error(`Error: "${cdDirectory}" is not a valid directory.`);
    }
};

export const ls = async () => {
    const currentDir = cwd();
    try {
        const files = await fs.readdir(currentDir, {withFileTypes: true});
        const allFiles = files.map((file) => {
            const name = file.name;
            const type = file.isDirectory() ? 'directory' : 'file';
            return {name, type};
        });
        console.table(allFiles);
    } catch (err) {
        console.error(`Error reading directory: ${err.message}`);
    }
};

export const up = async () => {
  const currentDir = cwd();
  const parentDir = dirname(currentDir);
  if (currentDir === parentDir) {
    console.error('Already at the root directory, cannot go up.');
    return;
  }
  await cd(parentDir);
};

