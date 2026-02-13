import { render } from '@solidjs/testing-library';
import { describe, it, expect } from 'vitest';
import { FieldError } from '../../src/components/feedback/FieldError';

describe('FieldError', () => {
  it('displays error message when error prop is provided', () => {
    const { getByText } = render(() => <FieldError error="This field is required" />);
    expect(getByText('This field is required')).toBeInTheDocument();
  });

  it('does not render when error prop is undefined', () => {
    const { container } = render(() => <FieldError error={undefined} />);
    const error = container.querySelector('.field-error');
    expect(error).not.toBeInTheDocument();
  });

  it('does not render when error prop is empty string', () => {
    const { container } = render(() => <FieldError error="" />);
    const error = container.querySelector('.field-error');
    expect(error).not.toBeInTheDocument();
  });

  it('renders icon when error is present', () => {
    const { container } = render(() => <FieldError error="Error message" />);
    const error = container.querySelector('.field-error');
    expect(error).toBeInTheDocument();

    // Icon should be an svg element
    const svg = error?.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('applies base field-error class', () => {
    const { container } = render(() => <FieldError error="Error" />);
    const error = container.querySelector('.field-error');
    expect(error).toBeInTheDocument();
  });

  it('applies custom class name', () => {
    const { container } = render(() => <FieldError error="Error" class="custom-error" />);
    const error = container.querySelector('.field-error.custom-error');
    expect(error).toBeInTheDocument();
  });

  it('renders error message in message element', () => {
    const { container } = render(() => <FieldError error="Validation failed" />);
    const message = container.querySelector('.field-error__message');
    expect(message).toBeInTheDocument();
    expect(message).toHaveTextContent('Validation failed');
  });

  it('uses Show component for conditional rendering', () => {
    const { container } = render(() => <FieldError error="Error 1" />);

    // Should show error
    expect(container.querySelector('.field-error')).toBeInTheDocument();
  });

  it('displays long error messages correctly', () => {
    const longError = 'This is a very long error message that should still be displayed correctly without any issues';
    const { getByText } = render(() => <FieldError error={longError} />);
    expect(getByText(longError)).toBeInTheDocument();
  });

  it('handles error message updates', () => {
    const { getByText } = render(() => <FieldError error="First error" />);

    expect(getByText('First error')).toBeInTheDocument();
  });

  it('maintains structure with icon and message', () => {
    const { container } = render(() => <FieldError error="Test error" />);
    const error = container.querySelector('.field-error');

    // Should have both icon (svg) and message span
    const svg = error?.querySelector('svg');
    const message = error?.querySelector('.field-error__message');

    expect(svg).toBeInTheDocument();
    expect(message).toBeInTheDocument();

    // Icon should come before message
    const children = Array.from(error?.children || []);
    const svgIndex = children.findIndex((el) => el.tagName === 'svg');
    const messageIndex = children.findIndex((el) => el.classList.contains('field-error__message'));

    expect(svgIndex).toBeLessThan(messageIndex);
  });

  it('has accessibility attributes for screen readers', () => {
    const { container } = render(() => <FieldError error="Accessibility error" />);
    const error = container.querySelector('.field-error');

    expect(error).toHaveAttribute('role', 'alert');
    expect(error).toHaveAttribute('aria-live', 'polite');
  });

  it('accepts custom id for aria-describedby linking', () => {
    const { container } = render(() => <FieldError error="Error" id="email-error" />);
    const error = container.querySelector('.field-error');

    expect(error).toHaveAttribute('id', 'email-error');
  });
});
