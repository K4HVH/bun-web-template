import { test, expect } from '@playwright/test';

test.describe('Accordion component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');

    // Navigate to the Accordion demo section via sidebar
    await page.evaluate(() => {
      const activeContent = document.querySelector('.pane--permanent .pane__content--active');
      const tabs = activeContent!.querySelectorAll<HTMLButtonElement>('[role="tab"]');
      for (const t of tabs) {
        if (t.getAttribute('aria-label') === 'Accordion' || t.textContent?.trim() === 'Accordion') {
          t.click();
          return;
        }
      }
    });

    const heading = page.getByRole('heading', { name: 'Accordion Component Examples', exact: true });
    await heading.scrollIntoViewIfNeeded();
  });

  test('renders accordion items with headers', async ({ page }) => {
    const firstCard = page.locator('.card').first();
    const buttons = firstCard.locator('.accordion__header');

    await expect(buttons).toHaveCount(3);
    await expect(buttons.nth(0)).toContainText('Introduction');
    await expect(buttons.nth(1)).toContainText('Features');
    await expect(buttons.nth(2)).toContainText('Usage');
  });

  test('exclusive mode - only one item open at a time', async ({ page }) => {
    const firstCard = page.locator('.card').first();
    const buttons = firstCard.locator('.accordion__header');

    // First item should be expanded by default
    await expect(buttons.nth(0)).toHaveAttribute('aria-expanded', 'true');
    await expect(buttons.nth(1)).toHaveAttribute('aria-expanded', 'false');

    // Click second item
    await buttons.nth(1).click();

    // Second should be expanded, first should be collapsed
    await expect(buttons.nth(0)).toHaveAttribute('aria-expanded', 'false');
    await expect(buttons.nth(1)).toHaveAttribute('aria-expanded', 'true');
  });

  test('toggle item by clicking header', async ({ page }) => {
    const firstCard = page.locator('.card').first();
    const firstButton = firstCard.locator('.accordion__header').first();

    // Should start expanded (based on defaultValue)
    await expect(firstButton).toHaveAttribute('aria-expanded', 'true');

    // Click to collapse
    await firstButton.click();
    await expect(firstButton).toHaveAttribute('aria-expanded', 'false');

    // Click to expand again
    await firstButton.click();
    await expect(firstButton).toHaveAttribute('aria-expanded', 'true');
  });

  test('keyboard navigation - Enter key', async ({ page }) => {
    const firstCard = page.locator('.card').first();
    const secondButton = firstCard.locator('.accordion__header').nth(1);

    // Focus and press Enter
    await secondButton.focus();
    await secondButton.press('Enter');

    // Should expand
    await expect(secondButton).toHaveAttribute('aria-expanded', 'true');
  });

  test('keyboard navigation - Space key', async ({ page }) => {
    const firstCard = page.locator('.card').first();
    const secondButton = firstCard.locator('.accordion__header').nth(1);

    // Focus and press Space
    await secondButton.focus();
    await secondButton.press(' ');

    // Should expand
    await expect(secondButton).toHaveAttribute('aria-expanded', 'true');
  });

  test('shows content when expanded', async ({ page }) => {
    const firstCard = page.locator('.card').first();
    const firstButton = firstCard.locator('.accordion__header').first();

    // Should show intro content (default expanded)
    await expect(firstCard.getByText('Welcome to the accordion component!')).toBeVisible();

    // Collapse it
    await firstButton.click();
    await expect(firstCard.getByText('Welcome to the accordion component!')).not.toBeVisible();
  });

  test('icon rotates when expanded', async ({ page }) => {
    const firstCard = page.locator('.card').first();
    const firstButton = firstCard.locator('.accordion__header').first();
    const icon = firstButton.locator('.accordion__icon');

    // Should have expanded class (default expanded)
    await expect(icon).toHaveClass(/accordion__icon--expanded/);

    // Collapse it
    await firstButton.click();
    await expect(icon).not.toHaveClass(/accordion__icon--expanded/);
  });
});
