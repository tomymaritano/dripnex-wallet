import { describe, it, expect } from 'vitest';
import { loadLegalContent } from './loadLegalContent';

describe('loadLegalContent', () => {
  it('loads terms of use', () => {
    const data = loadLegalContent('terms-of-use');
    expect(data).toHaveProperty('title');
    expect(data).toHaveProperty('sections');
  });

  it('loads privacy policy', () => {
    const data = loadLegalContent('privacy-policy');
    expect(data).toHaveProperty('title');
    expect(data).toHaveProperty('sections');
  });

  it('loads cookies policy', () => {
    const data = loadLegalContent('cookies-policy');
    expect(data).toHaveProperty('title');
    expect(data).toHaveProperty('sections');
  });
});
