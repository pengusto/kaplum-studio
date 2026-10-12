import {test,expect} from '@playwright/test';
import {reference} from '../src/reference.js';
test('commands are explicitly classified and filter without losing entries',async({page})=>{
 await page.goto('/#commands');await expect(page.locator('.example-card')).toHaveCount(reference.length);
 const filter=page.locator('.filters select');await filter.selectOption('turtle');await expect(page.locator('.example-card')).toHaveCount(reference.filter(x=>x.category==='turtle').length);
 await filter.selectOption('example');await expect(page.locator('.example-card')).toHaveCount(reference.filter(x=>x.category==='example').length);
 await page.getByRole('searchbox').fill('drawPacman');await expect(page.locator('.example-card')).toHaveCount(1);
});
test('worker input updates inspector, editing stays separate and Stop removes input',async({page})=>{
 await page.goto('/#personal');const editor=page.locator('#code');await editor.click();await page.keyboard.press('ControlOrMeta+A');await page.keyboard.insertText('goto(0,0); onKey("ArrowRight",()=>{angle(90); forward(20);}); onClick(({x,y})=>goto(x,y));');
 await page.getByRole('button',{name:'Run',exact:true}).click();await expect(page.locator('.turtle-state')).toContainText('x: 0.0');
 const canvas=page.locator('#canvas');await canvas.focus();await page.keyboard.press('ArrowRight');await expect(page.locator('.turtle-state')).toContainText('x: 20.0');
 await editor.click();await page.keyboard.press('ArrowRight');await expect(page.locator('.turtle-state')).toContainText('x: 20.0');
 await page.getByLabel('Coordinate grid').check();await expect(page.locator('.canvas-surface')).toHaveAttribute('data-grid','true');
 await page.getByRole('button',{name:'Stop',exact:true}).click();await canvas.focus();await page.keyboard.press('ArrowRight');await expect(page.locator('.turtle-state')).toContainText('Turtle state: —');
});
