import '@testing-library/jest-dom';
import { expect } from 'vitest';
import matchers from '@testing-library/jest-dom/matchers';

// Extend Vitest's expect with Jest DOM matchers
expect.extend(matchers);

// Add any global test setup here 