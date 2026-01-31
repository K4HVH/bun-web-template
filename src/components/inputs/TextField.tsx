import { Component, JSX, Show, splitProps } from 'solid-js';
import { BsX } from 'solid-icons/bs';
import '../../styles/components/inputs/TextField.css';

interface TextFieldProps {
  value?: string;
  onChange?: (value: string) => void;
  onInput?: (value: string) => void;
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';
  placeholder?: string;
  disabled?: boolean;
  size?: 'normal' | 'compact';
  label?: string;
  maxLength?: number;
  showCount?: boolean;
  prefix?: JSX.Element | string;
  suffix?: JSX.Element | string;
  clearable?: boolean;
  class?: string;
  name?: string;
  id?: string;
}

export const TextField: Component<TextFieldProps> = (props) => {
  const [local, rest] = splitProps(props, [
    'value',
    'onChange',
    'onInput',
    'type',
    'placeholder',
    'disabled',
    'size',
    'label',
    'maxLength',
    'showCount',
    'prefix',
    'suffix',
    'clearable',
    'class',
    'name',
    'id',
  ]);

  const size = () => local.size ?? 'normal';
  const type = () => local.type ?? 'text';

  let inputRef: HTMLInputElement | undefined;

  const handleInput = (e: InputEvent) => {
    const target = e.target as HTMLInputElement;
    const newValue = target.value;

    if (local.onInput) {
      local.onInput(newValue);
    }
    if (local.onChange) {
      local.onChange(newValue);
    }
  };

  const handleClear = () => {
    if (local.onChange) {
      local.onChange('');
    }
    inputRef?.focus();
  };

  const containerClassNames = () => {
    const classes = ['textfield'];

    if (size() === 'compact') {
      classes.push('textfield--compact');
    }

    if (local.disabled) {
      classes.push('textfield--disabled');
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
        />

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
