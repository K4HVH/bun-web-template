import { render, fireEvent } from '@solidjs/testing-library';
import { describe, it, expect, vi } from 'vitest';
import { createSignal } from 'solid-js';
import { Checkbox } from '../../src/components/Checkbox';
import { BsHeart, BsHeartFill } from 'solid-icons/bs';

describe('Checkbox', () => {
  it('renders with label', () => {
    const { getByText } = render(() => <Checkbox label="Accept terms" />);
    expect(getByText('Accept terms')).toBeInTheDocument();
  });

  it('renders without label', () => {
    const { container } = render(() => <Checkbox />);
    const checkbox = container.querySelector('input[type="checkbox"]');
    expect(checkbox).toBeInTheDocument();
  });

  it('is checked when checked prop is true', () => {
    const { container } = render(() => <Checkbox checked />);
    const checkbox = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(checkbox?.checked).toBe(true);
  });

  it('is unchecked by default', () => {
    const { container } = render(() => <Checkbox />);
    const checkbox = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(checkbox?.checked).toBe(false);
  });

  it('handles change events', () => {
    const handleChange = vi.fn();
    const { container } = render(() => <Checkbox onChange={handleChange} />);
    const checkbox = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('toggles checked state on click', () => {
    const TestComponent = () => {
      const [checked, setChecked] = createSignal(false);
      return <Checkbox checked={checked()} onChange={(e) => setChecked(e.currentTarget.checked)} />;
    };
    const { container } = render(() => <TestComponent />);
    const checkbox = container.querySelector('input[type="checkbox"]') as HTMLInputElement;

    expect(checkbox.checked).toBe(false);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);
  });

  it('is disabled when disabled prop is true', () => {
    const { container } = render(() => <Checkbox disabled />);
    const checkbox = container.querySelector('input[type="checkbox"]');
    expect(checkbox).toBeDisabled();
  });

  it('has disabled attribute when disabled', () => {
    const { container } = render(() => <Checkbox disabled />);
    const checkbox = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(checkbox.disabled).toBe(true);
    expect(checkbox.hasAttribute('disabled')).toBe(true);
  });

  it('applies compact size class', () => {
    const { container } = render(() => <Checkbox size="compact" />);
    const label = container.querySelector('.checkbox--compact');
    expect(label).toBeInTheDocument();
  });

  it('shows indeterminate state', () => {
    const { container } = render(() => <Checkbox indeterminate />);
    const checkbox = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(checkbox?.indeterminate).toBe(true);
  });

  it('renders with custom icons', () => {
    const { container } = render(() => (
      <Checkbox iconUnchecked={BsHeart} iconChecked={BsHeartFill} />
    ));
    const checkbox = container.querySelector('.checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  it('renders checked state with custom icon', () => {
    const { container } = render(() => (
      <Checkbox checked iconUnchecked={BsHeart} iconChecked={BsHeartFill} />
    ));
    const checkbox = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(checkbox?.checked).toBe(true);
  });
});
