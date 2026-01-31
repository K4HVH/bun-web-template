import { test, expect } from '@playwright/test';

test.describe('Combobox behavior', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('disabled options cannot be clicked and do not close dropdown', async ({ page }) => {
    // Scroll to top first to ensure clean positioning
    await page.evaluate(() => window.scrollTo(0, 0));

    // Find the "With Disabled Options" combobox - scroll to it first
    const comboboxCard = page.locator('.card', { hasText: 'With Disabled Options' }).first();
    await comboboxCard.scrollIntoViewIfNeeded();

    const trigger = comboboxCard.locator('.combobox__trigger');

    // Open the dropdown
    await trigger.click();

    // Wait for dropdown to appear
    await page.waitForSelector('.combobox__dropdown', { state: 'visible' });

    // Get the initial selected value
    const selectedTextBefore = await comboboxCard.locator('small').textContent();

    // Try to click the disabled option (Bookmark) - use force since it may be overlapped
    const disabledOption = page.locator('.combobox__option--disabled').filter({ hasText: 'Bookmark' });
    await disabledOption.click({ force: true });

    // Wait a bit for any potential state changes
    await page.waitForTimeout(100);

    // Dropdown should still be visible (not closed)
    const dropdown = page.locator('.combobox__dropdown');
    await expect(dropdown).toBeVisible();

    // Selected value should not have changed
    const selectedTextAfter = await comboboxCard.locator('small').textContent();
    expect(selectedTextAfter).toBe(selectedTextBefore);

    // Now click a non-disabled option to verify normal behavior works
    const enabledOption = page.locator('.combobox__option').filter({ hasText: 'Star' }).first();
    await enabledOption.click();

    // Dropdown should close
    await expect(dropdown).not.toBeVisible();

    // Selected value should have changed
    const selectedTextFinal = await comboboxCard.locator('small').textContent();
    expect(selectedTextFinal).toContain('star');
  });

  test('dropdown position updates when scrolling', async ({ page }) => {
    // Find the "Long List" combobox - scroll to it first
    const comboboxCard = page.locator('.card', { hasText: 'Long List' }).first();
    await comboboxCard.scrollIntoViewIfNeeded();

    const trigger = comboboxCard.locator('.combobox__trigger');

    // Scroll the page to top first
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(100);

    // Open the dropdown
    await trigger.click();

    // Wait for dropdown to appear
    await page.waitForSelector('.combobox__dropdown', { state: 'visible' });

    // Get initial dropdown position
    const dropdown = page.locator('.combobox__dropdown');
    const initialBox = await dropdown.boundingBox();
    expect(initialBox).not.toBeNull();

    // Get trigger position to calculate expected dropdown position
    const triggerBox = await trigger.boundingBox();
    expect(triggerBox).not.toBeNull();

    // Dropdown should be positioned just below the trigger (initially)
    const initialOffset = initialBox!.y - (triggerBox!.y + triggerBox!.height);
    expect(Math.abs(initialOffset - 4)).toBeLessThan(10);

    // Scroll the page down
    await page.evaluate(() => window.scrollBy(0, 300));
    await page.waitForTimeout(200); // Wait for scroll event handlers

    // Get new positions after scrolling
    const newDropdownBox = await dropdown.boundingBox();
    const newTriggerBox = await trigger.boundingBox();
    expect(newDropdownBox).not.toBeNull();
    expect(newTriggerBox).not.toBeNull();

    // Dropdown should still be positioned just below the trigger (maintained relationship)
    const newOffset = newDropdownBox!.y - (newTriggerBox!.y + newTriggerBox!.height);
    expect(Math.abs(newOffset - 4)).toBeLessThan(10);
  });
});
