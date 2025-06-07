import fs from 'fs';
import path from 'path';

/**
 * Load legal page content from JSON files in `public/legal`.
 *
 * @param file File slug (terms-of-use, privacy-policy or cookies-policy).
 * @returns Parsed JSON content.
 */
export function loadLegalContent(file: 'terms-of-use' | 'privacy-policy' | 'cookies-policy') {
  const filePath = path.join(process.cwd(), 'public', 'legal', `${file}.json`);
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(jsonData);
}