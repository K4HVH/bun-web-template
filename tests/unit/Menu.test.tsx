import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@solidjs/testing-library';
import { Menu, MenuItem, MenuSeparator } from '../../src/components/navigation/Menu';
import { Button } from '../../src/components/inputs/Button';

describe('Menu', () => {
  it('renders trigger element', () => {
    render(() => (
      <Menu trigger={<Button>Open Menu</Button>}>
        <MenuItem>Item 1</MenuItem>
      </Menu>
    ));

    expect(screen.getByRole('button', { name: 'Open Menu' })).toBeInTheDocument();
  });

  it('menu is not visible initially', () => {
    render(() => (
      <Menu trigger={<Button>Open Menu</Button>}>
        <MenuItem>Item 1</MenuItem>
      </Menu>
    ));

    // Menu is rendered via Portal to document body
    expect(document.querySelector('.menu')).not.toBeInTheDocument();
  });

  it('opens menu on click', async () => {
    render(() => (
      <Menu trigger={<Button>Open Menu</Button>} openOn="click">
        <MenuItem>Item 1</MenuItem>
      </Menu>
    ));

    const trigger = screen.getByRole('button', { name: 'Open Menu' });
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(document.querySelector('.menu')).toBeInTheDocument();
    });
  });

  it('opens menu on right-click', async () => {
    render(() => (
      <Menu trigger={<div>Right-click me</div>} openOn="contextmenu">
        <MenuItem>Item 1</MenuItem>
      </Menu>
    ));

    const trigger = screen.getByText('Right-click me');
    fireEvent.contextMenu(trigger);

    await waitFor(() => {
      expect(document.querySelector('.menu')).toBeInTheDocument();
    });
  });

  it('opens menu on both click and right-click', async () => {
    render(() => (
      <Menu trigger={<Button>Both</Button>} openOn="both">
        <MenuItem>Item 1</MenuItem>
      </Menu>
    ));

    const trigger = screen.getByRole('button', { name: 'Both' });

    // Test click
    fireEvent.click(trigger);
    await waitFor(() => {
      expect(document.querySelector('.menu')).toBeInTheDocument();
    });

    // Close menu
    fireEvent.keyDown(document, { key: 'Escape' });
    await waitFor(() => {
      expect(document.querySelector('.menu')).not.toBeInTheDocument();
    });

    // Test right-click
    fireEvent.contextMenu(trigger);
    await waitFor(() => {
      expect(document.querySelector('.menu')).toBeInTheDocument();
    });
  });

  it('closes menu on click outside', async () => {
    render(() => (
      <div>
        <Menu trigger={<Button>Open Menu</Button>}>
          <MenuItem>Item 1</MenuItem>
        </Menu>
        <div data-testid="outside">Outside</div>
      </div>
    ));

    const trigger = screen.getByRole('button', { name: 'Open Menu' });
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(document.querySelector('.menu')).toBeInTheDocument();
    });

    const outside = screen.getByTestId('outside');
    fireEvent.mouseDown(outside);

    await waitFor(() => {
      expect(document.querySelector('.menu')).not.toBeInTheDocument();
    });
  });

  it('closes menu on Escape key', async () => {
    render(() => (
      <Menu trigger={<Button>Open Menu</Button>}>
        <MenuItem>Item 1</MenuItem>
      </Menu>
    ));

    const trigger = screen.getByRole('button', { name: 'Open Menu' });
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(document.querySelector('.menu')).toBeInTheDocument();
    });

    fireEvent.keyDown(document, { key: 'Escape' });

    await waitFor(() => {
      expect(document.querySelector('.menu')).not.toBeInTheDocument();
    });
  });

  it('renders menu items', async () => {
    render(() => (
      <Menu trigger={<Button>Open Menu</Button>}>
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Item 2</MenuItem>
        <MenuItem>Item 3</MenuItem>
      </Menu>
    ));

    const trigger = screen.getByRole('button', { name: 'Open Menu' });
    fireEvent.click(trigger);

    await waitFor(() => {
      // Menu items are buttons in Portal-rendered menu
      const items = document.querySelectorAll('.menu__item');
      expect(items).toHaveLength(3);
    });
  });

  it('calls onClick handler when menu item is clicked', async () => {
    const handleClick = vi.fn();

    render(() => (
      <Menu trigger={<Button>Open Menu</Button>}>
        <MenuItem onClick={handleClick}>Click me</MenuItem>
      </Menu>
    ));

    const trigger = screen.getByRole('button', { name: 'Open Menu' });
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(document.querySelector('.menu')).toBeInTheDocument();
    });

    const menuItem = Array.from(document.querySelectorAll('.menu__item')).find(
      (el) => el.textContent === 'Click me'
    ) as HTMLElement;

    fireEvent.click(menuItem);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disables menu item when disabled prop is true', async () => {
    render(() => (
      <Menu trigger={<Button>Open Menu</Button>}>
        <MenuItem disabled>Disabled Item</MenuItem>
      </Menu>
    ));

    const trigger = screen.getByRole('button', { name: 'Open Menu' });
    fireEvent.click(trigger);

    await waitFor(() => {
      const disabledItem = document.querySelector('.menu__item--disabled');
      expect(disabledItem).toBeInTheDocument();
      expect(disabledItem).toBeDisabled();
    });
  });

  it('renders menu separator', async () => {
    render(() => (
      <Menu trigger={<Button>Open Menu</Button>}>
        <MenuItem>Item 1</MenuItem>
        <MenuSeparator />
        <MenuItem>Item 2</MenuItem>
      </Menu>
    ));

    const trigger = screen.getByRole('button', { name: 'Open Menu' });
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(document.querySelector('.menu__separator')).toBeInTheDocument();
    });
  });

  it('applies variant classes correctly', async () => {
    const { unmount } = render(() => (
      <Menu trigger={<Button>Default</Button>} variant="default">
        <MenuItem>Item</MenuItem>
      </Menu>
    ));

    let trigger = screen.getByRole('button', { name: 'Default' });
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(document.querySelector('.menu--default')).toBeInTheDocument();
    });

    unmount();

    render(() => (
      <Menu trigger={<Button>Emphasized</Button>} variant="emphasized">
        <MenuItem>Item</MenuItem>
      </Menu>
    ));

    trigger = screen.getByRole('button', { name: 'Emphasized' });
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(document.querySelector('.menu--emphasized')).toBeInTheDocument();
    });
  });

  it('applies size classes correctly', async () => {
    const { unmount } = render(() => (
      <Menu trigger={<Button>Compact</Button>} size="compact">
        <MenuItem>Item</MenuItem>
      </Menu>
    ));

    let trigger = screen.getByRole('button', { name: 'Compact' });
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(document.querySelector('.menu--compact')).toBeInTheDocument();
    });

    unmount();

    render(() => (
      <Menu trigger={<Button>Spacious</Button>} size="spacious">
        <MenuItem>Item</MenuItem>
      </Menu>
    ));

    trigger = screen.getByRole('button', { name: 'Spacious' });
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(document.querySelector('.menu--spacious')).toBeInTheDocument();
    });
  });

  it('works with controlled state', async () => {
    let setOpen: (value: boolean) => void;
    const handleOpenChange = vi.fn((value: boolean) => {
      setOpen(value);
    });

    const TestComponent = () => {
      const [isOpen, setIsOpen] = (globalThis as any).createSignal(false);
      setOpen = setIsOpen;

      return (
        <Menu
          trigger={<Button>Controlled</Button>}
          open={isOpen()}
          onOpenChange={handleOpenChange}
        >
          <MenuItem>Item</MenuItem>
        </Menu>
      );
    };

    // Import createSignal
    const { createSignal } = await import('solid-js');
    (globalThis as any).createSignal = createSignal;

    render(() => <TestComponent />);

    expect(document.querySelector('.menu')).not.toBeInTheDocument();

    // Open programmatically
    setOpen!(true);

    await waitFor(() => {
      expect(document.querySelector('.menu')).toBeInTheDocument();
    });
  });

  it('renders submenu on hover', async () => {
    render(() => (
      <Menu trigger={<Button>Open Menu</Button>}>
        <MenuItem>Regular Item</MenuItem>
        <MenuItem
          submenu={() => (
            <>
              <MenuItem>Submenu Item 1</MenuItem>
              <MenuItem>Submenu Item 2</MenuItem>
            </>
          )}
        >
          Item with Submenu
        </MenuItem>
      </Menu>
    ));

    const trigger = screen.getByRole('button', { name: 'Open Menu' });
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(document.querySelector('.menu')).toBeInTheDocument();
    });

    // Find the item with submenu
    const itemWithSubmenu = Array.from(document.querySelectorAll('.menu__item')).find(
      (el) => el.classList.contains('menu__item--has-submenu')
    ) as HTMLElement;

    expect(itemWithSubmenu).toBeInTheDocument();

    // Hover over item
    fireEvent.mouseEnter(itemWithSubmenu);

    await waitFor(() => {
      // Should have both main menu and submenu
      const menus = document.querySelectorAll('.menu');
      expect(menus.length).toBeGreaterThanOrEqual(2);
    });
  });

  it('renders chevron icon for items with submenu', async () => {
    render(() => (
      <Menu trigger={<Button>Open Menu</Button>}>
        <MenuItem
          submenu={
            <>
              <MenuItem>Submenu Item</MenuItem>
            </>
          }
        >
          Has Submenu
        </MenuItem>
      </Menu>
    ));

    const trigger = screen.getByRole('button', { name: 'Open Menu' });
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(document.querySelector('.menu__item-chevron')).toBeInTheDocument();
    });
  });

  it('applies custom class name', async () => {
    render(() => (
      <Menu trigger={<Button>Open Menu</Button>} class="custom-menu">
        <MenuItem>Item</MenuItem>
      </Menu>
    ));

    const trigger = screen.getByRole('button', { name: 'Open Menu' });
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(document.querySelector('.custom-menu')).toBeInTheDocument();
    });
  });

  it('renders custom content', async () => {
    render(() => (
      <Menu trigger={<Button>Open Menu</Button>}>
        <div data-testid="custom-content">Custom Content</div>
      </Menu>
    ));

    const trigger = screen.getByRole('button', { name: 'Open Menu' });
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(document.querySelector('[data-testid="custom-content"]')).toBeInTheDocument();
    });
  });
});
