// vitest.setup.ts
import '@testing-library/jest-dom';
import { config } from 'dotenv';
import path from 'path';

// Cargamos el .env.test
config({
  path: path.resolve(__dirname, '.env.test'),
});