import { Component, JSX, splitProps } from 'solid-js';
import '../styles/components/Spinner.css';

interface SpinnerProps extends JSX.HTMLAttributes<HTMLSpanElement> {
  size?: 'sm' | 'normal' | 'lg';
}

export const Spinner: Component<SpinnerProps> = (props) => {
  const [local, rest] = splitProps(props, ['size', 'class']);

  const size = () => local.size ?? 'normal';

  const classNames = () => {
    const classes = ['spinner'];

    if (size() !== 'normal') {
      classes.push(`spinner--${size()}`);
    }

    if (local.class) {
      classes.push(local.class);
    }

    return classes.join(' ');
  };

  return <span class={classNames()} {...rest} />;
};
