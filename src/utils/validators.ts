import { FieldValidator } from './useForm';

/**
 * Creates a validator that depends on another field's value.
 *
 * @example
 * ```tsx
 * const confirmPasswordValidator = dependentValidator(
 *   'confirmPassword',
 *   'password',
 *   (confirmValue, passwordValue) => {
 *     if (confirmValue !== passwordValue) return 'Passwords must match';
 *   }
 * );
 * ```
 */
export function dependentValidator<T extends Record<string, any>>(
  field: keyof T,
  dependsOn: keyof T,
  validate: (value: any, dependentValue: any) => string | undefined
): FieldValidator<T> {
  return {
    field,
    validate: (value, allValues) => {
      const dependentValue = allValues[dependsOn];
      return validate(value, dependentValue);
    },
  };
}

/**
 * Common pattern for password confirmation validation.
 *
 * @example
 * ```tsx
 * const fieldValidators = [
 *   confirmPasswordValidator('confirmPassword', 'password')
 * ];
 * ```
 */
export function confirmPasswordValidator<T extends Record<string, any>>(
  confirmField: keyof T,
  passwordField: keyof T,
  message: string = 'Passwords must match'
): FieldValidator<T> {
  return dependentValidator(confirmField, passwordField, (confirm, password) => {
    if (confirm !== password) return message;
    return undefined;
  });
}

/**
 * Composes multiple validators for the same field.
 * Runs validators in order and returns the first error encountered.
 *
 * @example
 * ```tsx
 * const emailValidator = composeValidators(
 *   (value) => !value ? 'Required' : undefined,
 *   (value) => !value.includes('@') ? 'Invalid email' : undefined
 * );
 * ```
 */
export function composeValidators<T extends Record<string, any>>(
  field: keyof T,
  ...validators: Array<(value: any, allValues: T) => string | undefined>
): FieldValidator<T> {
  return {
    field,
    validate: (value, allValues) => {
      for (const validator of validators) {
        const error = validator(value, allValues);
        if (error) return error;
      }
      return undefined;
    },
  };
}

/**
 * Common validation functions
 */
export const commonValidators = {
  required: (message: string = 'This field is required') => (value: any) => {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return message;
    }
    return undefined;
  },

  minLength: (min: number, message?: string) => (value: string) => {
    if (value && value.length < min) {
      return message || `Must be at least ${min} characters`;
    }
    return undefined;
  },

  maxLength: (max: number, message?: string) => (value: string) => {
    if (value && value.length > max) {
      return message || `Must be at most ${max} characters`;
    }
    return undefined;
  },

  email: (message: string = 'Invalid email address') => (value: string) => {
    if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return message;
    }
    return undefined;
  },

  pattern: (regex: RegExp, message: string) => (value: string) => {
    if (value && !regex.test(value)) {
      return message;
    }
    return undefined;
  },

  min: (min: number, message?: string) => (value: number) => {
    if (value != null && value < min) {
      return message || `Must be at least ${min}`;
    }
    return undefined;
  },

  max: (max: number, message?: string) => (value: number) => {
    if (value != null && value > max) {
      return message || `Must be at most ${max}`;
    }
    return undefined;
  },
};
