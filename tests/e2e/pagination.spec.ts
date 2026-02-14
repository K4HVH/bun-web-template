import { test, expect } from '@playwright/test';

test.describe('Pagination component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');

    // Navigate to the Pagination demo section via sidebar
    await page.evaluate(() => {
      const activeContent = document.querySelector('.pane--permanent .pane__content--active');
      const tabs = activeContent!.querySelectorAll<HTMLButtonElement>('[role="tab"]');
      for (const t of tabs) {
        if (t.getAttribute('aria-label') === 'Pagination' || t.textContent?.trim() === 'Pagination') {
          t.click();
          return;
        }
      }
    });
  });

  test('renders pagination with page numbers', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Pagination Component Examples', exact: true })).toBeVisible();

    // Wait for the basic pagination card
    const basicCard = page.locator('.card', { hasText: 'Basic Pagination' }).first();
    await basicCard.scrollIntoViewIfNeeded();

    // Get pagination within this card
    const nav = basicCard.locator('nav[aria-label="Pagination"]');
    await expect(nav).toBeVisible();

    // Should have page buttons
    await expect(nav.getByLabel('Go to page 1', { exact: true })).toBeVisible();
    await expect(nav.getByLabel('Go to page 2', { exact: true })).toBeVisible();
  });

  // Skipping this test due to environmental issues - unit tests cover this functionality
  test('navigates to different page when button clicked', async ({ page }) => {
    // Scroll to top first
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(100);

    // Wait for the basic pagination card
    const basicCard = page.locator('.card', { hasText: 'Basic Pagination' }).first();
    await basicCard.scrollIntoViewIfNeeded();
    await page.waitForTimeout(100);

    const nav = basicCard.locator('nav[aria-label="Pagination"]');

    // Wait for page 2 button to be available (page 2 is always visible when on page 1)
    const page2Button = nav.getByLabel('Go to page 2', { exact: true });
    await expect(page2Button).toBeVisible();

    // Click page 2
    await page2Button.click();

    // Wait for state update
    await page.waitForTimeout(200);

    // Now page 2 should be active
    await expect(nav.getByLabel('Go to page 2', { exact: true })).toHaveAttribute('aria-current', 'page');

    // Current page text should update
    await expect(basicCard.getByText('Current page: 2')).toBeVisible();
  });

  test('prev and next buttons work correctly', async ({ page }) => {
    const basicCard = page.locator('.card', { hasText: 'Basic Pagination' }).first();
    await basicCard.scrollIntoViewIfNeeded();

    const nav = basicCard.locator('nav[aria-label="Pagination"]');

    // Initially on page 1, prev should be disabled
    const prevButton = nav.getByLabel('Go to previous page');
    const nextButton = nav.getByLabel('Go to next page');

    await expect(prevButton).toBeDisabled();

    // Click next
    await nextButton.click();
    await page.waitForTimeout(100);

    // Should now be on page 2
    await expect(basicCard.getByText('Current page: 2')).toBeVisible();

    // Prev should now be enabled
    await expect(prevButton).not.toBeDisabled();

    // Click prev
    await prevButton.click();
    await page.waitForTimeout(100);

    // Should be back on page 1
    await expect(basicCard.getByText('Current page: 1')).toBeVisible();
  });

  test('first and last buttons work correctly', async ({ page }) => {
    const basicCard = page.locator('.card', { hasText: 'Basic Pagination' }).first();
    await basicCard.scrollIntoViewIfNeeded();

    const nav = basicCard.locator('nav[aria-label="Pagination"]');

    const firstButton = nav.getByLabel('Go to first page');
    const lastButton = nav.getByLabel('Go to last page');

    // First should be disabled on page 1
    await expect(firstButton).toBeDisabled();

    // Click last button
    await lastButton.click();
    await page.waitForTimeout(100);

    // Should be on page 10
    await expect(basicCard.getByText('Current page: 10')).toBeVisible();

    // Last should now be disabled
    await expect(lastButton).toBeDisabled();

    // Click first button
    await firstButton.click();
    await page.waitForTimeout(100);

    // Should be back on page 1
    await expect(basicCard.getByText('Current page: 1')).toBeVisible();
  });

  test('shows ellipsis for large page ranges', async ({ page }) => {
    const variantsCard = page.locator('.card', { hasText: 'Variants' }).first();
    await variantsCard.scrollIntoViewIfNeeded();

    // This pagination has 10 pages, should show ellipsis
    const nav = variantsCard.locator('nav[aria-label="Pagination"]').first();

    // Should have ellipsis characters (at least one)
    await expect(nav.getByText('…').first()).toBeVisible();

    // Should show page 1
    await expect(nav.getByLabel('Go to page 1', { exact: true })).toBeVisible();

    // Should show page 10
    await expect(nav.getByLabel('Go to page 10', { exact: true })).toBeVisible();
  });

  test('variant classes are applied correctly', async ({ page }) => {
    const variantsCard = page.locator('.card', { hasText: 'Variants' }).first();
    await variantsCard.scrollIntoViewIfNeeded();

    // Primary variant
    const primaryNav = variantsCard.locator('nav[aria-label="Pagination"]').first();
    await expect(primaryNav).toHaveClass(/pagination--primary/);

    // Secondary variant
    const secondaryNav = variantsCard.locator('nav[aria-label="Pagination"]').nth(1);
    await expect(secondaryNav).toHaveClass(/pagination--secondary/);

    // Subtle variant
    const subtleNav = variantsCard.locator('nav[aria-label="Pagination"]').nth(2);
    await expect(subtleNav).toHaveClass(/pagination--subtle/);
  });

  test('size variants are applied correctly', async ({ page }) => {
    const sizesCard = page.locator('.card', { hasText: 'Sizes' }).first();
    await sizesCard.scrollIntoViewIfNeeded();

    // Compact size
    const compactNav = sizesCard.locator('nav[aria-label="Pagination"]').first();
    await expect(compactNav).toHaveClass(/pagination--compact/);

    // Normal size (default, no class)
    const normalNav = sizesCard.locator('nav[aria-label="Pagination"]').nth(1);
    await expect(normalNav).not.toHaveClass(/pagination--compact/);
  });

  test('hides first/last buttons when showFirstLast is false', async ({ page }) => {
    const card = page.locator('.card', { hasText: 'Navigation Controls' });
    await card.scrollIntoViewIfNeeded();

    // Find the specific section by its heading and get the nav within that section only
    const section = card.locator('h3:has-text("Without First/Last Buttons")').locator('..');
    const nav = section.locator('nav[aria-label="Pagination"]');

    // First and last buttons should not be present
    await expect(nav.getByLabel('Go to first page')).not.toBeVisible();
    await expect(nav.getByLabel('Go to last page')).not.toBeVisible();

    // Prev and next should still be present
    await expect(nav.getByLabel('Go to previous page')).toBeVisible();
    await expect(nav.getByLabel('Go to next page')).toBeVisible();
  });

  test('custom sibling count affects visible pages', async ({ page }) => {
    const card = page.locator('.card', { hasText: 'Custom Sibling Count' });
    await card.scrollIntoViewIfNeeded();

    // siblingCount=0 (only current page visible in middle)
    const nav0 = card.locator('nav[aria-label="Pagination"]').first();

    // Should have fewer page numbers visible
    // With siblingCount=0 and current=5, should show: 1 ... 5 ... 20
    await expect(nav0.getByLabel('Go to page 1', { exact: true })).toBeVisible();
    await expect(nav0.getByLabel('Go to page 5', { exact: true })).toBeVisible();
    await expect(nav0.getByLabel('Go to page 20', { exact: true })).toBeVisible();

    // Page 4 and 6 should not be visible (siblingCount=0)
    await expect(nav0.getByLabel('Go to page 4', { exact: true })).not.toBeVisible();
    await expect(nav0.getByLabel('Go to page 6', { exact: true })).not.toBeVisible();
  });

  test('disabled pagination disables all buttons', async ({ page }) => {
    const card = page.locator('.card', { hasText: 'Edge Cases' });
    await card.scrollIntoViewIfNeeded();

    // Find the disabled pagination
    const disabledNav = card.locator('.pagination--disabled');
    await expect(disabledNav).toBeVisible();

    // All buttons should be disabled
    const buttons = disabledNav.locator('button');
    const count = await buttons.count();

    for (let i = 0; i < count; i++) {
      await expect(buttons.nth(i)).toBeDisabled();
    }
  });

  test('single page shows only one button', async ({ page }) => {
    const card = page.locator('.card', { hasText: 'Edge Cases' });
    await card.scrollIntoViewIfNeeded();

    // Find the single page pagination (first one in edge cases)
    const singlePageNav = card.locator('nav[aria-label="Pagination"]').first();

    // Should have page 1
    await expect(singlePageNav.getByLabel('Go to page 1', { exact: true })).toBeVisible();

    // Should not have page 2
    await expect(singlePageNav.getByLabel('Go to page 2', { exact: true })).not.toBeVisible();

    // Prev and next should be disabled
    await expect(singlePageNav.getByLabel('Go to previous page')).toBeDisabled();
    await expect(singlePageNav.getByLabel('Go to next page')).toBeDisabled();
  });

  test('handles large page counts efficiently', async ({ page }) => {
    const card = page.locator('.card', { hasText: 'Large Page Count' });
    await card.scrollIntoViewIfNeeded();

    const nav = card.locator('nav[aria-label="Pagination"]');

    // Should show page 1
    await expect(nav.getByLabel('Go to page 1', { exact: true })).toBeVisible();

    // Should show current page (50)
    await expect(nav.getByLabel('Go to page 50', { exact: true })).toBeVisible();

    // Should show last page (100)
    await expect(nav.getByLabel('Go to page 100', { exact: true })).toBeVisible();

    // Should have ellipsis
    await expect(nav.getByText('…').first()).toBeVisible();

    // Most pages should not be visible (e.g., page 25)
    await expect(nav.getByLabel('Go to page 25', { exact: true })).not.toBeVisible();
  });
});
