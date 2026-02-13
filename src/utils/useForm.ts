import { createSignal, createMemo } from 'solid-js';

export type FormErrors<T> = {
  [K in keyof T]?: string;
};

export interface FieldValidator<T> {
  field: keyof T;
  validate: (value: any, allValues: T) => string | undefined;
}

export interface UseFormOptions<T extends Record<string, any>> {
  initialValues: T;
  validate?: (values: T) => FormErrors<T>;
  fieldValidators?: FieldValidator<T>[];
  validateAsync?: (values: T) => Promise<FormErrors<T>>;
  asyncDebounceMs?: number;  // default: 300
  onSubmit: (values: T) => void | Promise<void>;
}

export type UseFormReturn<T extends Record<string, any>> = {
  values: T;
  errors: FormErrors<T>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  hasSubmitted: boolean;
  isValidating: boolean;
  isDirty: boolean;
  dirtyFields: Partial<Record<keyof T, boolean>>;
  handleChange: (field: keyof T) => (value: any) => void;
  handleBlur: (field: keyof T) => () => void;
  handleSubmit: (e?: SubmitEvent) => Promise<void>;
  setFieldValue: (field: keyof T, value: any) => void;
  setFieldError: (field: keyof T, error: string) => void;
  reset: (newInitialValues?: Partial<T>) => void;
};

export function useForm<T extends Record<string, any>>(
  options: UseFormOptions<T>
): UseFormReturn<T> {
  const [values, setValues] = createSignal<T>(options.initialValues);
  const [errors, setErrors] = createSignal<FormErrors<T>>({});
  const [touched, setTouched] = createSignal<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = createSignal(false);
  const [hasSubmitted, setHasSubmitted] = createSignal(false);
  const [isValidating, setIsValidating] = createSignal(false);
  const [dirtyFields, setDirtyFields] = createSignal<Partial<Record<keyof T, boolean>>>({});

  let asyncValidationTimeout: ReturnType<typeof setTimeout> | null = null;
  const debounceMs = options.asyncDebounceMs ?? 300;

  const validateForm = (): FormErrors<T> => {
    const errors: FormErrors<T> = {};

    // Run field-level validators first
    if (options.fieldValidators) {
      const currentValues = values();
      for (const validator of options.fieldValidators) {
        const error = validator.validate(currentValues[validator.field], currentValues);
        if (error) {
          errors[validator.field] = error;
        }
      }
    }

    // Run form-level validator (can override field validators)
    if (options.validate) {
      const formErrors = options.validate(values());
      Object.assign(errors, formErrors);
    }

    return errors;
  };

  const runAsyncValidation = async () => {
    if (!options.validateAsync) return;

    setIsValidating(true);
    try {
      const asyncErrors = await options.validateAsync(values());
      // Merge async errors with existing sync errors
      setErrors((prev) => ({ ...prev, ...asyncErrors }) as FormErrors<T>);
    } catch (error) {
      console.error('Async validation error:', error);
    } finally {
      setIsValidating(false);
    }
  };

  const debouncedAsyncValidation = () => {
    if (asyncValidationTimeout) {
      clearTimeout(asyncValidationTimeout);
    }

    asyncValidationTimeout = setTimeout(() => {
      runAsyncValidation();
    }, debounceMs);
  };

  const handleChange = (field: keyof T) => (value: any) => {
    setValues((prev) => ({ ...prev, [field]: value }) as T);

    // Track dirty state
    const isDifferent = value !== options.initialValues[field];
    setDirtyFields((prev) => ({ ...prev, [field]: isDifferent }) as Partial<Record<keyof T, boolean>>);

    // Re-validate on change after first submit
    if (hasSubmitted()) {
      const newErrors = validateForm();
      setErrors(() => newErrors);

      // Run async validation with debounce
      if (options.validateAsync) {
        debouncedAsyncValidation();
      }
    }
  };

  const handleBlur = (field: keyof T) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }) as Partial<Record<keyof T, boolean>>);

    // Only show errors after blur if form has been submitted
    if (hasSubmitted()) {
      const newErrors = validateForm();
      setErrors(() => newErrors);
    }
  };

  const handleSubmit = async (e?: SubmitEvent) => {
    if (e) {
      e.preventDefault();
    }

    setHasSubmitted(true);

    const newErrors = validateForm();
    setErrors(() => newErrors);

    // Mark all fields as touched
    const allTouched = Object.keys(values()).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {}
    ) as Partial<Record<keyof T, boolean>>;
    setTouched(() => allTouched);

    // If there are errors, don't submit
    if (Object.keys(newErrors).length > 0) {
      // Focus first error field for better UX
      const firstErrorField = Object.keys(newErrors)[0];
      const element = document.querySelector(`[name="${firstErrorField}"]`) as HTMLElement;
      if (element) {
        element.focus();
        // @ts-ignore - scrollIntoViewIfNeeded is non-standard but widely supported
        if (typeof element.scrollIntoViewIfNeeded === 'function') {
          // @ts-ignore
          element.scrollIntoViewIfNeeded();
        } else {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
      return;
    }

    setIsSubmitting(true);
    try {
      await options.onSubmit(values());
    } finally {
      setIsSubmitting(false);
    }
  };

  const setFieldValue = (field: keyof T, value: any) => {
    setValues((prev) => ({ ...prev, [field]: value }) as T);
  };

  const setFieldError = (field: keyof T, error: string) => {
    setErrors((prev) => ({ ...prev, [field]: error }) as FormErrors<T>);
  };

  const reset = (newInitialValues?: Partial<T>) => {
    const resetValues = newInitialValues
      ? ({ ...options.initialValues, ...newInitialValues } as T)
      : options.initialValues;

    setValues(() => resetValues);
    setErrors(() => ({} as FormErrors<T>));
    setTouched(() => ({} as Partial<Record<keyof T, boolean>>));
    setDirtyFields(() => ({} as Partial<Record<keyof T, boolean>>));
    setIsSubmitting(false);
    setHasSubmitted(false);
  };

  // Computed: Check if any field is dirty
  const isDirty = createMemo(() => {
    const dirty = dirtyFields();
    return Object.values(dirty).some((value) => value === true);
  });

  // Computed values for display errors (only show if field is touched or form submitted)
  const displayErrors = createMemo(() => {
    const currentErrors = errors();
    const currentTouched = touched();
    const submitted = hasSubmitted();

    const display: FormErrors<T> = {};
    Object.keys(currentErrors).forEach((key) => {
      if (submitted || currentTouched[key as keyof T]) {
        display[key as keyof T] = currentErrors[key as keyof T];
      }
    });
    return display;
  });

  return {
    get values() { return values(); },
    get errors() { return displayErrors(); },
    get touched() { return touched(); },
    get isSubmitting() { return isSubmitting(); },
    get hasSubmitted() { return hasSubmitted(); },
    get isValidating() { return isValidating(); },
    get isDirty() { return isDirty(); },
    get dirtyFields() { return dirtyFields(); },
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldError,
    reset,
  };
}
