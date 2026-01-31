import { render, fireEvent, screen } from '@solidjs/testing-library';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { Dialog, DialogHeader, DialogFooter } from '../../src/components/feedback/Dialog';

describe('Dialog', () => {
  afterEach(() => {
    // Clean up body overflow style
    document.body.style.overflow = '';
  });

  it('renders when open is true', () => {
    render(() => (
      <Dialog open={true} onClose={() => {}}>
        <p>Dialog content</p>
      </Dialog>
    ));
    const dialog = document.querySelector('[role="dialog"]');
    expect(dialog).toBeInTheDocument();
  });

  it('does not render when open is false', () => {
    render(() => (
      <Dialog open={false} onClose={() => {}}>
        <p>Dialog content</p>
      </Dialog>
    ));
    const dialog = document.querySelector('[role="dialog"]');
    expect(dialog).not.toBeInTheDocument();
  });

  it('renders dialog content', () => {
    render(() => (
      <Dialog open={true} onClose={() => {}}>
        <p>Test content</p>
      </Dialog>
    ));
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies small size class', () => {
    render(() => (
      <Dialog open={true} onClose={() => {}} size="small">
        <p>Content</p>
      </Dialog>
    ));
    const dialog = document.querySelector('.dialog--small');
    expect(dialog).toBeInTheDocument();
  });

  it('applies medium size class (default)', () => {
    render(() => (
      <Dialog open={true} onClose={() => {}} size="medium">
        <p>Content</p>
      </Dialog>
    ));
    const dialog = document.querySelector('.dialog');
    expect(dialog).toBeInTheDocument();
  });

  it('applies large size class', () => {
    render(() => (
      <Dialog open={true} onClose={() => {}} size="large">
        <p>Content</p>
      </Dialog>
    ));
    const dialog = document.querySelector('.dialog--large');
    expect(dialog).toBeInTheDocument();
  });

  it('applies fullscreen size class', () => {
    render(() => (
      <Dialog open={true} onClose={() => {}} size="fullscreen">
        <p>Content</p>
      </Dialog>
    ));
    const dialog = document.querySelector('.dialog--fullscreen');
    expect(dialog).toBeInTheDocument();
  });

  it('calls onClose when backdrop is clicked', () => {
    const handleClose = vi.fn();
    render(() => (
      <Dialog open={true} onClose={handleClose}>
        <p>Content</p>
      </Dialog>
    ));
    const backdrop = document.querySelector('.dialog__backdrop');
    if (backdrop) {
      fireEvent.click(backdrop);
      expect(handleClose).toHaveBeenCalledTimes(1);
    }
  });

  it('does not call onClose when dialog content is clicked', () => {
    const handleClose = vi.fn();
    render(() => (
      <Dialog open={true} onClose={handleClose}>
        <p>Content</p>
      </Dialog>
    ));
    const dialog = document.querySelector('[role="dialog"]');
    if (dialog) {
      fireEvent.click(dialog);
      expect(handleClose).not.toHaveBeenCalled();
    }
  });

  it('does not call onClose on backdrop click when dismissOnBackdrop is false', () => {
    const handleClose = vi.fn();
    render(() => (
      <Dialog open={true} onClose={handleClose} dismissOnBackdrop={false}>
        <p>Content</p>
      </Dialog>
    ));
    const backdrop = document.querySelector('.dialog__backdrop');
    if (backdrop) {
      fireEvent.click(backdrop);
      expect(handleClose).not.toHaveBeenCalled();
    }
  });

  it('calls onClose when ESC key is pressed', () => {
    const handleClose = vi.fn();
    render(() => (
      <Dialog open={true} onClose={handleClose}>
        <p>Content</p>
      </Dialog>
    ));
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose on ESC when dismissOnEscape is false', () => {
    const handleClose = vi.fn();
    render(() => (
      <Dialog open={true} onClose={handleClose} dismissOnEscape={false}>
        <p>Content</p>
      </Dialog>
    ));
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(handleClose).not.toHaveBeenCalled();
  });

  it('applies custom class name', () => {
    render(() => (
      <Dialog open={true} onClose={() => {}} class="custom-dialog">
        <p>Content</p>
      </Dialog>
    ));
    const dialog = document.querySelector('.custom-dialog');
    expect(dialog).toBeInTheDocument();
  });
});

