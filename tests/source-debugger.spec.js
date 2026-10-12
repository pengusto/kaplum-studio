import {readFile} from 'node:fs/promises';
import {test,expect} from '@playwright/test';
import {compileDebugSource} from '../src/source-debugger.js';
async function start(page,source) {
 await page.goto('/#personal');
 await page.locator('#code').click();await page.keyboard.press('ControlOrMeta+A');await page.keyboard.insertText(source);
 if(await page.getByRole('radio',{name:'Result',exact:true}).isVisible()) await page.getByRole('radio',{name:'Result',exact:true}).click();
 await page.locator('.canvas-more summary').click();await page.getByRole('button',{name:'Start code debugger',exact:true}).click();
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
 await expect(panel).toContainText('not in scope');
 const next=page.getByRole('button',{name:'Next code statement',exact:true});await next.click();await expect(panel).toContainText('Line 2');await expect(panel.locator('dd').first()).toHaveText('20');
 await next.click();await next.click();await expect(panel).toContainText('Line 3');await expect(page.locator('.turtle-state')).toContainText('y: 0.0');
 await next.click();await expect(panel).toContainText('Line 4');await expect(page.locator('.turtle-state')).toContainText('y: 20.0');
 await page.screenshot({path:'/tmp/kaplum-source-debugger.png'});
 await page.getByRole('button',{name:'Continue code',exact:true}).click();await expect(panel).toContainText('Finished');await expect(panel.locator('dd').first()).toHaveText('50');await expect(page.locator('.turtle-state')).toContainText('y: 90.0');
 const downloaded=page.waitForEvent('download');await page.getByRole('button',{name:'Download .js',exact:true}).click();const file=await downloaded;const exported=await readFile(await file.path(),'utf8');expect(exported).toContain('let distance=20;');expect(exported).not.toContain('yield {');
 await page.locator('#code').click();await page.keyboard.insertText('// edit');await expect(panel).toHaveCount(0);await expect(page.locator('.cm-debug-line')).toHaveCount(0);
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
