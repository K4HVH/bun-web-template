import { createContext, useContext, Component, JSX, onCleanup } from 'solid-js';
import { UseFormReturn } from '../utils/useForm';

export interface FormContextValue<T extends Record<string, any> = any> {
  form: UseFormReturn<T>;
  registerField: (name: string, ref: HTMLElement) => void;
  unregisterField: (name: string) => void;
}

const FormContext = createContext<FormContextValue | undefined>(undefined);

interface FormProviderProps<T extends Record<string, any>> {
  form: UseFormReturn<T>;
  children: JSX.Element;
}

/**
 * FormProvider makes form state available via context.
 * Eliminates prop drilling and enables field ref registration for better focus management.
 *
 * @example
 * ```tsx
 * const form = useForm({ ... });
 *
 * <FormProvider form={form}>
 *   <MyFormFields />
 * </FormProvider>
 * ```
 */
export function FormProvider<T extends Record<string, any>>(props: FormProviderProps<T>): JSX.Element {
  const fieldRefs = new Map<string, HTMLElement>();

  const registerField = (name: string, ref: HTMLElement) => {
    fieldRefs.set(name, ref);
  };

  const unregisterField = (name: string) => {
    fieldRefs.delete(name);
  };

  const contextValue: FormContextValue<T> = {
    form: props.form,
    registerField,
    unregisterField,
  };

  return (
    <FormContext.Provider value={contextValue}>
      {props.children}
    </FormContext.Provider>
  );
}

/**
 * Hook to access form context.
 * Must be used within a FormProvider.
 *
 * @throws Error if used outside FormProvider
 *
 * @example
 * ```tsx
 * function MyField() {
 *   const { form } = useFormContext();
 *   return <input value={form.values.email} onChange={form.handleChange('email')} />;
 * }
 * ```
 */
export function useFormContext<T extends Record<string, any> = any>(): FormContextValue<T> {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context as FormContextValue<T>;
}

/**
 * Hook to register a field with the form context for better focus management.
 * Automatically unregisters on cleanup.
 *
 * @param name - Field name
 * @param ref - Field element reference
 *
 * @example
 * ```tsx
 * function MyField() {
 *   let inputRef: HTMLInputElement | undefined;
 *   const { form } = useFormContext();
 *
 *   // Register after mount
 *   createEffect(() => {
 *     if (inputRef) {
 *       useFieldRegistration('email', inputRef);
 *     }
 *   });
 *
 *   return <input ref={inputRef} />;
 * }
 * ```
 */
export function useFieldRegistration(name: string, ref: HTMLElement | undefined): void {
  const context = useFormContext();

  if (ref) {
    context.registerField(name, ref);

    onCleanup(() => {
      context.unregisterField(name);
    });
  }
}
