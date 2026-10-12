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
 await page.getByRole('button',{name:'Stop',exact:true}).click();await canvas.focus();await page.keyboard.press('ArrowRight');await expect(page.locator('.turtle-state')).toContainText('Position—');
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
  await page.locator('.example-construction summary').click();await expect(page.locator('.example-construction li')).toHaveCount(3);await expect(page.locator('.example-construction pre')).toContainText(id==='figur-pacman'?'function drawPacman(':'function drawDino(');
  for(const language of ['en','de','ja','tr','hy']){await page.locator('.language-picker select').selectOption(language);await expect(page.locator('.example-construction li')).toHaveCount(3);await expect(page.locator('.example-construction li').last()).toContainText(id==='figur-pacman'?'direction':'legAngle');await expect(editor).toContainText('my draft');}
 }
});

test('drawing Undo discards future history and leaves learner code intact',async({page})=>{
 await page.goto('/#personal');const editor=page.locator('#code');await editor.click();await page.keyboard.press('ControlOrMeta+A');await page.keyboard.insertText('forward(100);right(90);forward(80);');
 await page.getByRole('button',{name:'Record drawing',exact:true}).click();const group=page.getByRole('group',{name:'Drawing playback'});await expect(group).toBeVisible();await page.getByRole('button',{name:'Show final drawing',exact:true}).click();await expect(group.locator('output').first()).toHaveText('3 / 3');
 await page.getByRole('button',{name:'Undo drawing step',exact:true}).click();await expect(group.locator('output').first()).toHaveText('2 / 2');await expect(page.locator('.turtle-state')).toContainText('x: 0.0');await expect(editor).toContainText('forward(80)');
});

test('course test lab exposes eight runnable finite lessons and preserves drafts and reset',async({page})=>{
 await page.goto('/#course');await expect(page.locator('.feature-lesson-grid article')).toHaveCount(8);
 for(const id of ['square','pen-journey','stamps','circles','undo']){
  await page.goto('/#course/'+id);await expect(page.locator('.lesson-task')).toBeVisible();await page.getByRole('button',{name:'Record drawing',exact:true}).click();await expect(page.getByRole('group',{name:'Drawing playback'})).toBeVisible();await page.getByRole('button',{name:'Show final drawing',exact:true}).click();await expect(page.locator('#status')).not.toHaveAttribute('data-state','error');
 }
 const editor=page.locator('#code');await editor.click();await page.keyboard.press('ControlOrMeta+A');await page.keyboard.insertText('forward(42); // retained lesson draft');await page.goto('/#course');await page.goto('/#course/undo');await expect(editor).toContainText('retained lesson draft');
 page.once('dialog',d=>d.dismiss());await page.getByRole('button',{name:'Reset',exact:true}).click();await expect(editor).toContainText('retained lesson draft');
 page.once('dialog',d=>d.accept());await page.getByRole('button',{name:'Reset',exact:true}).click();await expect(editor).not.toContainText('retained lesson draft');
});

test('test lab and construction source remain usable in five languages and narrow reduced-motion view',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/#course');
 for(const language of ['en','de','ja','tr','hy']){await page.locator('.language-picker select').selectOption(language);await expect(page.locator('.feature-lesson-grid article')).toHaveCount(8);await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);}
});


test('teacher state and before/after explanations follow selected playback checkpoints',async({page})=>{
 await page.goto('/#course/state');await page.getByRole('button',{name:'Record drawing',exact:true}).click();const group=page.getByRole('group',{name:'Drawing playback'});
 await expect(page.locator('.drawing-step')).toContainText('Starting state');await page.getByRole('button',{name:'Next drawing step',exact:true}).click();await expect(page.locator('.drawing-step')).toContainText('Position changed');
 await page.getByRole('button',{name:'Show final drawing',exact:true}).click();await expect(page.locator('.inspection-values')).toContainText('175.0');await expect(page.locator('.inspection-values')).toContainText('#ff7f50');await expect(page.locator('.drawing-step')).toContainText('Stamp placed');
 await page.getByRole('button',{name:'Previous drawing step',exact:true}).click();await expect(page.locator('.drawing-step')).toContainText('Line drawn');
 for(const locale of ['en','de','ja','tr','hy']){await page.locator('.language-picker select').selectOption(locale);await expect(page.locator('.inspection-values > div')).toHaveCount(7);await expect(page.locator('.drawing-step tbody tr')).toHaveCount(7);}
 await page.setViewportSize({width:390,height:844});await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 await page.locator('.language-picker select').selectOption('en');await page.getByRole('radio',{name:'Result',exact:true}).click();await page.getByRole('button',{name:'Reset playback',exact:true}).click();await expect(page.locator('.drawing-step')).toContainText('Starting state');await page.getByRole('button',{name:'Stop',exact:true}).click();await expect(group).toHaveCount(0);await expect(page.locator('.drawing-step')).toHaveCount(0);
});

test('three new teacher experiments run and show their expected final states',async({page})=>{
 for(const [id,x,color,width] of [['state','175.0','#ff7f50','6.0'],['styles','90.0','#ff7f50','10.0'],['wrapping','420.0','#00bfff','5.0']]){
  await page.goto('/#course/'+id);await page.getByRole('button',{name:'Run',exact:true}).click();await expect(page.locator('.inspection-values')).toContainText(`x: ${x}`);await expect(page.locator('.inspection-values')).toContainText(color);await expect(page.locator('.inspection-values')).toContainText(width);
 }
});
