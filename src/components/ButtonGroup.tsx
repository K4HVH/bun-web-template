import { Component, JSX, splitProps, children } from 'solid-js';
import '../styles/components/ButtonGroup.css';

interface ButtonGroupProps extends JSX.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  children?: JSX.Element;
}

export const ButtonGroup: Component<ButtonGroupProps> = (props) => {
  const [local, rest] = splitProps(props, [
    'orientation',
    'children',
    'class',
  ]);

  const orientation = () => local.orientation ?? 'horizontal';

  const classNames = () => {
    const classes = ['button-group'];

    if (orientation() === 'vertical') {
      classes.push('button-group--vertical');
    }

    if (local.class) {
      classes.push(local.class);
    }

    return classes.join(' ');
  };

  return (
    <div class={classNames()} {...rest}>
      {local.children}
    </div>
  );
};
