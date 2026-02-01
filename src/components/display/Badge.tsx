import { Component, JSX, splitProps, Show } from 'solid-js';
import '../../styles/components/display/Badge.css';

type Placement = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

interface BadgeProps {
  children: JSX.Element;
  content?: string | number;
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
  placement?: Placement;
  dot?: boolean;
  icon?: Component;
  max?: number;
  showZero?: boolean;
  class?: string;
}

export const Badge: Component<BadgeProps> = (props) => {
  const [local, rest] = splitProps(props, [
    'children',
    'content',
    'variant',
    'placement',
    'dot',
    'icon',
    'max',
    'showZero',
    'class',
  ]);

  const variant = () => local.variant ?? 'error';
  const placement = () => local.placement ?? 'top-right';
  const max = () => local.max ?? 99;

  const shouldShow = () => {
    if (local.dot) return true;
    if (local.icon) return true;
    if (local.content === undefined || local.content === null) return false;
    if (typeof local.content === 'number' && local.content === 0) {
      return local.showZero ?? false;
    }
    return true;
  };

  const displayContent = () => {
    if (local.dot || local.icon) return null;
    if (typeof local.content === 'number' && local.content > max()) {
      return `${max()}+`;
    }
    return local.content;
  };

  const badgeClassNames = () => {
    const classes = ['badge'];

    classes.push(`badge--${variant()}`);
    classes.push(`badge--${placement()}`);

    if (local.dot) {
      classes.push('badge--dot');
    }

    if (local.icon) {
      classes.push('badge--icon');
    }

    if (local.class) {
      classes.push(local.class);
    }

    return classes.join(' ');
  };

  return (
    <span class="badge__wrapper" {...rest}>
      {local.children}
      <Show when={shouldShow()}>
        <span class={badgeClassNames()}>
          <Show when={local.icon && !local.dot}>
            {local.icon && <local.icon />}
          </Show>
          <Show when={!local.dot && !local.icon}>
            {displayContent()}
          </Show>
        </span>
      </Show>
    </span>
  );
};
