import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(root, 'dist');
const templatePath = path.join(distDir, 'index.html');
const serverEntryPath = path.join(distDir, 'server', 'entry-server.js');

const template = await readFile(templatePath, 'utf-8');
const { render } = await import(pathToFileURL(serverEntryPath).href);
const appHtml = render();

const html = template.replace('<!--app-html-->', appHtml);

await mkdir(distDir, { recursive: true });
await writeFile(templatePath, html);
await rm(path.join(distDir, 'server'), { recursive: true, force: true });

console.log('Prerendered / to dist/index.html');
