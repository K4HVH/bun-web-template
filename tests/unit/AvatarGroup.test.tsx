import { render } from '@solidjs/testing-library';
import { describe, it, expect } from 'vitest';
import { AvatarGroup } from '../../src/components/display/AvatarGroup';
import { Avatar } from '../../src/components/display/Avatar';

describe('AvatarGroup', () => {
  it('renders multiple avatars', () => {
    const { container } = render(() => (
      <AvatarGroup>
        <Avatar name="John Doe" />
        <Avatar name="Jane Smith" />
        <Avatar name="Bob Johnson" />
      </AvatarGroup>
    ));

    const items = container.querySelectorAll('.avatar-group__item');
    expect(items).toHaveLength(3);
  });

  it('applies normal size by default', () => {
    const { container } = render(() => (
      <AvatarGroup>
        <Avatar name="John Doe" />
      </AvatarGroup>
    ));

    const group = container.querySelector('.avatar-group');
    expect(group).toHaveClass('avatar-group--normal');
  });

  it('applies compact size', () => {
    const { container } = render(() => (
      <AvatarGroup size="compact">
        <Avatar name="John Doe" />
      </AvatarGroup>
    ));

    const group = container.querySelector('.avatar-group');
    expect(group).toHaveClass('avatar-group--compact');
  });

  it('applies spacious size', () => {
    const { container } = render(() => (
      <AvatarGroup size="spacious">
        <Avatar name="John Doe" />
      </AvatarGroup>
    ));

    const group = container.querySelector('.avatar-group');
    expect(group).toHaveClass('avatar-group--spacious');
  });

  it('applies normal spacing by default', () => {
    const { container } = render(() => (
      <AvatarGroup>
        <Avatar name="John Doe" />
      </AvatarGroup>
    ));

    const group = container.querySelector('.avatar-group');
    expect(group).toHaveClass('avatar-group--spacing-normal');
  });

  it('applies tight spacing', () => {
    const { container } = render(() => (
      <AvatarGroup spacing="tight">
        <Avatar name="John Doe" />
      </AvatarGroup>
    ));

    const group = container.querySelector('.avatar-group');
    expect(group).toHaveClass('avatar-group--spacing-tight');
  });

  it('applies loose spacing', () => {
    const { container } = render(() => (
      <AvatarGroup spacing="loose">
        <Avatar name="John Doe" />
      </AvatarGroup>
    ));

    const group = container.querySelector('.avatar-group');
    expect(group).toHaveClass('avatar-group--spacing-loose');
  });

  it('shows all avatars when under max', () => {
    const { container } = render(() => (
      <AvatarGroup max={5}>
        <Avatar name="John Doe" />
        <Avatar name="Jane Smith" />
        <Avatar name="Bob Johnson" />
      </AvatarGroup>
    ));

    const items = container.querySelectorAll('.avatar-group__item');
    expect(items).toHaveLength(3);
  });

  it('truncates avatars when over max', () => {
    const { container } = render(() => (
      <AvatarGroup max={2}>
        <Avatar name="John Doe" />
        <Avatar name="Jane Smith" />
        <Avatar name="Bob Johnson" />
        <Avatar name="Alice Brown" />
      </AvatarGroup>
    ));

    const items = container.querySelectorAll('.avatar-group__item');
    // 2 visible + 1 "+N" avatar
    expect(items).toHaveLength(3);
  });

  it('shows correct remaining count', () => {
    const { container } = render(() => (
      <AvatarGroup max={2}>
        <Avatar name="John Doe" />
        <Avatar name="Jane Smith" />
        <Avatar name="Bob Johnson" />
        <Avatar name="Alice Brown" />
        <Avatar name="Charlie Wilson" />
      </AvatarGroup>
    ));

    const avatars = container.querySelectorAll('.avatar');
    const lastAvatar = avatars[avatars.length - 1];
    const initials = lastAvatar.querySelector('.avatar__initials');
    expect(initials?.textContent).toBe('+3');
  });

  it('does not show +N avatar when at max exactly', () => {
    const { container } = render(() => (
      <AvatarGroup max={3}>
        <Avatar name="John Doe" />
        <Avatar name="Jane Smith" />
        <Avatar name="Bob Johnson" />
      </AvatarGroup>
    ));

    const items = container.querySelectorAll('.avatar-group__item');
    expect(items).toHaveLength(3);

    const initials = Array.from(container.querySelectorAll('.avatar__initials'))
      .map(el => el.textContent);
    expect(initials).not.toContain(expect.stringContaining('+'));
  });

  it('wraps each avatar in avatar-group__item', () => {
    const { container } = render(() => (
      <AvatarGroup>
        <Avatar name="John Doe" />
        <Avatar name="Jane Smith" />
      </AvatarGroup>
    ));

    const items = container.querySelectorAll('.avatar-group__item');
    items.forEach(item => {
      expect(item.querySelector('.avatar')).toBeInTheDocument();
    });
  });

  it('applies custom class', () => {
    const { container } = render(() => (
      <AvatarGroup class="custom-group">
        <Avatar name="John Doe" />
      </AvatarGroup>
    ));

    const group = container.querySelector('.avatar-group');
    expect(group).toHaveClass('custom-group');
  });

  it('passes size to overflow avatar', () => {
    const { container } = render(() => (
      <AvatarGroup max={1} size="spacious">
        <Avatar name="John Doe" />
        <Avatar name="Jane Smith" />
        <Avatar name="Bob Johnson" />
      </AvatarGroup>
    ));

    const avatars = container.querySelectorAll('.avatar');
    const overflowAvatar = avatars[avatars.length - 1];
    expect(overflowAvatar).toHaveClass('avatar--spacious');
  });

  it('calls onOverflowClick when overflow avatar is clicked', () => {
    let clicked = false;
    const { container } = render(() => (
      <AvatarGroup max={2} onOverflowClick={() => { clicked = true; }}>
        <Avatar name="John Doe" />
        <Avatar name="Jane Smith" />
        <Avatar name="Bob Johnson" />
        <Avatar name="Alice Brown" />
      </AvatarGroup>
    ));

    const avatars = container.querySelectorAll('.avatar');
    const overflowAvatar = avatars[avatars.length - 1] as HTMLElement;
    overflowAvatar.click();
    expect(clicked).toBe(true);
  });

  it('makes overflow avatar interactive when onOverflowClick provided', () => {
    const { container } = render(() => (
      <AvatarGroup max={2} onOverflowClick={() => {}}>
        <Avatar name="John Doe" />
        <Avatar name="Jane Smith" />
        <Avatar name="Bob Johnson" />
      </AvatarGroup>
    ));

    const avatars = container.querySelectorAll('.avatar');
    const overflowAvatar = avatars[avatars.length - 1];
    expect(overflowAvatar).toHaveClass('avatar--interactive');
  });
});
