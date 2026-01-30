import { Component, JSX, splitProps, Show } from 'solid-js';
import { Spinner } from './Spinner';
import '../styles/components/Button.css';

interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'subtle' | 'danger';
  size?: 'compact' | 'normal' | 'spacious';
  loading?: boolean;
  children?: JSX.Element;
}

export const Button: Component<ButtonProps> = (props) => {
  const [local, rest] = splitProps(props, [
    'variant',
    'size',
    'loading',
    'disabled',
    'children',
    'class',
  ]);

  const variant = () => local.variant ?? 'primary';
  const size = () => local.size ?? 'normal';

  const spinnerSize = () => {
    if (size() === 'compact') return 'sm';
    if (size() === 'spacious') return 'lg';
    return 'normal';
  };

  const classNames = () => {
    const classes = ['button'];

    classes.push(`button--${variant()}`);

    if (size() !== 'normal') {
      classes.push(`button--${size()}`);
    }

    if (local.loading) {
      classes.push('button--loading');
    }

    if (local.class) {
      classes.push(local.class);
    }

    return classes.join(' ');
  };

  return (
    <button
      class={classNames()}
      disabled={local.disabled || local.loading}
      {...rest}
    >
      <Show when={local.loading}>
        <Spinner size={spinnerSize()} />
      </Show>
      {local.children}
    </button>
  );
};
