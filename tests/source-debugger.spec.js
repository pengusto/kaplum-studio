import {pasteCode} from "./helpers/editor.js";
import {readFile} from 'node:fs/promises';
import {test,expect} from '@playwright/test';
import {compileDebugSource} from '../src/source-debugger.js';
async function start(page,source) {
 await page.goto('/#personal');
 await pasteCode(page,source);
 if(await page.getByRole('radio',{name:'Result',exact:true}).isVisible()) await page.getByRole('radio',{name:'Result',exact:true}).click();
 await page.getByRole('button',{name:'Start code debugger',exact:true}).click();
}
test('prototype rejects unsupported syntax rather than changing its meaning',()=>{
 for(const source of ['function f(){forward(1);} f();','onKey("a",()=>forward(1));','let p=position();forward(p.x);','for(let i=0;i<3;i++)forward(1);','var x=2;','setTimeout(()=>forward(1),1);','beiTaste("a",forward);','setTimeout(forward,1);']) expect(()=>compileDebugSource(source)).toThrow();
});
test('branches, shadowed bindings, continue and break preserve native results',()=>{
 const source='let total=0; for(let i=0;i<6;i++){if(i===1){continue;} if(i===4){break;} {let total=10; total++;} total+=i;}';
 const plain=Function(source+'return total;')();
 const iterator=Function('return function*(){'+compileDebugSource(source)+'return total;}')()();
 let result,steps=0;do{result=iterator.next();expect(++steps).toBeLessThan(100);}while(!result.done);
 expect(result.value).toBe(plain);
 const empty=Function('return function*(){'+compileDebugSource('while(true){}')+'}')()();
 for(let i=0;i<5;i++) expect(empty.next().done).toBe(false);
});
test('native stepping executes statements only on advance and inspects loop variables',async({page})=>{
 await start(page,'let distance=20;\nfor(let i=0;i<3;i++){\n forward(distance);\n distance+=10;\n}\nright(90);');
 const panel=page.getByRole('region',{name:'Code debugger · prototype'});
 await expect(panel).toContainText('Line 1');await expect(page.locator('.cm-debug-line')).toContainText('let distance');
 await expect(panel).toContainText('not in scope');await expect(page.locator('.cm-debug-line')).toHaveText('let distance=20;');
 const next=page.getByRole('button',{name:'Next code statement',exact:true});await next.click();await expect(panel).toContainText('Line 2');await expect(panel.locator('dd').first()).toHaveText('20');
 await next.click();await next.click();await expect(panel).toContainText('Line 3');await expect(page.locator('.turtle-state')).toContainText('y: 0.0');
 await next.click();await expect(panel).toContainText('Line 4');await expect(page.locator('.cm-debug-line')).toHaveText('distance+=10;');await expect(page.locator('.debug-history li').last()).toContainText('forward(distance);');await expect(page.locator('.turtle-state')).toContainText('y: 20.0');
 await page.screenshot({path:'/tmp/kaplum-source-debugger.png'});
 await page.getByRole('button',{name:'Continue code',exact:true}).click();await expect(panel).toContainText('Finished');await expect(panel.locator('dd').first()).toHaveText('50');await expect(page.locator('.debug-history li').last()).toContainText('right(90);');await expect(page.locator('.debug-history li')).toHaveCount(8);await expect(page.locator('.turtle-state')).toContainText('y: 90.0');
 const downloaded=page.waitForEvent('download');await page.getByRole('button',{name:'Download .js',exact:true}).click();const file=await downloaded;const exported=await readFile(await file.path(),'utf8');expect(exported).toContain('let distance=20;');expect(exported).not.toContain('yield {');
 await page.locator('#code').click();await page.keyboard.type('// edit');await expect(panel).toHaveCount(0);await expect(page.locator('.cm-debug-line')).toHaveCount(0);
});
test('empty infinite loops remain pausable and Stop clears a debug session',async({page})=>{
 await start(page,'let n=0;\nwhile(true){n++;}');const panel=page.getByRole('region',{name:'Code debugger · prototype'});await expect(panel).toBeVisible();
 await page.getByRole('button',{name:'Continue code',exact:true}).click();await page.getByRole('button',{name:'Pause code',exact:true}).click();await expect(page.getByRole('button',{name:'Continue code',exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Stop',exact:true}).click();await expect(panel).toHaveCount(0);await expect(page.locator('.cm-debug-line')).toHaveCount(0);
});
test('unsupported code preserves source and offers normal execution; debug controls fit five mobile languages',async({page})=>{
 await start(page,'let p=position();\nforward(p.x);');await expect(page.locator('.source-debugger[role=alert]')).toContainText('unsupported');await expect(page.locator('#code')).toContainText('forward(p.x)');
 await page.setViewportSize({width:390,height:844});await start(page,'let d=20;\nforward(d);');
 for(const locale of ['en','de','ja','tr','hy']) {await page.locator('.language-picker select').selectOption(locale);await expect(page.locator('.source-debugger').last()).toBeVisible();await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);}
});

test('breakpoints stop before execution, re-hit in loops and survive Restart; edits clear them',async({page})=>{
 await start(page,'let d=20;\nfor(let i=0;i<3;i++){\n forward(d);\n d+=10;\n}\nright(90);');
 const panel=page.getByRole('region',{name:'Code debugger · prototype'});
 await panel.locator('.breakpoint-settings summary').click();await page.getByLabel('Breakpoint line',{exact:true}).fill('3');await page.getByRole('button',{name:'Set breakpoint',exact:true}).click();
 await expect(page.locator('.cm-breakpoint-line')).toContainText('forward(d)');
 const resume=page.getByRole('button',{name:'Continue code',exact:true});await resume.click();await expect(panel).toContainText('Paused at breakpoint');await expect(panel).toContainText('Line 3');await expect(page.locator('.turtle-state')).toContainText('y: 0.0');
 await resume.click();await expect(page.locator('.turtle-state')).toContainText('y: 20.0');await expect(panel).toContainText('Line 3');await expect(panel.locator('dd').first()).toHaveText('30');
 await page.getByRole('button',{name:'Restart',exact:true}).click();await expect(panel).toContainText('Line 1');await panel.locator('.breakpoint-settings summary').click();await expect(page.getByRole('button',{name:'Remove breakpoint: Line 3',exact:true})).toBeVisible();
 await resume.click();await expect(panel).toContainText('Paused at breakpoint');await page.getByRole('button',{name:'Remove breakpoint: Line 3',exact:true}).click();await expect(page.locator('.cm-breakpoint-line')).toHaveCount(0);
 await resume.click();await expect(panel).toContainText('Finished');
 await page.getByLabel('Breakpoint line',{exact:true}).fill('5');await page.getByRole('button',{name:'Set breakpoint',exact:true}).click();await expect(panel.getByRole('alert')).toContainText('supported statement');
 await page.locator('#code').click();await page.keyboard.press('End');await page.keyboard.type(' ');await expect(panel).toHaveCount(0);
 await page.getByRole('button',{name:'Start code debugger',exact:true}).click();await expect(page.locator('.breakpoint-list button')).toHaveCount(0);
});

test('course debugger is discoverable and drawing stays above optional settings',async({page})=>{
 await page.goto('/#course/square');
 const start=page.getByRole('button',{name:'Start code debugger',exact:true});
 await expect(start).toBeVisible();await expect(start).toContainText('Debug code');
 await start.click();await expect(page.getByRole('button',{name:'Next code statement',exact:true})).toContainText('Next step');
 const surface=page.locator('.canvas-surface'), panel=page.locator('.source-debugger');
 expect((await surface.boundingBox()).y).toBeLessThan((await panel.boundingBox()).y);
 await expect(panel.locator('.breakpoint-settings')).not.toHaveAttribute('open','');
 await expect(surface).toHaveAttribute('data-canvas','dark');
 await page.setViewportSize({width:390,height:844});
 await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
test('circle starter uses selected canvas colour without painting white',async({page})=>{
 await page.goto('/#animation/circle');
 await expect(page.locator('#code')).not.toContainText('setBackground("white")');
 await expect(page.locator('.canvas-surface')).toHaveAttribute('data-canvas','dark');
 await expect.poll(()=>page.locator('#canvas').evaluate(c=>c.getContext('2d').getImageData(0,0,1,1).data[3])).toBe(0);
});

test('circle helper shows exact next call and completed call without stepping helper internals',async({page})=>{
 await page.goto('/#animation/circle');
 await page.getByRole('button',{name:'Start code debugger',exact:true}).click();
 const next=page.getByRole('button',{name:'Next code statement',exact:true});
 for(const expected of ['hideArrow();','goto(0, 0);','drawCircle(radius, "coral", true);']) {await next.click();await expect(page.locator('.cm-debug-line')).toHaveText(expected);}
 await expect(page.locator('.cm-debug-line')).toHaveText('drawCircle(radius, "coral", true);');
 await expect(page.locator('.source-debugger dd').first()).toHaveText('60');
 await next.click();await expect(page.locator('.debug-history li').last()).toContainText('drawCircle(radius, "coral", true);');
 await expect(page.locator('.debug-command')).toContainText('Finished');
});

test('debugging keeps editable source and drawing together on desktop and mobile',async({page})=>{
 await page.setViewportSize({width:1440,height:1000});
 await start(page,Array.from({length:25},()=> 'forward(2);').join('\n'));
 const code=page.locator('.code-pane'),result=page.locator('.result-pane');
 await expect(code).toBeVisible();await expect(result).toBeVisible();
 const a=await code.boundingBox(),b=await result.boundingBox();
 expect(a.x+a.width).toBeLessThanOrEqual(b.x+1);
 await page.setViewportSize({width:458,height:772});
 await expect(code).toBeVisible();await expect(result).toBeVisible();
 await expect(page.locator('.mobile-tabs')).toBeHidden();
 expect((await code.boundingBox()).height).toBeLessThanOrEqual(200);
 expect((await code.boundingBox()).y).toBeLessThan((await result.boundingBox()).y);
 const next=page.getByRole('button',{name:'Next code statement',exact:true});
 for(let i=0;i<20;i++) await next.click();
 await expect(page.locator('.cm-debug-line')).toHaveText('forward(2);');
 await expect.poll(()=>page.locator('.cm-scroller').evaluate(el=>el.scrollTop)).toBeGreaterThan(0);
 await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 await page.screenshot({path:'/tmp/kaplum-debug-mobile-context.png'});
});
