import { Component, JSX, splitProps, children as resolveChildren, For, Show } from 'solid-js';
import { Avatar } from './Avatar';
import '../../styles/components/display/AvatarGroup.css';

interface AvatarGroupProps extends JSX.HTMLAttributes<HTMLDivElement> {
  children?: JSX.Element;
  max?: number;
  size?: 'compact' | 'normal' | 'spacious';
  spacing?: 'tight' | 'normal' | 'loose';
  onOverflowClick?: () => void;
}

export const AvatarGroup: Component<AvatarGroupProps> = (props) => {
  const [local, rest] = splitProps(props, [
    'children',
    'max',
    'size',
    'spacing',
    'onOverflowClick',
    'class',
  ]);

  const size = () => local.size ?? 'normal';
  const spacing = () => local.spacing ?? 'normal';
  const max = () => local.max;

  const classNames = () => {
    const classes = ['avatar-group'];

    classes.push(`avatar-group--${size()}`);
    classes.push(`avatar-group--spacing-${spacing()}`);

    if (local.class) {
      classes.push(local.class);
    }

    return classes.join(' ');
  };

  const resolved = resolveChildren(() => local.children);

  const avatars = () => {
    const res = resolved();
    if (!res) return [];
    const childArray = Array.isArray(res) ? res : [res];
    return childArray.filter(Boolean) as JSX.Element[];
  };

  const visibleAvatars = () => {
    const all = avatars();
    const maxCount = max();
    if (!maxCount || all.length <= maxCount) return all;
    return all.slice(0, maxCount);
  };

  const remainingCount = () => {
    const all = avatars();
    const maxCount = max();
    if (!maxCount || all.length <= maxCount) return 0;
    return all.length - maxCount;
  };

  return (
    <div class={classNames()} {...rest}>
      <For each={visibleAvatars()}>
        {(child) => <div class="avatar-group__item">{child}</div>}
      </For>
      <Show when={remainingCount() > 0}>
        <div class="avatar-group__item">
          <Avatar
            initials={`+${remainingCount()}`}
            size={size()}
            variant="secondary"
            onClick={local.onOverflowClick}
          />
        </div>
      </Show>
    </div>
  );
};
