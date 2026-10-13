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
 for(const source of ['const f=()=>forward(1);','onKey("a",()=>forward(1));','let p=position();forward(p.x);','for(let i=0;i<3;i++)forward(1);','var x=2;','setTimeout(()=>forward(1),1);','beiTaste("a",forward);','setTimeout(forward,1);']) expect(()=>compileDebugSource(source)).toThrow();
});
test('branches, shadowed bindings, continue and break preserve native results',()=>{
 const source='let total=0; for(let i=0;i<6;i++){if(i===1){continue;} if(i===4){break;} {let total=10; total++;} total+=i;}';
 const plain=Function(source+'return total;')();
 const iterator=Function('return function*(){'+compileDebugSource(source)+'return total;}')()();
 let result,steps=0;do{result=iterator.next(result?.value?.kind === "condition" ? result.value.result : undefined);expect(++steps).toBeLessThan(100);}while(!result.done);
 expect(result.value).toBe(plain);
 const empty=Function('return function*(){'+compileDebugSource('while(true){}')+'}')()();
 for(let i=0;i<5;i++) expect(empty.next(true).done).toBe(false);
});
test('native stepping executes statements only on advance and inspects loop variables',async({page})=>{
 await start(page,'let distance=20;\nfor(let i=0;i<3;i++){\n forward(distance);\n distance+=10;\n}\nright(90);');
 const panel=page.getByRole('region',{name:'Code debugger · prototype'});
 await expect(panel).toContainText('Line 1');await expect(page.locator('.cm-debug-line')).toContainText('let distance');
 await expect(panel).toContainText('not in scope');await expect(page.locator('.cm-debug-line')).toHaveText('let distance=20;');
 const next=page.getByRole('button',{name:'Next code statement',exact:true});await next.click();await expect(panel).toContainText('Line 2');await expect(panel.locator('dd').first()).toHaveText('20');
 await next.click();await next.click();await next.click();await expect(panel).toContainText('Line 3');await expect(page.locator('.turtle-state')).toContainText('y: 0.0');
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
 await expect(page.locator('.workspace-panels')).toHaveAttribute('data-debug','true');
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

test('condition instrumentation evaluates once and preserves branches, updates and omitted tests',()=>{
 for(const source of [
  'let n=0; if(n++===0){n+=10;}else{n+=100;}',
  'let n=0; while(n++<3){if(n===2){continue;} n+=1;}',
  'let n=0; for(let i=0;i<4;i++){if(i===2){break;}n+=i;}',
  'let n=0; for(;;){n++;if(n===2){break;}}',
  'let n=0; for(n=0;n<3;n++){}',
  'let n=0; if(false){n=3;}else{if(true){n=4;}}'
 ]) {
  const native=Function(source+'return n;')();
  const iterator=Function('return function*(){'+compileDebugSource(source)+'return n;}')()();
  let step,count=0;const results=[];
  do {step=iterator.next(step?.value?.kind === "condition" ? step.value.result : undefined);if(step.value?.kind === "condition") results.push(step.value.result);expect(++count).toBeLessThan(100);} while(!step.done);
  expect(step.value).toBe(native);expect(results.length).toBeGreaterThan(0);
 }
});
test('true and false checks explain if else and loop exit beside actual source',async({page})=>{
 await page.setViewportSize({width:458,height:772});
 await start(page,'let n=0;\nif(n>0){\n forward(50);\n}else{\n right(90);\n}\nfor(let i=0;i<1;i++){\n forward(20);\n}');
 const next=page.getByRole('button',{name:'Next code statement',exact:true});
 await next.click();await next.click();
 await expect(page.locator('.cm-condition-false')).toContainText('False — skip this branch');
 await expect(page.locator('.condition-feedback')).toHaveAttribute('data-result','false');
 await next.click();await expect(page.locator('.cm-debug-line')).toContainText('right(90)');
 await next.click();await next.click();
 await expect(page.locator('.cm-condition-true')).toContainText('True — run another loop iteration');
 await page.screenshot({path:'/tmp/kaplum-condition-mobile.png'});
 await page.getByRole('button',{name:'Continue code',exact:true}).click();
 await expect(page.locator('.debug-command')).toContainText('Finished');
 await expect(page.locator('.cm-condition-false')).toContainText('False — leave the loop');
 await page.locator('.language-picker select').selectOption('de');
 await expect(page.locator('.cm-condition-note')).toContainText('Falsch — die Schleife endet');
 await page.locator('.language-picker select').selectOption('en');
 await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 await page.getByRole('button',{name:'Stop',exact:true}).click();
 await expect(page.locator('.cm-condition-note')).toHaveCount(0);
});

test('mobile course starts source inspection without switching tabs and visibly colours checks',async({page})=>{
 await page.setViewportSize({width:458,height:772});
 await page.goto('/#course/square');
 await page.locator('.lesson-debug-start').click();
 await expect(page.locator('.workspace-panels')).toHaveAttribute('data-debug','true');
 await expect(page.locator('.cm-debug-line')).toContainText('color');
 const next=page.getByRole('button',{name:'Next code statement',exact:true});
 for(let i=0;i<4;i++) await next.click();
 await expect(page.locator('.cm-condition-true')).toContainText('True');
 const green=await page.locator('.cm-condition-true').evaluate(el=>getComputedStyle(el).backgroundColor);
 await page.getByRole('button',{name:'Continue code',exact:true}).click();
 await expect(page.locator('.cm-condition-false')).toContainText('False');
 const red=await page.locator('.cm-condition-false').evaluate(el=>getComputedStyle(el).backgroundColor);
 expect(green).not.toBe(red);expect(green).not.toBe('rgba(0, 0, 0, 0)');
});

function completeDebug(source) {
 const iterator=Function('return function*(){'+compileDebugSource(source)+'}')()();
 const checkpoints=[];
 let result;
 do {
  result=iterator.next(result?.value?.kind === 'condition' ? result.value.result : undefined);
  if(!result.done) checkpoints.push({...result.value,values:Object.fromEntries(result.value.bindings.map(([name,read])=>{try{return [name,read()];}catch{return [name,'unavailable'];}}))});
  expect(checkpoints.length).toBeLessThan(1000);
 } while(!result.done);
 return checkpoints;
}
test('own functions preserve native returns, argument order, recursion and lexical scopes',()=>{
 const programs=[
  'function twice(n){return n*2;} let result=twice(twice(3));',
  'let order=0; function tick(){order++;return order;} function pair(a,b){return a*10+b;} let result=pair(tick(),tick());',
  'function factorial(n){if(n<=1){return 1;} return n*factorial(n-1);} let result=factorial(5);',
  'let n=10; function outer(n){function inner(d){return n+d;} return inner(2);} let result=outer(3)+n;',
  'function empty(){} let result=empty();',
  'let n=0; function check(){n++;return n<3;} while(check()){} let result=n;',
  'function check(n){return n>1;} let result=0; for(let i=0;check(3-i);i++){result+=i;} if(check(result)){result+=10;}else{result+=20;}',
  'function size(n){return n+1;} let result=0; for(let i=size(0);i<3;i=size(i)){result+=i;}',
 ];
 for(const source of programs) {
  const expected=Function(source+'return result;')();
  const steps=completeDebug(source+'\nlet observed=result;\nresult;');
  expect(steps.at(-1).values.observed).toBe(expected);
  expect(steps.some(step=>step.kind === 'function')).toBe(true);
  expect(steps.at(-1).stack).toEqual([]);
 }
 const recursive=completeDebug('function sum(n){if(n===0){return 0;} return n+sum(n-1);} let value=sum(3);');
 expect(Math.max(...recursive.map(step=>step.stack.length))).toBe(4);
 expect(recursive.find(step=>step.stack.length===4).values.n).toBe(0);
});
test('own-function boundaries reject aliases, callbacks, shadowing, generators and excessive recursion',()=>{
 for(const source of ['function f(){} let alias=f;', 'function f(){} let f=2;', 'function f(){} function g(f){}', 'function f(n=2){}', 'function f(...args){}', 'function* f(){}', 'function forward(){}', 'return 2;', 'function f(){} onKey("a",f);']) expect(()=>compileDebugSource(source)).toThrow();
 expect(()=>completeDebug('function recurse(){recurse();} recurse();')).toThrow('maximum call depth');
});
test('own-function stepping shows parameters, returns to caller and stops at body breakpoints',async({page})=>{
 await start(page,'function move(distance) {\n forward(distance);\n return distance + 5;\n}\nlet distance = 7;\nlet result = move(20);\nright(result);');
 const next=page.getByRole('button',{name:'Next code statement',exact:true});
 const panel=page.getByRole('region',{name:'Code debugger · prototype'});
 await expect(page.locator('.cm-debug-line')).toContainText('let distance');
 await next.click();await expect(page.locator('.cm-debug-line')).toContainText('let result');
 await next.click();await expect(page.locator('.cm-debug-line')).toContainText('function move');
 await expect(page.locator('.debug-call-stack')).toHaveText('Active calls: main.js → move');
 await expect(panel.locator('dl > div').filter({has:page.locator('dt',{hasText:/^distance$/})}).locator('dd')).toHaveText('20');
 await expect(page.locator('.turtle-state')).toContainText('y: 0.0');
 await panel.locator('.breakpoint-settings summary').click();
 await page.getByLabel('Breakpoint line',{exact:true}).fill('2');await page.getByRole('button',{name:'Set breakpoint',exact:true}).click();
 await page.getByRole('button',{name:'Continue code',exact:true}).click();await expect(panel).toContainText('Paused at breakpoint');
 await expect(page.locator('.cm-debug-line')).toContainText('forward(distance)');await expect(page.locator('.turtle-state')).toContainText('y: 0.0');
 await next.click();await expect(page.locator('.cm-debug-line')).toContainText('return distance');await expect(page.locator('.turtle-state')).toContainText('y: 20.0');
 await next.click();await expect(page.locator('.cm-debug-line')).toContainText('right(result)');
 await expect(page.locator('.debug-call-stack')).toHaveText('Active calls: main.js');
 await expect(panel.locator('dl > div').filter({has:page.locator('dt',{hasText:/^distance$/})}).locator('dd')).toHaveText('7');
 await expect(panel.locator('dl > div').filter({has:page.locator('dt',{hasText:/^result$/})}).locator('dd')).toHaveText('25');
 await next.click();await expect(panel).toContainText('Finished');await expect(page.locator('.turtle-state')).toContainText('25.0°');
 const downloaded=page.waitForEvent('download');await page.getByRole('button',{name:'Download .js',exact:true}).click();const file=await downloaded;
 const exported=await readFile(await file.path(),'utf8');expect(exported).toContain('function move(distance) {');expect(exported).not.toContain('yield');expect(exported).not.toContain('__kaplumDebug');
 await page.getByRole('button',{name:'Restart',exact:true}).click();await expect(page.locator('.cm-debug-line')).toContainText('let distance');await expect(page.locator('.debug-call-stack')).toHaveText('Active calls: main.js');
 await page.getByRole('button',{name:'Stop',exact:true}).click();await expect(page.locator('.debug-call-stack')).toHaveCount(0);
});
test('recursive function checks and active calls fit mobile and editing cancels stepping',async({page})=>{
 await page.setViewportSize({width:390,height:844});
 await start(page,'function recurse(n) {\n if(n > 0) {\n  recurse(n - 1);\n }\n}\nrecurse(2);');
 const next=page.getByRole('button',{name:'Next code statement',exact:true});
 for(let i=0;i<5;i++) await next.click();
 await expect(page.locator('.debug-call-stack')).toContainText('recurse → recurse');
 await page.getByRole('button',{name:'Continue code',exact:true}).click();
 await expect(page.locator('.debug-command')).toContainText('Finished');await expect(page.locator('.cm-condition-false')).toContainText('False');
 for(const locale of ['de','ja','tr','hy','en']) {await page.locator('.language-picker select').selectOption(locale);await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);}
 await page.locator('#code').click();await page.keyboard.press('End');await page.keyboard.type(' ');
 await expect(page.locator('.debug-call-stack')).toHaveCount(0);await expect(page.locator('.cm-debug-line')).toHaveCount(0);
});

test('own-function lesson is discoverable, runs normally and debugs both parameter values',async({page})=>{
 await page.goto('/#course');
 await page.locator('.feature-lesson-grid article').filter({hasText:'Own functions, step by step'}).getByRole('link').click();
 await expect(page).toHaveURL(/#course\/functions$/);
 await page.getByRole('button',{name:'Run',exact:true}).click();await expect(page.locator('.turtle-state')).toContainText('x: 60.0');
 await page.locator('.lesson-debug-start').click();
 const panel=page.getByRole('region',{name:'Code debugger · prototype'});
 await panel.locator('.breakpoint-settings summary').click();await page.getByLabel('Breakpoint line',{exact:true}).fill('1');await page.getByRole('button',{name:'Set breakpoint',exact:true}).click();
 const resume=page.getByRole('button',{name:'Continue code',exact:true});
 const side=panel.locator('dl > div').filter({has:page.locator('dt',{hasText:/^side$/})}).locator('dd');
 await resume.click();await expect(side).toHaveText('100');await expect(page.locator('.debug-call-stack')).toContainText('square');
 await resume.click();await expect(side).toHaveText('60');await expect(page.locator('.cm-condition-false')).toHaveCount(0);await expect(page.locator('.debug-command')).toContainText('Function entered.');
 await page.screenshot({path:'/tmp/kaplum-own-function-debugger.png'});
 await resume.click();await expect(page.locator('.debug-command')).toContainText('Finished');
 await expect(page.locator('.turtle-state')).toContainText('x: 60.0');
 await expect(page.locator('.debug-history')).toContainText('Return from function');
});
