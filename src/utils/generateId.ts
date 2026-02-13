/**
 * Counter-based ID generation for predictable test behavior and SSR compatibility.
 * Unlike crypto.randomUUID(), this approach ensures consistent IDs across renders
 * and supports server-side rendering where crypto APIs may not be available.
 */

let idCounter = 0;

/**
 * Generates a unique ID with an optional prefix.
 *
 * @param prefix - Optional prefix for the ID (default: 'field')
 * @returns A unique ID string in the format: `{prefix}-{counter}`
 *
 * @example
 * ```tsx
 * const fieldId = generateId('email'); // "email-1"
 * const errorId = generateId('error'); // "error-2"
 * const nextId = generateId();         // "field-3"
 * ```
 */
export const generateId = (prefix: string = 'field'): string => {
  idCounter++;
  return `${prefix}-${idCounter}`;
};

/**
 * Resets the ID counter to 0. Useful for testing to ensure predictable IDs.
 *
 * @example
 * ```tsx
 * // In test setup or beforeEach
 * resetIdCounter();
 * const id = generateId(); // Always returns "field-1" after reset
 * ```
 */
export const resetIdCounter = (): void => {
  idCounter = 0;
};
