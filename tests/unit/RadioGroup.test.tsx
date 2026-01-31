import { render, fireEvent } from '@solidjs/testing-library';
import { describe, it, expect, vi } from 'vitest';
import { createSignal } from 'solid-js';
import { RadioGroup } from '../../src/components/RadioGroup';
import { BsHeart, BsHeartFill, BsStar, BsStarFill } from 'solid-icons/bs';

describe('RadioGroup', () => {
  const mockOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  it('renders all options', () => {
    const { getByText } = render(() => (
      <RadioGroup name="test" options={mockOptions} />
    ));
    expect(getByText('Option 1')).toBeInTheDocument();
    expect(getByText('Option 2')).toBeInTheDocument();
    expect(getByText('Option 3')).toBeInTheDocument();
  });

  it('selects the option matching the value prop', () => {
    const { container } = render(() => (
      <RadioGroup name="test" value="option2" options={mockOptions} />
    ));
    const radio = container.querySelector('input[value="option2"]') as HTMLInputElement;
    expect(radio?.checked).toBe(true);
  });

  it('calls onChange when option is selected', () => {
    const handleChange = vi.fn();
    const { container } = render(() => (
      <RadioGroup name="test" onChange={handleChange} options={mockOptions} />
    ));
    const radio = container.querySelector('input[value="option2"]') as HTMLInputElement;
    fireEvent.click(radio);
    expect(handleChange).toHaveBeenCalledWith('option2');
  });

  it('updates selection when clicked', () => {
    const TestComponent = () => {
      const [value, setValue] = createSignal('option1');
      return (
        <RadioGroup
          name="test"
          value={value()}
          onChange={setValue}
          options={mockOptions}
        />
      );
    };

    const { container } = render(() => <TestComponent />);

    const radio1 = container.querySelector('input[value="option1"]') as HTMLInputElement;
    const radio2 = container.querySelector('input[value="option2"]') as HTMLInputElement;

    expect(radio1.checked).toBe(true);
    expect(radio2.checked).toBe(false);

    fireEvent.click(radio2);

    expect(radio1.checked).toBe(false);
    expect(radio2.checked).toBe(true);
  });

  it('renders with default orientation', () => {
    const { container } = render(() => (
      <RadioGroup name="test" options={mockOptions} />
    ));
    const group = container.querySelector('.radio-group');
    expect(group).toBeInTheDocument();
    // Default orientation doesn't have a specific class
    expect(group?.classList.contains('radio-group--horizontal')).toBe(false);
  });

  it('applies horizontal orientation class', () => {
    const { container } = render(() => (
      <RadioGroup name="test" orientation="horizontal" options={mockOptions} />
    ));
    const group = container.querySelector('.radio-group--horizontal');
    expect(group).toBeInTheDocument();
  });

  it('applies compact size class', () => {
    const { container } = render(() => (
      <RadioGroup name="test" size="compact" options={mockOptions} />
    ));
    const radio = container.querySelector('.radio--compact');
    expect(radio).toBeInTheDocument();
  });

  it('disables specific options', () => {
    const optionsWithDisabled = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2 (disabled)', disabled: true },
      { value: 'option3', label: 'Option 3' },
    ];

    const { container } = render(() => (
      <RadioGroup name="test" options={optionsWithDisabled} />
    ));
    const radio = container.querySelector('input[value="option2"]') as HTMLInputElement;
    expect(radio.disabled).toBe(true);
  });

  it('marks disabled options with disabled attribute', () => {
    const optionsWithDisabled = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2 (disabled)', disabled: true },
    ];

    const { container } = render(() => (
      <RadioGroup name="test" options={optionsWithDisabled} />
    ));
    const radio = container.querySelector('input[value="option2"]') as HTMLInputElement;
    expect(radio.disabled).toBe(true);
    expect(radio.hasAttribute('disabled')).toBe(true);
  });

  it('renders options with custom icons', () => {
    const optionsWithIcons = [
      { value: 'heart', label: 'Heart', iconUnchecked: BsHeart, iconChecked: BsHeartFill },
      { value: 'star', label: 'Star', iconUnchecked: BsStar, iconChecked: BsStarFill },
    ];

    const { container } = render(() => (
      <RadioGroup name="test" options={optionsWithIcons} />
    ));
    const icons = container.querySelectorAll('.radio__icon');
    expect(icons.length).toBeGreaterThan(0);
  });

  it('ensures only one option can be selected at a time', () => {
    const TestComponent = () => {
      const [value, setValue] = createSignal('option1');
      return (
        <RadioGroup
          name="test"
          value={value()}
          onChange={setValue}
          options={mockOptions}
        />
      );
    };

    const { container } = render(() => <TestComponent />);

    const radio1 = container.querySelector('input[value="option1"]') as HTMLInputElement;
    const radio2 = container.querySelector('input[value="option2"]') as HTMLInputElement;
    const radio3 = container.querySelector('input[value="option3"]') as HTMLInputElement;

    expect(radio1.checked).toBe(true);

    fireEvent.click(radio2);
    expect(radio1.checked).toBe(false);
    expect(radio2.checked).toBe(true);
    expect(radio3.checked).toBe(false);

    fireEvent.click(radio3);
    expect(radio1.checked).toBe(false);
    expect(radio2.checked).toBe(false);
    expect(radio3.checked).toBe(true);
  });
});
