import {
  Component,
  JSX,
  Show,
  createSignal,
  createEffect,
  onMount,
  onCleanup,
  splitProps,
  children as resolveChildren,
} from 'solid-js';
import { Portal } from 'solid-js/web';
import { BsChevronRight } from 'solid-icons/bs';
import '../../styles/components/navigation/Menu.css';

export interface MenuProps {
  trigger: JSX.Element;
  children: JSX.Element;
  // Trigger behavior
  openOn?: 'click' | 'contextmenu' | 'both';
  // Positioning
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' | 'right-start' | 'left-start';
  autoFlip?: boolean;
  anchored?: boolean; // If true, menu follows trigger on scroll/resize (default: true)
  // Controlled state
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  // Appearance
  variant?: 'default' | 'emphasized' | 'subtle';
  size?: 'compact' | 'normal' | 'spacious';
  // Other
  class?: string;
}

export const Menu: Component<MenuProps> = (props) => {
  const [local] = splitProps(props, [
    'trigger',
    'children',
    'openOn',
    'placement',
    'autoFlip',
    'anchored',
    'open',
    'onOpenChange',
    'variant',
    'size',
    'class',
  ]);

  const openOn = () => local.openOn ?? 'both';
  const placement = () => local.placement ?? 'bottom-start';
  const autoFlip = () => local.autoFlip ?? true;
  const anchored = () => local.anchored ?? true;
  const variant = () => local.variant ?? 'default';
  const size = () => local.size ?? 'normal';

  // Controlled/uncontrolled state
  const isControlled = () => local.open !== undefined;
  const [internalOpen, setInternalOpen] = createSignal(false);
  const isOpen = () => (isControlled() ? local.open! : internalOpen());

  const setOpen = (value: boolean) => {
    if (!isControlled()) {
      setInternalOpen(value);
    }
    local.onOpenChange?.(value);
  };

  let triggerRef: HTMLDivElement | undefined;
  let menuRef: HTMLDivElement | undefined;

  const [position, setPosition] = createSignal({ top: 0, left: 0 });
  const [finalPlacement, setFinalPlacement] = createSignal(placement());
  const [isPositioned, setIsPositioned] = createSignal(false);

  const updatePosition = () => {
    if (!triggerRef || !menuRef) return;

    // Use the actual trigger element (child) if it exists, otherwise use the wrapper
    const actualTriggerElement = triggerRef.firstElementChild || triggerRef;
    const triggerRect = actualTriggerElement.getBoundingClientRect();
    const menuRect = menuRef.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Safety check: ensure menu has dimensions before positioning
    if (menuRect.width === 0 || menuRect.height === 0) {
      // Menu not fully rendered yet, try again
      requestAnimationFrame(() => updatePosition());
      return;
    }

    let top = 0;
    let left = 0;
    let currentPlacement = placement();

    // Add small gap between trigger and menu (4px)
    const gap = 4;

    // Calculate initial position based on placement
    switch (placement()) {
      case 'bottom-start':
        top = triggerRect.bottom + gap;
        left = triggerRect.left;
        break;
      case 'bottom-end':
        top = triggerRect.bottom + gap;
        left = triggerRect.right - menuRect.width;
        break;
      case 'top-start':
        top = triggerRect.top - menuRect.height - gap;
        left = triggerRect.left;
        break;
      case 'top-end':
        top = triggerRect.top - menuRect.height - gap;
        left = triggerRect.right - menuRect.width;
        break;
      case 'right-start':
        top = triggerRect.top;
        left = triggerRect.right + gap;
        break;
      case 'left-start':
        top = triggerRect.top;
        left = triggerRect.left - menuRect.width - gap;
        break;
    }

    // Auto-flip if enabled
    if (autoFlip()) {
      const wouldOverflowBottom = top + menuRect.height > viewportHeight;
      const hasSpaceAbove = triggerRect.top - menuRect.height - gap >= 0;
      const wouldOverflowTop = top < 0;
      const hasSpaceBelow = triggerRect.bottom + menuRect.height + gap <= viewportHeight;
      const wouldOverflowRight = left + menuRect.width > viewportWidth;
      const hasSpaceOnLeft = triggerRect.left - menuRect.width - gap >= 0;
      const wouldOverflowLeft = left < 0;
      const hasSpaceOnRight = triggerRect.right + menuRect.width + gap <= viewportWidth;

      // Flip vertically (bottom <-> top)
      if (currentPlacement.startsWith('bottom') && wouldOverflowBottom && hasSpaceAbove) {
        currentPlacement = currentPlacement.replace('bottom', 'top') as typeof currentPlacement;
        top = triggerRect.top - menuRect.height - gap;
      } else if (currentPlacement.startsWith('top') && wouldOverflowTop && hasSpaceBelow) {
        currentPlacement = currentPlacement.replace('top', 'bottom') as typeof currentPlacement;
        top = triggerRect.bottom + gap;
      }

      // Flip horizontally (right <-> left) for side placements
      if (currentPlacement === 'right-start' && wouldOverflowRight && hasSpaceOnLeft) {
        currentPlacement = 'left-start';
        left = triggerRect.left - menuRect.width - gap;
      } else if (currentPlacement === 'left-start' && wouldOverflowLeft && hasSpaceOnRight) {
        currentPlacement = 'right-start';
        left = triggerRect.right + gap;
      }

      // Flip horizontally (start <-> end) for top/bottom placements
      if (currentPlacement.endsWith('-start') && wouldOverflowRight && !wouldOverflowLeft) {
        if (currentPlacement.startsWith('bottom') || currentPlacement.startsWith('top')) {
          currentPlacement = currentPlacement.replace('-start', '-end') as typeof currentPlacement;
          left = triggerRect.right - menuRect.width;
        }
      } else if (currentPlacement.endsWith('-end') && wouldOverflowLeft && !wouldOverflowRight) {
        if (currentPlacement.startsWith('bottom') || currentPlacement.startsWith('top')) {
          currentPlacement = currentPlacement.replace('-end', '-start') as typeof currentPlacement;
          left = triggerRect.left;
        }
      }
    }

    setPosition({ top, left });
    setFinalPlacement(currentPlacement);
    setIsPositioned(true);
  };

  const handleTriggerClick = (e: MouseEvent) => {
    if (openOn() === 'click' || openOn() === 'both') {
      e.preventDefault();
      e.stopPropagation();
      setOpen(!isOpen());
    }
  };

  const handleTriggerContextMenu = (e: MouseEvent) => {
    if (openOn() === 'contextmenu' || openOn() === 'both') {
      e.preventDefault();
      e.stopPropagation();
      setOpen(true);
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (!menuRef || !triggerRef) return;
    const target = e.target as Node;
    if (!menuRef.contains(target) && !triggerRef.contains(target)) {
      setOpen(false);
    }
  };

  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen()) {
      e.preventDefault();
      setOpen(false);
    }
  };

  onMount(() => {
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    // Add scroll and resize listeners if anchored
    if (anchored()) {
      window.addEventListener('scroll', updatePosition, true); // Use capture to catch all scroll events
      window.addEventListener('resize', updatePosition);
    }

    onCleanup(() => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      if (anchored()) {
        window.removeEventListener('scroll', updatePosition, true);
        window.removeEventListener('resize', updatePosition);
      }
    });
  });

  // Update position when menu opens - use double requestAnimationFrame for accurate dimensions
  createEffect(() => {
    if (isOpen() && menuRef) {
      // Reset positioned state
      setIsPositioned(false);
      // Double RAF ensures layout is complete
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          updatePosition();
        });
      });
    }
  });

  const resolved = resolveChildren(() => local.children);

  const menuClasses = () => {
    const classes = ['menu'];
    classes.push(`menu--${variant()}`);
    if (size() !== 'normal') {
      classes.push(`menu--${size()}`);
    }
    classes.push(`menu--${finalPlacement()}`);
    if (local.class) {
      classes.push(local.class);
    }
    return classes.join(' ');
  };

  return (
    <>
      <div
        ref={triggerRef}
        class="menu__trigger"
        onClick={handleTriggerClick}
        onContextMenu={handleTriggerContextMenu}
      >
        {local.trigger}
      </div>

      <Show when={isOpen()}>
        <Portal>
          <div
            ref={menuRef}
            class={menuClasses()}
            style={{
              top: `${position().top}px`,
              left: `${position().left}px`,
              opacity: isPositioned() ? 1 : 0,
              transition: isPositioned() ? 'opacity 0.1s ease' : 'none',
            }}
          >
            {resolved()}
          </div>
        </Portal>
      </Show>
    </>
  );
};

