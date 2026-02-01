import { Component, JSX, createSignal, onMount, onCleanup, Show, createUniqueId, splitProps } from 'solid-js';
import { Portal } from 'solid-js/web';
import '../../styles/components/display/Tooltip.css';

type Placement = 'top' | 'bottom' | 'left' | 'right';

interface TooltipProps {
  content: JSX.Element;
  children: JSX.Element;
  placement?: Placement;
  size?: 'normal' | 'compact';
  disabled?: boolean;
  class?: string;
}

export const Tooltip: Component<TooltipProps> = (props) => {
  const [local, rest] = splitProps(props, [
    'content',
    'children',
    'placement',
    'size',
    'disabled',
    'class',
  ]);

  const placement = () => local.placement ?? 'top';
  const size = () => local.size ?? 'normal';

  const [isMounted, setIsMounted] = createSignal(false);
  const [isVisible, setIsVisible] = createSignal(false);
  const [actualPlacement, setActualPlacement] = createSignal<Placement>(placement());
  const [position, setPosition] = createSignal({ top: 0, left: 0 });
  const tooltipId = createUniqueId();

  let triggerRef: HTMLDivElement | undefined;
  let tooltipRef: HTMLDivElement | undefined;
  let showTimeout: number | undefined;
  let hideTimeout: number | undefined;

  const clearTimeouts = () => {
    if (showTimeout) clearTimeout(showTimeout);
    if (hideTimeout) clearTimeout(hideTimeout);
  };

  const calculatePosition = () => {
    if (!triggerRef || !tooltipRef) return;

    const triggerRect = triggerRef.getBoundingClientRect();
    const tooltipRect = tooltipRef.getBoundingClientRect();
    const spacing = 8; // Gap between trigger and tooltip

    let desiredPlacement = placement();
    let top = 0;
    let left = 0;

    // Calculate position based on placement
    const positions: Record<Placement, () => { top: number; left: number; canFit: boolean }> = {
      top: () => ({
        top: triggerRect.top - tooltipRect.height - spacing,
        left: triggerRect.left + (triggerRect.width - tooltipRect.width) / 2,
        canFit: triggerRect.top - tooltipRect.height - spacing >= 0,
      }),
      bottom: () => ({
        top: triggerRect.bottom + spacing,
        left: triggerRect.left + (triggerRect.width - tooltipRect.width) / 2,
        canFit: triggerRect.bottom + tooltipRect.height + spacing <= window.innerHeight,
      }),
      left: () => ({
        top: triggerRect.top + (triggerRect.height - tooltipRect.height) / 2,
        left: triggerRect.left - tooltipRect.width - spacing,
        canFit: triggerRect.left - tooltipRect.width - spacing >= 0,
      }),
      right: () => ({
        top: triggerRect.top + (triggerRect.height - tooltipRect.height) / 2,
        left: triggerRect.right + spacing,
        canFit: triggerRect.right + tooltipRect.width + spacing <= window.innerWidth,
      }),
    };

    // Try desired placement first
    let result = positions[desiredPlacement]();

    // Auto-flip if doesn't fit
    if (!result.canFit) {
      const flipMap: Record<Placement, Placement> = {
        top: 'bottom',
        bottom: 'top',
        left: 'right',
        right: 'left',
      };
      const flippedPlacement = flipMap[desiredPlacement];
      const flippedResult = positions[flippedPlacement]();

      if (flippedResult.canFit) {
        desiredPlacement = flippedPlacement;
        result = flippedResult;
      }
    }

    top = result.top;
    left = result.left;

    // Keep tooltip within viewport horizontally
    if (desiredPlacement === 'top' || desiredPlacement === 'bottom') {
      const maxLeft = window.innerWidth - tooltipRect.width - 8;
      left = Math.max(8, Math.min(left, maxLeft));
    }

    // Keep tooltip within viewport vertically
    if (desiredPlacement === 'left' || desiredPlacement === 'right') {
      const maxTop = window.innerHeight - tooltipRect.height - 8;
      top = Math.max(8, Math.min(top, maxTop));
    }

    setActualPlacement(desiredPlacement);
    setPosition({ top, left });
  };

  const handleShow = () => {
    if (local.disabled) return;

    clearTimeouts();
    showTimeout = window.setTimeout(() => {
      setIsMounted(true);
      // Calculate position and make visible after mount
      requestAnimationFrame(() => {
        calculatePosition();
        requestAnimationFrame(() => {
          setIsVisible(true);
        });
      });
    }, 200); // Show delay
  };

  const handleHide = () => {
    clearTimeouts();
    hideTimeout = window.setTimeout(() => {
      setIsVisible(false);
      // Wait for fade out transition before unmounting
      setTimeout(() => {
        setIsMounted(false);
      }, 150); // Match CSS transition duration
    }, 100); // Hide delay
  };

  const handleMouseEnter = () => handleShow();
  const handleMouseLeave = () => handleHide();
  const handleFocus = () => handleShow();
  const handleBlur = () => handleHide();

  onMount(() => {
    // Recalculate position on scroll/resize
    const handleRecalculate = () => {
      if (isVisible()) {
        calculatePosition();
      }
    };

    window.addEventListener('scroll', handleRecalculate, true);
    window.addEventListener('resize', handleRecalculate);

    onCleanup(() => {
      clearTimeouts();
      window.removeEventListener('scroll', handleRecalculate, true);
      window.removeEventListener('resize', handleRecalculate);
    });
  });

  const tooltipClassNames = () => {
    const classes = ['tooltip'];

    classes.push(`tooltip--${actualPlacement()}`);

    if (isVisible()) {
      classes.push('tooltip--visible');
    }

    if (size() === 'compact') {
      classes.push('tooltip--compact');
    }

    if (local.class) {
      classes.push(local.class);
    }

    return classes.join(' ');
  };

  return (
    <>
      <div
        ref={triggerRef}
        class="tooltip__trigger"
        aria-describedby={isMounted() ? tooltipId : undefined}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...rest}
      >
        {local.children}
      </div>

      <Show when={isMounted()}>
        <Portal>
          <div
            ref={tooltipRef}
            id={tooltipId}
            role="tooltip"
            class={tooltipClassNames()}
            style={{
              position: 'fixed',
              top: `${position().top}px`,
              left: `${position().left}px`,
            }}
          >
            {local.content}
          </div>
        </Portal>
      </Show>
    </>
  );
};
