import {getArch, getCpuInfo, getEOL, getHomeDir, getUsernameFromOs} from "./os/commands.js";
import {cd, ls, up} from "./fs/navigate.js";
import {checkArgsCount} from "./cli/args.js";
import {calculateHash, removeFile, touchFile} from "./fs/fileOperations.js";

export const commandList = {
  'os --EOL': getEOL,
  'os --cpus': getCpuInfo,
  'os --homedir': getHomeDir,
  'os --username': getUsernameFromOs,
  'os --architecture': getArch,

  compress: async (args = []) => {
    if (!checkArgsCount(args, 2)) return;
    const [inputPath, outputPath] = args;
    await compressFile(inputPath, outputPath);
  },

  decompress: async (args = []) => {
    if (!checkArgsCount(args, 2)) return;
    const [inputPath, outputPath] = args;
    await decompressFile(inputPath, outputPath);
  },

  cat: async (args = []) => {
    if (!checkArgsCount(args, 1)) return;
    const [filePath] = args;
    await readFileAndPrint(filePath);
  },

  add: async (args = []) => {
    if (!checkArgsCount(args, 1)) return;
    const [fileName] = args;
    await touchFile(fileName);
  },

  rn: async (args = []) => {
    if (!checkArgsCount(args, 2)) return;
    const [oldPath, newFileName] = args;
    await renameFile(oldPath, newFileName);
  },

  cp: async (args = []) => {
    if (!checkArgsCount(args, 2)) return;
    const [sourcePath, destPath] = args;
    await copyFile(sourcePath, destPath);
  },

  mv: async (args = []) => {
    if (!checkArgsCount(args, 2)) return;
    const [sourcePath, destPath] = args;
    await moveFile(sourcePath, destPath);
  },

  rm: async (args = []) => {
    if (!checkArgsCount(args, 1)) return;
    const [filePath] = args;
    await removeFile(filePath);
  },

  hash: async (args = []) => {
    if (!checkArgsCount(args, 1)) return;
    const [filePath] = args;
    await calculateHash(filePath);
  },

  cd: async (args = []) => {
    if (!checkArgsCount(args, 1)) return;
    const [pathToDirectory] = args;
    await cd(pathToDirectory);
  },

  up: async () => {
    await up();
  },

  ls: async () => {
    await ls();
  }
};