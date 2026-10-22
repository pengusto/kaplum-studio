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
    if (width > 700) {
      const alignment = await page.evaluate(() => {
        const header = document.querySelector('header');
        const h = header.getBoundingClientRect();
        const tools = header.querySelector('.header-tools').getBoundingClientRect();
        const links = header.querySelector('.release-links').getBoundingClientRect();
        return { rightGap: h.right - tools.right, groupGap: tools.left - links.right };
      });
      expect(alignment.rightGap).toBeLessThanOrEqual(25);
      expect(alignment.groupGap).toBeGreaterThanOrEqual(0);
      expect(alignment.groupGap).toBeLessThanOrEqual(23);
    }
    await expect(page.locator('header .release-links a[aria-label="GitHub"]')).toHaveAttribute('href', 'https://github.com/pengusto/kaplum-studio');
  });
}

for (const width of [320, 1073]) {
  test(`header reveals on upward scroll and keyboard focus at ${width}px; Home is in Dock`, async ({ page }) => {
    await page.setViewportSize({ width, height: 780 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/#figures');
    const header = page.locator('.studio-header');
    expect(await header.evaluate(el => el.getBoundingClientRect().height)).toBeLessThanOrEqual(80);
    await page.locator('.atlas-workspace').evaluate(el => { el.scrollTop = 500; });
    await expect(header).toHaveAttribute('data-hidden', 'true');
    await page.locator('.atlas-workspace').evaluate(el => { el.scrollTop = 440; });
    await expect(header).toHaveAttribute('data-hidden', 'false');
    await page.locator('.atlas-workspace').evaluate(el => { el.scrollTop = 600; });
    await expect(header).toHaveAttribute('data-hidden', 'true');
    await page.locator('.brand').focus();
    expect(await header.evaluate(el => el.getBoundingClientRect().bottom)).toBeGreaterThan(0);
    await page.locator('.studio-dock a[href="#home"]').click();
    await expect(page.locator('.home-page')).toBeVisible();
    await expect(header).toHaveAttribute('data-hidden', 'false');
    await expect(page.locator('.studio-dock a[href="#home"] .dock-dot')).toHaveCount(1);
  });
}