describe('DialogHeader', () => {
  it('renders title', () => {
    const { getByText } = render(() => (
      <DialogHeader title="Test Title" />
    ));
    expect(getByText('Test Title')).toBeInTheDocument();
  });

  it('renders subtitle when provided', () => {
    const { getByText } = render(() => (
      <DialogHeader title="Title" subtitle="Test Subtitle" />
    ));
    expect(getByText('Test Subtitle')).toBeInTheDocument();
  });

  it('does not render subtitle when not provided', () => {
    const { queryByText } = render(() => (
      <DialogHeader title="Title" />
    ));
    // Since we don't have a subtitle, we can check the container
    const { container } = render(() => (
      <DialogHeader title="Title" />
    ));
    const subtitle = container.querySelector('.dialog__subtitle');
    expect(subtitle).not.toBeInTheDocument();
  });

  it('renders close button by default', () => {
    const handleClose = vi.fn();
    const { container } = render(() => (
      <DialogHeader title="Title" onClose={handleClose} />
    ));
    const closeButton = container.querySelector('.dialog__close');
    expect(closeButton).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const handleClose = vi.fn();
    const { container } = render(() => (
      <DialogHeader title="Title" onClose={handleClose} />
    ));
    const closeButton = container.querySelector('.dialog__close');
    if (closeButton) {
      fireEvent.click(closeButton);
      expect(handleClose).toHaveBeenCalledTimes(1);
    }
  });

  it('does not render close button when showClose is false', () => {
    const { container } = render(() => (
      <DialogHeader title="Title" onClose={() => {}} showClose={false} />
    ));
    const closeButton = container.querySelector('.dialog__close');
    expect(closeButton).not.toBeInTheDocument();
  });

  it('does not render close button when onClose is not provided', () => {
    const { container } = render(() => (
      <DialogHeader title="Title" />
    ));
    const closeButton = container.querySelector('.dialog__close');
    expect(closeButton).not.toBeInTheDocument();
  });
});

describe('DialogFooter', () => {
  it('renders children', () => {
    const { getByText } = render(() => (
      <DialogFooter>
        <button>Cancel</button>
        <button>Confirm</button>
      </DialogFooter>
    ));
    expect(getByText('Cancel')).toBeInTheDocument();
    expect(getByText('Confirm')).toBeInTheDocument();
  });

  it('applies right alignment by default', () => {
    const { container } = render(() => (
      <DialogFooter>
        <button>Action</button>
      </DialogFooter>
    ));
    const footer = container.querySelector('.dialog__footer');
    expect(footer).toBeInTheDocument();
    expect(footer).not.toHaveClass('dialog__footer--left');
    expect(footer).not.toHaveClass('dialog__footer--center');
  });

  it('applies left alignment class', () => {
    const { container } = render(() => (
      <DialogFooter align="left">
        <button>Action</button>
      </DialogFooter>
    ));
    const footer = container.querySelector('.dialog__footer--left');
    expect(footer).toBeInTheDocument();
  });

  it('applies center alignment class', () => {
    const { container } = render(() => (
      <DialogFooter align="center">
        <button>Action</button>
      </DialogFooter>
    ));
    const footer = container.querySelector('.dialog__footer--center');
    expect(footer).toBeInTheDocument();
  });

  it('applies right alignment class explicitly', () => {
    const { container } = render(() => (
      <DialogFooter align="right">
        <button>Action</button>
      </DialogFooter>
    ));
    const footer = container.querySelector('.dialog__footer');
    expect(footer).toBeInTheDocument();
  });
});
