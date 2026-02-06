import { render, fireEvent } from '@solidjs/testing-library';
import { describe, it, expect, vi } from 'vitest';
import { createSignal } from 'solid-js';
import { Pane } from '../../src/components/navigation/Pane';

describe('Pane', () => {
  // =========================================================================
  // Rendering
  // =========================================================================

  it('renders with default props', () => {
    const { container } = render(() => <Pane>Content</Pane>);
    const pane = container.querySelector('.pane');
    expect(pane).toBeInTheDocument();
    expect(pane?.classList.contains('pane--left')).toBe(true);
    expect(pane?.classList.contains('pane--permanent')).toBe(true);
    expect(pane?.classList.contains('pane--closed')).toBe(true);
  });

  it('renders children in the body', () => {
    const { getByText } = render(() => (
      <Pane defaultState="open">Pane content</Pane>
    ));
    expect(getByText('Pane content')).toBeInTheDocument();
  });

  it('renders partialChildren when in partial state', () => {
    const { getByText, queryByText } = render(() => (
      <Pane defaultState="partial" partialChildren={<div>Partial view</div>}>
        Full content
      </Pane>
    ));
    expect(getByText('Partial view')).toBeInTheDocument();
    expect(queryByText('Full content')).not.toBeInTheDocument();
  });

  it('renders children (not partialChildren) in open state', () => {
    const { getByText, queryByText } = render(() => (
      <Pane defaultState="open" partialChildren={<div>Partial view</div>}>
        Full content
      </Pane>
    ));
    expect(getByText('Full content')).toBeInTheDocument();
    expect(queryByText('Partial view')).not.toBeInTheDocument();
  });

  it('applies custom class', () => {
    const { container } = render(() => <Pane class="my-pane">Content</Pane>);
    const pane = container.querySelector('.pane.my-pane');
    expect(pane).toBeInTheDocument();
  });

  // =========================================================================
  // Positions
  // =========================================================================

  it('applies left position class', () => {
    const { container } = render(() => <Pane position="left">Content</Pane>);
    expect(container.querySelector('.pane--left')).toBeInTheDocument();
  });

  it('applies right position class', () => {
    const { container } = render(() => <Pane position="right">Content</Pane>);
    expect(container.querySelector('.pane--right')).toBeInTheDocument();
  });

  it('applies top position class', () => {
    const { container } = render(() => <Pane position="top">Content</Pane>);
    expect(container.querySelector('.pane--top')).toBeInTheDocument();
  });

  it('applies bottom position class', () => {
    const { container } = render(() => <Pane position="bottom">Content</Pane>);
    expect(container.querySelector('.pane--bottom')).toBeInTheDocument();
  });

  // =========================================================================
  // Mode
  // =========================================================================

  it('defaults to permanent mode', () => {
    const { container } = render(() => <Pane>Content</Pane>);
    expect(container.querySelector('.pane--permanent')).toBeInTheDocument();
  });

  it('applies temporary mode class', () => {
    const { container } = render(() => <Pane mode="temporary">Content</Pane>);
    expect(container.querySelector('.pane--temporary')).toBeInTheDocument();
  });

  // =========================================================================
  // Behavior
  // =========================================================================

  it('permanent defaults to push (no overlay class)', () => {
    const { container } = render(() => <Pane mode="permanent">Content</Pane>);
    expect(container.querySelector('.pane--overlay')).not.toBeInTheDocument();
  });

  it('temporary defaults to overlay', () => {
    const { container } = render(() => <Pane mode="temporary">Content</Pane>);
    expect(container.querySelector('.pane--overlay')).toBeInTheDocument();
  });

  it('allows overriding behavior', () => {
    const { container } = render(() => (
      <Pane mode="temporary" behavior="push">Content</Pane>
    ));
    expect(container.querySelector('.pane--overlay')).not.toBeInTheDocument();
  });

  // =========================================================================
  // Handle
  // =========================================================================

  it('shows handle for permanent panes by default', () => {
    const { container } = render(() => <Pane>Content</Pane>);
    expect(container.querySelector('.pane__handle')).toBeInTheDocument();
  });

  it('hides handle for temporary panes by default', () => {
    const { container } = render(() => <Pane mode="temporary">Content</Pane>);
    expect(container.querySelector('.pane__handle')).not.toBeInTheDocument();
  });

  it('allows forcing handle visibility', () => {
    const { container } = render(() => (
      <Pane mode="temporary" handle={true}>Content</Pane>
    ));
    expect(container.querySelector('.pane__handle')).toBeInTheDocument();
  });

  it('allows hiding handle on permanent panes', () => {
    const { container } = render(() => (
      <Pane mode="permanent" handle={false}>Content</Pane>
    ));
    expect(container.querySelector('.pane__handle')).not.toBeInTheDocument();
  });

  // =========================================================================
  // Uncontrolled State
  // =========================================================================

  it('defaults to closed state when uncontrolled', () => {
    const { container } = render(() => <Pane>Content</Pane>);
    expect(container.querySelector('.pane--closed')).toBeInTheDocument();
  });

  it('respects defaultState prop', () => {
    const { container } = render(() => <Pane defaultState="open">Content</Pane>);
    expect(container.querySelector('.pane--open')).toBeInTheDocument();
  });

  it('cycles state on handle click: closed → open (no partialChildren)', () => {
    const { container } = render(() => <Pane>Content</Pane>);
    const handle = container.querySelector('.pane__handle') as HTMLButtonElement;

    fireEvent.click(handle);
    expect(container.querySelector('.pane--open')).toBeInTheDocument();

    fireEvent.click(handle);
    expect(container.querySelector('.pane--closed')).toBeInTheDocument();
  });

  it('cycles state on handle click: closed → partial → open → closed (with partialChildren)', () => {
    const { container } = render(() => (
      <Pane partialChildren={<div>Partial</div>}>Full</Pane>
    ));
    const handle = container.querySelector('.pane__handle') as HTMLButtonElement;

    // closed → partial
    fireEvent.click(handle);
    expect(container.querySelector('.pane--partial')).toBeInTheDocument();

    // partial → open
    fireEvent.click(handle);
    expect(container.querySelector('.pane--open')).toBeInTheDocument();

    // open → closed
    fireEvent.click(handle);
    expect(container.querySelector('.pane--closed')).toBeInTheDocument();
  });

  // =========================================================================
  // Controlled State
  // =========================================================================

  it('uses controlled state from props', () => {
    const { container } = render(() => <Pane state="open">Content</Pane>);
    expect(container.querySelector('.pane--open')).toBeInTheDocument();
  });

  it('calls onStateChange when handle is clicked', () => {
    const handleChange = vi.fn();
    const { container } = render(() => (
      <Pane state="closed" onStateChange={handleChange}>Content</Pane>
    ));
    const handle = container.querySelector('.pane__handle') as HTMLButtonElement;

    fireEvent.click(handle);
    expect(handleChange).toHaveBeenCalledWith('open');
  });

  it('calls onStateChange with partial when partialChildren exists', () => {
    const handleChange = vi.fn();
    const { container } = render(() => (
      <Pane
        state="closed"
        onStateChange={handleChange}
        partialChildren={<div>Partial</div>}
      >
        Content
      </Pane>
    ));
    const handle = container.querySelector('.pane__handle') as HTMLButtonElement;

    fireEvent.click(handle);
    expect(handleChange).toHaveBeenCalledWith('partial');
  });

  it('controlled state does not change internally on click', () => {
    const { container } = render(() => <Pane state="closed">Content</Pane>);
    const handle = container.querySelector('.pane__handle') as HTMLButtonElement;

    fireEvent.click(handle);
    // Still closed because parent hasn't updated the state prop
    expect(container.querySelector('.pane--closed')).toBeInTheDocument();
  });

  // =========================================================================
  // Backdrop
  // =========================================================================

  it('renders backdrop element', () => {
    const { container } = render(() => <Pane>Content</Pane>);
    expect(document.querySelector('.pane__backdrop')).toBeInTheDocument();
  });

  it('backdrop is not visible for push panes', () => {
    render(() => <Pane defaultState="open">Content</Pane>);
    const backdrop = document.querySelector('.pane__backdrop');
    expect(backdrop?.classList.contains('pane__backdrop--visible')).toBe(false);
  });

  it('backdrop is visible when overlay pane is open', () => {
    render(() => (
      <Pane mode="temporary" defaultState="open">Content</Pane>
    ));
    const backdrop = document.querySelector('.pane__backdrop--visible');
    expect(backdrop).toBeInTheDocument();
  });

  it('backdrop click closes the pane', () => {
    const handleChange = vi.fn();
    render(() => (
      <Pane mode="temporary" defaultState="open" onStateChange={handleChange}>
        Content
      </Pane>
    ));
    const backdrop = document.querySelector('.pane__backdrop') as HTMLElement;
    fireEvent.click(backdrop);
    expect(handleChange).toHaveBeenCalledWith('closed');
  });

  it('backdrop can be disabled', () => {
    render(() => (
      <Pane mode="temporary" defaultState="open" backdrop={false}>Content</Pane>
    ));
    const backdrop = document.querySelector('.pane__backdrop--visible');
    expect(backdrop).not.toBeInTheDocument();
  });

  // =========================================================================
  // Keyboard
  // =========================================================================

  it('Escape key closes temporary pane', () => {
    const handleChange = vi.fn();
    render(() => (
      <Pane mode="temporary" defaultState="open" onStateChange={handleChange}>
        Content
      </Pane>
    ));
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(handleChange).toHaveBeenCalledWith('closed');
  });

  it('Escape key does not close permanent pane', () => {
    const handleChange = vi.fn();
    render(() => (
      <Pane mode="permanent" defaultState="open" onStateChange={handleChange}>
        Content
      </Pane>
    ));
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(handleChange).not.toHaveBeenCalled();
  });

  // =========================================================================
  // Fixed (viewport-level)
  // =========================================================================

  it('does not add fixed class by default', () => {
    const { container } = render(() => <Pane mode="temporary">Content</Pane>);
    const pane = container.querySelector('.pane');
    expect(pane?.classList.contains('pane--fixed')).toBe(false);
  });

  it('applies fixed class when fixed prop is true', () => {
    const { container } = render(() => (
      <Pane mode="temporary" fixed>Content</Pane>
    ));
    expect(container.querySelector('.pane--fixed')).toBeInTheDocument();
  });

  it('backdrop gets fixed class when fixed prop is true', () => {
    render(() => (
      <Pane mode="temporary" defaultState="open" fixed>Content</Pane>
    ));
    const backdrop = document.querySelector('.pane__backdrop--fixed');
    expect(backdrop).toBeInTheDocument();
  });

  it('backdrop does not get fixed class by default', () => {
    render(() => (
      <Pane mode="temporary" defaultState="open">Content</Pane>
    ));
    const backdrop = document.querySelector('.pane__backdrop');
    expect(backdrop?.classList.contains('pane__backdrop--fixed')).toBe(false);
  });

  // =========================================================================
  // Size Variants
  // =========================================================================

  it('does not add size class for normal (default)', () => {
    const { container } = render(() => <Pane>Content</Pane>);
    const pane = container.querySelector('.pane');
    expect(pane?.classList.contains('pane--compact')).toBe(false);
    expect(pane?.classList.contains('pane--spacious')).toBe(false);
  });

  it('applies compact size class', () => {
    const { container } = render(() => <Pane size="compact">Content</Pane>);
    expect(container.querySelector('.pane--compact')).toBeInTheDocument();
  });

  it('applies spacious size class', () => {
    const { container } = render(() => <Pane size="spacious">Content</Pane>);
    expect(container.querySelector('.pane--spacious')).toBeInTheDocument();
  });

  // =========================================================================
  // Handle Icon Rotation
  // =========================================================================

  it('handle icon is not rotated when closed', () => {
    const { container } = render(() => <Pane>Content</Pane>);
    const icon = container.querySelector('.pane__handle-icon');
    expect(icon).toBeInTheDocument();
    expect(icon?.classList.contains('pane__handle-icon--rotated')).toBe(false);
  });

  it('handle icon rotates when open', () => {
    const { container } = render(() => <Pane defaultState="open">Content</Pane>);
    const icon = container.querySelector('.pane__handle-icon');
    expect(icon?.classList.contains('pane__handle-icon--rotated')).toBe(true);
  });

  it('handle icon is not rotated when partial', () => {
    const { container } = render(() => (
      <Pane defaultState="partial" partialChildren={<div>Partial</div>}>Content</Pane>
    ));
    const icon = container.querySelector('.pane__handle-icon');
    expect(icon?.classList.contains('pane__handle-icon--rotated')).toBe(false);
  });

  it('handle icon rotation updates on state change', () => {
    const { container } = render(() => <Pane>Content</Pane>);
    const handle = container.querySelector('.pane__handle') as HTMLButtonElement;
    const icon = container.querySelector('.pane__handle-icon')!;

    // closed → open
    fireEvent.click(handle);
    expect(icon.classList.contains('pane__handle-icon--rotated')).toBe(true);

    // open → closed
    fireEvent.click(handle);
    expect(icon.classList.contains('pane__handle-icon--rotated')).toBe(false);
  });

  // =========================================================================
  // ARIA
  // =========================================================================

  it('has role="region"', () => {
    const { container } = render(() => <Pane>Content</Pane>);
    const pane = container.querySelector('[role="region"]');
    expect(pane).toBeInTheDocument();
  });

  it('aria-expanded is false when closed', () => {
    const { container } = render(() => <Pane>Content</Pane>);
    const pane = container.querySelector('[aria-expanded="false"]');
    expect(pane).toBeInTheDocument();
  });

  it('aria-expanded is true when open', () => {
    const { container } = render(() => <Pane defaultState="open">Content</Pane>);
    const pane = container.querySelector('[aria-expanded="true"]');
    expect(pane).toBeInTheDocument();
  });

  it('handle has appropriate aria-label', () => {
    const { container } = render(() => <Pane>Content</Pane>);
    const handle = container.querySelector('.pane__handle');
    expect(handle?.getAttribute('aria-label')).toBe('Open pane');
  });

  it('handle aria-label changes with state', () => {
    const { container } = render(() => <Pane defaultState="open">Content</Pane>);
    const handle = container.querySelector('.pane__handle');
    expect(handle?.getAttribute('aria-label')).toBe('Close pane');
  });

  // =========================================================================
  // CSS Custom Properties
  // =========================================================================

  it('sets default open size via CSS custom property', () => {
    const { container } = render(() => <Pane>Content</Pane>);
    const pane = container.querySelector('.pane') as HTMLElement;
    expect(pane.style.getPropertyValue('--pane-open-size')).toBe('280px');
  });

  it('sets custom open size via prop', () => {
    const { container } = render(() => <Pane openSize="400px">Content</Pane>);
    const pane = container.querySelector('.pane') as HTMLElement;
    expect(pane.style.getPropertyValue('--pane-open-size')).toBe('400px');
  });

  it('sets default partial size via CSS custom property', () => {
    const { container } = render(() => <Pane>Content</Pane>);
    const pane = container.querySelector('.pane') as HTMLElement;
    expect(pane.style.getPropertyValue('--pane-partial-size')).toBe('56px');
  });

  it('sets custom partial size via prop', () => {
    const { container } = render(() => <Pane partialSize="80px">Content</Pane>);
    const pane = container.querySelector('.pane') as HTMLElement;
    expect(pane.style.getPropertyValue('--pane-partial-size')).toBe('80px');
  });

  it('uses 240px default open size for vertical panes', () => {
    const { container } = render(() => <Pane position="top">Content</Pane>);
    const pane = container.querySelector('.pane') as HTMLElement;
    expect(pane.style.getPropertyValue('--pane-open-size')).toBe('240px');
  });
});
