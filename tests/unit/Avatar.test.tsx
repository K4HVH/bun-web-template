import { render, waitFor } from '@solidjs/testing-library';
import { describe, it, expect } from 'vitest';
import { Avatar } from '../../src/components/display/Avatar';
import { BsStar, BsGear } from 'solid-icons/bs';

describe('Avatar', () => {
  describe('Image rendering', () => {
    it('renders with image src', () => {
      const { container } = render(() => (
        <Avatar src="https://example.com/avatar.jpg" alt="User avatar" />
      ));
      const img = container.querySelector('.avatar__image') as HTMLImageElement;
      expect(img).toBeInTheDocument();
      expect(img.src).toBe('https://example.com/avatar.jpg');
      expect(img.alt).toBe('User avatar');
    });

    it('uses name as alt text when alt not provided', () => {
      const { container } = render(() => (
        <Avatar src="https://example.com/avatar.jpg" name="John Doe" />
      ));
      const img = container.querySelector('.avatar__image') as HTMLImageElement;
      expect(img.alt).toBe('John Doe');
    });

    it('falls back to "Avatar" when no alt or name', () => {
      const { container } = render(() => (
        <Avatar src="https://example.com/avatar.jpg" />
      ));
      const img = container.querySelector('.avatar__image') as HTMLImageElement;
      expect(img.alt).toBe('Avatar');
    });
  });

  describe('Initials rendering', () => {
    it('shows initials when no image src', () => {
      const { container } = render(() => (
        <Avatar name="John Doe" />
      ));
      const initials = container.querySelector('.avatar__initials');
      expect(initials).toBeInTheDocument();
      expect(initials?.textContent).toBe('JD');
    });

    it('generates initials from single name', () => {
      const { container } = render(() => (
        <Avatar name="John" />
      ));
      const initials = container.querySelector('.avatar__initials');
      expect(initials?.textContent).toBe('J');
    });

    it('uses manual initials prop over auto-generation', () => {
      const { container } = render(() => (
        <Avatar name="John Doe" initials="AB" />
      ));
      const initials = container.querySelector('.avatar__initials');
      expect(initials?.textContent).toBe('AB');
    });

    it('uppercases initials', () => {
      const { container } = render(() => (
        <Avatar initials="jd" />
      ));
      const initials = container.querySelector('.avatar__initials');
      expect(initials?.textContent).toBe('JD');
    });

    it('limits initials to 2 characters', () => {
      const { container } = render(() => (
        <Avatar initials="ABCD" />
      ));
      const initials = container.querySelector('.avatar__initials');
      expect(initials?.textContent).toBe('AB');
    });

    it('handles multiple spaces in name', () => {
      const { container } = render(() => (
        <Avatar name="John   Doe" />
      ));
      const initials = container.querySelector('.avatar__initials');
      expect(initials?.textContent).toBe('JD');
    });

    it('handles names with more than 2 words', () => {
      const { container } = render(() => (
        <Avatar name="John Michael Doe" />
      ));
      const initials = container.querySelector('.avatar__initials');
      expect(initials?.textContent).toBe('JM');
    });
  });

  describe('Icon rendering', () => {
    it('shows default icon when no image or initials', () => {
      const { container } = render(() => (
        <Avatar />
      ));
      const icon = container.querySelector('.avatar__icon');
      expect(icon).toBeInTheDocument();
    });

    it('shows custom icon', () => {
      const { container } = render(() => (
        <Avatar icon={BsStar} />
      ));
      const icon = container.querySelector('.avatar__icon');
      expect(icon).toBeInTheDocument();
    });

    it('prefers initials over icon', () => {
      const { container } = render(() => (
        <Avatar name="John Doe" icon={BsStar} />
      ));
      expect(container.querySelector('.avatar__initials')).toBeInTheDocument();
      expect(container.querySelector('.avatar__icon')).not.toBeInTheDocument();
    });

    it('shows icon when initials are empty', () => {
      const { container } = render(() => (
        <Avatar name="" icon={BsGear} />
      ));
      expect(container.querySelector('.avatar__icon')).toBeInTheDocument();
      expect(container.querySelector('.avatar__initials')).not.toBeInTheDocument();
    });
  });

  describe('Size variants', () => {
    it('applies normal size by default', () => {
      const { container } = render(() => (
        <Avatar name="JD" />
      ));
      const avatar = container.querySelector('.avatar');
      expect(avatar).not.toHaveClass('avatar--compact');
      expect(avatar).not.toHaveClass('avatar--spacious');
    });

    it('applies compact size', () => {
      const { container } = render(() => (
        <Avatar name="JD" size="compact" />
      ));
      const avatar = container.querySelector('.avatar');
      expect(avatar).toHaveClass('avatar--compact');
    });

    it('applies spacious size', () => {
      const { container } = render(() => (
        <Avatar name="JD" size="spacious" />
      ));
      const avatar = container.querySelector('.avatar');
      expect(avatar).toHaveClass('avatar--spacious');
    });
  });

  describe('Shape variants', () => {
    it('applies circle shape by default', () => {
      const { container } = render(() => (
        <Avatar name="JD" />
      ));
      const avatar = container.querySelector('.avatar');
      expect(avatar).not.toHaveClass('avatar--square');
    });

    it('applies square shape', () => {
      const { container } = render(() => (
        <Avatar name="JD" shape="square" />
      ));
      const avatar = container.querySelector('.avatar');
      expect(avatar).toHaveClass('avatar--square');
    });
  });

  describe('Color variants', () => {
    it('applies secondary variant by default', () => {
      const { container } = render(() => (
        <Avatar name="JD" />
      ));
      const avatar = container.querySelector('.avatar');
      expect(avatar).toHaveClass('avatar--secondary');
    });

    it('applies primary variant', () => {
      const { container } = render(() => (
        <Avatar name="JD" variant="primary" />
      ));
      const avatar = container.querySelector('.avatar');
      expect(avatar).toHaveClass('avatar--primary');
    });

    it('applies secondary variant', () => {
      const { container } = render(() => (
        <Avatar name="JD" variant="secondary" />
      ));
      const avatar = container.querySelector('.avatar');
      expect(avatar).toHaveClass('avatar--secondary');
    });

    it('applies subtle variant', () => {
      const { container } = render(() => (
        <Avatar name="JD" variant="subtle" />
      ));
      const avatar = container.querySelector('.avatar');
      expect(avatar).toHaveClass('avatar--subtle');
    });
  });

  describe('Accessibility', () => {
    it('has role="img"', () => {
      const { container } = render(() => (
        <Avatar name="John Doe" />
      ));
      const avatar = container.querySelector('.avatar');
      expect(avatar).toHaveAttribute('role', 'img');
    });

    it('uses alt text as aria-label', () => {
      const { container } = render(() => (
        <Avatar src="avatar.jpg" alt="John Doe" />
      ));
      const avatar = container.querySelector('.avatar');
      expect(avatar).toHaveAttribute('aria-label', 'John Doe');
    });

    it('uses name as aria-label when no alt', () => {
      const { container } = render(() => (
        <Avatar name="John Doe" />
      ));
      const avatar = container.querySelector('.avatar');
      expect(avatar).toHaveAttribute('aria-label', 'John Doe');
    });

    it('uses initials as aria-label when no alt or name', () => {
      const { container } = render(() => (
        <Avatar initials="JD" />
      ));
      const avatar = container.querySelector('.avatar');
      expect(avatar).toHaveAttribute('aria-label', 'JD');
    });

    it('uses default aria-label when no identifying info', () => {
      const { container } = render(() => (
        <Avatar />
      ));
      const avatar = container.querySelector('.avatar');
      expect(avatar).toHaveAttribute('aria-label', 'User avatar');
    });
  });

  describe('Image error handling', () => {
    it('shows initials when image fails to load', async () => {
      const { container } = render(() => (
        <Avatar src="invalid-url.jpg" name="John Doe" />
      ));

      const img = container.querySelector('.avatar__image') as HTMLImageElement;
      expect(img).toBeInTheDocument();

      // Trigger error event
      img.dispatchEvent(new Event('error'));

      await waitFor(() => {
        expect(container.querySelector('.avatar__image')).not.toBeInTheDocument();
        expect(container.querySelector('.avatar__initials')).toBeInTheDocument();
        expect(container.querySelector('.avatar__initials')?.textContent).toBe('JD');
      });
    });

    it('shows icon when image fails and no initials', async () => {
      const { container } = render(() => (
        <Avatar src="invalid-url.jpg" icon={BsStar} />
      ));

      const img = container.querySelector('.avatar__image') as HTMLImageElement;
      img.dispatchEvent(new Event('error'));

      await waitFor(() => {
        expect(container.querySelector('.avatar__image')).not.toBeInTheDocument();
        expect(container.querySelector('.avatar__icon')).toBeInTheDocument();
      });
    });
  });

  describe('Custom styling', () => {
    it('applies custom class', () => {
      const { container } = render(() => (
        <Avatar name="JD" class="custom-avatar" />
      ));
      const avatar = container.querySelector('.avatar');
      expect(avatar).toHaveClass('custom-avatar');
    });
  });

  describe('Interactive states', () => {
    it('renders as div when no onClick', () => {
      const { container } = render(() => (
        <Avatar name="JD" />
      ));
      const avatar = container.querySelector('.avatar');
      expect(avatar?.tagName).toBe('DIV');
      expect(avatar).not.toHaveClass('avatar--interactive');
    });

    it('renders as button when onClick provided', () => {
      const { container } = render(() => (
        <Avatar name="JD" onClick={() => {}} />
      ));
      const avatar = container.querySelector('.avatar');
      expect(avatar?.tagName).toBe('BUTTON');
      expect(avatar).toHaveClass('avatar--interactive');
    });

    it('calls onClick when clicked', () => {
      let clicked = false;
      const { container } = render(() => (
        <Avatar name="JD" onClick={() => { clicked = true; }} />
      ));
      const avatar = container.querySelector('.avatar') as HTMLButtonElement;
      avatar.click();
      expect(clicked).toBe(true);
    });

    it('applies disabled state', () => {
      const { container } = render(() => (
        <Avatar name="JD" onClick={() => {}} disabled />
      ));
      const avatar = container.querySelector('.avatar') as HTMLButtonElement;
      expect(avatar.disabled).toBe(true);
    });

    it('does not call onClick when disabled', () => {
      let clicked = false;
      const { container } = render(() => (
        <Avatar name="JD" onClick={() => { clicked = true; }} disabled />
      ));
      const avatar = container.querySelector('.avatar') as HTMLButtonElement;
      avatar.click();
      expect(clicked).toBe(false);
    });

    it('has type="button" when interactive', () => {
      const { container } = render(() => (
        <Avatar name="JD" onClick={() => {}} />
      ));
      const avatar = container.querySelector('.avatar') as HTMLButtonElement;
      expect(avatar.type).toBe('button');
    });
  });
});
