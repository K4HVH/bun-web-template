import { test, expect } from '@playwright/test';

test.describe('Breadcrumbs component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');

    // Navigate to the Breadcrumbs demo section via sidebar
    await page.evaluate(() => {
      const activeContent = document.querySelector('.pane--permanent .pane__content--active');
      const tabs = activeContent!.querySelectorAll<HTMLButtonElement>('[role="tab"]');
      for (const t of tabs) {
        if (t.getAttribute('aria-label') === 'Breadcrumbs' || t.textContent?.trim() === 'Breadcrumbs') {
          t.click();
          return;
        }
      }
    });
  });

  test('renders breadcrumb navigation', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Breadcrumbs Component Examples', exact: true })).toBeVisible();

    // Wait for the basic breadcrumbs card
    const basicCard = page.locator('.card', { hasText: 'Basic Breadcrumbs' }).first();
    await basicCard.scrollIntoViewIfNeeded();

    // Get breadcrumbs within this card
    const nav = basicCard.locator('nav[aria-label="Breadcrumb"]');
    await expect(nav).toBeVisible();

    // Should have all breadcrumb items
    await expect(nav.getByText('Home')).toBeVisible();
    await expect(nav.getByText('Products')).toBeVisible();
    await expect(nav.getByText('Electronics')).toBeVisible();
    await expect(nav.getByText('Laptops')).toBeVisible();
  });

  test('last item is current page and not clickable', async ({ page }) => {
    const basicCard = page.locator('.card', { hasText: 'Basic Breadcrumbs' }).first();
    await basicCard.scrollIntoViewIfNeeded();

    const nav = basicCard.locator('nav[aria-label="Breadcrumb"]');

    // Last item should be a span, not a link
    const lastItem = nav.locator('li.breadcrumbs__item--current');
    await expect(lastItem).toBeVisible();
    await expect(lastItem.getByText('Laptops')).toBeVisible();

    // Check it's not a link
    const lastItemContent = lastItem.locator('.breadcrumbs__link--current');
    await expect(lastItemContent).toBeVisible();

    // Verify it's not an <a> tag (should be <span>)
    const tagName = await lastItemContent.evaluate((el) => el.tagName);
    expect(tagName).toBe('SPAN');
  });

  test('non-last items are clickable links', async ({ page }) => {
    const basicCard = page.locator('.card', { hasText: 'Basic Breadcrumbs' }).first();
    await basicCard.scrollIntoViewIfNeeded();

    const nav = basicCard.locator('nav[aria-label="Breadcrumb"]');

    // First three items should be links
    const homeLink = nav.getByText('Home').locator('..');
    const productsLink = nav.getByText('Products').locator('..');
    const electronicsLink = nav.getByText('Electronics').locator('..');

    // Verify they're <a> tags
    const homeTag = await homeLink.evaluate((el) => el.tagName);
    const productsTag = await productsLink.evaluate((el) => el.tagName);
    const electronicsTag = await electronicsLink.evaluate((el) => el.tagName);

    expect(homeTag).toBe('A');
    expect(productsTag).toBe('A');
    expect(electronicsTag).toBe('A');
  });

  test('displays chevron separators between items', async ({ page }) => {
    const basicCard = page.locator('.card', { hasText: 'Basic Breadcrumbs' }).first();
    await basicCard.scrollIntoViewIfNeeded();

    const nav = basicCard.locator('nav[aria-label="Breadcrumb"]');

    // Should have separators (one fewer than total items)
    const separators = nav.locator('.breadcrumbs__separator');
    const count = await separators.count();

    // 4 items should have 3 separators
    expect(count).toBe(3);
  });

  test('renders different variants', async ({ page }) => {
    const variantsCard = page.locator('.card', { hasText: 'Variants' }).first();
    await variantsCard.scrollIntoViewIfNeeded();

    // Check for variant classes
    const primaryBreadcrumbs = variantsCard.locator('.breadcrumbs--primary').first();
    const secondaryBreadcrumbs = variantsCard.locator('.breadcrumbs--secondary').first();
    const subtleBreadcrumbs = variantsCard.locator('.breadcrumbs--subtle').first();

    await expect(primaryBreadcrumbs).toBeVisible();
    await expect(secondaryBreadcrumbs).toBeVisible();
    await expect(subtleBreadcrumbs).toBeVisible();
  });

  test('renders different sizes', async ({ page }) => {
    const sizesCard = page.locator('.card', { hasText: 'Sizes' }).first();
    await sizesCard.scrollIntoViewIfNeeded();

    // Check for size classes
    const compactBreadcrumbs = sizesCard.locator('.breadcrumbs--compact').first();
    const normalBreadcrumbs = sizesCard.locator('.breadcrumbs').nth(1); // Second one
    const spaciousBreadcrumbs = sizesCard.locator('.breadcrumbs--spacious').first();

    await expect(compactBreadcrumbs).toBeVisible();
    await expect(normalBreadcrumbs).toBeVisible();
    await expect(spaciousBreadcrumbs).toBeVisible();
  });

  test('displays icons on breadcrumb items', async ({ page }) => {
    const iconsCard = page.locator('.card', { hasText: 'With Icons' }).first();
    await iconsCard.scrollIntoViewIfNeeded();

    const nav = iconsCard.locator('nav[aria-label="Breadcrumb"]').first();

    // Should have icons
    const icons = nav.locator('.breadcrumbs__icon');
    const count = await icons.count();

    // First example has icons on some items
    expect(count).toBeGreaterThan(0);
  });

  test('collapses middle items with ellipsis when maxItems is set', async ({ page }) => {
    const collapsedCard = page.locator('.card', { hasText: 'Collapsed Navigation' }).first();
    await collapsedCard.scrollIntoViewIfNeeded();

    const nav = collapsedCard.locator('nav[aria-label="Breadcrumb"]').first();

    // Should show ellipsis
    await expect(nav.getByText('…')).toBeVisible();

    // Should show first item
    await expect(nav.getByText('Root')).toBeVisible();

    // Should show last items based on maxItems
    await expect(nav.getByText('Final')).toBeVisible();

    // Middle items should not be visible
    await expect(nav.getByText('Documents')).not.toBeVisible();
    await expect(nav.getByText('Work')).not.toBeVisible();
  });

  test('disabled items are not clickable', async ({ page }) => {
    const disabledCard = page.locator('.card', { hasText: 'Disabled States' }).first();
    await disabledCard.scrollIntoViewIfNeeded();

    const nav = disabledCard.locator('nav[aria-label="Breadcrumb"]').first();

    // Find the disabled item (Products)
    const disabledItem = nav.locator('.breadcrumbs__item--disabled');
    await expect(disabledItem).toBeVisible();

    // Check it has aria-disabled
    const disabledLink = disabledItem.locator('a[aria-disabled="true"]');
    await expect(disabledLink).toBeVisible();
  });

  test('entire breadcrumb can be disabled', async ({ page }) => {
    const disabledCard = page.locator('.card', { hasText: 'Disabled States' }).first();
    await disabledCard.scrollIntoViewIfNeeded();

    // Second example should be completely disabled
    const disabledBreadcrumbs = disabledCard.locator('.breadcrumbs--disabled');
    await expect(disabledBreadcrumbs).toBeVisible();
  });

  test('renders single item without separator', async ({ page }) => {
    const edgeCasesCard = page.locator('.card', { hasText: 'Edge Cases' }).first();
    await edgeCasesCard.scrollIntoViewIfNeeded();

    const nav = edgeCasesCard.locator('nav[aria-label="Breadcrumb"]').first();

    // Should have Home item
    await expect(nav.getByText('Home')).toBeVisible();

    // Should have no separators in this breadcrumb
    const separators = nav.locator('.breadcrumbs__separator');
    const count = await separators.count();
    expect(count).toBe(0);
  });

  test('renders ordered list structure', async ({ page }) => {
    const basicCard = page.locator('.card', { hasText: 'Basic Breadcrumbs' }).first();
    await basicCard.scrollIntoViewIfNeeded();

    const nav = basicCard.locator('nav[aria-label="Breadcrumb"]');
    const ol = nav.locator('ol.breadcrumbs__list');

    await expect(ol).toBeVisible();

    // Should have list items
    const items = ol.locator('li');
    const count = await items.count();
    expect(count).toBeGreaterThan(0);
  });

  test('real-world e-commerce example renders correctly', async ({ page }) => {
    const realWorldCard = page.locator('.card', { hasText: 'Real-world Examples' }).first();
    await realWorldCard.scrollIntoViewIfNeeded();

    const nav = realWorldCard.locator('nav[aria-label="Breadcrumb"]').first();

    // E-commerce path
    await expect(nav.getByText('Home', { exact: true })).toBeVisible();
    await expect(nav.getByText('Men', { exact: true })).toBeVisible();
    await expect(nav.getByText('Clothing', { exact: true })).toBeVisible();
    await expect(nav.getByText('Shirts', { exact: true })).toBeVisible();
    await expect(nav.getByText('Casual Shirts', { exact: true })).toBeVisible();
  });

  test('file system example shows folder icons', async ({ page }) => {
    const iconsCard = page.locator('.card', { hasText: 'With Icons' }).first();
    await iconsCard.scrollIntoViewIfNeeded();

    // Find the file system navigation subsection
    const fileSystemSection = iconsCard.locator('h3', { hasText: 'File system navigation' });
    await expect(fileSystemSection).toBeVisible();

    // Get the breadcrumb after this heading
    const nav = iconsCard.locator('nav[aria-label="Breadcrumb"]').nth(1);

    // Should have icons
    const icons = nav.locator('.breadcrumbs__icon');
    const count = await icons.count();
    expect(count).toBeGreaterThan(0);
  });

  test('maxItems=3 shows correct items', async ({ page }) => {
    const collapsedCard = page.locator('.card', { hasText: 'Collapsed Navigation' }).first();
    await collapsedCard.scrollIntoViewIfNeeded();

    // Find the maxItems=3 subsection
    const maxItems3Section = collapsedCard.locator('h3', { hasText: 'maxItems=3' });
    await expect(maxItems3Section).toBeVisible();

    // Get the breadcrumb for maxItems=3 (should be second nav in this card)
    const nav = collapsedCard.locator('nav[aria-label="Breadcrumb"]').nth(1);

    // Should show: Root ... Reports, Final (first item, ellipsis, last 2 items)
    await expect(nav.getByText('Root')).toBeVisible();
    await expect(nav.getByText('…')).toBeVisible();
    await expect(nav.getByText('Reports')).toBeVisible();
    await expect(nav.getByText('Final')).toBeVisible();

    // Middle items should be hidden
    await expect(nav.getByText('Documents')).not.toBeVisible();
    await expect(nav.getByText('Work')).not.toBeVisible();
  });

  test('full path shows all items without ellipsis', async ({ page }) => {
    const collapsedCard = page.locator('.card', { hasText: 'Collapsed Navigation' }).first();
    await collapsedCard.scrollIntoViewIfNeeded();

    // Find the full path subsection
    const fullPathSection = collapsedCard.locator('h3', { hasText: 'Full path' });
    await expect(fullPathSection).toBeVisible();

    // Get the breadcrumb for full path (should be third nav in this card)
    const nav = collapsedCard.locator('nav[aria-label="Breadcrumb"]').nth(2);

    // Should show all items
    await expect(nav.getByText('Root')).toBeVisible();
    await expect(nav.getByText('Documents')).toBeVisible();
    await expect(nav.getByText('Work')).toBeVisible();
    await expect(nav.getByText('Projects')).toBeVisible();
    await expect(nav.getByText('2024')).toBeVisible();
    await expect(nav.getByText('Q1')).toBeVisible();
    await expect(nav.getByText('Reports')).toBeVisible();
    await expect(nav.getByText('Final')).toBeVisible();

    // Should not have ellipsis
    await expect(nav.getByText('…')).not.toBeVisible();
  });
});
