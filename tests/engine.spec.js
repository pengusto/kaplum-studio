import { teacherExamples } from "../src/teacher-examples";
import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";
const engine = await readFile(new URL("../engine/library.js", import.meta.url), "utf8");
const helpers = await readFile(new URL("../engine/functions.js", import.meta.url), "utf8");
async function load(page) {
  await page.goto("about:blank");
  await page.evaluate(() => {
    document.body.innerHTML = '<canvas id="imagecanvas" width="700" height="700"></canvas><canvas id="turtlecanvas" width="700" height="700"></canvas>';
  });
  await page.evaluate(engine);
}
test("movement, fractional coordinates, pen and clearing preserve the teaching state", async ({ page }) => {
  await load(page);
  const result = await page.evaluate(() => {
    wrap(false); hideTurtle(); color("red"); width(4); forward(100); right(90); forward(-50);
    const state = getTurtleState();
    const ctx = document.getElementById("imagecanvas").getContext("2d");
    const pixel = [...ctx.getImageData(350, 300, 1, 1).data];
    penup(); goto(12.5, 9.25); forward(10);
    const lifted = [...ctx.getImageData(370, 340, 1, 1).data];
    clear();
    return { state, fractional: getTurtleState(), pixel, lifted, blank: [...ctx.getImageData(350, 300, 1, 1).data] };
  });
  expect(result.state.x).toBeCloseTo(-50);
  expect(result.state.y).toBeCloseTo(100);
  expect(result.state.angleDeg).toBe(90);
  expect(result.fractional.x).toBeCloseTo(22.5);
  expect(result.fractional.y).toBeCloseTo(9.25);
  expect(result.pixel).toEqual([255, 0, 0, 255]);
  expect(result.lifted[3]).toBe(0);
  expect(result.blank[3]).toBe(0);
});
test("wrapping crosses edges, exact corners and multiple canvas widths", async ({ page }) => {
  await load(page);
  const states = await page.evaluate(() => {
    penup(); angle(90); forward(1600); const across = getTurtleState();
    goto(350, 350); angle(45); forward(Math.sqrt(2) * 10); const corner = getTurtleState();
    goto(0, 0); angle(0); forward(-800); const backwards = getTurtleState();
    return { across, corner, backwards };
  });
  expect(states.across.x).toBeCloseTo(200);
  expect(states.corner.x).toBeCloseTo(-340);
  expect(states.corner.y).toBeCloseTo(-340);
  expect(states.backwards.y).toBeCloseTo(-100);
});
test("CSS and RGB colours, aliases, fills and invalid input work in the new core", async ({ page }) => {
  await load(page);
  await page.evaluate(helpers);
  const result = await page.evaluate(() => {
    wrap(false); hideTurtle();
    const ctx = document.getElementById("imagecanvas").getContext("2d");
    const colours = [];
    for (const value of ["LimeGreen", "#abc", "ff0000", [0, 128, 255]]) { color(value); colours.push(ctx.strokeStyle); }
    beginFill("gold"); for (let i = 0; i < 4; i++) { forward(60); right(90); } endFill();
    const filled = [...ctx.getImageData(380, 320, 1, 1).data];
    geheZu(5, 10); setzeWinkel(90); vorwaerts(20);
    const state = liesTurtleZustand();
    const errors = [];
    for (const action of [() => forward(Infinity), () => angle(NaN), () => goto(5, NaN), () => width(0)]) {
      try { action(); } catch (error) { errors.push(error.message); }
    }
    return { colours, filled, state, errors };
  });
  expect(result.colours).toEqual(["#32cd32", "#aabbcc", "#ff0000", "#0080ff"]);
  expect(result.filled).toEqual([255, 215, 0, 255]);
  expect(result.state.x).toBeCloseTo(25);
  expect(result.state.y).toBeCloseTo(10);
  expect(result.state.angleDeg).toBe(90);
  expect(result.errors).toHaveLength(4);
});


