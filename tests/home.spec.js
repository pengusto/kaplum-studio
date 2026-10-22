import { test, expect } from '@playwright/test';
import { homeCopy } from '../components/Home';
const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
test('Home welcomes learners in five languages and leads to real Studio activities', async ({ page }) => {
  await page.goto(base + '/');
  for (const locale of ['en', 'de', 'ja', 'tr', 'hy']) {
    await page.locator('.language-picker select').selectOption(locale);
    await expect(page.locator('.home-page h1')).toHaveText(homeCopy[locale].title);
    await expect(page.locator('.home-demo')).toHaveAccessibleName(homeCopy[locale].open);
  }
  await page.locator('.home-primary').click();
  await expect(page.locator('.example-card')).toHaveCount(32);
  await page.locator('.brand').click();
  await expect(page).toHaveURL(/#home$/);
  await page.locator('.home-demo').click();
  await expect(page.locator('#code')).toContainText('forward(160)');
  await page.locator('.library-toggle').click();
  await expect(page.locator('#example-library-tray')).toBeVisible();
  await page.locator('.brand').click();
  await expect(page.locator('#example-library-tray')).toBeHidden();
  await page.reload();
  await expect(page.locator('.home-page')).toBeVisible();
});
test('Home fits narrow touch screens and both appearance themes', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 780 });
  await page.goto(base + '/#home');
  await expect(page.locator('.home-page h1')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
  const demo = page.locator('.home-demo');
  expect(await demo.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
  await page.getByRole('switch').click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(page.locator('.home-primary')).toBeVisible();
});
