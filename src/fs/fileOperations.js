import {normalize, resolve, dirname} from "path";
import fs from "fs/promises";
import {mkdir} from 'fs/promises'
import {cwd} from "node:process";
import {createReadStream, createWriteStream} from 'fs';
import * as crypto from "node:crypto";
import {existsSync} from 'node:fs';
import {pipeline} from "stream/promises";


export const touchFile = async (fileName) => {
    const normalizedFileName = normalize(fileName);
    const filePath = resolve(process.cwd(), normalizedFileName);
    try {
        const fileHandle = await fs.open(filePath, 'wx');
        console.log(`File '${normalizedFileName}' created successfully.`);
        await fileHandle.close();
    } catch (err) {
        console.error('Operation failed');
    }
};

export const removeFile = async (filePath) => {
    const resolvedPath = resolve(cwd(), normalize(filePath));
    try {
        await fs.unlink(resolvedPath);
        console.log(`File ${resolvedPath} deleted.`);
    } catch (err) {
        console.error('Operation failed');
    }
};

export const calculateHash = async (filePath) => {
    try {
        const hash = crypto.createHash('sha256');
        const stream = createReadStream(normalize(filePath));
        stream.on('data', (chunk) => {
            hash.update(chunk);
        });
        stream.on('error', (err) => console.log('Operation failed'))
        stream.on('end', () => {
            console.log(`Hash of file ${filePath}: ${hash.digest('hex')}`);
        });
    } catch (err) {
        console.error('Operation failed')
    }
};

export const catFile = async (filePath) => {
    const readableStream = createReadStream(resolve(cwd(), normalize(filePath)), {encoding: 'utf-8'});

    readableStream.on('data', (chunk) => {
        console.log('\n' + chunk);
    });
    readableStream.on('error', () => {
        console.error('Operation failed');
    });
    readableStream.on('end', () => {
    });
};

export const renameFile = async (oldPath, newPath) => {
    try {
        await fs.rename(resolve(cwd(), normalize(oldPath)), resolve(cwd(), normalize(newPath)));
        console.log(`File renamed to ${newPath}.`);
    } catch {
        console.error('Operation failed.')
    }
};

export const copyFile = async (sourcePath, destPath) => {
  const source = resolve(cwd(), normalize(sourcePath));
  const destination = resolve(cwd(), normalize(destPath));

  const destDir = dirname(destination);

  if (!existsSync(destDir)) {
    await mkdir(destDir, {recursive: true});
  }

  const readableStream = createReadStream(source);
  const writableStream = createWriteStream(destination);

  await pipeline(readableStream, writableStream);
  console.log(`File copied to ${destination}.`);
};


export const moveFile = async (sourcePath, destPath) => {
  const source = resolve(cwd(), normalize(sourcePath));
  const destination = resolve(cwd(), normalize(destPath));

  const destDir = dirname(destination);

  if (!existsSync(destDir)) {
    await mkdir(destDir, {recursive: true});
  }
  const readableStream = createReadStream(source);
  const writableStream = createWriteStream(destination);

  await pipeline(readableStream, writableStream);
  console.log(`File moved to ${destination}.`);
  await removeFile(source);
};