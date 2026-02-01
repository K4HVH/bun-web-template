import { Component, JSX, splitProps, createSignal, Show } from 'solid-js';
import { BsPerson } from 'solid-icons/bs';
import '../../styles/components/display/Avatar.css';

type AvatarBaseProps = {
  src?: string;
  alt?: string;
  name?: string;
  initials?: string;
  icon?: Component;
  size?: 'compact' | 'normal' | 'spacious';
  shape?: 'circle' | 'square';
  variant?: 'primary' | 'secondary' | 'subtle';
  class?: string;
};

type AvatarButtonProps = AvatarBaseProps &
  JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
    onClick: JSX.EventHandler<HTMLButtonElement, MouseEvent>;
    disabled?: boolean;
  };

type AvatarDivProps = AvatarBaseProps &
  Omit<JSX.HTMLAttributes<HTMLDivElement>, 'onClick'>;

type AvatarProps = AvatarButtonProps | AvatarDivProps;

export const Avatar: Component<AvatarProps> = (props) => {
  const [local, rest] = splitProps(props as AvatarBaseProps & { onClick?: any; disabled?: boolean }, [
    'src',
    'alt',
    'name',
    'initials',
    'icon',
    'size',
    'shape',
    'variant',
    'class',
    'onClick',
    'disabled',
  ]);

  const size = () => local.size ?? 'normal';
  const shape = () => local.shape ?? 'circle';
  const variant = () => local.variant ?? 'secondary';
  const isInteractive = () => !!local.onClick;

  const [imageError, setImageError] = createSignal(false);

  const generateInitials = (): string => {
    if (local.initials) return local.initials.toUpperCase().slice(0, 2);
    if (!local.name) return '';

    const words = local.name.trim().split(/\s+/);
    if (words.length === 0) return '';

    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }

    return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
  };

  const shouldShowImage = () => local.src && !imageError();
  const shouldShowInitials = () => !shouldShowImage() && generateInitials().length > 0;
  const shouldShowIcon = () => !shouldShowImage() && !shouldShowInitials();

  const getAriaLabel = (): string => {
    if (local.alt) return local.alt;
    if (local.name) return local.name;
    if (local.initials) return local.initials;
    return 'User avatar';
  };

  const classNames = () => {
    const classes = ['avatar'];

    classes.push(`avatar--${size()}`);
    classes.push(`avatar--${variant()}`);

    if (shape() === 'square') {
      classes.push('avatar--square');
    }

    if (isInteractive()) {
      classes.push('avatar--interactive');
    }

    if (local.class) {
      classes.push(local.class);
    }

    return classes.join(' ');
  };

  const content = () => (
    <>
      <Show when={shouldShowImage()}>
        <img
          src={local.src}
          alt={local.alt || local.name || 'Avatar'}
          class="avatar__image"
          onError={() => setImageError(true)}
        />
      </Show>

      <Show when={shouldShowInitials()}>
        <span class="avatar__initials">
          {generateInitials()}
        </span>
      </Show>

      <Show when={shouldShowIcon()}>
        <span class="avatar__icon">
          {local.icon ? <local.icon /> : <BsPerson />}
        </span>
      </Show>
    </>
  );

  return (
    <Show
      when={isInteractive()}
      fallback={
        <div
          class={classNames()}
          role="img"
          aria-label={getAriaLabel()}
          {...rest}
        >
          {content()}
        </div>
      }
    >
      <button
        type="button"
        class={classNames()}
        aria-label={getAriaLabel()}
        onClick={local.onClick}
        disabled={local.disabled}
        {...rest}
      >
        {content()}
      </button>
    </Show>
  );
};
