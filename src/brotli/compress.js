import fs from 'fs';
import { pipeline } from 'stream/promises';
import { createBrotliCompress } from 'zlib';
import { normalize, resolve } from 'path';
import { cwd } from 'node:process';

export const compressFile = async (inputPath, outputPath) => {
  const source = fs.createReadStream(resolve(cwd(), normalize(inputPath)));
  const destination = fs.createWriteStream(resolve(cwd(), normalize(outputPath)));
  const brotli = createBrotliCompress();
  await pipeline(source, brotli, destination);
  console.log(`File has been compressed and saved to: ${outputPath}`);
};