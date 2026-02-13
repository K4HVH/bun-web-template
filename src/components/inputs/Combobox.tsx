import { Component, createSignal, Show, For, splitProps, JSX } from 'solid-js';
import { BsX } from 'solid-icons/bs';
import { Checkbox } from './Checkbox';
import { Menu } from '../navigation/Menu';
import '../../styles/components/inputs/Combobox.css';

interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: Component;
  iconUnchecked?: Component;
  iconChecked?: Component;
}

interface ComboboxProps {
  name?: string;
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  onBlur?: () => void;
  options: ComboboxOption[];
  placeholder?: string;
  size?: 'normal' | 'compact';
  disabled?: boolean;
  multiple?: boolean;
  error?: string;
  invalid?: boolean;
  class?: string;
  'aria-describedby'?: string;
  'aria-required'?: boolean;
  'aria-labelledby'?: string;
}

export const Combobox: Component<ComboboxProps> = (props) => {
  const [local, rest] = splitProps(props, [
    'name',
    'value',
    'onChange',
    'onBlur',
    'options',
    'placeholder',
    'size',
    'disabled',
    'multiple',
    'error',
    'invalid',
    'class',
    'aria-describedby',
    'aria-required',
    'aria-labelledby',
  ]);

  const [isOpen, setIsOpen] = createSignal(false);

  const size = () => local.size ?? 'normal';

  const selectedValues = (): string[] => {
    if (local.multiple) {
      return Array.isArray(local.value) ? local.value : [];
    }
    return local.value && typeof local.value === 'string' ? [local.value] : [];
  };

  const selectedOptions = () => {
    const values = selectedValues();
    return local.options.filter(opt => values.includes(opt.value));
  };

  const isSelected = (value: string) => {
    return selectedValues().includes(value);
  };

  // Menu handles opening/closing via open/onOpenChange props

  const handleSelect = (value: string) => {
    if (!local.onChange) return;

    if (local.multiple) {
      const currentValues = selectedValues();
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      local.onChange(newValues);
      // Don't close dropdown in multiple mode
    } else {
      local.onChange(value);
      // Close dropdown after selection in single-select mode
      setIsOpen(false);
    }
  };

  const handleRemove = (value: string) => {
    if (!local.onChange || !local.multiple) return;
    const currentValues = selectedValues();
    const newValues = currentValues.filter(v => v !== value);
    local.onChange(newValues);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (local.disabled) return;

    if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(!isOpen());
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!isOpen()) {
        setIsOpen(true);
      }
    }
  };

  const classNames = () => {
    const classes = ['combobox'];

    if (local.disabled) {
      classes.push('combobox--disabled');
    }

    if (size() === 'compact') {
      classes.push('combobox--compact');
    }

    if (isOpen()) {
      classes.push('combobox--open');
    }

    if (local.invalid || local.error) {
      classes.push('combobox--invalid');
    }

    if (local.class) {
      classes.push(local.class);
    }

    return classes.join(' ');
  };

  return (
    <Menu
      trigger={
        <div
          class={classNames()}
          tabIndex={local.disabled ? -1 : 0}
          onKeyDown={handleKeyDown}
          onBlur={local.onBlur}
          aria-invalid={local.invalid || !!local.error}
          {...rest}
        >
          <div class="combobox__trigger">
            <span class="combobox__value">
              <Show when={selectedOptions().length > 0} fallback={<span class="combobox__placeholder">{local.placeholder || 'Select...'}</span>}>
                {local.multiple ? (
                  <div class="combobox__chips">
                    <For each={selectedOptions()}>
                      {(option) => {
                        const Icon = option.iconChecked || option.icon;
                        return (
                          <span class="combobox__chip">
                            {Icon && (
                              <span class="combobox__icon">
                                <Icon />
                              </span>
                            )}
                            <span>{option.label}</span>
                            <button
                              type="button"
                              class="combobox__chip-remove"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemove(option.value);
                              }}
                            >
                              <BsX />
                            </button>
                          </span>
                        );
                      }}
                    </For>
                  </div>
                ) : (
                  (() => {
                    const option = selectedOptions()[0];
                    const Icon = option?.icon;
                    return (
                      <>
                        {Icon && (
                          <span class="combobox__icon">
                            <Icon />
                          </span>
                        )}
                        <span>{option?.label}</span>
                      </>
                    );
                  })()
                )}
              </Show>
            </span>
            <span class="combobox__arrow" />
          </div>
        </div>
      }
      open={isOpen()}
      onOpenChange={(open) => {
        if (!local.disabled) {
          setIsOpen(open);
        }
      }}
      openOn="click"
      placement="bottom-start"
      matchTriggerWidth={true}
      closeOnContentClick={false}
      anchored={true}
      variant="default"
      size={size()}
      wrapperClass="combobox-wrapper"
    >
      <div class={`combobox__dropdown${size() === 'compact' ? ' combobox__dropdown--compact' : ''}`}>
        <For each={local.options}>
          {(option) => (
            <div
              class={`combobox__option ${option.disabled ? 'combobox__option--disabled' : ''} ${isSelected(option.value) ? 'combobox__option--selected' : ''}`}
              onMouseDown={(e) => {
                if (option.disabled) {
                  e.stopPropagation();
                  e.preventDefault();
                }
              }}
              onClick={(e) => {
                if (option.disabled) {
                  e.stopPropagation();
                  return;
                }
                handleSelect(option.value);
              }}
            >
              {local.multiple ? (
                <Checkbox
                  checked={isSelected(option.value)}
                  disabled={option.disabled}
                  iconUnchecked={option.iconUnchecked}
                  iconChecked={option.iconChecked}
                />
              ) : (
                option.icon && (
                  <span class="combobox__icon">
                    <option.icon />
                  </span>
                )
              )}
              <span>{option.label}</span>
            </div>
          )}
        </For>
      </div>
    </Menu>
  );
};
