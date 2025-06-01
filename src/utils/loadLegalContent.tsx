import fs from 'fs';
import path from 'path';

export function loadLegalContent(file: 'terms-of-use' | 'privacy-policy' | 'cookies-policy') {
  const filePath = path.join(process.cwd(), 'public', 'legal', `${file}.json`);
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(jsonData);
}