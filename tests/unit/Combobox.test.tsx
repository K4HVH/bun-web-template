import { render, fireEvent, waitFor } from '@solidjs/testing-library';
import { describe, it, expect, vi } from 'vitest';
import { createSignal } from 'solid-js';
import { Combobox } from '../../src/components/inputs/Combobox';
import { BsCircle, BsSquare } from 'solid-icons/bs';

describe('Combobox', () => {
  const mockOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  it('renders with placeholder', () => {
    const { getByText } = render(() => (
      <Combobox placeholder="Select option..." options={mockOptions} />
    ));
    expect(getByText('Select option...')).toBeInTheDocument();
  });

  it('renders with selected value', () => {
    const { getByText } = render(() => (
      <Combobox value="option2" options={mockOptions} />
    ));
    expect(getByText('Option 2')).toBeInTheDocument();
  });

  it('opens dropdown on trigger click', async () => {
    const { container } = render(() => <Combobox options={mockOptions} />);
    const trigger = container.querySelector('.combobox__trigger') as HTMLElement;

    fireEvent.click(trigger);

    await waitFor(() => {
      const dropdown = document.querySelector('.combobox__dropdown');
      expect(dropdown).toBeInTheDocument();
    });
  });

  it('displays all options when dropdown is open', async () => {
    const { container } = render(() => <Combobox options={mockOptions} />);
    const trigger = container.querySelector('.combobox__trigger') as HTMLElement;

    fireEvent.click(trigger);

    await waitFor(() => {
      const dropdown = document.querySelector('.combobox__dropdown');
      expect(dropdown).toBeInTheDocument();
      expect(dropdown?.textContent).toContain('Option 1');
      expect(dropdown?.textContent).toContain('Option 2');
      expect(dropdown?.textContent).toContain('Option 3');
    });
  });

  it('selects option on click', async () => {
    const handleChange = vi.fn();
    const TestComponent = () => {
      const [value, setValue] = createSignal<string>();
      return (
        <Combobox
          value={value()}
          onChange={(newValue) => {
            setValue(newValue as string);
            handleChange(newValue);
          }}
          options={mockOptions}
        />
      );
    };

    const { container } = render(() => <TestComponent />);
    const trigger = container.querySelector('.combobox__trigger') as HTMLElement;

    fireEvent.click(trigger);

    await waitFor(() => {
      const dropdown = document.querySelector('.combobox__dropdown');
      expect(dropdown).toBeInTheDocument();
    });

    const options = document.querySelectorAll('.combobox__option');
    fireEvent.click(options[1]); // Click "Option 2"

    expect(handleChange).toHaveBeenCalledWith('option2');
  });

  it('closes dropdown after selection', async () => {
    const handleChange = vi.fn();
    const { container } = render(() => (
      <Combobox options={mockOptions} onChange={handleChange} />
    ));
    const trigger = container.querySelector('.combobox__trigger') as HTMLElement;

    fireEvent.click(trigger);

    await waitFor(() => {
      const dropdown = document.querySelector('.combobox__dropdown');
      expect(dropdown).toBeInTheDocument();
    });

    const options = document.querySelectorAll('.combobox__option');
    fireEvent.click(options[1]); // Click "Option 2"

    await waitFor(() => {
      const dropdown = document.querySelector('.combobox__dropdown');
      expect(dropdown).not.toBeInTheDocument();
    });

    expect(handleChange).toHaveBeenCalledWith('option2');
  });

  it('is disabled when disabled prop is true', () => {
    const { container } = render(() => <Combobox disabled options={mockOptions} />);
    const combobox = container.querySelector('.combobox--disabled');
    expect(combobox).toBeInTheDocument();
  });

  it('does not open dropdown when disabled', () => {
    const { container } = render(() => <Combobox disabled options={mockOptions} />);
    const trigger = container.querySelector('.combobox__trigger') as HTMLElement;

    fireEvent.click(trigger);

    const dropdown = document.querySelector('.combobox__dropdown');
    expect(dropdown).not.toBeInTheDocument();
  });

  it('applies compact size class', () => {
    const { container } = render(() => <Combobox size="compact" options={mockOptions} />);
    const combobox = container.querySelector('.combobox--compact');
    expect(combobox).toBeInTheDocument();
  });

  it('renders options with icons', async () => {
    const optionsWithIcons = [
      { value: 'circle', label: 'Circle', icon: BsCircle },
      { value: 'square', label: 'Square', icon: BsSquare },
    ];

    const { container } = render(() => <Combobox options={optionsWithIcons} />);
    const trigger = container.querySelector('.combobox__trigger') as HTMLElement;

    fireEvent.click(trigger);

    await waitFor(() => {
      const icons = document.querySelectorAll('.combobox__icon');
      expect(icons.length).toBeGreaterThan(0);
    });
  });

  it('disabled options cannot be selected', async () => {
    const optionsWithDisabled = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2 (disabled)', disabled: true },
      { value: 'option3', label: 'Option 3' },
    ];

    const handleChange = vi.fn();
    const { container } = render(() => (
      <Combobox options={optionsWithDisabled} onChange={handleChange} />
    ));
    const trigger = container.querySelector('.combobox__trigger') as HTMLElement;

    fireEvent.click(trigger);

    await waitFor(() => {
      const dropdown = document.querySelector('.combobox__dropdown');
      expect(dropdown).toBeInTheDocument();
    });

    const disabledOption = document.querySelector('.combobox__option--disabled');
    if (disabledOption) {
      fireEvent.click(disabledOption);
    }

    // Dropdown should still be open
    const dropdown = document.querySelector('.combobox__dropdown');
    expect(dropdown).toBeInTheDocument();

    // onChange should not have been called
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('closes dropdown when clicking outside', async () => {
    const { container } = render(() => (
      <div>
        <Combobox options={mockOptions} />
        <div data-testid="outside">Outside element</div>
      </div>
    ));

    const trigger = container.querySelector('.combobox__trigger') as HTMLElement;
    fireEvent.click(trigger);

    await waitFor(() => {
      const dropdown = document.querySelector('.combobox__dropdown');
      expect(dropdown).toBeInTheDocument();
    });

    const outside = container.querySelector('[data-testid="outside"]') as HTMLElement;
    fireEvent.mouseDown(outside);

    await waitFor(() => {
      const dropdown = document.querySelector('.combobox__dropdown');
      expect(dropdown).not.toBeInTheDocument();
    }, { timeout: 200 });
  });
});
