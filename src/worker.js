// Browser-only drawing adapter. It exposes no host DOM or storage.
self.window = self;
let canvases;
let animationPaused = false;
let requestSnapshot = () => {};
const scheduleSnapshot = self.setTimeout.bind(self);
// The teaching surface stays 700 units wide. A render camera changes only
// raster resolution and framing, never coordinates, sizes or wrapping.
function drawingCanvas(render) {
  const side = render?.side || 700;
  const size = Math.max(700, Math.min(1600, Math.round(render?.size || 700)));
  const x = render?.x || 0, y = render?.y || 0;
  const surface = new OffscreenCanvas(size, size);
  const context = surface.getContext("2d");
  const scale = size / side;
  const transform = (a, b, c, d, e, f) =>
    context.setTransform(a * scale, b * scale, c * scale, d * scale,
      (e - x) * scale, (f - y) * scale);
  transform(1, 0, 0, 1, 0, 0);
  const logical = {
    width: 700, height: 700, surface, revision: 0,
    addEventListener() {},
    getContext() { return adapted; },
  };
  const adapted = new Proxy(context, {
    get(target, property) {
      if (property === "canvas") return logical;
      if (property === "getTransform") return () => { const m=target.getTransform(); return {a:m.a/scale,b:m.b/scale,c:m.c/scale,d:m.d/scale,e:m.e/scale+x,f:m.f/scale+y}; };
      if (property === "setTransform") return transform;
      if (property === "resetTransform") return () => transform(1, 0, 0, 1, 0, 0);
      if (property === "drawImage") return (image, ...args) => {
        if (image?.surface && args.length === 2) {
          // The stored image already contains this camera's region.
          logical.revision++; requestSnapshot();
          target.drawImage(image.surface, args[0] + x, args[1] + y, side, side);
        } else { logical.revision++; requestSnapshot(); target.drawImage(image?.surface || image, ...args); }
      };
      if (["fill", "stroke", "clearRect", "fillRect", "strokeRect", "fillText", "strokeText", "putImageData"].includes(property)) {
        return (...args) => { logical.revision++; requestSnapshot(); return target[property](...args); };
      }
      const value = Reflect.get(target, property, target);
      return typeof value === "function" ? value.bind(target) : value;
    },
    set(target, property, value) { Reflect.set(target, property, value, target); return true; },
  });
  return logical;
}
self.HTMLCanvasElement = OffscreenCanvas;
self.document = {
  getElementById: (id) => canvases[id] || { innerHTML: "", className: "" },
};
function report(error) {
  // JavaScript can throw any value, including null and objects with unsafe getters.
  let message = "Unknown error";
  let stack = "";
  let kind = "runtime";
  try {
    message = String(error?.message || error);
  } catch {
    // An object without a printable value must not break the error handler.
  }
  try {
    stack = String(error?.stack || "");
    if (error?.name === "SyntaxError") kind = "syntax";
  } catch {
    // Keep the available message even when diagnostic properties cannot be read.
  }
  const match = stack.match(/playground-program\.js:(\d+):/);
  postMessage({
    type: "error",
    message,
    kind,
    line: debuggerRun?.current?.line || (match ? Number(match[1]) : null),
  });
}

