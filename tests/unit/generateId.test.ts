import { describe, it, expect, beforeEach } from 'vitest';
import { generateId, resetIdCounter } from '../../src/utils/generateId';

describe('generateId', () => {
  beforeEach(() => {
    // Reset counter before each test for predictable IDs
    resetIdCounter();
  });

  it('generates unique IDs with default prefix', () => {
    const id1 = generateId();
    const id2 = generateId();
    const id3 = generateId();

    expect(id1).toBe('field-1');
    expect(id2).toBe('field-2');
    expect(id3).toBe('field-3');
  });

  it('generates unique IDs with custom prefix', () => {
    const id1 = generateId('email');
    const id2 = generateId('password');
    const id3 = generateId('username');

    expect(id1).toBe('email-1');
    expect(id2).toBe('password-2');
    expect(id3).toBe('username-3');
  });

  it('increments counter across different prefixes', () => {
    const id1 = generateId('field');
    const id2 = generateId('error');
    const id3 = generateId('field');

    expect(id1).toBe('field-1');
    expect(id2).toBe('error-2');
    expect(id3).toBe('field-3');
  });

  it('generates sequential IDs without gaps', () => {
    const ids = Array.from({ length: 10 }, (_, i) => generateId());

    ids.forEach((id, index) => {
      expect(id).toBe(`field-${index + 1}`);
    });
  });

  it('resets counter to 0', () => {
    generateId(); // field-1
    generateId(); // field-2
    generateId(); // field-3

    resetIdCounter();

    const id = generateId();
    expect(id).toBe('field-1');
  });

  it('continues incrementing after reset', () => {
    resetIdCounter();

    const id1 = generateId();
    const id2 = generateId();

    expect(id1).toBe('field-1');
    expect(id2).toBe('field-2');
  });

  it('handles empty string prefix', () => {
    const id = generateId('');
    expect(id).toBe('-1');
  });

  it('handles numeric-looking prefixes as strings', () => {
    const id = generateId('123');
    expect(id).toBe('123-1');
  });

  it('handles special characters in prefix', () => {
    const id1 = generateId('my-field');
    const id2 = generateId('field_name');
    const id3 = generateId('field:value');

    expect(id1).toBe('my-field-1');
    expect(id2).toBe('field_name-2');
    expect(id3).toBe('field:value-3');
  });

  it('maintains separate counter across multiple calls to reset', () => {
    generateId(); // field-1
    resetIdCounter();
    generateId(); // field-1
    resetIdCounter();
    const id = generateId();

    expect(id).toBe('field-1');
  });

  it('generates large numbers of unique IDs', () => {
    const ids = new Set();
    const count = 1000;

    for (let i = 0; i < count; i++) {
      ids.add(generateId());
    }

    // All IDs should be unique
    expect(ids.size).toBe(count);
  });

  it('handles very long prefixes', () => {
    const longPrefix = 'a'.repeat(100);
    const id = generateId(longPrefix);

    expect(id).toBe(`${longPrefix}-1`);
    expect(id.length).toBe(102); // 100 characters + '-' + '1'
  });
});

describe('resetIdCounter', () => {
  it('can be called multiple times safely', () => {
    resetIdCounter();
    resetIdCounter();
    resetIdCounter();

    const id = generateId();
    expect(id).toBe('field-1');
  });

  it('resets to exactly 0', () => {
    // Generate many IDs
    for (let i = 0; i < 100; i++) {
      generateId();
    }

    resetIdCounter();
    const id = generateId();

    // Should be 1, not 101
    expect(id).toBe('field-1');
  });
});
