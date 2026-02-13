import { render, fireEvent } from '@solidjs/testing-library';
import { describe, it, expect, vi } from 'vitest';
import { createSignal } from 'solid-js';
import { useForm, UseFormOptions } from '../../src/utils/useForm';

// Test component wrapper to test the hook
function TestFormComponent<T extends Record<string, any>>(props: {
  options: UseFormOptions<T>;
  onFormReturn?: (form: ReturnType<typeof useForm<T>>) => void;
}) {
  const form = useForm(props.options);

  // Call callback with form instance for assertions
  props.onFormReturn?.(form);

  return (
    <form onSubmit={form.handleSubmit}>
      <div data-testid="values">{JSON.stringify(form.values)}</div>
      <div data-testid="errors">{JSON.stringify(form.errors)}</div>
      <div data-testid="touched">{JSON.stringify(form.touched)}</div>
      <div data-testid="isSubmitting">{String(form.isSubmitting)}</div>
      <div data-testid="hasSubmitted">{String(form.hasSubmitted)}</div>
      <button type="submit" data-testid="submit-btn">Submit</button>
    </form>
  );
}

describe('useForm', () => {
  it('initializes with initial values', () => {
    const initialValues = { username: 'john', email: 'john@example.com' };
    const { getByTestId } = render(() => (
      <TestFormComponent options={{ initialValues, onSubmit: vi.fn() }} />
    ));

    const values = JSON.parse(getByTestId('values').textContent || '{}');
    expect(values).toEqual(initialValues);
  });

  it('initializes with empty errors', () => {
    const { getByTestId } = render(() => (
      <TestFormComponent options={{ initialValues: { name: '' }, onSubmit: vi.fn() }} />
    ));

    const errors = JSON.parse(getByTestId('errors').textContent || '{}');
    expect(errors).toEqual({});
  });

  it('initializes with empty touched state', () => {
    const { getByTestId } = render(() => (
      <TestFormComponent options={{ initialValues: { name: '' }, onSubmit: vi.fn() }} />
    ));

    const touched = JSON.parse(getByTestId('touched').textContent || '{}');
    expect(touched).toEqual({});
  });

  it('initializes isSubmitting as false', () => {
    const { getByTestId } = render(() => (
      <TestFormComponent options={{ initialValues: { name: '' }, onSubmit: vi.fn() }} />
    ));

    expect(getByTestId('isSubmitting').textContent).toBe('false');
  });

  it('initializes hasSubmitted as false', () => {
    const { getByTestId } = render(() => (
      <TestFormComponent options={{ initialValues: { name: '' }, onSubmit: vi.fn() }} />
    ));

    expect(getByTestId('hasSubmitted').textContent).toBe('false');
  });

  it('handleChange updates values', () => {
    let formInstance: any;
    const { getByTestId } = render(() => (
      <TestFormComponent
        options={{ initialValues: { name: '' }, onSubmit: vi.fn() }}
        onFormReturn={(form) => (formInstance = form)}
      />
    ));

    formInstance.handleChange('name')('John Doe');

    const values = JSON.parse(getByTestId('values').textContent || '{}');
    expect(values.name).toBe('John Doe');
  });

  it('handleBlur marks field as touched', () => {
    let formInstance: any;
    const { getByTestId } = render(() => (
      <TestFormComponent
        options={{ initialValues: { email: '' }, onSubmit: vi.fn() }}
        onFormReturn={(form) => (formInstance = form)}
      />
    ));

    formInstance.handleBlur('email')();

    const touched = JSON.parse(getByTestId('touched').textContent || '{}');
    expect(touched.email).toBe(true);
  });

  it('runs validation on submit', async () => {
    const validate = vi.fn(() => ({ name: 'Name is required' }));
    const onSubmit = vi.fn();

    const { getByTestId } = render(() => (
      <TestFormComponent options={{ initialValues: { name: '' }, validate, onSubmit }} />
    ));

    await fireEvent.click(getByTestId('submit-btn'));

    expect(validate).toHaveBeenCalled();
  });

  it('displays errors after submit', async () => {
    const validate = () => ({ name: 'Name is required' });

    const { getByTestId } = render(() => (
      <TestFormComponent
        options={{ initialValues: { name: '' }, validate, onSubmit: vi.fn() }}
      />
    ));

    // Before submit, no errors shown
    let errors = JSON.parse(getByTestId('errors').textContent || '{}');
    expect(errors).toEqual({});

    await fireEvent.click(getByTestId('submit-btn'));

    // After submit, errors shown
    errors = JSON.parse(getByTestId('errors').textContent || '{}');
    expect(errors.name).toBe('Name is required');
  });

  it('does not call onSubmit if validation fails', async () => {
    const validate = () => ({ name: 'Name is required' });
    const onSubmit = vi.fn();

    const { getByTestId } = render(() => (
      <TestFormComponent options={{ initialValues: { name: '' }, validate, onSubmit }} />
    ));

    await fireEvent.click(getByTestId('submit-btn'));

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('calls onSubmit if validation passes', async () => {
    const validate = () => ({});
    const onSubmit = vi.fn();

    const { getByTestId } = render(() => (
      <TestFormComponent options={{ initialValues: { name: 'John' }, validate, onSubmit }} />
    ));

    await fireEvent.click(getByTestId('submit-btn'));

    expect(onSubmit).toHaveBeenCalledWith({ name: 'John' });
  });

  it('sets isSubmitting to true during async submit', async () => {
    let resolveSubmit: () => void;
    const submitPromise = new Promise<void>((resolve) => {
      resolveSubmit = resolve;
    });

    const onSubmit = vi.fn(() => submitPromise);

    const { getByTestId } = render(() => (
      <TestFormComponent options={{ initialValues: { name: 'John' }, onSubmit }} />
    ));

    const clickPromise = fireEvent.click(getByTestId('submit-btn'));

    // Should be submitting
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(getByTestId('isSubmitting').textContent).toBe('true');

    resolveSubmit!();
    await clickPromise;

    // Should not be submitting anymore
    expect(getByTestId('isSubmitting').textContent).toBe('false');
  });

  it('sets hasSubmitted to true after first submit', async () => {
    const { getByTestId } = render(() => (
      <TestFormComponent options={{ initialValues: { name: 'John' }, onSubmit: vi.fn() }} />
    ));

    expect(getByTestId('hasSubmitted').textContent).toBe('false');

    await fireEvent.click(getByTestId('submit-btn'));

    expect(getByTestId('hasSubmitted').textContent).toBe('true');
  });

  it('marks all fields as touched on submit', async () => {
    const { getByTestId } = render(() => (
      <TestFormComponent
        options={{
          initialValues: { name: '', email: '', phone: '' },
          onSubmit: vi.fn(),
        }}
      />
    ));

    await fireEvent.click(getByTestId('submit-btn'));

    const touched = JSON.parse(getByTestId('touched').textContent || '{}');
    expect(touched.name).toBe(true);
    expect(touched.email).toBe(true);
    expect(touched.phone).toBe(true);
  });

  it('re-validates on change after first submit', async () => {
    let formInstance: any;
    const validate = vi.fn((values) => {
      if (!values.name) return { name: 'Required' };
      return {};
    });

    const { getByTestId } = render(() => (
      <TestFormComponent
        options={{ initialValues: { name: '' }, validate, onSubmit: vi.fn() }}
        onFormReturn={(form) => (formInstance = form)}
      />
    ));

    // First submit
    await fireEvent.click(getByTestId('submit-btn'));
    expect(validate).toHaveBeenCalledTimes(1);

    // Change value - should re-validate
    formInstance.handleChange('name')('John');
    expect(validate).toHaveBeenCalledTimes(2);

    // Errors should be cleared
    const errors = JSON.parse(getByTestId('errors').textContent || '{}');
    expect(errors).toEqual({});
  });

  it('setFieldValue updates a field value', () => {
    let formInstance: any;
    const { getByTestId } = render(() => (
      <TestFormComponent
        options={{ initialValues: { name: '' }, onSubmit: vi.fn() }}
        onFormReturn={(form) => (formInstance = form)}
      />
    ));

    formInstance.setFieldValue('name', 'Jane Doe');

    const values = JSON.parse(getByTestId('values').textContent || '{}');
    expect(values.name).toBe('Jane Doe');
  });

  it('setFieldError sets a field error', () => {
    let formInstance: any;
    const { getByTestId } = render(() => (
      <TestFormComponent
        options={{ initialValues: { name: '' }, onSubmit: vi.fn() }}
        onFormReturn={(form) => (formInstance = form)}
      />
    ));

    // Mark as submitted so errors are displayed
    formInstance.handleSubmit();

    formInstance.setFieldError('name', 'Custom error');

    const errors = JSON.parse(getByTestId('errors').textContent || '{}');
    expect(errors.name).toBe('Custom error');
  });

  it('reset clears all state', async () => {
    let formInstance: any;
    const { getByTestId } = render(() => (
      <TestFormComponent
        options={{
          initialValues: { name: 'Initial' },
          validate: () => ({ name: 'Error' }),
          onSubmit: vi.fn(),
        }}
        onFormReturn={(form) => (formInstance = form)}
      />
    ));

    // Make some changes
    formInstance.handleChange('name')('Changed');
    formInstance.handleBlur('name')();
    await fireEvent.click(getByTestId('submit-btn'));

    // Verify state changed
    let values = JSON.parse(getByTestId('values').textContent || '{}');
    expect(values.name).toBe('Changed');
    expect(getByTestId('hasSubmitted').textContent).toBe('true');

    // Reset
    formInstance.reset();

    // Verify everything is reset
    values = JSON.parse(getByTestId('values').textContent || '{}');
    const errors = JSON.parse(getByTestId('errors').textContent || '{}');
    const touched = JSON.parse(getByTestId('touched').textContent || '{}');

    expect(values.name).toBe('Initial');
    expect(errors).toEqual({});
    expect(touched).toEqual({});
    expect(getByTestId('isSubmitting').textContent).toBe('false');
    expect(getByTestId('hasSubmitted').textContent).toBe('false');
  });

  it('does not display errors before submit even if validation fails', () => {
    let formInstance: any;
    const validate = () => ({ name: 'Required' });

    const { getByTestId } = render(() => (
      <TestFormComponent
        options={{ initialValues: { name: '' }, validate, onSubmit: vi.fn() }}
        onFormReturn={(form) => (formInstance = form)}
      />
    ));

    // Change and blur without submitting
    formInstance.handleChange('name')('');
    formInstance.handleBlur('name')();

    // Errors should not be displayed yet
    const errors = JSON.parse(getByTestId('errors').textContent || '{}');
    expect(errors).toEqual({});
  });

  it('displays errors for touched fields after submit', async () => {
    const validate = () => ({ field1: 'Error 1', field2: 'Error 2' });
    let formInstance: any;

    const { getByTestId } = render(() => (
      <TestFormComponent
        options={{
          initialValues: { field1: '', field2: '' },
          validate,
          onSubmit: vi.fn(),
        }}
        onFormReturn={(form) => (formInstance = form)}
      />
    ));

    // Touch only field1
    formInstance.handleBlur('field1')();

    // Submit
    await fireEvent.click(getByTestId('submit-btn'));

    // Both errors should be shown after submit (all fields touched)
    const errors = JSON.parse(getByTestId('errors').textContent || '{}');
    expect(errors.field1).toBe('Error 1');
    expect(errors.field2).toBe('Error 2');
  });

  it('handles validation function that returns empty object', async () => {
    const validate = () => ({});
    const onSubmit = vi.fn();

    const { getByTestId } = render(() => (
      <TestFormComponent options={{ initialValues: { name: 'John' }, validate, onSubmit }} />
    ));

    await fireEvent.click(getByTestId('submit-btn'));

    expect(onSubmit).toHaveBeenCalled();
    const errors = JSON.parse(getByTestId('errors').textContent || '{}');
    expect(errors).toEqual({});
  });

  it('works without validation function', async () => {
    const onSubmit = vi.fn();

    const { getByTestId } = render(() => (
      <TestFormComponent options={{ initialValues: { name: 'John' }, onSubmit }} />
    ));

    await fireEvent.click(getByTestId('submit-btn'));

    expect(onSubmit).toHaveBeenCalledWith({ name: 'John' });
  });

  it('prevents default on submit event', async () => {
    const { getByTestId } = render(() => (
      <TestFormComponent options={{ initialValues: { name: '' }, onSubmit: vi.fn() }} />
    ));

    const form = getByTestId('submit-btn').closest('form');
    const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
    const preventDefaultSpy = vi.spyOn(submitEvent, 'preventDefault');

    form?.dispatchEvent(submitEvent);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('handles multiple rapid changes correctly', () => {
    let formInstance: any;
    const { getByTestId } = render(() => (
      <TestFormComponent
        options={{ initialValues: { name: '' }, onSubmit: vi.fn() }}
        onFormReturn={(form) => (formInstance = form)}
      />
    ));

    formInstance.handleChange('name')('A');
    formInstance.handleChange('name')('AB');
    formInstance.handleChange('name')('ABC');

    const values = JSON.parse(getByTestId('values').textContent || '{}');
    expect(values.name).toBe('ABC');
  });

  it('maintains independent state for multiple fields', () => {
    let formInstance: any;
    const { getByTestId } = render(() => (
      <TestFormComponent
        options={{
          initialValues: { username: '', email: '', phone: '' },
          onSubmit: vi.fn(),
        }}
        onFormReturn={(form) => (formInstance = form)}
      />
    ));

    formInstance.handleChange('username')('john');
    formInstance.handleChange('email')('john@example.com');
    formInstance.handleChange('phone')('555-1234');

    const values = JSON.parse(getByTestId('values').textContent || '{}');
    expect(values.username).toBe('john');
    expect(values.email).toBe('john@example.com');
    expect(values.phone).toBe('555-1234');
  });

  it('runs field-level validators', async () => {
    const fieldValidators = [
      {
        field: 'email' as const,
        validate: (value: string) => {
          if (!value.includes('@')) return 'Email must contain @';
          return undefined;
        },
      },
      {
        field: 'username' as const,
        validate: (value: string) => {
          if (value.length < 3) return 'Username too short';
          return undefined;
        },
      },
    ];

    const { getByTestId } = render(() => (
      <TestFormComponent
        options={{
          initialValues: { email: '', username: '' },
          fieldValidators,
          onSubmit: vi.fn(),
        }}
      />
    ));

    await fireEvent.click(getByTestId('submit-btn'));

    const errors = JSON.parse(getByTestId('errors').textContent || '{}');
    expect(errors.email).toBe('Email must contain @');
    expect(errors.username).toBe('Username too short');
  });

  it('field validators receive all values', async () => {
    const validateSpy = vi.fn((value, allValues) => {
      if (value !== allValues.confirmPassword) return 'Passwords must match';
      return undefined;
    });

    const fieldValidators = [
      {
        field: 'confirmPassword' as const,
        validate: validateSpy,
      },
    ];

    let formInstance: any;
    const { getByTestId } = render(() => (
      <TestFormComponent
        options={{
          initialValues: { password: 'secret', confirmPassword: 'different' },
          fieldValidators,
          onSubmit: vi.fn(),
        }}
        onFormReturn={(form) => (formInstance = form)}
      />
    ));

    await fireEvent.click(getByTestId('submit-btn'));

    expect(validateSpy).toHaveBeenCalledWith(
      'different',
      { password: 'secret', confirmPassword: 'different' }
    );
  });

  it('form-level validator can override field validators', async () => {
    const fieldValidators = [
      {
        field: 'name' as const,
        validate: () => 'Field error',
      },
    ];

    const validate = () => ({ name: 'Form error' });

    const { getByTestId } = render(() => (
      <TestFormComponent
        options={{
          initialValues: { name: '' },
          fieldValidators,
          validate,
          onSubmit: vi.fn(),
        }}
      />
    ));

    await fireEvent.click(getByTestId('submit-btn'));

    const errors = JSON.parse(getByTestId('errors').textContent || '{}');
    expect(errors.name).toBe('Form error');
  });

  it('combines field and form validators', async () => {
    const fieldValidators = [
      {
        field: 'email' as const,
        validate: (value: string) => (!value ? 'Email required' : undefined),
      },
    ];

    const validate = (values: any) => {
      const errors: any = {};
      if (!values.username) errors.username = 'Username required';
      return errors;
    };

    const { getByTestId } = render(() => (
      <TestFormComponent
        options={{
          initialValues: { email: '', username: '' },
          fieldValidators,
          validate,
          onSubmit: vi.fn(),
        }}
      />
    ));

    await fireEvent.click(getByTestId('submit-btn'));

    const errors = JSON.parse(getByTestId('errors').textContent || '{}');
    expect(errors.email).toBe('Email required');
    expect(errors.username).toBe('Username required');
  });
});
