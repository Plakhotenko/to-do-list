import '@testing-library/jest-dom';
import * as crypto from 'crypto';

Object.defineProperty(globalThis, 'crypto', {
  value: {
    randomUUID: () => crypto.randomUUID()
  }
});
