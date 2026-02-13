import { Component, createSignal, For, Show } from 'solid-js';
import { Form } from '../../../components/feedback/Form';
import { FormField } from '../../../components/feedback/FormField';
import { TextField } from '../../../components/inputs/TextField';
import { Checkbox } from '../../../components/inputs/Checkbox';
import { Button } from '../../../components/inputs/Button';
import { Card, CardHeader } from '../../../components/surfaces/Card';
import { Combobox } from '../../../components/inputs/Combobox';
import { RadioGroup } from '../../../components/inputs/RadioGroup';
import { Slider } from '../../../components/inputs/Slider';
import { useForm, FormErrors } from '../../../utils/useForm';
import { FormProvider, useFormContext } from '../../../contexts/FormContext';
import { useFormArray } from '../../../utils/useFormArray';
import {
  commonValidators,
  composeValidators,
  confirmPasswordValidator,
  dependentValidator
} from '../../../utils/validators';
import { BsPlus, BsTrash } from 'solid-icons/bs';

// ============================================================================
// Example 1: Complete Form with All Phase 1 & 2 Features
// ============================================================================

interface BasicFormValues {
  email: string;
  username: string;
  password: string;
  bio: string;
  age: number;
  theme: string;
  plan: string;
  terms: boolean;
  notifications: boolean;
}