// Helper components
export const MenuItem: Component<{
  children: JSX.Element;
  onClick?: () => void;
  disabled?: boolean;
  submenu?: JSX.Element;
  class?: string;
}> = (props) => {
  const [local] = splitProps(props, ['children', 'onClick', 'disabled', 'submenu', 'class']);

  const [isHovered, setIsHovered] = createSignal(false);
  const [submenuPosition, setSubmenuPosition] = createSignal({ top: 0, left: 0 });
  let itemRef: HTMLButtonElement | undefined;
  let submenuRef: HTMLDivElement | undefined;

  const updateSubmenuPosition = () => {
    if (!itemRef || !submenuRef) return;

    const itemRect = itemRef.getBoundingClientRect();
    const submenuRect = submenuRef.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const gap = 4;
    let top = itemRect.top;
    let left = itemRect.right + gap;

    // Flip to left if no space on right
    if (left + submenuRect.width > viewportWidth && itemRect.left - submenuRect.width - gap >= 0) {
      left = itemRect.left - submenuRect.width - gap;
    }

    // Adjust vertically if submenu would overflow viewport
    if (top + submenuRect.height > viewportHeight) {
      top = Math.max(0, viewportHeight - submenuRect.height - 8);
    }

    setSubmenuPosition({ top, left });
  };

  createEffect(() => {
    if (isHovered() && submenuRef) {
      updateSubmenuPosition();
    }
  });

  const handleMouseEnter = () => {
    if (local.submenu && !local.disabled) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = (e: MouseEvent) => {
    if (local.submenu) {
      // Don't close menu if item has submenu
      e.stopPropagation();
    }
    local.onClick?.();
  };

  return (
    <>
      <button
        ref={itemRef}
        class={`menu__item${local.disabled ? ' menu__item--disabled' : ''}${local.submenu ? ' menu__item--has-submenu' : ''}${local.class ? ' ' + local.class : ''}`}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        disabled={local.disabled}
      >
        {local.children}
        <Show when={local.submenu}>
          <BsChevronRight class="menu__item-chevron" />
        </Show>
      </button>

      <Show when={local.submenu && isHovered()}>
        <Portal>
          <div
            ref={submenuRef}
            class="menu menu--submenu"
            style={{
              top: `${submenuPosition().top}px`,
              left: `${submenuPosition().left}px`,
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {local.submenu}
          </div>
        </Portal>
      </Show>
    </>
  );
};

export const MenuSeparator: Component = () => {
  return <div class="menu__separator" />;
};
