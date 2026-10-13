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

test('parameters are collapsed by default and open below the workspace', async ({ page }) => {
  await page.setViewportSize({ width: 1073, height: 766 });
  await page.goto('/#animation/circle');
  const inspector = page.locator('.explanation-pane');
  await expect(inspector).toBeHidden();
  const before = await page.locator('.workbench').boundingBox();
  await page.getByRole('button', { name: 'Parameters', exact: true }).click();
  await expect(inspector).toBeVisible();
  const after = await page.locator('.workbench').boundingBox();
  const parameters = await inspector.boundingBox();
  expect(after.width).toBeCloseTo(before.width, 0);
  expect(parameters.y).toBeGreaterThanOrEqual(after.y + after.height);
});

test('split divider responds to drag, keyboard, reset and debug mode without editing code', async ({ page }) => {
  await page.setViewportSize({ width: 1073, height: 766 });
  await page.goto('/#figure/figur-dino');
  const original = await page.locator('#code').innerText();
  const divider = page.getByRole('separator');
  const before = await page.locator('.code-pane').boundingBox();
  const handle = await divider.boundingBox();
  await page.mouse.move(handle.x + handle.width / 2, handle.y + 80);
  await page.mouse.down();
  await page.mouse.move(handle.x + 140, handle.y + 80);
  await page.mouse.up();
  expect((await page.locator('.code-pane').boundingBox()).width).toBeGreaterThan(before.width + 100);
  await divider.focus();
  await divider.press('Home');
  await expect(divider).toHaveAttribute('aria-valuenow', '25');
  await divider.press('End');
  await expect(divider).toHaveAttribute('aria-valuenow', '75');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  await divider.dblclick();
  await expect(divider).toHaveAttribute('aria-valuenow', '50');
  await page.locator('.editor-debug-start').click();
  await divider.press('ArrowLeft');
  await expect(divider).toHaveAttribute('aria-valuenow', '45');
  expect(await page.locator('#code').innerText()).toBe(original);
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(divider).toBeHidden();
});


test('split survives reload and example navigation, and reset is saved', async ({ page }) => {
  await page.setViewportSize({ width: 1073, height: 766 });
  await page.goto('/#animation/circle');
  const divider = page.getByRole('separator');
  await divider.press('ArrowRight');
  await expect(divider).toHaveAttribute('aria-valuenow', '55');
  await page.reload();
  await expect(divider).toHaveAttribute('aria-valuenow', '55');
  await page.goto('/#figure/figur-dino');
  await expect(divider).toHaveAttribute('aria-valuenow', '55');
  await divider.dblclick();
  await page.reload();
  await expect(divider).toHaveAttribute('aria-valuenow', '50');
});

test('invalid or unavailable storage preserves a usable divider', async ({ page }) => {
  await page.goto('/#animation/circle');
  for (const saved of ['broken json', 'null', '"65"', '100']) {
    await page.evaluate(value => localStorage.setItem('kaplum-workspace-split-v1', value), saved);
    await page.reload();
    await expect(page.getByRole('separator')).toHaveAttribute('aria-valuenow', '50');
  }
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => { throw new Error('Storage unavailable'); };
    Storage.prototype.setItem = () => { throw new Error('Storage unavailable'); };
  });
  await page.reload();
  const divider = page.getByRole('separator');
  await expect(divider).toHaveAttribute('aria-valuenow', '50');
  await divider.press('ArrowRight');
  await expect(divider).toHaveAttribute('aria-valuenow', '55');
});