const BasicFormExample: Component = () => {
  const [submitResult, setSubmitResult] = createSignal<string>('');

  const form = useForm<BasicFormValues>({
    initialValues: {
      email: '',
      username: '',
      password: '',
      bio: '',
      age: 0,
      theme: '',
      plan: '',
      terms: false,
      notifications: false,
    },
    validate: (values) => {
      const errors: FormErrors<BasicFormValues> = {};

      if (!values.email) {
        errors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = 'Invalid email format';
      }

      if (!values.username) {
        errors.username = 'Username is required';
      } else if (values.username.length < 3) {
        errors.username = 'Username must be at least 3 characters';
      }

      if (!values.password) {
        errors.password = 'Password is required';
      } else if (values.password.length < 8) {
        errors.password = 'Password must be at least 8 characters';
      }

      if (values.age < 18) {
        errors.age = 'You must be at least 18 years old';
      }

      if (!values.theme) {
        errors.theme = 'Please select a theme';
      }

      if (!values.plan) {
        errors.plan = 'Please select a plan';
      }

      if (!values.terms) {
        errors.terms = 'You must accept the terms and conditions';
      }

      if (!values.notifications) {
        errors.notifications = 'You must enable notifications';
      }

      return errors;
    },
    onSubmit: async (values) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitResult('Form submitted successfully!');
      console.log('Submitted:', values);
    },
  });

  return (
    <Card>
      <CardHeader title="Complete Form Example" />

      <Form onSubmit={form.handleSubmit}>
        <FormField
          label="Email"
          error={form.errors.email}
          required
          helpText="We'll never share your email with anyone"
        >
          <TextField
            name="email"
            type="email"
            value={form.values.email}
            onChange={form.handleChange('email')}
            onBlur={form.handleBlur('email')}
            invalid={!!form.errors.email}
            placeholder="you@example.com"
          />
        </FormField>

        <FormField
          label="Username"
          error={form.errors.username}
          required
          helpText="Choose a unique username (3+ characters)"
        >
          <TextField
            name="username"
            value={form.values.username}
            onChange={form.handleChange('username')}
            onBlur={form.handleBlur('username')}
            invalid={!!form.errors.username}
            placeholder="Choose a username"
            showCount
            maxLength={20}
          />
        </FormField>

        <FormField label="Password" error={form.errors.password} required>
          <TextField
            name="password"
            type="password"
            value={form.values.password}
            onChange={form.handleChange('password')}
            onBlur={form.handleBlur('password')}
            invalid={!!form.errors.password}
          />
        </FormField>

        <FormField label="Bio" error={form.errors.bio} helpText="Tell us about yourself (optional)">
          <TextField
            name="bio"
            multiline
            value={form.values.bio}
            onChange={form.handleChange('bio')}
            onBlur={form.handleBlur('bio')}
            placeholder="Tell us about yourself"
            maxLength={200}
            showCount
          />
        </FormField>

        <FormField label="Age" error={form.errors.age} required helpText="You must be at least 18">
          <Slider
            name="age"
            value={form.values.age}
            onChange={form.handleChange('age')}
            onBlur={form.handleBlur('age')}
            min={0}
            max={100}
            showTooltip
          />
        </FormField>

        <FormField label="Theme" error={form.errors.theme} required>
          <RadioGroup
            name="theme"
            options={[
              { value: 'light', label: 'Light Mode' },
              { value: 'dark', label: 'Dark Mode' },
              { value: 'auto', label: 'Auto' },
            ]}
            value={form.values.theme}
            onChange={form.handleChange('theme')}
          />
        </FormField>

        <FormField label="Plan" error={form.errors.plan} required>
          <Combobox
            name="plan"
            options={[
              { value: 'free', label: 'Free' },
              { value: 'pro', label: 'Pro' },
              { value: 'enterprise', label: 'Enterprise' },
            ]}
            value={form.values.plan}
            onChange={form.handleChange('plan')}
            onBlur={form.handleBlur('plan')}
            placeholder="Select a plan"
            invalid={!!form.errors.plan}
          />
        </FormField>

        <FormField error={form.errors.terms}>
          <Checkbox
            name="terms"
            checked={form.values.terms}
            onChange={(e) => form.handleChange('terms')(e.currentTarget.checked)}
            onBlur={form.handleBlur('terms')}
            label="I accept the terms and conditions"
            invalid={!!form.errors.terms}
          />
        </FormField>

        <FormField error={form.errors.notifications}>
          <Checkbox
            name="notifications"
            checked={form.values.notifications}
            onChange={(e) => form.handleChange('notifications')(e.currentTarget.checked)}
            onBlur={form.handleBlur('notifications')}
            label="Enable notifications"
            invalid={!!form.errors.notifications}
          />
        </FormField>

        <div style={{
          display: 'flex',
          gap: 'var(--g-spacing)',
          'align-items': 'center',
          'margin-top': 'var(--g-spacing)'
        }}>
          <Button type="submit" variant="primary" loading={form.isSubmitting}>
            Submit
          </Button>
          <Button type="button" variant="secondary" onClick={() => form.reset()}>
            Reset
          </Button>
          <Show when={form.isDirty}>
            <span style={{
              color: 'var(--color-warning)',
              'font-size': 'var(--font-size-sm)'
            }}>
              ⚠️ Unsaved changes
            </span>
          </Show>
        </div>

        <Show when={submitResult()}>
          <div style={{
            padding: 'var(--g-spacing)',
            'background-color': 'var(--color-success)',
            'border-radius': 'var(--g-radius)',
            'margin-top': 'var(--g-spacing)',
          }}>
            {submitResult()}
          </div>
        </Show>
      </Form>
    </Card>
  );
};

// ============================================================================
// Example 2: Field-Level Validators
// ============================================================================

interface FieldValidatorFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const FieldValidatorExample: Component = () => {
  const [result, setResult] = createSignal('');

