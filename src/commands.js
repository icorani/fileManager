import {getArch, getCpuInfo, getEOL, getHomeDir, getUsernameFromOs} from "./os/commands.js";
import {cd, ls, up} from "./fs/navigate.js";
import {checkArgsCount} from "./cli/args.js";
import {calculateHash, catFile, removeFile, touchFile, renameFile, copyFile} from "./fs/fileOperations.js";
import {compressFile, decompressFile} from "./brotli/index.js";

export const commandList = {
    'os --EOL': getEOL,
    'os --cpus': getCpuInfo,
    'os --homedir': getHomeDir,
    'os --username': getUsernameFromOs,
    'os --architecture': getArch,

    async compress(args = []) {
        if (!checkArgsCount(args, 2)) return;
        const [inputPath, outputPath] = args;
        await compressFile(inputPath, outputPath);
    },

    async decompress(args = []) {
        if (!checkArgsCount(args, 2)) return;
        const [inputPath, outputPath] = args;
        await decompressFile(inputPath, outputPath);
    },

    async cat(args = []) {
        if (!checkArgsCount(args, 1)) return;
        const [filePath] = args;
        await catFile(filePath);
    },

    add: async (args = []) => {
        if (!checkArgsCount(args, 1)) return;
        const [fileName] = args;
        await touchFile(fileName);
    },

    async rn(args = []) {
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

    async rm(args = []) {
        if (!checkArgsCount(args, 1)) return;
        const [filePath] = args;
        await removeFile(filePath);
    },

    async hash(args = []) {
        if (!checkArgsCount(args, 1)) return;
        const [filePath] = args;
        await calculateHash(filePath);
    },

    async cd(args = []) {
        if (!checkArgsCount(args, 1)) return;
        const [pathToDirectory] = args;
        await cd(pathToDirectory);
    },

    async up() {
        await up();
    },

    async ls() {
        await ls();
    }
};