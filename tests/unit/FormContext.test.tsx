import { render } from '@solidjs/testing-library';
import { describe, it, expect, vi } from 'vitest';
import { FormProvider, useFormContext } from '../../src/contexts/FormContext';
import { useForm } from '../../src/utils/useForm';

describe('FormContext', () => {
  describe('FormProvider', () => {
    it('provides form context to children', () => {
      let contextForm: any;

      function TestChild() {
        const { form: formFromContext } = useFormContext();
        contextForm = formFromContext;
        return <div>Child</div>;
      }

      render(() => {
        const form = useForm({
          initialValues: { name: '' },
          onSubmit: vi.fn(),
        });

        return (
          <FormProvider form={form}>
            <TestChild />
          </FormProvider>
        );
      });

      expect(contextForm).toBeDefined();
      expect(contextForm.values).toEqual({ name: '' });
    });

    it('provides registerField and unregisterField functions', () => {
      let registerField: any;
      let unregisterField: any;

      function TestChild() {
        const context = useFormContext();
        registerField = context.registerField;
        unregisterField = context.unregisterField;
        return <div>Child</div>;
      }

      render(() => {
        const form = useForm({
          initialValues: { name: '' },
          onSubmit: vi.fn(),
        });

        return (
          <FormProvider form={form}>
            <TestChild />
          </FormProvider>
        );
      });

      expect(typeof registerField).toBe('function');
      expect(typeof unregisterField).toBe('function');
    });

    it('allows multiple children to access context', () => {
      let child1Form: any;
      let child2Form: any;

      function Child1() {
        const { form } = useFormContext();
        child1Form = form;
        return <div>Child 1</div>;
      }

      function Child2() {
        const { form } = useFormContext();
        child2Form = form;
        return <div>Child 2</div>;
      }

      render(() => {
        const form = useForm({
          initialValues: { name: '', email: '' },
          onSubmit: vi.fn(),
        });

        return (
          <FormProvider form={form}>
            <Child1 />
            <Child2 />
          </FormProvider>
        );
      });

      expect(child1Form).toBe(child2Form);
    });
  });

  describe('useFormContext', () => {
    it('throws error when used outside FormProvider', () => {
      function TestComponent() {
        useFormContext();
        return <div>Test</div>;
      }

      expect(() => {
        render(() => <TestComponent />);
      }).toThrow('useFormContext must be used within a FormProvider');
    });

    it('returns form from context', () => {
      let contextForm: any;

      function TestChild() {
        const { form: f } = useFormContext();
        contextForm = f;
        return <div>Child</div>;
      }

      render(() => {
        const form = useForm({
          initialValues: { username: 'test' },
          onSubmit: vi.fn(),
        });

        return (
          <FormProvider form={form}>
            <TestChild />
          </FormProvider>
        );
      });

      expect(contextForm.values.username).toBe('test');
    });
  });

  describe('Field Registration', () => {
    it('can register and unregister fields', () => {
      let register: any;
      let unregister: any;

      function TestChild() {
        const context = useFormContext();
        register = context.registerField;
        unregister = context.unregisterField;
        return <div>Child</div>;
      }

      render(() => {
        const form = useForm({
          initialValues: { name: '' },
          onSubmit: vi.fn(),
        });

        return (
          <FormProvider form={form}>
            <TestChild />
          </FormProvider>
        );
      });

      const mockElement = document.createElement('input');

      // Should not throw
      expect(() => {
        register('name', mockElement);
      }).not.toThrow();

      expect(() => {
        unregister('name');
      }).not.toThrow();
    });

    it('maintains separate field registrations', () => {
      let register: any;

      function TestChild() {
        const context = useFormContext();
        register = context.registerField;
        return <div>Child</div>;
      }

      render(() => {
        const form = useForm({
          initialValues: { name: '', email: '' },
          onSubmit: vi.fn(),
        });

        return (
          <FormProvider form={form}>
            <TestChild />
          </FormProvider>
        );
      });

      const nameInput = document.createElement('input');
      const emailInput = document.createElement('input');

      register('name', nameInput);
      register('email', emailInput);

      // Both should be registered without conflicts
      expect(() => register('name', nameInput)).not.toThrow();
      expect(() => register('email', emailInput)).not.toThrow();
    });
  });

  describe('Integration', () => {
    it('works with nested components', () => {
      let deepChildForm: any;

      function DeepChild() {
        const { form } = useFormContext();
        deepChildForm = form;
        return <div>Deep Child</div>;
      }

      function MiddleChild() {
        return (
          <div>
            <DeepChild />
          </div>
        );
      }

      render(() => {
        const form = useForm({
          initialValues: { firstName: '', lastName: '' },
          onSubmit: vi.fn(),
        });

        return (
          <FormProvider form={form}>
            <MiddleChild />
          </FormProvider>
        );
      });

      expect(deepChildForm.values.firstName).toBe('');
      expect(deepChildForm.values.lastName).toBe('');
    });

    it('form state updates are accessible in context', () => {
      let contextForm: any;

      function TestChild() {
        const { form: f } = useFormContext();
        contextForm = f;
        return <div>Count: {f.values.count}</div>;
      }

      const { getByText } = render(() => {
        const form = useForm({
          initialValues: { count: 0 },
          onSubmit: vi.fn(),
        });

        return (
          <FormProvider form={form}>
            <TestChild />
          </FormProvider>
        );
      });

      expect(getByText('Count: 0')).toBeInTheDocument();

      // Update via form
      contextForm.handleChange('count')(5);

      expect(getByText('Count: 5')).toBeInTheDocument();
    });
  });
});