  const form = useForm<FieldValidatorFormValues>({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    fieldValidators: [
      composeValidators('email',
        commonValidators.required('Email is required'),
        commonValidators.email('Please enter a valid email')
      ),
      composeValidators('password',
        commonValidators.required('Password is required'),
        commonValidators.minLength(8, 'Password must be at least 8 characters'),
        commonValidators.pattern(/[A-Z]/, 'Must contain at least one uppercase letter'),
        commonValidators.pattern(/[0-9]/, 'Must contain at least one number')
      ),
      confirmPasswordValidator('confirmPassword', 'password'),
    ],
    onSubmit: async (values) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setResult('✅ Field-level validation passed!');
    },
  });

  return (
    <Card>
      <CardHeader
        title="Field-Level Validators"
      />

      <Form onSubmit={form.handleSubmit}>
        <FormField label="Email" error={form.errors.email} required>
          <TextField
            type="email"
            value={form.values.email}
            onChange={form.handleChange('email')}
            onBlur={form.handleBlur('email')}
            invalid={!!form.errors.email}
          />
        </FormField>

        <FormField
          label="Password"
          error={form.errors.password}
          required
          helpText="Must be 8+ chars with uppercase and number"
        >
          <TextField
            type="password"
            value={form.values.password}
            onChange={form.handleChange('password')}
            onBlur={form.handleBlur('password')}
            invalid={!!form.errors.password}
          />
        </FormField>

        <FormField label="Confirm Password" error={form.errors.confirmPassword} required>
          <TextField
            type="password"
            value={form.values.confirmPassword}
            onChange={form.handleChange('confirmPassword')}
            onBlur={form.handleBlur('confirmPassword')}
            invalid={!!form.errors.confirmPassword}
          />
        </FormField>

        <div style={{ display: 'flex', gap: 'var(--g-spacing)', 'margin-top': 'var(--g-spacing)' }}>
          <Button type="submit" loading={form.isSubmitting}>Submit</Button>
          <Button type="button" variant="secondary" onClick={() => form.reset()}>Reset</Button>
        </div>

        <Show when={result()}>
          <div style={{
            padding: 'var(--g-spacing)',
            'background-color': 'var(--color-success)',
            'border-radius': 'var(--g-radius)',
            'margin-top': 'var(--g-spacing)',
          }}>
            {result()}
          </div>
        </Show>
      </Form>
    </Card>
  );
};

// ============================================================================
// Example 3: Async Validation
// ============================================================================

interface AsyncFormValues {
  username: string;
  email: string;
}

const AsyncValidationExample: Component = () => {
  const [result, setResult] = createSignal('');

  // Simulate async username check
  const checkUsernameAvailable = async (username: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const taken = ['admin', 'user', 'test', 'demo'];
    return !taken.includes(username.toLowerCase());
  };

  const form = useForm<AsyncFormValues>({
    initialValues: {
      username: '',
      email: '',
    },
    validate: (values) => {
      const errors: FormErrors<AsyncFormValues> = {};
      if (!values.username) errors.username = 'Username is required';
      if (!values.email) errors.email = 'Email is required';
      return errors;
    },
    validateAsync: async (values) => {
      const errors: FormErrors<AsyncFormValues> = {};

      if (values.username && values.username.length >= 3) {
        const available = await checkUsernameAvailable(values.username);
        if (!available) {
          errors.username = '❌ Username already taken (try: admin, user, test, demo)';
        }
      }

      return errors;
    },
    asyncDebounceMs: 500,
    onSubmit: async (values) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setResult('✅ Async validation passed!');
    },
  });

  return (
    <Card>
      <CardHeader
        title="Async Validation"
      />

      <Form onSubmit={form.handleSubmit}>
        <FormField
          label="Username"
          error={form.errors.username}
          required
          helpText="Try typing: admin, user, test, or demo"
        >
          <TextField
            value={form.values.username}
            onChange={form.handleChange('username')}
            onBlur={form.handleBlur('username')}
            invalid={!!form.errors.username}
            suffix={form.isValidating ? '⏳' : ''}
          />
        </FormField>

        <FormField label="Email" error={form.errors.email} required>
          <TextField
            type="email"
            value={form.values.email}
            onChange={form.handleChange('email')}
            onBlur={form.handleBlur('email')}
            invalid={!!form.errors.email}
          />
        </FormField>

        <div style={{ display: 'flex', gap: 'var(--g-spacing)', 'align-items': 'center', 'margin-top': 'var(--g-spacing)' }}>
          <Button type="submit" loading={form.isSubmitting}>Submit</Button>
          <Show when={form.isValidating}>
            <span style={{ color: 'var(--color-accent)', 'font-size': 'var(--font-size-sm)' }}>
              ⏳ Validating...
            </span>
          </Show>
        </div>

        <Show when={result()}>
          <div style={{
            padding: 'var(--g-spacing)',
            'background-color': 'var(--color-success)',
            'border-radius': 'var(--g-radius)',
            'margin-top': 'var(--g-spacing)',
          }}>
            {result()}
          </div>
        </Show>
      </Form>
    </Card>
  );
};

// ============================================================================
// Example 4: Dynamic Array Fields with useFormArray
// ============================================================================

interface TodoFormValues {
  title: string;
  todos: string[];
}

