import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

const rootDirs = fs.readdirSync(__dirname);
const distDir = path.join(__dirname, 'dist');
const distDirs = fs.existsSync(distDir) ? fs.readdirSync(distDir) : [];

let maxV = 0;
const getVNumber = (name) => {
    const match = name.match(/^v(\d+)$/);
    return match ? parseInt(match[1], 10) : 0;
};

for (const dir of rootDirs) {
    const v = getVNumber(dir);
    if (v > maxV) maxV = v;
}
for (const dir of distDirs) {
    const v = getVNumber(dir);
    if (v > maxV) maxV = v;
}

const nextV = maxV + 1;

export default defineConfig({
  build: {
    outDir: `dist/v${nextV}`,
    lib: {
      entry: 'TableBuilder.js',
      name: 'TableBuilder',
      fileName: 'tableBuilder'
    }
  }
});