test("Teaching clock sleeps without callbacks and cancellation leaves no pending timer", async () => {
  const { runInNewContext } = await import('node:vm');
  const clock = await readFile(new URL('../engine/teaching-clock.js', import.meta.url), 'utf8');
  let now = 0, next = 0;
  const timers = new Map(), timestamps = [];
  const scope = { performance:{now:()=>now}, setTimeout:callback=>{const id=++next;timers.set(id,callback);return id;}, clearTimeout:id=>timers.delete(id) };
  scope.self = scope;
  runInNewContext(clock, scope);
  expect(timers.size).toBe(0);
  const cancelled = scope.requestAnimationFrame(()=>{throw Error('cancelled callback ran');});
  expect(timers.size).toBe(1);
  scope.cancelAnimationFrame(cancelled);
  expect(timers.size).toBe(0);
  const animate = time => {timestamps.push(time);if(timestamps.length<3)scope.requestAnimationFrame(animate);};
  scope.requestAnimationFrame(animate);
  now = 51;
  const [id, callback] = [...timers][0];timers.delete(id);callback();
  expect(timestamps).toHaveLength(3);
  expect(timestamps[2]).toBeCloseTo(50);
  expect(timers.size).toBe(0);
});

test("position queries, home and backwards preserve state contracts", async ({ page }) => {
  await load(page);
  const result = await page.evaluate(() => {
    goto(-30, -40); angle(450); const before=getTurtleState(); const p=position(); p.x=999;
    const distances=[distanceTo(0,0),directionTo(-30,60),directionTo(70,-40),directionTo(-30,-140),directionTo(-130,-40),directionTo(-30,-40)];
    const after=getTurtleState(); penup(); backward(10); const back=position(); hideTurtle(); const hidden=isVisible(); showTurtle(); home();
    return {before,after,distances,back,hidden,visible:isVisible(),pen:isPenDown(),home:getTurtleState()};
  });
  expect(result.before).toEqual(result.after); expect(result.distances).toEqual([50,0,90,180,270,450]);
  expect(result.back.x).toBeCloseTo(-40); expect(result.hidden).toBe(false); expect(result.visible).toBe(true); expect(result.pen).toBe(false);
  expect(result.home).toEqual({x:0,y:0,angleDeg:0});
});
test("native input uses logical coordinates, focus and unsubscribe", async ({ page }) => {
  await load(page);
  await page.evaluate(() => { window.inputCount=0; window.off=onKey('ArrowRight',()=>{window.inputCount++;angle(90);forward(20);}); onClick(({x,y})=>goto(x,y)); });
  const canvas=page.locator('#turtlecanvas'); await canvas.focus(); await page.keyboard.press('ArrowRight');
  expect(await page.evaluate(()=>position().x)).toBeCloseTo(20);
  await page.evaluate(()=>off()); await page.keyboard.press('ArrowRight'); expect(await page.evaluate(()=>window.inputCount)).toBe(1);
  await canvas.click({position:{x:350,y:350}}); expect(await page.evaluate(()=>position())).toEqual({x:0,y:0});
});

test('finite drawing trace preserves pixels and synchronous state while replay steps move the display',async({page})=>{
 await load(page);await page.evaluate(helpers);
 const result=await page.evaluate(()=>{
  const program=()=>{hideTurtle();goto(-70,-70);color('coral');width(4);beginFill('gold');for(let i=0;i<4;i++){forward(140);right(90);}endFill();drawPacman(35,'blue',60);};
  program();const ctx=document.getElementById('imagecanvas').getContext('2d');const expected=[...ctx.getImageData(0,0,700,700).data];clear();goto(0,0);angle(0);
  window.replay=recordDrawing(program);const logical=getTurtleState();const start=__displayTurtleState();const length=replay.length;
  replay.next();const step=replay.step;replay.finish();const actual=[...ctx.getImageData(0,0,700,700).data];const final=__displayTurtleState();replay.back();const back=replay.step;replay.reset();
  return {same:expected.every((x,i)=>x===actual[i]),logical,start,final,length,step,back,reset:replay.step,bytes:replay.bytes};
 });
 expect(result.same).toBe(true);expect(result.length).toBeGreaterThan(8);expect(result.step).toBe(1);expect(result.back).toBe(result.length-1);expect(result.reset).toBe(0);expect(result.final.x).toBeCloseTo(result.logical.x);expect(result.bytes).toBeLessThan(4000000);
});
test('recording rejects timer/input programs explicitly and restores normal APIs',async({page})=>{
 await load(page);const result=await page.evaluate(()=>{let message;try{recordDrawing(()=>onKey('x',()=>{}));}catch(e){message=e.message;}const off=onKey('x',()=>{});off();return {message,state:getTurtleState()};});expect(result.message).toContain('synchronous finite');
});

