import { Component, createSignal, createEffect, Show, For, splitProps, JSX, onCleanup } from 'solid-js';
import { Portal } from 'solid-js/web';
import '../styles/components/Combobox.css';

interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: Component;
}

interface ComboboxProps {
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  options: ComboboxOption[];
  placeholder?: string;
  size?: 'normal' | 'compact';
  disabled?: boolean;
  class?: string;
}

export const Combobox: Component<ComboboxProps> = (props) => {
  const [local, rest] = splitProps(props, [
    'name',
    'value',
    'onChange',
    'options',
    'placeholder',
    'size',
    'disabled',
    'class',
  ]);

  const [isOpen, setIsOpen] = createSignal(false);
  const [dropdownPosition, setDropdownPosition] = createSignal({ top: 0, left: 0, width: 0 });
  let comboboxRef: HTMLDivElement | undefined;
  let dropdownRef: HTMLDivElement | undefined;

  const size = () => local.size ?? 'normal';

  // Update dropdown position when opened or on scroll/resize
  const updatePosition = () => {
    if (comboboxRef) {
      const rect = comboboxRef.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 4,
        left: rect.left,
        width: rect.width,
      });
    }
  };

  createEffect(() => {
    if (isOpen()) {
      updatePosition();
      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
      document.removeEventListener('mousedown', handleClickOutside);
    }
  });

  onCleanup(() => {
    window.removeEventListener('scroll', updatePosition, true);
    window.removeEventListener('resize', updatePosition);
    document.removeEventListener('mousedown', handleClickOutside);
  });

  const selectedOption = () => {
    return local.options.find(opt => opt.value === local.value);
  };

  const handleToggle = () => {
    if (!local.disabled) {
      setIsOpen(!isOpen());
    }
  };

  const handleSelect = (value: string) => {
    if (local.onChange) {
      local.onChange(value);
    }
    setIsOpen(false);
  };

  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    // Don't close if clicking inside combobox or dropdown
    if (comboboxRef?.contains(target) || dropdownRef?.contains(target)) {
      return;
    }
    setIsOpen(false);
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

    if (local.class) {
      classes.push(local.class);
    }

    return classes.join(' ');
  };

  return (
    <div
      ref={comboboxRef}
      class={classNames()}
      tabIndex={local.disabled ? -1 : 0}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      <div class="combobox__trigger" onClick={handleToggle}>
        <span class="combobox__value">
          <Show when={selectedOption()} fallback={<span class="combobox__placeholder">{local.placeholder || 'Select...'}</span>}>
            {(() => {
              const option = selectedOption();
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
            })()}
          </Show>
        </span>
        <span class="combobox__arrow" />
      </div>

      <Show when={isOpen()}>
        <Portal>
          <div
            ref={dropdownRef}
            class="combobox__dropdown"
            style={{
              position: 'fixed',
              top: `${dropdownPosition().top}px`,
              left: `${dropdownPosition().left}px`,
              width: `${dropdownPosition().width}px`,
            }}
          >
            <For each={local.options}>
              {(option) => (
                <div
                  class={`combobox__option ${option.disabled ? 'combobox__option--disabled' : ''} ${local.value === option.value ? 'combobox__option--selected' : ''}`}
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
                  {option.icon && (
                    <span class="combobox__icon">
                      <option.icon />
                    </span>
                  )}
                  <span>{option.label}</span>
                </div>
              )}
            </For>
          </div>
        </Portal>
      </Show>
    </div>
  );
};
