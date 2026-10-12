import {test,expect} from '@playwright/test';
for(const width of [390,1073,1536]) test(`optional examples use a horizontal tray below the workspace at ${width}px`,async({page})=>{
 await page.setViewportSize({width,height:900});
 await page.goto('/#course/square');
 const toggle=page.getByRole('button',{name:'Example library',exact:true}),tray=page.locator('#example-library-tray');
 await expect(toggle).toBeVisible();await expect(tray).toBeHidden();
 expect((await page.locator('.atlas-workspace').boundingBox()).x).toBeLessThan(30);
 await toggle.click();await expect(toggle).toHaveAttribute('aria-expanded','true');await expect(tray).toBeVisible();
 const grid=tray.locator('.gallery-grid');
 const boxes=await grid.locator('.example-card').evaluateAll(els=>els.slice(0,3).map(el=>{const r=el.getBoundingClientRect();return {x:r.x,y:r.y};}));
 expect(boxes[1].x).toBeGreaterThan(boxes[0].x);expect(boxes[1].y).toBeCloseTo(boxes[0].y,0);
 await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 await tray.getByRole('searchbox',{name:'Find an example',exact:true}).fill('Pacman');
 await expect(tray.locator('.example-card')).toHaveCount(1);
 await tray.getByRole('link',{name:'Pacman',exact:true}).click();
 await expect(page.locator('h1')).toHaveText('Pacman');await expect(tray).toBeHidden();
});
