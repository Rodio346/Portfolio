import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');

const requiredFiles = [
  path.join(dist, 'index.html'),
  path.join(dist, 'professional', 'index.html'),
  path.join(dist, 'about-me', 'index.html'),
];

const missing = requiredFiles.filter((file) => !existsSync(file));
if (missing.length > 0) {
  console.error('Missing required built routes:');
  missing.forEach((file) => console.error(`- ${path.relative(root, file)}`));
  process.exit(1);
}

const indexHtml = readFileSync(path.join(dist, 'index.html'), 'utf-8');
const malformedPatterns = ['/Porfolioprofessional/', '/Porfolioabout-me/'];
const malformedFound = malformedPatterns.filter((pattern) => indexHtml.includes(pattern));
if (malformedFound.length > 0) {
  console.error('Malformed route links detected in dist/index.html:');
  malformedFound.forEach((pattern) => console.error(`- ${pattern}`));
  process.exit(1);
}

console.log('dist verification passed.');
