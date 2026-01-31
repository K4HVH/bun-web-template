import { test, expect } from '@playwright/test';

test.describe('Dialog behavior', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');

    // Scroll to the Dialog section
    const dialogSection = page.locator('h2', { hasText: 'Dialog Component Examples' });
    await dialogSection.scrollIntoViewIfNeeded();
  });

  test('opens and closes basic dialog', async ({ page }) => {
    // Find and click the "Open Basic Dialog" button
    const openButton = page.locator('button', { hasText: 'Open Basic Dialog' });
    await openButton.click();

    // Dialog should be visible
    const dialog = page.locator('[role="dialog"]');
    await expect(dialog).toBeVisible();

    // Dialog should have correct title
    await expect(page.locator('.dialog__title', { hasText: 'Basic Dialog' })).toBeVisible();

    // Click the Cancel button inside the dialog footer to close
    const cancelButton = page.locator('.dialog__footer button', { hasText: 'Cancel' });
    await cancelButton.click();

    // Dialog should be hidden
    await expect(dialog).not.toBeVisible();
  });

  test('closes dialog when clicking backdrop', async ({ page }) => {
    // Open the basic dialog
    const openButton = page.locator('button', { hasText: 'Open Basic Dialog' });
    await openButton.click();

    // Wait for dialog to appear
    const dialog = page.locator('[role="dialog"]');
    await expect(dialog).toBeVisible();

    // Click the backdrop (not the dialog content)
    const backdrop = page.locator('.dialog__backdrop');
    await backdrop.click({ position: { x: 10, y: 10 } });

    // Dialog should be hidden
    await expect(dialog).not.toBeVisible();
  });

  test('closes dialog when pressing ESC key', async ({ page }) => {
    // Open the basic dialog
    const openButton = page.locator('button', { hasText: 'Open Basic Dialog' });
    await openButton.click();

    // Wait for dialog to appear
    const dialog = page.locator('[role="dialog"]');
    await expect(dialog).toBeVisible();

    // Press ESC key
    await page.keyboard.press('Escape');

    // Dialog should be hidden
    await expect(dialog).not.toBeVisible();
  });

  test('closes dialog when clicking close button', async ({ page }) => {
    // Open the basic dialog
    const openButton = page.locator('button', { hasText: 'Open Basic Dialog' });
    await openButton.click();

    // Wait for dialog to appear
    const dialog = page.locator('[role="dialog"]');
    await expect(dialog).toBeVisible();

    // Click the X close button
    const closeButton = page.locator('.dialog__close');
    await closeButton.click();

    // Dialog should be hidden
    await expect(dialog).not.toBeVisible();
  });

  test('small dialog has correct size class', async ({ page }) => {
    // Open the small dialog
    const openButton = page.locator('button', { hasText: 'Small Dialog' });
    await openButton.click();

    // Dialog should have small size class
    const dialog = page.locator('.dialog--small');
    await expect(dialog).toBeVisible();

    // Close it
    await page.keyboard.press('Escape');
  });

  test('large dialog has correct size class', async ({ page }) => {
    // Open the large dialog
    const openButton = page.locator('button', { hasText: 'Large Dialog' });
    await openButton.click();

    // Dialog should have large size class
    const dialog = page.locator('.dialog--large');
    await expect(dialog).toBeVisible();

    // Close it
    await page.keyboard.press('Escape');
  });

  test('fullscreen dialog has correct size class', async ({ page }) => {
    // Open the fullscreen dialog
    const openButton = page.locator('button', { hasText: 'Full Screen Dialog' });
    await openButton.click();

    // Dialog should have fullscreen size class
    const dialog = page.locator('.dialog--fullscreen');
    await expect(dialog).toBeVisible();

    // Close it
    await page.keyboard.press('Escape');
  });

  test('dialog with form displays form fields', async ({ page }) => {
    // Open the form dialog
    const openButton = page.locator('button', { hasText: 'Open Form Dialog' });
    await openButton.click();

    // Dialog should be visible
    const dialog = page.locator('[role="dialog"]');
    await expect(dialog).toBeVisible();

    // Check that form fields are present
    await expect(page.locator('label', { hasText: 'Full Name' })).toBeVisible();
    await expect(page.locator('label', { hasText: 'Email Address' })).toBeVisible();
    await expect(page.locator('label', { hasText: 'Phone Number' })).toBeVisible();
    await expect(page.locator('label', { hasText: 'Message' })).toBeVisible();

    // Close the dialog
    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();
  });

  test('dialog prevents body scroll when open', async ({ page }) => {
    // Get initial body overflow style
    const initialOverflow = await page.evaluate(() => document.body.style.overflow);

    // Open the basic dialog
    const openButton = page.locator('button', { hasText: 'Open Basic Dialog' });
    await openButton.click();

    // Wait for dialog to appear
    const dialog = page.locator('[role="dialog"]');
    await expect(dialog).toBeVisible();

    // Body should have overflow hidden
    const overflowWhenOpen = await page.evaluate(() => document.body.style.overflow);
    expect(overflowWhenOpen).toBe('hidden');

    // Close the dialog
    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();

    // Body overflow should be restored
    const overflowWhenClosed = await page.evaluate(() => document.body.style.overflow);
    expect(overflowWhenClosed).toBe(initialOverflow);
  });

  test('clicking dialog content does not close dialog', async ({ page }) => {
    // Open the basic dialog
    const openButton = page.locator('button', { hasText: 'Open Basic Dialog' });
    await openButton.click();

    // Wait for dialog to appear
    const dialog = page.locator('[role="dialog"]');
    await expect(dialog).toBeVisible();

    // Click the dialog content area (not the backdrop)
    await dialog.click();

    // Dialog should still be visible
    await expect(dialog).toBeVisible();

    // Close the dialog
    await page.keyboard.press('Escape');
  });

  test('dialog footer shows action buttons', async ({ page }) => {
    // Open the basic dialog
    const openButton = page.locator('button', { hasText: 'Open Basic Dialog' });
    await openButton.click();

    // Wait for dialog to appear
    const dialog = page.locator('[role="dialog"]');
    await expect(dialog).toBeVisible();

    // Footer should contain buttons
    const footer = page.locator('.dialog__footer');
    await expect(footer).toBeVisible();
    await expect(footer.locator('button', { hasText: 'Cancel' })).toBeVisible();
    await expect(footer.locator('button', { hasText: 'Confirm' })).toBeVisible();

    // Close the dialog
    await page.keyboard.press('Escape');
  });
});
