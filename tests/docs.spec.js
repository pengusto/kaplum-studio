import { test, expect } from '@playwright/test';
import { docsCopy } from '../src/docs-copy';
import { reference } from '../src/reference';
const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
test('Studio links to its repository and localized documentation', async ({ page }) => {
  await page.goto(`${base}/#figures`);
  await expect(page.locator('.release-links a[href="https://github.com/pengusto/kaplum-studio"]')).toBeVisible();
  const mark = page.locator('.release-links .github-mark img:visible');
  await expect(mark).toHaveJSProperty('naturalWidth', 98);
  await page.getByRole('switch').click();
  await expect(page.locator('.release-links .github-mark img:visible')).toHaveAttribute('src', /github-invertocat-black.svg$/);
  await page.locator('.release-links a[href*="/docs/"]').click();
  await expect(page).toHaveURL(/\/docs\/\?lang=en$/);
  await expect(page.locator('.docs-heading')).toContainText('Documentation');
  await expect(page.locator('.docs-repo .github-mark')).toBeVisible();
});
test('documentation shares all command contracts, languages and real preview execution', async ({ page }) => {
  const errors=[]; page.on('pageerror', e => errors.push(e.message));
  await page.goto(`${base}/docs/`);
  for (const id of ['en','de','ja','tr','hy']) {
    await page.locator('.docs-tools select').selectOption(id);
    await expect(page.locator('html')).toHaveAttribute('lang',id);
    await expect(page.locator('h1')).toHaveText(docsCopy[id].title);
  }
  await expect(page.locator('.docs-command-list button')).toHaveCount(reference.length);
  await page.locator('.docs-search input').fill('drawDino');
  await page.locator('.docs-command-list button').click();
  await expect(page.locator('.docs-command h3')).toHaveText('drawDino()');
  await expect(page.locator('.docs-command tbody tr')).toHaveCount(3);
  await page.locator('.catalogue-preview').scrollIntoViewIfNeeded();
  await expect(page.locator('.catalogue-preview')).toHaveAttribute('data-drawn','true');
  await expect(page.locator('.docs-command a')).toHaveAttribute('href',`${base}/#command/drawDino`);
  await page.reload(); await expect(page.locator('html')).toHaveAttribute('lang','hy');
  await page.setViewportSize({width:390,height:844});
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.locator('.docs-footer').scrollIntoViewIfNeeded();
  await expect(page.locator('.docs-footer')).toBeInViewport();
  expect(errors).toEqual([]);
});
