import { readFileSync } from 'fs';
import { join } from 'path';

export function useMarkdown(filename: string): string {
  return readFileSync(join('public', filename)).toString('utf8');
}
