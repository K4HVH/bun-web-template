import { test, expect } from '@playwright/test';

test.describe('Button sizing consistency', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('icon-only buttons should match height of text buttons', async ({ page }) => {
    // Navigate to button section
    await page.getByText('Button Component Examples').scrollIntoViewIfNeeded();

    // Get text button height (from "Button Sizes" section)
    const normalTextButton = page.getByRole('button', { name: 'Normal', exact: true });
    const textButtonBox = await normalTextButton.boundingBox();
    const textButtonHeight = textButtonBox?.height;

    console.log('Text button height:', textButtonHeight);

    // Get icon-only button height (from "Icon Button Sizes" section)
    const normalIconButtons = page.locator('.button--icon-only').filter({ hasNot: page.locator('.button--compact, .button--spacious') });
    const iconButton = normalIconButtons.first();
    const iconButtonBox = await iconButton.boundingBox();
    const iconButtonHeight = iconButtonBox?.height;

    console.log('Icon-only button height:', iconButtonHeight);

    // Heights should match within 2px tolerance
    expect(Math.abs((textButtonHeight || 0) - (iconButtonHeight || 0))).toBeLessThanOrEqual(2);
  });

  test('check icon size in icon-only buttons', async ({ page }) => {
    await page.getByText('Icon Button Sizes').scrollIntoViewIfNeeded();

    // Get the icon size
    const iconInButton = page.locator('.button--icon-only .button__icon svg').first();
    const iconBox = await iconInButton.boundingBox();

    console.log('Icon dimensions:', iconBox);
    console.log('Icon width:', iconBox?.width, 'Icon height:', iconBox?.height);

    // Check computed styles
    const iconFontSize = await iconInButton.evaluate((el) => {
      return window.getComputedStyle(el.parentElement!).fontSize;
    });

    console.log('Icon parent font-size:', iconFontSize);
  });
});
