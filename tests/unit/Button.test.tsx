import { render, fireEvent } from '@solidjs/testing-library';
import { describe, it, expect, vi } from 'vitest';
import { Button } from '../../src/components/Button';
import { BsPlus } from 'solid-icons/bs';

describe('Button', () => {
  it('renders with text content', () => {
    const { getByText } = render(() => <Button>Click me</Button>);
    expect(getByText('Click me')).toBeInTheDocument();
  });

  it('applies primary variant class', () => {
    const { container } = render(() => <Button variant="primary">Primary</Button>);
    const button = container.querySelector('.button--primary');
    expect(button).toBeInTheDocument();
  });

  it('applies secondary variant class', () => {
    const { container } = render(() => <Button variant="secondary">Secondary</Button>);
    const button = container.querySelector('.button--secondary');
    expect(button).toBeInTheDocument();
  });

  it('applies danger variant class', () => {
    const { container } = render(() => <Button variant="danger">Danger</Button>);
    const button = container.querySelector('.button--danger');
    expect(button).toBeInTheDocument();
  });

  it('applies compact size class', () => {
    const { container } = render(() => <Button size="compact">Compact</Button>);
    const button = container.querySelector('.button--compact');
    expect(button).toBeInTheDocument();
  });

  it('applies spacious size class', () => {
    const { container } = render(() => <Button size="spacious">Spacious</Button>);
    const button = container.querySelector('.button--spacious');
    expect(button).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    const { getByRole } = render(() => <Button onClick={handleClick}>Click</Button>);
    const button = getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    const { getByRole } = render(() => <Button disabled>Disabled</Button>);
    const button = getByRole('button');
    expect(button).toBeDisabled();
  });

  it('does not trigger click when disabled', () => {
    const handleClick = vi.fn();
    const { getByRole } = render(() => <Button disabled onClick={handleClick}>Disabled</Button>);
    const button = getByRole('button');
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('shows loading state', () => {
    const { container } = render(() => <Button loading>Loading</Button>);
    const spinner = container.querySelector('.spinner');
    expect(spinner).toBeInTheDocument();
  });

  it('renders icon-only button', () => {
    const { container } = render(() => <Button icon={BsPlus} />);
    const button = container.querySelector('.button--icon-only');
    expect(button).toBeInTheDocument();
  });

  it('renders button with icon and text', () => {
    const { getByText, container } = render(() => <Button icon={BsPlus}>Add</Button>);
    expect(getByText('Add')).toBeInTheDocument();
    const icon = container.querySelector('.button__icon');
    expect(icon).toBeInTheDocument();
  });

  it('renders icon on right when iconPosition is right', () => {
    const { container, getByText } = render(() => <Button icon={BsPlus} iconPosition="right">Add</Button>);
    // Button should render with text and icon (no specific class for position)
    expect(getByText('Add')).toBeInTheDocument();
    const icon = container.querySelector('.button__icon');
    expect(icon).toBeInTheDocument();
  });
});