const ArrayFieldsExample: Component = () => {
  const [result, setResult] = createSignal('');

  const form = useForm<TodoFormValues>({
    initialValues: {
      title: '',
      todos: [''],
    },
    validate: (values) => {
      const errors: FormErrors<TodoFormValues> = {};
      if (!values.title) errors.title = 'Title is required';
      return errors;
    },
    onSubmit: async (values) => {
      const validTodos = values.todos.filter(t => t.trim());
      await new Promise((resolve) => setTimeout(resolve, 500));
      setResult(`✅ Submitted: "${values.title}" with ${validTodos.length} todos`);
    },
  });

  const todos = useFormArray<TodoFormValues, string>({
    form,
    name: 'todos',
  });

  return (
    <Card>
      <CardHeader
        title="Dynamic Array Fields"
      />

      <Form onSubmit={form.handleSubmit}>
        <FormField label="Todo List Title" error={form.errors.title} required>
          <TextField
            value={form.values.title}
            onChange={form.handleChange('title')}
            onBlur={form.handleBlur('title')}
            invalid={!!form.errors.title}
            placeholder="e.g., Shopping List"
          />
        </FormField>

        <div style={{ 'margin-top': 'var(--g-spacing-lg)' }}>
          <label style={{
            display: 'block',
            'margin-bottom': 'var(--g-spacing)',
            'font-weight': '500',
            color: 'var(--g-text-primary)',
          }}>
            Todo Items
          </label>

          <For each={todos.fields}>
            {(todo, index) => (
              <div style={{
                display: 'flex',
                gap: 'var(--g-spacing)',
                'margin-bottom': 'var(--g-spacing)'
              }}>
                <div style={{ flex: 1 }}>
                  <TextField
                    value={todo}
                    onChange={(val) => {
                      const newTodos = [...todos.fields];
                      newTodos[index()] = val;
                      form.setFieldValue('todos', newTodos);
                    }}
                    placeholder={`Todo #${index() + 1}`}
                  />
                </div>
                <Button
                  type="button"
                  variant="danger"
                  size="compact"
                  onClick={() => todos.remove(index())}
                  disabled={todos.fields.length === 1}
                  icon={BsTrash}
                />
                <Show when={index() > 0}>
                  <Button
                    type="button"
                    variant="secondary"
                    size="compact"
                    onClick={() => todos.move(index(), index() - 1)}
                  >
                    ↑
                  </Button>
                </Show>
                <Show when={index() < todos.fields.length - 1}>
                  <Button
                    type="button"
                    variant="secondary"
                    size="compact"
                    onClick={() => todos.move(index(), index() + 1)}
                  >
                    ↓
                  </Button>
                </Show>
              </div>
            )}
          </For>

          <Button
            type="button"
            variant="secondary"
            size="compact"
            onClick={() => todos.append('')}
            icon={BsPlus}
          >
            Add Todo
          </Button>
        </div>

        <div style={{ display: 'flex', gap: 'var(--g-spacing)', 'margin-top': 'var(--g-spacing-lg)' }}>
          <Button type="submit" loading={form.isSubmitting}>Submit</Button>
          <Button type="button" variant="secondary" onClick={() => form.reset()}>Reset</Button>
        </div>

        <Show when={result()}>
          <div style={{
            padding: 'var(--g-spacing)',
            'background-color': 'var(--color-success)',
            'border-radius': 'var(--g-radius)',
            'margin-top': 'var(--g-spacing)',
          }}>
            {result()}
          </div>
        </Show>
      </Form>
    </Card>
  );
};

// ============================================================================
// Example 5: FormContext Provider
// ============================================================================

interface ContextFormValues {
  firstName: string;
  lastName: string;
  email: string;
}