test('turtle circle follows tangent, signed radius, pen and fill contracts', async ({page}) => {
 await load(page); await page.evaluate(helpers);
 const result=await page.evaluate(()=>{
  wrap(false); hideTurtle(); penup(); circle(50,180); const left=getTurtleState();
  home(); circle(-50,180); const rightSide=getTurtleState();
  home(); circle(50,-180); const reverse=getTurtleState();
  home(); circle(50,360,5); const full=getTurtleState();
  const ctx=document.getElementById('imagecanvas').getContext('2d');const blank=ctx.getImageData(300,350,1,1).data[3];
  home(); pendown(); beginFill('gold'); kreisPfad(50,360,90);endFill();
  const filled=[...ctx.getImageData(300,350,1,1).data];
  const errors=[];for(const args of [[0],[50,361],[50,360,2],[50,360,2.5],[Infinity]]){try{circle(...args);}catch(e){errors.push(e.message);}}
  return {left,rightSide,reverse,full,blank,filled,errors};
 });
 expect(result.left.x).toBeCloseTo(-100);expect(result.left.y).toBeCloseTo(0);expect(result.left.angleDeg).toBeCloseTo(-180);
 expect(result.rightSide.x).toBeCloseTo(100);expect(result.rightSide.angleDeg).toBeCloseTo(180);
 expect(result.reverse.x).toBeCloseTo(-100);expect(result.reverse.angleDeg).toBeCloseTo(180);
 expect(result.full.x).toBeCloseTo(0);expect(result.full.y).toBeCloseTo(0);expect(result.full.angleDeg).toBeCloseTo(-360);
 expect(result.blank).toBe(0);expect(result.filled).toEqual([255,215,0,255]);expect(result.errors).toHaveLength(5);
});

test('stamps retain colour and direction and can be removed without erasing ink',async({page})=>{
 await load(page);await page.evaluate(helpers);
 const result=await page.evaluate(()=>{
  hideTurtle();wrap(false);color('blue');width(4);forward(80);
  goto(-60,0);color('red');const first=stamp();goto(60,0);color('gold');const second=stemple();
  const pixel=x=>[...document.getElementById('turtlecanvas').getContext('2d').getImageData(350+x,350,1,1).data];
  const before=[pixel(-60),pixel(60)];const removed=clearStamp(first);const after=[pixel(-60),pixel(60),[...document.getElementById("turtlecanvas").getContext("2d").getImageData(350,310,1,1).data]];
  const missing=clearStamp(first);clear();const blank=pixel(60);
  const replay=recordDrawing(()=>{goto(-60,0);color('red');const id=stamp();goto(60,0);stamp();clearStamp(id);});
  replay.finish();const final=[pixel(-60),pixel(60)];replay.reset();const reset=pixel(60);replay.finish();
  return {first,second,before,removed,after,missing,blank,final,reset};
 });
 expect(result.first).not.toBe(result.second);expect(result.before[0]).toEqual([255,0,0,255]);expect(result.before[1]).toEqual([255,215,0,255]);
 expect(result.removed).toBe(true);expect(result.missing).toBe(false);expect(result.after[0][3]).toBe(0);expect(result.after[1]).toEqual(result.before[1]);expect(result.after[2]).toEqual([0,0,255,255]);
 expect(result.blank[3]).toBe(0);expect(result.final[0][3]).toBe(0);expect(result.final[1]).toEqual([255,0,0,255]);expect(result.reset[3]).toBe(0);
});

