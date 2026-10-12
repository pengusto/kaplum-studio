import { test, expect } from '@playwright/test';

for (const width of [320, 390, 700, 850, 1073, 1150, 1536]) {
  test(`release links stay inside the header and clear of the workspace at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/#course/square');
    for (const locale of ['en', 'de', 'ja', 'tr', 'hy']) {
      await page.locator('.language-picker select').selectOption(locale);
      for (const link of await page.locator('header .release-links a').all()) {
        await expect(link).toBeVisible();
        const bounds = await link.evaluate(el => {
          const r = el.getBoundingClientRect();
          const header = el.closest('header').getBoundingClientRect();
          const centre = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2);
          return { left: r.left, right: r.right, bottom: r.bottom, headerBottom: header.bottom, hit: el.contains(centre) };
        });
        expect(bounds.left).toBeGreaterThanOrEqual(0);
        expect(bounds.right).toBeLessThanOrEqual(width);
        expect(bounds.bottom).toBeLessThanOrEqual(bounds.headerBottom);
        expect(bounds.hit).toBe(true);
      }
    }
    await expect(page.locator('header .release-links a[aria-label="GitHub"]')).toHaveAttribute('href', 'https://github.com/pengusto/kaplum-studio');
  });
}
