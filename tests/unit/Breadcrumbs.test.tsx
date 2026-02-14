import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@solidjs/testing-library';
import { Router, Route } from '@solidjs/router';
import { Breadcrumbs, type BreadcrumbItem } from '../../src/components/navigation/Breadcrumbs';
import { BsHouseDoor, BsFolder, BsSlash } from 'solid-icons/bs';

// Helper to wrap components in Router with Route
const renderWithRouter = (ui: () => any) => {
  return render(() => (
    <Router>
      <Route path="/" component={() => ui()} />
    </Router>
  ));
};

describe('Breadcrumbs', () => {
  const basicItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Electronics', href: '/electronics' },
  ];

  it('renders breadcrumb items', () => {
    renderWithRouter(() => <Breadcrumbs items={basicItems} />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Electronics')).toBeInTheDocument();
  });

  it('renders last item as current page with aria-current', () => {
    renderWithRouter(() => <Breadcrumbs items={basicItems} />);

    const currentItem = screen.getByText('Electronics').closest('li');
    expect(currentItem).toHaveClass('breadcrumbs__item--current');

    const currentLink = currentItem?.querySelector('.breadcrumbs__link--current');
    expect(currentLink).toBeInTheDocument();
    expect(currentLink).toHaveAttribute('aria-current', 'page');
  });

  it('renders non-last items as links', () => {
    renderWithRouter(() => <Breadcrumbs items={basicItems} />);

    const homeLink = screen.getByText('Home').closest('a');
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');

    const productsLink = screen.getByText('Products').closest('a');
    expect(productsLink).toBeInTheDocument();
    expect(productsLink).toHaveAttribute('href', '/products');
  });

  it('renders separators between items', () => {
    renderWithRouter(() => <Breadcrumbs items={basicItems} />);

    const separators = document.querySelectorAll('.breadcrumbs__separator');
    // Should have 2 separators for 3 items (between items, not after last)
    expect(separators).toHaveLength(2);
  });

  it('does not render separator after last item', () => {
    renderWithRouter(() => <Breadcrumbs items={[{ label: 'Home', href: '/' }]} />);

    const separators = document.querySelectorAll('.breadcrumbs__separator');
    expect(separators).toHaveLength(0);
  });

  it('renders items with icons', () => {
    const itemsWithIcons: BreadcrumbItem[] = [
      { label: 'Home', href: '/', icon: BsHouseDoor },
      { label: 'Documents', href: '/docs', icon: BsFolder },
    ];

    renderWithRouter(() => <Breadcrumbs items={itemsWithIcons} />);

    const icons = document.querySelectorAll('.breadcrumbs__icon');
    expect(icons).toHaveLength(2);
  });

  it('collapses middle items when maxItems is set', () => {
    const longPath: BreadcrumbItem[] = [
      { label: 'Home', href: '/' },
      { label: 'Level 1', href: '/l1' },
      { label: 'Level 2', href: '/l2' },
      { label: 'Level 3', href: '/l3' },
      { label: 'Level 4', href: '/l4' },
      { label: 'Current', href: '/current' },
    ];

    renderWithRouter(() => <Breadcrumbs items={longPath} maxItems={3} />);

    // Should show: Home ... Level 4, Current
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Level 4')).toBeInTheDocument();
    expect(screen.getByText('Current')).toBeInTheDocument();

    // Middle items should be collapsed
    expect(screen.queryByText('Level 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Level 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Level 3')).not.toBeInTheDocument();

    // Should have ellipsis
    expect(screen.getByText('…')).toBeInTheDocument();
  });

  it('shows all items when count is below maxItems', () => {
    renderWithRouter(() => <Breadcrumbs items={basicItems} maxItems={5} />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Electronics')).toBeInTheDocument();
    expect(screen.queryByText('…')).not.toBeInTheDocument();
  });

  it('disables individual items when disabled prop is set', () => {
    const itemsWithDisabled: BreadcrumbItem[] = [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products', disabled: true },
      { label: 'Electronics', href: '/electronics' },
    ];

    renderWithRouter(() => <Breadcrumbs items={itemsWithDisabled} />);

    const disabledItem = screen.getByText('Products').closest('li');
    expect(disabledItem).toHaveClass('breadcrumbs__item--disabled');

    const disabledLink = screen.getByText('Products').closest('a');
    expect(disabledLink).toHaveAttribute('aria-disabled', 'true');
  });

  it('prevents navigation when item is disabled', () => {
    const itemsWithDisabled: BreadcrumbItem[] = [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products', disabled: true },
      { label: 'Electronics', href: '/electronics' },
    ];

    renderWithRouter(() => <Breadcrumbs items={itemsWithDisabled} />);

    const disabledLink = screen.getByText('Products').closest('a')!;
    const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
    const preventDefaultSpy = vi.spyOn(clickEvent, 'preventDefault');

    disabledLink.dispatchEvent(clickEvent);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('disables all items when component disabled prop is true', () => {
    renderWithRouter(() => <Breadcrumbs items={basicItems} disabled />);

    const breadcrumbs = document.querySelector('.breadcrumbs');
    expect(breadcrumbs).toHaveClass('breadcrumbs--disabled');
  });

  it('applies variant classes', () => {
    const { unmount } = renderWithRouter(() => (
      <Breadcrumbs items={basicItems} variant="primary" />
    ));

    expect(document.querySelector('.breadcrumbs--primary')).toBeInTheDocument();

    unmount();

    renderWithRouter(() => <Breadcrumbs items={basicItems} variant="secondary" />);
    expect(document.querySelector('.breadcrumbs--secondary')).toBeInTheDocument();

    unmount();

    renderWithRouter(() => <Breadcrumbs items={basicItems} variant="subtle" />);
    expect(document.querySelector('.breadcrumbs--subtle')).toBeInTheDocument();
  });

  it('applies size classes', () => {
    const { unmount } = renderWithRouter(() => (
      <Breadcrumbs items={basicItems} size="compact" />
    ));

    expect(document.querySelector('.breadcrumbs--compact')).toBeInTheDocument();

    unmount();

    renderWithRouter(() => <Breadcrumbs items={basicItems} size="normal" />);
    expect(document.querySelector('.breadcrumbs')).toBeInTheDocument();
    expect(document.querySelector('.breadcrumbs--compact')).not.toBeInTheDocument();

    unmount();

    renderWithRouter(() => <Breadcrumbs items={basicItems} size="spacious" />);
    expect(document.querySelector('.breadcrumbs--spacious')).toBeInTheDocument();
  });

  it('applies custom class name', () => {
    renderWithRouter(() => (
      <Breadcrumbs items={basicItems} class="custom-breadcrumbs" />
    ));

    expect(document.querySelector('.custom-breadcrumbs')).toBeInTheDocument();
  });

  it('uses custom separator icon', () => {
    renderWithRouter(() => (
      <Breadcrumbs items={basicItems} separator={BsSlash} />
    ));

    // Should still have separators (hard to test icon component directly)
    const separators = document.querySelectorAll('.breadcrumbs__separator');
    expect(separators.length).toBeGreaterThan(0);
  });

  it('renders single item without separator', () => {
    renderWithRouter(() => (
      <Breadcrumbs items={[{ label: 'Home', href: '/', icon: BsHouseDoor }]} />
    ));

    expect(screen.getByText('Home')).toBeInTheDocument();
    const separators = document.querySelectorAll('.breadcrumbs__separator');
    expect(separators).toHaveLength(0);
  });

  it('renders ellipsis with separator', () => {
    const longPath: BreadcrumbItem[] = [
      { label: 'Home', href: '/' },
      { label: 'Level 1', href: '/l1' },
      { label: 'Level 2', href: '/l2' },
      { label: 'Current', href: '/current' },
    ];

    renderWithRouter(() => <Breadcrumbs items={longPath} maxItems={3} />);

    const ellipsisItem = document.querySelector('.breadcrumbs__item--ellipsis');
    expect(ellipsisItem).toBeInTheDocument();

    // Ellipsis item should have a separator
    const ellipsisItemSeparators = ellipsisItem?.querySelectorAll('.breadcrumbs__separator');
    expect(ellipsisItemSeparators?.length).toBeGreaterThan(0);
  });

  it('handles maxItems=4 correctly', () => {
    const longPath: BreadcrumbItem[] = [
      { label: 'Home', href: '/' },
      { label: 'Docs', href: '/docs' },
      { label: 'Work', href: '/work' },
      { label: 'Projects', href: '/projects' },
      { label: '2024', href: '/2024' },
      { label: 'Current', href: '/current' },
    ];

    renderWithRouter(() => <Breadcrumbs items={longPath} maxItems={4} />);

    // Should show: Home ... Projects, 2024, Current
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('2024')).toBeInTheDocument();
    expect(screen.getByText('Current')).toBeInTheDocument();
    expect(screen.getByText('…')).toBeInTheDocument();

    // Middle items should be hidden
    expect(screen.queryByText('Docs')).not.toBeInTheDocument();
    expect(screen.queryByText('Work')).not.toBeInTheDocument();
  });

  it('renders nav element with proper aria-label', () => {
    renderWithRouter(() => <Breadcrumbs items={basicItems} />);

    const nav = document.querySelector('nav[aria-label="Breadcrumb"]');
    expect(nav).toBeInTheDocument();
  });

  it('renders ordered list structure', () => {
    renderWithRouter(() => <Breadcrumbs items={basicItems} />);

    const ol = document.querySelector('.breadcrumbs__list');
    expect(ol?.tagName).toBe('OL');

    const listItems = ol?.querySelectorAll('li');
    expect(listItems).toHaveLength(3);
  });

  it('renders icons only on specified items', () => {
    const mixedItems: BreadcrumbItem[] = [
      { label: 'Home', href: '/', icon: BsHouseDoor },
      { label: 'Products', href: '/products' },
      { label: 'Electronics', href: '/electronics', icon: BsFolder },
    ];

    renderWithRouter(() => <Breadcrumbs items={mixedItems} />);

    const icons = document.querySelectorAll('.breadcrumbs__icon');
    // Should have 2 icons (Home and Electronics)
    expect(icons).toHaveLength(2);
  });
});
