import { render, fireEvent } from '@solidjs/testing-library';
import { describe, it, expect, vi } from 'vitest';
import { createSignal } from 'solid-js';
import { TextField } from '../../src/components/inputs/TextField';
import { BsSearch } from 'solid-icons/bs';

describe('TextField', () => {
  it('renders with placeholder', () => {
    const { getByPlaceholderText } = render(() => (
      <TextField placeholder="Enter text..." />
    ));
    expect(getByPlaceholderText('Enter text...')).toBeInTheDocument();
  });

  it('renders with value', () => {
    const { container } = render(() => <TextField value="Test value" />);
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.value).toBe('Test value');
  });

  it('renders with label', () => {
    const { getByText } = render(() => (
      <TextField label="Username" placeholder="Enter username" />
    ));
    expect(getByText('Username')).toBeInTheDocument();
  });

  it('calls onChange and onInput when typing', () => {
    const handleChange = vi.fn();
    const handleInput = vi.fn();
    const { container } = render(() => (
      <TextField onChange={handleChange} onInput={handleInput} />
    ));

    const input = container.querySelector('input') as HTMLInputElement;
    fireEvent.input(input, { target: { value: 'Hello' } });

    expect(handleInput).toHaveBeenCalledWith('Hello');
    expect(handleChange).toHaveBeenCalledWith('Hello');
  });

  it('updates value in controlled mode', () => {
    const TestComponent = () => {
      const [value, setValue] = createSignal('');
      return (
        <div>
          <TextField value={value()} onChange={setValue} />
          <span data-testid="output">{value()}</span>
        </div>
      );
    };

    const { container, getByTestId } = render(() => <TestComponent />);
    const input = container.querySelector('input') as HTMLInputElement;

    fireEvent.input(input, { target: { value: 'Test' } });

    expect(getByTestId('output').textContent).toBe('Test');
  });

  it('is disabled when disabled prop is true', () => {
    const { container } = render(() => <TextField disabled />);
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.disabled).toBe(true);
    expect(container.querySelector('.textfield--disabled')).toBeInTheDocument();
  });

  it('applies compact size class', () => {
    const { container } = render(() => <TextField size="compact" />);
    expect(container.querySelector('.textfield--compact')).toBeInTheDocument();
  });

  it('shows character count when showCount and maxLength are set', () => {
    const { container } = render(() => (
      <TextField value="Hello" maxLength={10} showCount />
    ));
    const count = container.querySelector('.textfield__count');
    expect(count).toBeInTheDocument();
    expect(count?.textContent).toBe('5/10');
  });

  it('updates character count as user types', () => {
    const TestComponent = () => {
      const [value, setValue] = createSignal('');
      return <TextField value={value()} onChange={setValue} maxLength={20} showCount />;
    };

    const { container } = render(() => <TestComponent />);
    const input = container.querySelector('input') as HTMLInputElement;

    fireEvent.input(input, { target: { value: 'Testing' } });

    const count = container.querySelector('.textfield__count');
    expect(count?.textContent).toBe('7/20');
  });

  it('shows clear button when clearable and has value', () => {
    const { container } = render(() => (
      <TextField value="Test" clearable />
    ));
    expect(container.querySelector('.textfield__clear')).toBeInTheDocument();
  });

  it('does not show clear button when clearable but no value', () => {
    const { container } = render(() => (
      <TextField clearable />
    ));
    expect(container.querySelector('.textfield__clear')).not.toBeInTheDocument();
  });

  it('does not show clear button when disabled', () => {
    const { container } = render(() => (
      <TextField value="Test" clearable disabled />
    ));
    expect(container.querySelector('.textfield__clear')).not.toBeInTheDocument();
  });

  it('clears value when clear button is clicked', () => {
    const TestComponent = () => {
      const [value, setValue] = createSignal('Test value');
      return <TextField value={value()} onChange={setValue} clearable />;
    };

    const { container } = render(() => <TestComponent />);
    const clearButton = container.querySelector('.textfield__clear') as HTMLButtonElement;

    fireEvent.click(clearButton);

    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.value).toBe('');
  });

  it('renders prefix', () => {
    const { container } = render(() => (
      <TextField prefix="$" />
    ));
    const prefix = container.querySelector('.textfield__prefix');
    expect(prefix).toBeInTheDocument();
    expect(prefix?.textContent).toBe('$');
  });

  it('renders prefix as element', () => {
    const { container } = render(() => (
      <TextField prefix={<BsSearch />} />
    ));
    expect(container.querySelector('.textfield__prefix')).toBeInTheDocument();
  });

  it('renders suffix', () => {
    const { container } = render(() => (
      <TextField suffix="kg" />
    ));
    const suffix = container.querySelector('.textfield__suffix');
    expect(suffix).toBeInTheDocument();
    expect(suffix?.textContent).toBe('kg');
  });

  it('renders suffix as element', () => {
    const { container } = render(() => (
      <TextField suffix={<BsSearch />} />
    ));
    expect(container.querySelector('.textfield__suffix')).toBeInTheDocument();
  });

  it('renders with different input types', () => {
    const types: Array<'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search'> =
      ['text', 'password', 'email', 'number', 'tel', 'url', 'search'];

    types.forEach(type => {
      const { container } = render(() => <TextField type={type} />);
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input.type).toBe(type);
    });
  });

  it('respects maxLength attribute', () => {
    const { container } = render(() => <TextField maxLength={5} />);
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.maxLength).toBe(5);
  });

  it('links label to input with id', () => {
    const { container } = render(() => (
      <TextField label="Username" id="username-input" />
    ));
    const label = container.querySelector('label') as HTMLLabelElement;
    const input = container.querySelector('input') as HTMLInputElement;
    expect(label.htmlFor).toBe('username-input');
    expect(input.id).toBe('username-input');
  });

  it('links label to input with name when no id', () => {
    const { container } = render(() => (
      <TextField label="Email" name="user-email" />
    ));
    const label = container.querySelector('label') as HTMLLabelElement;
    const input = container.querySelector('input') as HTMLInputElement;
    expect(label.htmlFor).toBe('user-email');
    expect(input.id).toBe('user-email');
  });

  it('applies custom class', () => {
    const { container } = render(() => <TextField class="custom-class" />);
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('applies input class modifiers with prefix', () => {
    const { container } = render(() => <TextField prefix="$" />);
    expect(container.querySelector('.textfield__input--with-prefix')).toBeInTheDocument();
  });

  it('applies input class modifiers with suffix', () => {
    const { container } = render(() => <TextField suffix="kg" />);
    expect(container.querySelector('.textfield__input--with-suffix')).toBeInTheDocument();
  });

  it('applies input class modifiers with clearable', () => {
    const { container } = render(() => <TextField value="test" clearable />);
    expect(container.querySelector('.textfield__input--with-suffix')).toBeInTheDocument();
  });

  it('applies input class modifiers with showCount', () => {
    const { container } = render(() => <TextField maxLength={10} showCount />);
    expect(container.querySelector('.textfield__input--with-suffix')).toBeInTheDocument();
  });
});
