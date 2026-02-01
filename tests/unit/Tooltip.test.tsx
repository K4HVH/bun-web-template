import { render, fireEvent, waitFor } from '@solidjs/testing-library';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Tooltip } from '../../src/components/display/Tooltip';

describe('Tooltip', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    // Clean up any tooltips in the document
    document.querySelectorAll('[role="tooltip"]').forEach(el => el.remove());
  });

  it('renders trigger element', () => {
    const { getByText } = render(() => (
      <Tooltip content="Tooltip text">
        <button>Hover me</button>
      </Tooltip>
    ));
    expect(getByText('Hover me')).toBeInTheDocument();
  });

  it('does not show tooltip initially', () => {
    render(() => (
      <Tooltip content="Tooltip text">
        <button>Hover me</button>
      </Tooltip>
    ));
    expect(document.querySelector('[role="tooltip"]')).not.toBeInTheDocument();
  });

  it('shows tooltip on mouse enter after delay', async () => {
    const { container } = render(() => (
      <Tooltip content="Tooltip text">
        <button>Hover me</button>
      </Tooltip>
    ));

    const trigger = container.querySelector('.tooltip__trigger') as HTMLElement;
    fireEvent.mouseEnter(trigger);

    // Should not show immediately
    expect(document.querySelector('[role="tooltip"]')).not.toBeInTheDocument();

    // Fast-forward past show delay (200ms)
    vi.advanceTimersByTime(200);

    await waitFor(() => {
      const tooltip = document.querySelector('[role="tooltip"]');
      expect(tooltip).toBeInTheDocument();
      expect(tooltip?.textContent).toBe('Tooltip text');
    });
  });

  it('hides tooltip on mouse leave after delay', async () => {
    const { container } = render(() => (
      <Tooltip content="Tooltip text">
        <button>Hover me</button>
      </Tooltip>
    ));

    const trigger = container.querySelector('.tooltip__trigger') as HTMLElement;

    // Show tooltip
    fireEvent.mouseEnter(trigger);
    vi.advanceTimersByTime(200);

    await waitFor(() => {
      expect(document.querySelector('[role="tooltip"]')).toBeInTheDocument();
    });

    // Hide tooltip
    fireEvent.mouseLeave(trigger);

    // Should still be visible
    expect(document.querySelector('[role="tooltip"]')).toBeInTheDocument();

    // Fast-forward past hide delay (100ms) + fade out (150ms)
    vi.advanceTimersByTime(100);
    vi.advanceTimersByTime(150);

    await waitFor(() => {
      expect(document.querySelector('[role="tooltip"]')).not.toBeInTheDocument();
    });
  });

  it('shows tooltip on focus after delay', async () => {
    const { container } = render(() => (
      <Tooltip content="Tooltip text">
        <button>Focus me</button>
      </Tooltip>
    ));

    const trigger = container.querySelector('.tooltip__trigger') as HTMLElement;
    fireEvent.focus(trigger);

    vi.advanceTimersByTime(200);

    await waitFor(() => {
      const tooltip = document.querySelector('[role="tooltip"]');
      expect(tooltip).toBeInTheDocument();
      expect(tooltip?.textContent).toBe('Tooltip text');
    });
  });

  it('hides tooltip on blur after delay', async () => {
    const { container } = render(() => (
      <Tooltip content="Tooltip text">
        <button>Focus me</button>
      </Tooltip>
    ));

    const trigger = container.querySelector('.tooltip__trigger') as HTMLElement;

    // Show tooltip
    fireEvent.focus(trigger);
    vi.advanceTimersByTime(200);

    await waitFor(() => {
      expect(document.querySelector('[role="tooltip"]')).toBeInTheDocument();
    });

    // Hide tooltip
    fireEvent.blur(trigger);
    vi.advanceTimersByTime(100);
    vi.advanceTimersByTime(150); // Fade out transition

    await waitFor(() => {
      expect(document.querySelector('[role="tooltip"]')).not.toBeInTheDocument();
    });
  });

  it('applies top placement class by default', async () => {
    const { container } = render(() => (
      <Tooltip content="Tooltip text">
        <button>Hover me</button>
      </Tooltip>
    ));

    const trigger = container.querySelector('.tooltip__trigger') as HTMLElement;
    fireEvent.mouseEnter(trigger);
    vi.advanceTimersByTime(200);

    await waitFor(() => {
      const tooltip = document.querySelector('[role="tooltip"]');
      expect(tooltip).toHaveClass('tooltip--top');
    });
  });

  it('applies specified placement class', async () => {
    const { container } = render(() => (
      <Tooltip content="Tooltip text" placement="bottom">
        <button>Hover me</button>
      </Tooltip>
    ));

    const trigger = container.querySelector('.tooltip__trigger') as HTMLElement;
    fireEvent.mouseEnter(trigger);
    vi.advanceTimersByTime(200);

    await waitFor(() => {
      const tooltip = document.querySelector('[role="tooltip"]');
      expect(tooltip).toHaveClass('tooltip--bottom');
    });
  });

  it('applies normal size by default', async () => {
    const { container } = render(() => (
      <Tooltip content="Tooltip text">
        <button>Hover me</button>
      </Tooltip>
    ));

    const trigger = container.querySelector('.tooltip__trigger') as HTMLElement;
    fireEvent.mouseEnter(trigger);
    vi.advanceTimersByTime(200);

    await waitFor(() => {
      const tooltip = document.querySelector('[role="tooltip"]');
      expect(tooltip).not.toHaveClass('tooltip--compact');
    });
  });

  it('applies compact size class', async () => {
    const { container } = render(() => (
      <Tooltip content="Tooltip text" size="compact">
        <button>Hover me</button>
      </Tooltip>
    ));

    const trigger = container.querySelector('.tooltip__trigger') as HTMLElement;
    fireEvent.mouseEnter(trigger);
    vi.advanceTimersByTime(200);

    await waitFor(() => {
      const tooltip = document.querySelector('[role="tooltip"]');
      expect(tooltip).toHaveClass('tooltip--compact');
    });
  });

  it('does not show tooltip when disabled', async () => {
    const { container } = render(() => (
      <Tooltip content="Tooltip text" disabled>
        <button>Hover me</button>
      </Tooltip>
    ));

    const trigger = container.querySelector('.tooltip__trigger') as HTMLElement;
    fireEvent.mouseEnter(trigger);
    vi.advanceTimersByTime(200);

    await waitFor(() => {
      expect(document.querySelector('[role="tooltip"]')).not.toBeInTheDocument();
    }, { timeout: 100 });
  });

  it('applies custom class', async () => {
    const { container } = render(() => (
      <Tooltip content="Tooltip text" class="custom-tooltip">
        <button>Hover me</button>
      </Tooltip>
    ));

    const trigger = container.querySelector('.tooltip__trigger') as HTMLElement;
    fireEvent.mouseEnter(trigger);
    vi.advanceTimersByTime(200);

    await waitFor(() => {
      const tooltip = document.querySelector('[role="tooltip"]');
      expect(tooltip).toHaveClass('custom-tooltip');
    });
  });

  it('sets aria-describedby on trigger when tooltip is visible', async () => {
    const { container } = render(() => (
      <Tooltip content="Tooltip text">
        <button>Hover me</button>
      </Tooltip>
    ));

    const trigger = container.querySelector('.tooltip__trigger') as HTMLElement;

    // Should not have aria-describedby initially
    expect(trigger.hasAttribute('aria-describedby')).toBe(false);

    fireEvent.mouseEnter(trigger);
    vi.advanceTimersByTime(200);

    await waitFor(() => {
      expect(trigger.hasAttribute('aria-describedby')).toBe(true);
      const tooltipId = trigger.getAttribute('aria-describedby');
      const tooltip = document.getElementById(tooltipId!);
      expect(tooltip).toBeInTheDocument();
    });
  });

  it('supports rich content', async () => {
    const { container } = render(() => (
      <Tooltip content={<div><strong>Bold</strong> text</div>}>
        <button>Hover me</button>
      </Tooltip>
    ));

    const trigger = container.querySelector('.tooltip__trigger') as HTMLElement;
    fireEvent.mouseEnter(trigger);
    vi.advanceTimersByTime(200);

    await waitFor(() => {
      const tooltip = document.querySelector('[role="tooltip"]');
      expect(tooltip?.querySelector('strong')?.textContent).toBe('Bold');
    });
  });

  it('cancels show timeout if mouse leaves before delay', async () => {
    const { container } = render(() => (
      <Tooltip content="Tooltip text">
        <button>Hover me</button>
      </Tooltip>
    ));

    const trigger = container.querySelector('.tooltip__trigger') as HTMLElement;

    // Start showing
    fireEvent.mouseEnter(trigger);
    vi.advanceTimersByTime(100); // Only halfway through show delay

    // Leave before show delay completes
    fireEvent.mouseLeave(trigger);
    vi.advanceTimersByTime(200);

    // Tooltip should not appear
    expect(document.querySelector('[role="tooltip"]')).not.toBeInTheDocument();
  });

  it('cancels hide timeout if mouse enters again before delay', async () => {
    const { container } = render(() => (
      <Tooltip content="Tooltip text">
        <button>Hover me</button>
      </Tooltip>
    ));

    const trigger = container.querySelector('.tooltip__trigger') as HTMLElement;

    // Show tooltip
    fireEvent.mouseEnter(trigger);
    vi.advanceTimersByTime(200);

    await waitFor(() => {
      expect(document.querySelector('[role="tooltip"]')).toBeInTheDocument();
    });

    // Start hiding
    fireEvent.mouseLeave(trigger);
    vi.advanceTimersByTime(50); // Only halfway through hide delay

    // Re-enter before hide delay completes
    fireEvent.mouseEnter(trigger);
    vi.advanceTimersByTime(200);

    // Tooltip should still be visible
    expect(document.querySelector('[role="tooltip"]')).toBeInTheDocument();
  });
});
