import { Component, JSX, Show, splitProps, createEffect } from 'solid-js';
import { BsX } from 'solid-icons/bs';
import '../../styles/components/inputs/TextField.css';

interface TextFieldProps {
  value?: string;
  onChange?: (value: string) => void;
  onInput?: (value: string) => void;
  onBlur?: () => void;
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';
  placeholder?: string;
  disabled?: boolean;
  size?: 'normal' | 'compact';
  label?: string;
  error?: string;
  invalid?: boolean;
  maxLength?: number;
  showCount?: boolean;
  prefix?: JSX.Element | string;
  suffix?: JSX.Element | string;
  clearable?: boolean;
  multiline?: boolean;
  rows?: number;
  maxRows?: number;
  class?: string;
  name?: string;
  id?: string;
  'aria-describedby'?: string;
  'aria-required'?: boolean;
  'aria-labelledby'?: string;
}

export const TextField: Component<TextFieldProps> = (props) => {
  const [local, rest] = splitProps(props, [
    'value',
    'onChange',
    'onInput',
    'onBlur',
    'type',
    'placeholder',
    'disabled',
    'size',
    'label',
    'error',
    'invalid',
    'maxLength',
    'showCount',
    'prefix',
    'suffix',
    'clearable',
    'multiline',
    'rows',
    'maxRows',
    'class',
    'name',
    'id',
    'aria-describedby',
    'aria-required',
    'aria-labelledby',
  ]);

  const size = () => local.size ?? 'normal';
  const type = () => local.type ?? 'text';
  const rows = () => local.rows ?? 3;

  let inputRef: HTMLInputElement | undefined;
  let textareaRef: HTMLTextAreaElement | undefined;

  const autoGrowTextarea = () => {
    if (!textareaRef || !local.multiline) return;

    // Reset height to auto to get the correct scrollHeight
    textareaRef.style.height = 'auto';

    const minHeight = rows() * parseFloat(getComputedStyle(textareaRef).lineHeight);
    const maxHeight = local.maxRows
      ? local.maxRows * parseFloat(getComputedStyle(textareaRef).lineHeight)
      : Infinity;

    const newHeight = Math.min(Math.max(textareaRef.scrollHeight, minHeight), maxHeight);
    textareaRef.style.height = `${newHeight}px`;
  };

  const handleInput = (e: InputEvent) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    const newValue = target.value;

    if (local.multiline) {
      autoGrowTextarea();
    }

    if (local.onInput) {
      local.onInput(newValue);
    }
    if (local.onChange) {
      local.onChange(newValue);
    }
  };

  const handleBlur = () => {
    if (local.onBlur) {
      local.onBlur();
    }
  };

  const handleClear = () => {
    if (local.onChange) {
      local.onChange('');
    }
    if (local.multiline) {
      textareaRef?.focus();
      autoGrowTextarea();
    } else {
      inputRef?.focus();
    }
  };

  const containerClassNames = () => {
    const classes = ['textfield'];

    if (size() === 'compact') {
      classes.push('textfield--compact');
    }

    if (local.disabled) {
      classes.push('textfield--disabled');
    }

    if (local.invalid || local.error) {
      classes.push('textfield--invalid');
    }

    if (local.class) {
      classes.push(local.class);
    }

    return classes.join(' ');
  };

  const inputClassNames = () => {
    const classes = ['textfield__input'];

    if (local.prefix) {
      classes.push('textfield__input--with-prefix');
    }

    if (local.suffix || local.clearable || local.showCount) {
      classes.push('textfield__input--with-suffix');
    }

    return classes.join(' ');
  };

  const showClearButton = () => {
    return local.clearable && local.value && local.value.length > 0 && !local.disabled;
  };

  const inputId = () => local.id || local.name;

  // Auto-grow textarea when value changes
  createEffect(() => {
    if (local.multiline && local.value !== undefined) {
      autoGrowTextarea();
    }
  });

  return (
    <div class={containerClassNames()} {...rest}>
      <Show when={local.label}>
        <label class="textfield__label" for={inputId()}>
          {local.label}
        </label>
      </Show>

      <div class="textfield__wrapper">
        <Show when={local.prefix}>
          <span class="textfield__prefix">{local.prefix}</span>
        </Show>

        <Show
          when={local.multiline}
          fallback={
            <input
              ref={inputRef}
              id={inputId()}
              name={local.name}
              type={type()}
              class={inputClassNames()}
              value={local.value || ''}
              placeholder={local.placeholder}
              disabled={local.disabled}
              maxLength={local.maxLength}
              onInput={handleInput}
              onBlur={handleBlur}
              aria-invalid={local.invalid || !!local.error}
              aria-describedby={local['aria-describedby']}
              aria-required={local['aria-required']}
              aria-labelledby={local['aria-labelledby']}
            />
          }
        >
          <textarea
            ref={textareaRef}
            id={inputId()}
            name={local.name}
            class={inputClassNames()}
            value={local.value || ''}
            placeholder={local.placeholder}
            disabled={local.disabled}
            maxLength={local.maxLength}
            rows={rows()}
            onInput={handleInput}
            onBlur={handleBlur}
            aria-invalid={local.invalid || !!local.error}
            aria-describedby={local['aria-describedby']}
            aria-required={local['aria-required']}
            aria-labelledby={local['aria-labelledby']}
            style={{ resize: local.maxRows ? 'none' : 'vertical' }}
          />
        </Show>

        <div class="textfield__suffix-container">
          <Show when={showClearButton()}>
            <button
              type="button"
              class="textfield__clear"
              onClick={handleClear}
              tabIndex={-1}
            >
              <BsX />
            </button>
          </Show>

          <Show when={local.showCount && local.maxLength}>
            <span class="textfield__count">
              {local.value?.length || 0}/{local.maxLength}
            </span>
          </Show>

          <Show when={local.suffix}>
            <span class="textfield__suffix">{local.suffix}</span>
          </Show>
        </div>
      </div>
    </div>
  );
};
