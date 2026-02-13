import { FormErrors } from './useForm';

/**
 * Zod adapter for form validation.
 * Converts Zod schema validation to useForm-compatible validator.
 *
 * Note: Zod is an optional peer dependency. Install with: `bun add zod`
 *
 * @example
 * ```tsx
 * import { z } from 'zod';
 * import { zodValidator } from './utils/zodAdapter';
 *
 * const schema = z.object({
 *   email: z.string().email('Invalid email'),
 *   password: z.string().min(8, 'Password must be at least 8 characters'),
 * });
 *
 * const form = useForm({
 *   initialValues: { email: '', password: '' },
 *   validate: zodValidator(schema),
 *   onSubmit: async (values) => { ... }
 * });
 * ```
 */
export function zodValidator<T extends Record<string, any>>(
  schema: any // ZodSchema<T> - using any to avoid requiring Zod as dependency
): (values: T) => FormErrors<T> {
  return (values: T): FormErrors<T> => {
    try {
      // Attempt to parse with Zod schema
      schema.parse(values);
      // If successful, no errors
      return {};
    } catch (error: any) {
      // Check if it's a Zod error
      if (error?.errors && Array.isArray(error.errors)) {
        const formErrors: FormErrors<T> = {};

        // Convert Zod errors to form errors
        for (const zodError of error.errors) {
          const path = zodError.path;
          const message = zodError.message;

          // Handle nested paths (e.g., ['user', 'email'] -> 'user.email')
          if (path && path.length > 0) {
            // For simple forms, use the first path segment as the field name
            const fieldName = path[0] as keyof T;
            formErrors[fieldName] = message;
          }
        }

        return formErrors;
      }

      // If not a Zod error, log and return empty
      console.error('Zod validation error:', error);
      return {};
    }
  };
}

/**
 * Async Zod validator for use with validateAsync option.
 *
 * @example
 * ```tsx
 * const schema = z.object({
 *   username: z.string().refine(async (val) => {
 *     const exists = await checkUsernameExists(val);
 *     return !exists;
 *   }, 'Username already taken')
 * });
 *
 * const form = useForm({
 *   initialValues: { username: '' },
 *   validateAsync: zodValidatorAsync(schema),
 *   onSubmit: ...
 * });
 * ```
 */
export function zodValidatorAsync<T extends Record<string, any>>(
  schema: any // ZodSchema<T>
): (values: T) => Promise<FormErrors<T>> {
  return async (values: T): Promise<FormErrors<T>> => {
    try {
      await schema.parseAsync(values);
      return {};
    } catch (error: any) {
      if (error?.errors && Array.isArray(error.errors)) {
        const formErrors: FormErrors<T> = {};

        for (const zodError of error.errors) {
          const path = zodError.path;
          const message = zodError.message;

          if (path && path.length > 0) {
            const fieldName = path[0] as keyof T;
            formErrors[fieldName] = message;
          }
        }

        return formErrors;
      }

      console.error('Async Zod validation error:', error);
      return {};
    }
  };
}

/**
 * Type guard to check if Zod is available.
 * Useful for optional Zod support.
 */
export function isZodAvailable(): boolean {
  try {
    // Try to require/import zod
    require('zod');
    return true;
  } catch {
    return false;
  }
}