// Child component that uses context
const ContextFormFields: Component = () => {
  const { form } = useFormContext<ContextFormValues>();

  return (
    <>
      <FormField label="First Name" error={form.errors.firstName} required>
        <TextField
          value={form.values.firstName}
          onChange={form.handleChange('firstName')}
          onBlur={form.handleBlur('firstName')}
          invalid={!!form.errors.firstName}
        />
      </FormField>

      <FormField label="Last Name" error={form.errors.lastName} required>
        <TextField
          value={form.values.lastName}
          onChange={form.handleChange('lastName')}
          onBlur={form.handleBlur('lastName')}
          invalid={!!form.errors.lastName}
        />
      </FormField>

      <FormField label="Email" error={form.errors.email} required>
        <TextField
          type="email"
          value={form.values.email}
          onChange={form.handleChange('email')}
          onBlur={form.handleBlur('email')}
          invalid={!!form.errors.email}
        />
      </FormField>
    </>
  );
};

const FormContextExample: Component = () => {
  const [result, setResult] = createSignal('');

  const form = useForm<ContextFormValues>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    validate: (values) => {
      const errors: FormErrors<ContextFormValues> = {};
      if (!values.firstName) errors.firstName = 'Required';
      if (!values.lastName) errors.lastName = 'Required';
      if (!values.email) errors.email = 'Required';
      return errors;
    },
    onSubmit: async (values) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setResult(`✅ Context form submitted: ${values.firstName} ${values.lastName}`);
    },
  });

  return (
    <Card>
      <CardHeader
        title="FormContext Provider"
      />

      <FormProvider form={form}>
        <Form onSubmit={form.handleSubmit}>
          <ContextFormFields />

          <div style={{ display: 'flex', gap: 'var(--g-spacing)', 'margin-top': 'var(--g-spacing)' }}>
            <Button type="submit" loading={form.isSubmitting}>Submit</Button>
          </div>

          <Show when={result()}>
            <div style={{
              padding: 'var(--g-spacing)',
              'background-color': 'var(--color-success)',
              'border-radius': 'var(--g-radius)',
              'margin-top': 'var(--g-spacing)',
            }}>
              {result()}
            </div>
          </Show>
        </Form>
      </FormProvider>
    </Card>
  );
};

// ============================================================================
// Example 6: Enhanced Reset
// ============================================================================

interface ResetFormValues {
  name: string;
  email: string;
  role: string;
}

const EnhancedResetExample: Component = () => {
  const [result, setResult] = createSignal('');

  const form = useForm<ResetFormValues>({
    initialValues: {
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user',
    },
    onSubmit: async (values) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setResult('✅ Submitted!');
    },
  });

  return (
    <Card>
      <CardHeader
        title="Enhanced Reset"
      />

      <Form onSubmit={form.handleSubmit}>
        <FormField label="Name">
          <TextField
            value={form.values.name}
            onChange={form.handleChange('name')}
          />
        </FormField>

        <FormField label="Email">
          <TextField
            type="email"
            value={form.values.email}
            onChange={form.handleChange('email')}
          />
        </FormField>

        <FormField label="Role">
          <TextField
            value={form.values.role}
            onChange={form.handleChange('role')}
          />
        </FormField>

        <div style={{
          display: 'flex',
          gap: 'var(--g-spacing)',
          'flex-wrap': 'wrap',
          'margin-top': 'var(--g-spacing)'
        }}>
          <Button type="submit" loading={form.isSubmitting}>Submit</Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => form.reset()}
          >
            Reset to Original
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => form.reset({
              name: 'Jane Smith',
              email: 'jane@example.com',
              role: 'admin'
            })}
          >
            Reset to Jane (Admin)
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => form.reset({ role: 'moderator' })}
          >
            Reset Role Only
          </Button>
        </div>

        <Show when={result()}>
          <div style={{
            padding: 'var(--g-spacing)',
            'background-color': 'var(--color-success)',
            'border-radius': 'var(--g-radius)',
            'margin-top': 'var(--g-spacing)',
          }}>
            {result()}
          </div>
        </Show>
      </Form>
    </Card>
  );
};

// ============================================================================
// Main Demo Component
// ============================================================================

const FormDemo: Component = () => {
  return (
    <div style={{ display: 'flex', 'flex-direction': 'column', gap: 'var(--g-spacing-lg)' }}>
      <h2>Form Management</h2>

      <BasicFormExample />
      <FieldValidatorExample />
      <AsyncValidationExample />
      <ArrayFieldsExample />
      <FormContextExample />
      <EnhancedResetExample />
    </div>
  );
};

export default FormDemo;
