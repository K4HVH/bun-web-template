import { Component, JSX, Show, createMemo, splitProps } from 'solid-js';
import { FieldError } from './FieldError';
import { generateId } from '../../utils/generateId';
import '../../styles/components/feedback/FormField.css';

interface FormFieldProps extends JSX.HTMLAttributes<HTMLDivElement> {
  label?: string;
  error?: string;
  required?: boolean;
  children: JSX.Element;
  fieldId?: string;      // Override ID for the input field
  errorId?: string;      // Override ID for the error message
  helpText?: string;     // Additional help text
  helpTextId?: string;   // Override ID for help text
}

export const FormField: Component<FormFieldProps> = (props) => {
  const [local, rest] = splitProps(props, [
    'label',
    'error',
    'required',
    'children',
    'class',
    'fieldId',
    'errorId',
    'helpText',
    'helpTextId',
  ]);

  // Generate unique IDs for accessibility linking
  const fieldId = () => local.fieldId || generateId('field');
  const errorId = () => local.errorId || generateId('error');
  const helpTextId = () => local.helpTextId || generateId('help');

  // Build aria-describedby linking
  const ariaDescribedBy = createMemo(() => {
    const ids: string[] = [];
    if (local.error) ids.push(errorId());
    if (local.helpText) ids.push(helpTextId());
    return ids.length > 0 ? ids.join(' ') : undefined;
  });

  const classNames = () => {
    const classes = ['form-field'];

    if (local.class) {
      classes.push(local.class);
    }

    return classes.join(' ');
  };

  return (
    <div class={classNames()} {...rest}>
      <Show when={local.label}>
        <label class="form-field__label" for={fieldId()}>
          {local.label}
          {local.required && <span class="form-field__required">*</span>}
        </label>
      </Show>

      <div class="form-field__control">{local.children}</div>

      <Show when={local.helpText}>
        <div id={helpTextId()} class="form-field__help-text">
          {local.helpText}
        </div>
      </Show>

      <FieldError error={local.error} id={errorId()} />
    </div>
  );
};