self.addEventListener("error", (event) => {
  event.preventDefault();
  report(event.error || Error(event.message));
});
self.addEventListener("unhandledrejection", (event) => {
  event.preventDefault();
  report(event.reason);
});
let playback = null, playbackTimer = null, playbackDelay = 300;
function playbackStatus(playing = false) {
  postMessage({type:"playback", step:playback?.step || 0, total:playback?.length || 0, detail:playback?.current || null, playing});
}
function pausePlayback() { if (playbackTimer !== null) clearTimeout(playbackTimer); playbackTimer=null; }
function playPlayback() {
  pausePlayback();
  if (!playback || playback.step >= playback.length) {playbackStatus();return;}
  playbackStatus(true);
  playbackTimer=setTimeout(() => {playbackTimer=null;playback.next();playPlayback();},playbackDelay);
}
let debuggerRun=null, debuggerTimer=null;
function stopDebugTimer() { if(debuggerTimer!==null) clearTimeout(debuggerTimer); debuggerTimer=null; }
function debugValues(bindings) {
  return bindings.map(([name,read])=>{
    let value="not in scope";
    try {
      const v=read(),type=typeof v;
      if(v===null) value="null";
      else if(type==="string") value=JSON.stringify(v.slice(0,200));
      else if(["number","boolean","undefined","bigint"].includes(type)) value=String(v);
      else value=`[${type}]`;
    } catch { /* Uninitialized or out-of-scope bindings are never evaluated further. */ }
    return {name,value};
  });
}
function debugStatus(playing=false, breakpoint=false) {
  postMessage({type:"debug",line:debuggerRun.current?.line || 0,done:debuggerRun.done,playing,breakpoint,source:debuggerRun.current?.source || "",kind:debuggerRun.current?.kind || "statement",history:debuggerRun.history,condition:debuggerRun.condition || null,variables:debuggerRun.variables || []});
}
function advanceDebug(playing=false) {
  stopDebugTimer();
  if(!debuggerRun || debuggerRun.done) return;
  if(++debuggerRun.steps>100000) throw Error("Debugger prototype: 100,000-step budget exceeded.");
  const previous=debuggerRun.current;
  const next=debuggerRun.iterator.next(previous?.kind === "condition" ? previous.result : undefined);
  if(previous) debuggerRun.history=[...debuggerRun.history,previous].slice(-8);
  // Retain only primitive snapshots, not closure references from completed scopes.
  debuggerRun.variables=debugValues(next.done ? debuggerRun.bindings || [] : next.value.bindings);
  debuggerRun.bindings=next.done ? null : next.value.bindings;
  debuggerRun.current=next.done ? null : {line:next.value.line,source:next.value.source,kind:next.value.kind,...(next.value.kind === "condition" ? {result:next.value.result,control:next.value.control} : {})};
  if(debuggerRun.current?.kind === "condition") debuggerRun.condition=debuggerRun.current;
  debuggerRun.done=next.done;
  const breakpoint=playing && !next.done && debuggerRun.breakpoints.has(next.value.line);
  debugStatus(playing && !next.done && !breakpoint,breakpoint);
  if(playing && !next.done && !breakpoint) debuggerTimer=scheduleSnapshot(()=>{try{advanceDebug(true);}catch(error){report(error);}},10);
}
onmessage = async (event) => {
  try {
    if (event.data?.control) {
      const {action, delay, lines} = event.data.control;
      if(action.startsWith("debug-")) {
        if(!debuggerRun) return;
        if(action==="debug-breakpoints") {debuggerRun.breakpoints=new Set(Array.isArray(lines) ? lines.filter(n=>Number.isInteger(n) && n>0 && n<=50000).slice(0,100) : []);return;}
        if(action==="debug-pause") {stopDebugTimer();debugStatus();}
        if(action==="debug-next" || action==="debug-continue") advanceDebug(action==="debug-continue");
        return;
      }
      if (action === "pause-animation" || action === "resume-animation") {
        if (typeof self.__pauseTurtleFrames !== "function" || playback) return;
        animationPaused = action === "pause-animation";
        self.__pauseTurtleFrames(animationPaused);
        postMessage({type:animationPaused ? "paused" : "executing"});
        return;
      }
      if (!playback) return;
      if (action === "speed" && Number.isFinite(delay)) {playbackDelay=Math.max(30,Math.min(2000,delay));if(playbackTimer !== null)playPlayback();return;}
      if (action === "play") {playPlayback();return;}
      pausePlayback();
      if (action === "next") playback.next();
      if (action === "back") playback.back();
      if (action === "undo") playback.undo();
      if (action === "reset") playback.reset();
      if (action === "finish") playback.finish();
      playbackStatus();return;
    }
    if (event.data?.input) {
      if (!debuggerRun && !animationPaused && typeof self.__dispatchTurtleInput === "function") self.__dispatchTurtleInput(event.data.input);
      return;
    }
    canvases = { imagecanvas: drawingCanvas(event.data.render), turtlecanvas: drawingCanvas(event.data.render) };
    (0, eval)(event.data.engine);
    // Sequential snapshots never clear drawing state and cannot flood the host.
    let sending = false, sentRevision = -1;
    const snapshot = async () => {
      if (sending || sentRevision === canvases.turtlecanvas.revision) return;
      sending = true;
      sentRevision = canvases.turtlecanvas.revision;
      try {
        const bitmap = await createImageBitmap(canvases.turtlecanvas.surface);
        postMessage({ type: "frame", bitmap, keys: __turtleInputKeys(), state: __displayTurtleState() }, [bitmap]);
      } finally {
        sending = false;
      }
    };
    let snapshotTimer = null;
    requestSnapshot = () => {
      if (snapshotTimer !== null) return;
      snapshotTimer = scheduleSnapshot(async () => {
        snapshotTimer = null;
        await snapshot();
        if (sentRevision !== canvases.turtlecanvas.revision) requestSnapshot();
      }, 33);
    };
    postMessage({ type: "executing" });
    const execute = () => (0, eval)('"use strict";' + event.data.code + "\n//# sourceURL=playground-program.js");
    if (event.data.debug) {
      debuggerRun={iterator:(0,eval)("(function*(){\"use strict\";"+event.data.debug.code+"\n})()"),current:null,done:false,steps:0,variables:[],history:[],breakpoints:new Set(Array.isArray(event.data.debug.breakpoints) ? event.data.debug.breakpoints.filter(n=>Number.isInteger(n) && n>0 && n<=50000).slice(0,100) : [])};
      advanceDebug();
    }
    else if (event.data.replay) { playback=recordDrawing(execute);playbackStatus(); }
    else execute();
    await snapshot();
  } catch (error) {
    report(error);
  }
};
