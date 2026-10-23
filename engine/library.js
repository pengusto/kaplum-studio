// Kaplum Studio Turtle core — Copyright (c) 2026 Enis Uysal. Pengusto Commercial License 1.0; see LICENSE.
// Canvas coordinates: origin in the centre, positive y upwards, 0° points up.
(function () {
  const image = document.getElementById("imagecanvas");
  const display = document.getElementById("turtlecanvas");
  const rawInk = image.getContext("2d");
  let trace = null, displayState = null, replayDepth = 0, activeHistory = null;
  const drawingMethods = new Set(["save","restore","setTransform","resetTransform","translate","rotate","scale","transform","beginPath","closePath","moveTo","lineTo","arc","ellipse","rect","roundRect","bezierCurveTo","quadraticCurveTo","fill","stroke","clearRect","fillRect","strokeRect","fillText","strokeText","setLineDash"]);
  const readMethods = new Set(["getTransform","getLineDash","measureText","isPointInPath","isPointInStroke","getImageData"]);
  function record(op) {
    if (!trace?.capturing) return;
    if (op.args?.some(value => !["number","string","boolean","undefined"].includes(typeof value) && value !== null)) throw Error("Drawing replay does not support object-valued canvas arguments.");
    const bytes = JSON.stringify(op).length;
    if (trace.ops.length >= 100000 || trace.bytes + bytes > 4000000) throw Error("Drawing trace limit exceeded (100,000 operations / 4 MB). Use a smaller drawing.");
    trace.bytes += bytes; trace.ops.push(op);
  }
  const ink = new Proxy(rawInk, {
    get(target, property) {
      const value = target[property];
      if (typeof value !== "function") return value;
      return (...args) => {
        if (trace?.capturing && !drawingMethods.has(property) && !readMethods.has(property)) throw Error(`Canvas operation ${String(property)} is not supported in drawing replay.`);
        if (drawingMethods.has(property)) record({kind:"call", name:property, args});
        return value.apply(target, args);
      };
    },
    set(target, property, value) {
      record({kind:"set", name:property, args:[value]}); target[property] = value; return true;
    }
  });
  // Helpers and core must observe the same recording context.
  const originalContext = image.getContext.bind(image);
  image.getContext = (type, ...args) => type === "2d" ? ink : originalContext(type, ...args);
  const screen = display.getContext("2d");
  const stamps = new Map(), replayStamps = new Map();
  let nextStamp = 1;
  const state = { x: 0, y: 0, heading: 0, pen: true, visible: true, wrap: true, redraw: true };
  const radians = (degrees) => degrees * Math.PI / 180;
  const finite = (value, label) => {
    const number = Number(value);
    if (!Number.isFinite(number)) throw new Error(`${label} must be a finite number.`);
    return number;
  };
  function centred(context) {
    context.translate(context.canvas.width / 2, context.canvas.height / 2);
    context.scale(1, -1);
  }
  function erase(context) {
    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.restore();
  }
  const checkpointState = () => ({...state, penColor:String(rawInk.strokeStyle), lineWidth:rawInk.lineWidth, stampCount:stamps.size});
  function draw() {
    if (trace?.capturing) {
      const checkpoint = checkpointState();
      const previous = trace.steps.at(-1);
      if (!previous || previous.end !== trace.ops.length || JSON.stringify(previous.state) !== JSON.stringify(checkpoint)) {
        if (trace.steps.length >= 10000) throw Error("Drawing trace limit exceeded (10,000 steps).");
        trace.steps.push({end:trace.ops.length, state:checkpoint});
      }
      return;
    }
    const shown = displayState || state;
    erase(screen);
    screen.save();
    screen.globalCompositeOperation = "source-over";
    screen.drawImage(image, 0, 0);
    for (const impression of (displayState ? replayStamps : stamps).values()) {
      screen.save(); centred(screen); screen.translate(impression.x, impression.y);
      screen.rotate(-radians(impression.heading));
      screen.beginPath(); screen.moveTo(-8, -5); screen.lineTo(8, -5); screen.lineTo(0, 18); screen.closePath();
      screen.fillStyle = impression.color; screen.fill(); screen.restore();
    }
    if (shown.visible) {
      centred(screen);
      screen.translate(shown.x, shown.y);
      screen.rotate(-radians(shown.heading));
      screen.beginPath();
      screen.moveTo(-5, 0);
      screen.lineTo(5, 0);
      screen.lineTo(0, 15);
      screen.closePath();
      screen.fillStyle = "green";
      screen.fill();
    }
    screen.restore();
  }
  const drawIf = () => { if (state.redraw) draw(); };
  const keys = new Map(), clicks = new Set();
  function onKey(key, handler) {
    if (typeof key !== "string" || !key || key.length > 64 || typeof handler !== "function") throw Error("onKey needs a key and a function.");
    const handlers = keys.get(key) || new Set(); keys.set(key, handlers); handlers.add(handler); drawIf();
    return () => { handlers.delete(handler); if (!handlers.size) keys.delete(key); drawIf(); };
  }
  function onClick(handler) {
    if (typeof handler !== "function") throw Error("onClick needs a function.");
    clicks.add(handler); return () => clicks.delete(handler);
  }
  function input(event) {
    if (event?.kind === "key" && typeof event.key === "string") {
      for (const handler of [...(keys.get(event.key) || [])]) handler(event.key);
    } else if (event?.kind === "click" && Number.isFinite(event.x) && Number.isFinite(event.y)) {
      for (const handler of [...clicks]) handler({ x: event.x, y: event.y });
    }
  }
  // Worker adapter uses this internal entry; standalone projects use native events.
  window.__dispatchTurtleInput = input;
  window.__turtleInputKeys = () => [...keys.keys()];
  if (display instanceof HTMLCanvasElement && typeof display.focus === "function") {
    display.tabIndex = 0;
    display.addEventListener("keydown", event => {
      if (event.repeat || event.ctrlKey || event.metaKey || event.altKey || !keys.has(event.key)) return;
      event.preventDefault(); input({ kind: "key", key: event.key });
    });
    display.addEventListener("pointerdown", event => {
      if (event.button !== 0) return;
      display.focus(); const rect = display.getBoundingClientRect();
      input({kind: "click", x: (event.clientX - rect.left) * display.width / rect.width - display.width / 2,
        y: display.height / 2 - (event.clientY - rect.top) * display.height / rect.height});
    });
  }


  // Split a journey at the closest edge; start the next segment at the opposite edge.
  // This also handles negative distances and exact edge/corner crossings.
  function forward(value) {
    const distance = finite(value, "Distance");
    let remaining = Math.abs(distance);
    const direction = Math.sign(distance);
    const dx = Math.sin(radians(state.heading)) * direction;
    const dy = Math.cos(radians(state.heading)) * direction;
    const halfWidth = image.width / 2, halfHeight = image.height / 2;
    const tolerance = 1e-10;
    ink.save();
    centred(ink);
    ink.beginPath();
    if (state.wrap) {
      const fold = (position, half) => ((position + half) % (2 * half) + 2 * half) % (2 * half) - half;
      if (Math.abs(state.x) > halfWidth) state.x = fold(state.x, halfWidth);
      if (Math.abs(state.y) > halfHeight) state.y = fold(state.y, halfHeight);
    }
    while (remaining > tolerance) {
      ink.moveTo(state.x, state.y);
      const edgeX = Math.abs(dx) < tolerance ? Infinity : ((dx > 0 ? halfWidth : -halfWidth) - state.x) / dx;
      const edgeY = Math.abs(dy) < tolerance ? Infinity : ((dy > 0 ? halfHeight : -halfHeight) - state.y) / dy;
      const travel = state.wrap ? Math.max(0, Math.min(remaining, edgeX, edgeY)) : remaining;
      state.x += dx * travel;
      state.y += dy * travel;
      ink.lineTo(state.x, state.y);
      remaining -= travel;
      if (remaining <= tolerance) break;
      if (edgeX <= travel + tolerance) state.x = dx > 0 ? -halfWidth : halfWidth;
      if (edgeY <= travel + tolerance) state.y = dy > 0 ? -halfHeight : halfHeight;
    }
    if (state.pen) ink.stroke();
    ink.restore();
    drawIf();
  }
  function color(red, green, blue) {
    if (typeof red === "string") {
      // Let Canvas parse CSS names, hex and rgb; no bundled colour parser needed.
      ink.strokeStyle = /^[\da-f]{3}$|^[\da-f]{6}$/i.test(red) ? `#${red}` : red;
    } else {
      const channels = Array.isArray(red) ? red : [red, green, blue];
      const rgb = channels.map((value) => Math.max(0, Math.min(255, finite(value, "Colour channel"))));
      ink.strokeStyle = `rgb(${rgb.join(",")})`;
    }
    drawIf();
  }
  function goto(x, y) {
    const nextX = finite(x, "X"), nextY = finite(y, "Y");
    state.x = nextX;
    state.y = nextY;
    drawIf();
  }
  function width(value) {
    const thickness = finite(value, "Width");
    if (thickness <= 0) throw new Error("Width must be positive.");
    ink.lineWidth = thickness;
    drawIf();
  }
  function write(text) {
    ink.save();
    ink.translate(image.width / 2 + state.x, image.height / 2 - state.y);
    ink.fillText(String(text), 0, 0);
    ink.restore();
    drawIf();
  }
  // Positive radius curves to the left, negative radius to the right.
  // Chord endpoints lie on the requested circle; the heading follows its tangent.
  function stamp() {
    if (stamps.size >= 1000) throw Error("Stamp limit exceeded (1,000 impressions). Clear stamps before adding more.");
    const id = nextStamp++;
    const impression = {x:state.x, y:state.y, heading:state.heading, color:ink.strokeStyle};
    record({kind:"stamp", args:[id, impression.x, impression.y, impression.heading, impression.color]});
    stamps.set(id, impression); drawIf(); return id;
  }
  function clearStamp(id) {
    if (!Number.isInteger(id) || id < 1) throw Error("Stamp ID must be a positive integer.");
    record({kind:"clearStamp", args:[id]});
    const removed = stamps.delete(id); drawIf(); return removed;
  }
  function clearDrawing() {
    erase(ink); record({kind:"clearStamps", args:[]}); stamps.clear(); drawIf();
  }
  function circle(radius, extent = 360, steps) {
    radius = finite(radius, "Radius"); extent = finite(extent, "Extent");
    if (radius === 0 || Math.abs(extent) > 360) throw Error("Circle needs a nonzero radius and an extent between -360 and 360 degrees.");
    steps = steps === undefined ? Math.max(12, Math.ceil(Math.abs(extent) / 4)) : finite(steps, "Steps");
    if (!Number.isInteger(steps) || steps < 3 || steps > 2000) throw Error("Circle steps must be an integer from 3 to 2000.");
    if (extent === 0) return;
    const turn = -extent * Math.sign(radius) / steps;
    const chord = 2 * Math.abs(radius) * Math.sin(radians(Math.abs(turn) / 2)) * Math.sign(extent);
    window.right(turn / 2);
    for (let step = 0; step < steps; step++) {
      window.forward(chord);
      if (step < steps - 1) window.right(turn);
    }
    window.right(turn / 2);
  }
  function recordDrawing(program) {
    if (typeof program !== "function" || trace?.capturing) throw Error("recordDrawing needs a synchronous drawing function.");
    if (trace) throw Error("Restart the program before recording another drawing.");
    const saved = {};
    const styles = Object.fromEntries(["strokeStyle","fillStyle","lineWidth","lineCap","lineJoin","miterLimit","font","textAlign","textBaseline","globalAlpha","globalCompositeOperation"].map(key => [key, rawInk[key]]));
    if (window.__hasOpenTurtleFill?.()) throw Error("Close the fill with endFill() before recording a drawing.");
    const baselineTransform = rawInk.getTransform();
    const baselineDash = rawInk.getLineDash();
    const baselineDashOffset = rawInk.lineDashOffset;
    erase(rawInk); stamps.clear();
    const initial = checkpointState();
    trace = {capturing:true, ops:[], steps:[], bytes:0};
    let result;
    try {
      for (const name of ["setTimeout","setInterval","requestAnimationFrame","onKey","onClick","beiTaste","beiKlick","naechstesBild","verzoegere","wiederholeZeitlich"]) {
        if (typeof window[name] === "function") { saved[name]=window[name]; window[name]=()=>{throw Error("Drawing replay supports synchronous finite drawings only; timers and input handlers need immediate mode.");}; }
      }
      result = program();
      if (result && typeof result.then === "function") throw Error("Drawing replay cannot record asynchronous programs.");
      if (window.__hasOpenTurtleFill?.()) throw Error("Finish every beginFill() with endFill() in a drawing recording.");
      draw();
    } catch (error) {
      window.__resetTurtleFill?.();
      trace = null; displayState = null; throw error;
    } finally {
      for (const [name, fn] of Object.entries(saved)) window[name]=fn;
      if (trace) trace.capturing=false;
    }
    const data = trace;
    let cursor = 0, operation = 0;
    function resetSurface() {
      while (replayDepth > 0) {rawInk.restore(); replayDepth--;}
      rawInk.setTransform(1,0,0,1,0,0);rawInk.clearRect(0,0,image.width,image.height);rawInk.beginPath();
      for (const [key,value] of Object.entries(styles)) rawInk[key]=value;
      rawInk.setLineDash(baselineDash);rawInk.lineDashOffset=baselineDashOffset;
      rawInk.setTransform(baselineTransform.a,baselineTransform.b,baselineTransform.c,baselineTransform.d,baselineTransform.e,baselineTransform.f);
      replayStamps.clear(); operation=0;cursor=0;
    }
    function seek(value) {
      if (!Number.isInteger(value) || value < 0 || value > data.steps.length) throw Error("Replay step is out of range.");
      if (value < cursor || operation === 0) resetSurface();
      const end = value ? data.steps[value-1].end : 0;
      while (operation < end) {
        const op = data.ops[operation++];
        if (op.kind === "stamp") {const [id,x,y,heading,color]=op.args;replayStamps.set(id,{x,y,heading,color});}
        else if (op.kind === "clearStamp") replayStamps.delete(op.args[0]);
        else if (op.kind === "clearStamps") replayStamps.clear();
        else if (op.kind === "set") rawInk[op.name]=op.args[0];
        else {
          rawInk[op.name](...op.args);
          if (op.name === "save") replayDepth++;
          if (op.name === "restore") replayDepth=Math.max(0,replayDepth-1);
        }
      }
      cursor=value;displayState={...(value ? data.steps[value-1].state : initial)};draw();
      return cursor;
    }
    function undoStep() {
      if (!cursor) return false;
      seek(cursor - 1);
      // Drawing undo discards future drawing checkpoints, never JS variables.
      data.steps.length = cursor;
      data.ops.length = cursor ? data.steps[cursor - 1].end : 0;
      data.bytes = data.ops.reduce((bytes, op) => bytes + JSON.stringify(op).length, 0);
      for (const key of Object.keys(state)) state[key]=displayState[key];
      stamps.clear(); for (const [id, impression] of replayStamps) stamps.set(id, {...impression});
      return true;
    }
    function currentStep() {
      const current = cursor ? data.steps[cursor-1] : null;
      const previous = cursor > 1 ? data.steps[cursor-2] : null;
      const effects = {stroke:0, fill:0, text:0, clear:0, stamp:0, removeStamp:0};
      if (current) for (let i=previous?.end || 0;i<current.end;i++) {
        const op=data.ops[i];
        if (op.kind === "stamp") effects.stamp++;
        if (op.kind === "clearStamp" || op.kind === "clearStamps") effects.removeStamp++;
        if (op.kind === "call") {
          if (["stroke","strokeRect"].includes(op.name)) effects.stroke++;
          if (["fill","fillRect"].includes(op.name)) effects.fill++;
          if (["fillText","strokeText"].includes(op.name)) effects.text++;
          if (op.name === "clearRect") effects.clear++;
        }
      }
      return {before:publicState(previous?.state || initial),after:publicState(current?.state || initial),effects};
    }
    resetSurface();displayState=initial;draw();
    const controller = Object.freeze({
      get length(){return data.steps.length;}, get step(){return cursor;}, get bytes(){return data.bytes;}, get current(){return currentStep();},
      next:()=>seek(Math.min(data.steps.length,cursor+1)), back:()=>seek(Math.max(0,cursor-1)),
      reset:()=>seek(0), finish:()=>seek(data.steps.length), seek, undo:undoStep,
    });
    activeHistory = controller; return controller;
  }
  function undo() {
    if (trace?.capturing) throw Error("Undo requires a completed finite drawing recording.");
    return activeHistory ? activeHistory.undo() : false;
  }
  function publicState(shown) {return {x:shown.x,y:shown.y,angleDeg:shown.heading,pen:shown.pen,visible:shown.visible,penColor:shown.penColor,lineWidth:shown.lineWidth,stampCount:shown.stampCount};}
  window.__displayTurtleState = () => publicState(displayState || checkpointState());
  Object.assign(window, {
    forward, color, goto, width, write, draw, drawIf, onKey, onClick, recordDrawing, circle, stamp, clearStamp, undo,
    position: () => ({ x: state.x, y: state.y }),
    heading: () => state.heading,
    distanceTo: (x, y) => Math.hypot(finite(x, "X") - state.x, finite(y, "Y") - state.y),
    directionTo: (x, y) => {
      const dx = finite(x, "X") - state.x, dy = finite(y, "Y") - state.y;
      return dx === 0 && dy === 0 ? state.heading : (Math.atan2(dx, dy) * 180 / Math.PI + 360) % 360;
    },
    backward: (distance) => forward(-finite(distance, "Distance")),
    home: () => { state.x = 0; state.y = 0; state.heading = 0; drawIf(); },
    isVisible: () => state.visible,
    isPenDown: () => state.pen,
    angle: (value) => { state.heading = finite(value, "Angle"); drawIf(); },
    right: (value) => { state.heading += finite(value, "Angle"); drawIf(); },
    left: (value) => { state.heading -= finite(value, "Angle"); drawIf(); },
    penup: () => { state.pen = false; drawIf(); },
    pendown: () => { state.pen = true; drawIf(); },
    hideTurtle: () => { state.visible = false; drawIf(); },
    showTurtle: () => { state.visible = true; drawIf(); },
    wrap: (enabled) => { state.wrap = Boolean(enabled); },
    redrawOnMove: (enabled) => { state.redraw = Boolean(enabled); },
    clear: clearDrawing,
    getTurtleState: () => ({ x: state.x, y: state.y, angleDeg: state.heading }),
    setFont: (font) => { ink.font = font; },
    degToRad: radians,
    radToDeg: (value) => value * 180 / Math.PI,
  });
  ink.lineWidth = 1;
  ink.strokeStyle = "black";
  ink.textAlign = "center";
  ink.textBaseline = "middle";
  draw();
})();