test('stamp IDs are validated and storage is bounded without reusing cleared IDs',async({page})=>{
 await load(page);const result=await page.evaluate(()=>{
  redrawOnMove(false);const ids=[];for(let i=0;i<1000;i++)ids.push(stamp());
  let limit;try{stamp();}catch(e){limit=e.message;}
  const errors=[];for(const id of [0,-1,1.2,'1',Infinity]){try{clearStamp(id);}catch(e){errors.push(e.message);}}
  clear();const after=stamp();return {limit,errors,after,last:ids.at(-1)};
 });expect(result.limit).toContain('1,000');expect(result.errors).toHaveLength(5);expect(result.after).toBeGreaterThan(result.last);
});

test('bounded drawing undo restores turtle, fill, clear and stamps and discards future checkpoints',async({page})=>{
 await load(page);await page.evaluate(helpers);
 const result=await page.evaluate(()=>{
  wrap(false);hideTurtle();const noHistory=undo();let counter=0;
  const h=recordDrawing(()=>{color('red');goto(-50,0);stamp();beginFill('gold');for(let i=0;i<4;i++){forward(50);right(90);counter++;}endFill();clear();});
  h.finish();const total=h.length;const removed=undo();const restored=__displayTurtleState();const logical=getTurtleState();const ctx=document.getElementById('turtlecanvas').getContext('2d');const stampPixel=[...ctx.getImageData(300,350,1,1).data];const fillPixel=[...ctx.getImageData(325,325,1,1).data];
  const shorter=h.length;const beforeBytes=h.bytes;while(undo()){};
  return {noHistory,removed,total,shorter,restored,logical,counter,stampPixel,fillPixel,beforeBytes,zero:h.length,last:undo()};
 });expect(result.noHistory).toBe(false);expect(result.removed).toBe(true);expect(result.shorter).toBe(result.total-1);expect(result.logical.x).toBeCloseTo(result.restored.x);expect(result.logical.angleDeg).toBeCloseTo(result.restored.angleDeg);expect(result.counter).toBe(4);expect(result.stampPixel).toEqual([255,0,0,255]);expect(result.fillPixel).toEqual([255,215,0,255]);expect(result.beforeBytes).toBeLessThan(4000000);expect(result.zero).toBe(0);expect(result.last).toBe(false);
});

test('trace checkpoint overflow is explicit and redraw cost stays bounded',async({page},testInfo)=>{
 await load(page);const result=await page.evaluate(()=>{
  let message;try{recordDrawing(()=>{for(let i=0;i<10001;i++)goto(i,0);});}catch(e){message=e.message;}
  goto(0,0);const h=recordDrawing(()=>{for(let i=0;i<500;i++){goto(i%100,0);stamp();}});h.finish();const begin=performance.now();h.undo();const latency=performance.now()-begin;
  return {message,latency,bytes:h.bytes,total:h.length};
 });expect(result.message).toContain('10,000 steps');expect(result.bytes).toBeLessThan(4000000);expect(result.latency).toBeLessThan(2000);await testInfo.attach('drawing-undo-sample',{body:JSON.stringify(result),contentType:'application/json'});
});


test('undo restores initial styles and pen; unfinished helper fills reject recording and clean up',async({page})=>{
 await load(page);await page.evaluate(helpers);
 const result=await page.evaluate(()=>{
  wrap(false);hideTurtle();const ctx=document.getElementById('imagecanvas').getContext('2d');
  ctx.setLineDash([4,2]);ctx.lineDashOffset=3;color('blue');width(7);ctx.font='18px serif';
  let message;try{recordDrawing(()=>{beginFill('gold');forward(20);});}catch(e){message=e.message;}
  const openAfterFailure=__hasOpenTurtleFill();goto(0,0);color('blue');width(7);
  const h=recordDrawing(()=>{color('red');width(20);ctx.font='30px monospace';penup();forward(30);pendown();forward(30);});
  h.finish();undo();undo();const pen=isPenDown();while(undo()){}
  return {message,openAfterFailure,pen,initialPen:isPenDown(),stroke:ctx.strokeStyle,width:ctx.lineWidth,font:ctx.font,dash:ctx.getLineDash(),offset:ctx.lineDashOffset};
 });
 expect(result.message).toContain('endFill()');expect(result.openAfterFailure).toBe(false);expect(result.pen).toBe(false);expect(result.initialPen).toBe(true);
 expect(result.stroke).toBe('#0000ff');expect(result.width).toBe(7);expect(result.font).toBe('18px serif');expect(result.dash).toEqual([4,2]);expect(result.offset).toBe(3);
});


