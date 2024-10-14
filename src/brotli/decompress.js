import fs from 'fs';
import { pipeline } from 'stream/promises';
import { createBrotliDecompress } from 'zlib';
import { normalize, resolve } from 'path';
import { cwd } from 'process';

export const decompressFile = async (inputPath, outputPath) => {
  const source = fs.createReadStream(resolve(cwd(), normalize(inputPath)));
  const destination = fs.createWriteStream(resolve(cwd(), normalize(outputPath)));
  const brotli = createBrotliDecompress();
  await pipeline(source, brotli, destination);
  console.log(`File has been decompressed and saved to: ${outputPath}`);
};