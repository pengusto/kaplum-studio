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

test('drawing playback pauses, steps, rewinds and stops through the worker',async({page})=>{
 await page.goto('/#personal');const editor=page.locator('#code');await editor.click();await page.keyboard.press('ControlOrMeta+A');await page.keyboard.insertText('goto(-50,-50); for(let i=0;i<4;i++){forward(100);right(90);}');
 await page.getByRole('button',{name:'Record drawing',exact:true}).click();const group=page.getByRole('group',{name:'Drawing playback'});await expect(group).toBeVisible();await expect(group.locator('output').first()).toContainText('0 /');
 await page.getByRole('button',{name:'Next drawing step',exact:true}).click();await expect(group.locator('output').first()).toContainText('1 /');
 await page.getByRole('button',{name:'Previous drawing step',exact:true}).click();await expect(group.locator('output').first()).toContainText('0 /');
 await page.getByRole('button',{name:'Play',exact:true}).click();await expect(page.getByRole('button',{name:'Pause',exact:true})).toBeVisible();await page.getByRole('button',{name:'Pause',exact:true}).click();const paused=await group.locator('output').first().textContent();await page.waitForTimeout(400);await expect(group.locator('output').first()).toHaveText(paused);
 await page.getByRole('button',{name:'Reset playback',exact:true}).click();await expect(group.locator('output').first()).toContainText('0 /');await page.getByRole('button',{name:'Stop',exact:true}).click();await expect(group).toHaveCount(0);
});

test('stamp command renders and removing one stamp keeps another through the worker',async({page})=>{
 await page.goto('/#command/clearStamp');await expect(page.locator('#status')).not.toHaveAttribute('data-state','error');
 await expect.poll(()=>page.locator('#canvas').evaluate(c=>c.getContext('2d').getImageData(410,350,1,1).data[3])).toBe(255);
 await expect.poll(()=>page.locator('#canvas').evaluate(c=>c.getContext('2d').getImageData(290,350,1,1).data[3])).toBe(0);
});

test('Pacman and Dino construction views use maintained source and protect the draft',async({page})=>{
 for(const id of ['figur-pacman','figur-dino']){
  await page.goto('/#figure/'+id);const editor=page.locator('#code');await editor.click();await page.keyboard.press('ControlOrMeta+A');await page.keyboard.insertText('forward(42); // my draft');
  await page.locator('.example-construction summary').click();await expect(page.locator('.example-construction pre')).toContainText(id==='figur-pacman'?'function drawPacman(':'function drawDino(');
  await expect(editor).toContainText('my draft');await page.locator('.language-picker select').selectOption('de');await expect(editor).toContainText('my draft');
 }
});
