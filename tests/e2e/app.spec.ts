import { test, expect } from '@playwright/test';

test.describe('Design System Test Page', () => {
  test('should load the test page', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'Design System Test Page' })).toBeVisible();
  });

  test('has correct title', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/Solid App/);
  });

  test('displays typography section', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'Typography Examples' })).toBeVisible();
  });

  test('displays card component examples', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'Card Component Examples' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Default Card' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Emphasized Card' })).toBeVisible();
  });

  test('displays checkbox component examples', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'Checkbox Component Examples' })).toBeVisible();
    await expect(page.getByText('Basic Checkboxes')).toBeVisible();
  });

  test('displays button component examples', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'Button Component Examples' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Primary Button' })).toBeVisible();
  });

  test('interactive button works', async ({ page }) => {
    await page.goto('/');

    // Find the specific "Click me" button in the Interactive Example section
    const button = page.getByRole('button', { name: 'Click me', exact: true }).first();
    await button.scrollIntoViewIfNeeded();

    // Setup dialog handler
    page.on('dialog', dialog => dialog.accept());

    await button.click();
  });

  test('displays combobox examples', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'Combobox Examples' })).toBeVisible();
  });
});
