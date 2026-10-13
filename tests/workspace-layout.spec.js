import { test, expect } from '@playwright/test';

for (const width of [390, 850, 1073, 1536]) {
  test(`workspace content remains usable at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 766 });
    for (const route of ['animation/circle', 'figure/figur-dino', 'course/square']) {
      await page.goto('/#' + route);
      if (width <= 700) await page.getByRole('radio', { name: 'Result', exact: true }).click();
      const canvas = page.locator('.result-pane .canvas-surface');
      await expect(canvas).toBeVisible();
      expect((await canvas.boundingBox()).height).toBeGreaterThanOrEqual(290);
      if (width > 700) {
        const editor = await page.locator('.editor-host').boundingBox();
        expect(editor.height).toBeGreaterThanOrEqual(200);
        const result = await page.locator('.result-pane').boundingBox();
        const code = await page.locator('.code-pane').boundingBox();
        expect(code.x + code.width).toBeLessThanOrEqual(result.x + 1);
        expect(Math.abs(code.y - result.y)).toBeLessThan(2);
        const workbench = await page.locator('.workbench').boundingBox();
        expect(result.y + result.height).toBeLessThanOrEqual(workbench.y + workbench.height + 1);
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    }
  });
}

test('parameters can be hidden on intermediate desktop widths', async ({ page }) => {
  await page.setViewportSize({ width: 1073, height: 766 });
  await page.goto('/#animation/circle');
  const inspector = page.locator('.explanation-pane');
  await expect(inspector).toBeVisible();
  const before = await page.locator('.workbench').boundingBox();
  await page.getByRole('button', { name: 'Parameters', exact: true }).click();
  await expect(inspector).toBeHidden();
  const after = await page.locator('.workbench').boundingBox();
  expect(after.width).toBeGreaterThan(before.width + 150);
});