test('inspection checkpoint describes actual styles, endpoints and effects without changing program queries',async({page})=>{
 await load(page);const result=await page.evaluate(()=>{
  stamp();const h=recordDrawing(()=>{wrap(false);color('coral');width(6);goto(35,-20);angle(90);penup();forward(80);pendown();forward(60);stamp();clear();});
  const logical=position();const details=[];while(h.step<h.length){h.next();details.push(h.current);}
  const final=__displayTurtleState();h.back();const back=h.current;h.reset();return {logical,details,final,back,reset:h.current};
 });
 expect(result.logical.x).toBeCloseTo(175);expect(result.logical.y).toBeCloseTo(-20);expect(result.final.penColor).toBe('#ff7f50');expect(result.final.lineWidth).toBe(6);expect(result.final.stampCount).toBe(0);
 expect(result.details.some(d=>d.before.penColor!==d.after.penColor)).toBe(true);expect(result.details.some(d=>d.before.lineWidth!==d.after.lineWidth)).toBe(true);
 expect(result.details.some(d=>!d.after.pen&&d.after.x===115&&d.effects.stroke===0)).toBe(true);expect(result.details.some(d=>d.effects.stamp===1)).toBe(true);expect(result.details.at(-1).effects.clear).toBe(1);expect(result.back.after.stampCount).toBe(1);expect(result.reset.before).toEqual(result.reset.after);expect(result.reset.after.stampCount).toBe(0);
});

test('teacher inspection messages reject invalid sandbox values and return detached snapshots',async()=>{
 const {inspectionState,inspectionStep}=await import('../src/turtle-inspection.js');
 const state={x:0,y:0,angleDeg:90,pen:false,visible:true,penColor:'#ff7f50',lineWidth:6,stampCount:1};
 const valid=inspectionState(state);expect(valid).toEqual(state);expect(valid).not.toBe(state);
 for(const value of [{...state,x:Infinity},{...state,lineWidth:0},{...state,pen:'yes'},{...state,stampCount:1001},{...state,penColor:'x'.repeat(129)}])expect(inspectionState(value)).toBeNull();
 const effects={stroke:1,fill:0,text:0,clear:0,stamp:0,removeStamp:0};expect(inspectionStep({before:state,after:state,effects})).toBeTruthy();expect(inspectionStep({before:state,after:state,effects:{...effects,stroke:-1}})).toBeNull();
});


test("moving star clips at the edge without wrapping filled geometry across the canvas", async ({ page }) => {
  await load(page);
  await page.evaluate(helpers);
  const starter = teacherExamples.find(example => example.id === "moving-star").starter;
  const frame = async x => page.evaluate(({source, x}) => {
    window.requestAnimationFrame = () => 0;
    (0, eval)(source.replace("let x = -250;", "let x = " + x + ";"));
    const ctx = document.getElementById("imagecanvas").getContext("2d");
    const data = ctx.getImageData(0, 0, 700, 700).data;
    let left = 0, right = 0;
    for (let y = 200; y < 500; y++) for (let px = 0; px < 700; px++) {
      const i = (y * 700 + px) * 4;
      if (data[i] === 236 && data[i + 1] === 150 && data[i + 2] === 64) {
        if (px < 350) left++;
        else right++;
      }
    }
    return {left, right};
  }, {source: starter, x});
  const edge = await frame(320);
  expect(edge.left).toBe(0);
  expect(edge.right).toBeGreaterThan(100);
  const outside = await frame(500);
  expect(outside).toEqual({left: 0, right: 0});
  const returned = await frame(-250);
  expect(returned.left).toBeGreaterThan(100);
  expect(returned.right).toBe(0);
});
