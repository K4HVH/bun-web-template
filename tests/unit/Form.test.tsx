import { render, fireEvent } from '@solidjs/testing-library';
import { describe, it, expect, vi } from 'vitest';
import { Form } from '../../src/components/feedback/Form';

describe('Form', () => {
  it('renders with children', () => {
    const { getByText } = render(() => (
      <Form>
        <div>Form content</div>
      </Form>
    ));
    expect(getByText('Form content')).toBeInTheDocument();
  });

  it('applies base form class', () => {
    const { container } = render(() => <Form>Content</Form>);
    const form = container.querySelector('.form');
    expect(form).toBeInTheDocument();
  });

  it('applies custom class name', () => {
    const { container } = render(() => <Form class="custom-form">Content</Form>);
    const form = container.querySelector('.form.custom-form');
    expect(form).toBeInTheDocument();
  });

  it('prevents default submit behavior', () => {
    const handleSubmit = vi.fn();
    const { getByRole } = render(() => (
      <Form onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </Form>
    ));

    const form = getByRole('button').closest('form');
    expect(form).toBeInTheDocument();

    const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
    const preventDefaultSpy = vi.spyOn(submitEvent, 'preventDefault');

    form?.dispatchEvent(submitEvent);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('calls onSubmit handler when form is submitted', async () => {
    const handleSubmit = vi.fn();
    const { getByRole } = render(() => (
      <Form onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </Form>
    ));

    const button = getByRole('button');
    await fireEvent.click(button);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it('handles async onSubmit', async () => {
    let resolveSubmit: () => void;
    const submitPromise = new Promise<void>((resolve) => {
      resolveSubmit = resolve;
    });

    const handleSubmit = vi.fn(() => submitPromise);
    const { getByRole } = render(() => (
      <Form onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </Form>
    ));

    const button = getByRole('button');
    const clickPromise = fireEvent.click(button);

    expect(handleSubmit).toHaveBeenCalledTimes(1);

    resolveSubmit!();
    await clickPromise;
  });

  it('works without onSubmit handler', () => {
    const { getByRole } = render(() => (
      <Form>
        <button type="submit">Submit</button>
      </Form>
    ));

    const button = getByRole('button');
    expect(() => fireEvent.click(button)).not.toThrow();
  });

  it('forwards additional props to form element', () => {
    const { container } = render(() => (
      <Form data-testid="test-form" aria-label="Test form">
        Content
      </Form>
    ));

    const form = container.querySelector('.form');
    expect(form).toHaveAttribute('data-testid', 'test-form');
    expect(form).toHaveAttribute('aria-label', 'Test form');
  });

  it('receives submit event in onSubmit handler', async () => {
    const handleSubmit = vi.fn();
    const { getByRole } = render(() => (
      <Form onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </Form>
    ));

    const button = getByRole('button');
    await fireEvent.click(button);

    expect(handleSubmit).toHaveBeenCalledWith(expect.any(Object));
    const event = handleSubmit.mock.calls[0][0];
    expect(event).toBeInstanceOf(Event);
    expect(event.type).toBe('submit');
  });
});
