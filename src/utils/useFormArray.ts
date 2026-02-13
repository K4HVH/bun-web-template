import { createMemo } from 'solid-js';
import { UseFormReturn } from './useForm';

export interface UseFormArrayReturn<T> {
  fields: T[];
  append: (value: T) => void;
  remove: (index: number) => void;
  insert: (index: number, value: T) => void;
  move: (from: number, to: number) => void;
  swap: (indexA: number, indexB: number) => void;
}

export interface UseFormArrayOptions<FormValues extends Record<string, any>, T> {
  form: UseFormReturn<FormValues>;
  name: keyof FormValues;
}

/**
 * Hook for managing array fields within a form.
 * Provides methods to append, remove, insert, move, and swap array items.
 * Syncs with useForm via setFieldValue.
 *
 * @example
 * ```tsx
 * const form = useForm({ initialValues: { todos: [] }, onSubmit: ... });
 * const todos = useFormArray({ form, name: 'todos' });
 *
 * <For each={todos.fields}>
 *   {(todo, index) => <input value={todo} />}
 * </For>
 * <button onClick={() => todos.append('')}>Add</button>
 * ```
 */
export function useFormArray<FormValues extends Record<string, any>, T = any>(
  options: UseFormArrayOptions<FormValues, T>
): UseFormArrayReturn<T> {
  const fields = createMemo(() => {
    const value = options.form.values[options.name];
    return (Array.isArray(value) ? value : []) as T[];
  });

  const updateArray = (newArray: T[]) => {
    options.form.setFieldValue(options.name, newArray as any);
  };

  const append = (value: T) => {
    const current = fields();
    updateArray([...current, value]);
  };

  const remove = (index: number) => {
    const current = fields();
    if (index < 0 || index >= current.length) return;
    updateArray(current.filter((_: any, i: number) => i !== index));
  };

  const insert = (index: number, value: T) => {
    const current = fields();
    const newArray = [...current];
    newArray.splice(index, 0, value);
    updateArray(newArray);
  };

  const move = (from: number, to: number) => {
    const current = fields();
    if (from < 0 || from >= current.length || to < 0 || to >= current.length) return;

    const newArray = [...current];
    const [item] = newArray.splice(from, 1);
    newArray.splice(to, 0, item);
    updateArray(newArray);
  };

  const swap = (indexA: number, indexB: number) => {
    const current = fields();
    if (indexA < 0 || indexA >= current.length || indexB < 0 || indexB >= current.length) return;

    const newArray = [...current];
    [newArray[indexA], newArray[indexB]] = [newArray[indexB], newArray[indexA]];
    updateArray(newArray);
  };

  return {
    get fields() {
      return fields();
    },
    append,
    remove,
    insert,
    move,
    swap,
  };
}
