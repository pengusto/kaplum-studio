import {inspectionState,inspectionStep} from "./turtle-inspection.js";
import { assetUrl } from "./asset-url.js";
// Share immutable engine sources between previews. Failed loads are retryable.
let sourceLoad;
function loadSources() {
  if (!sourceLoad) {
    sourceLoad = Promise.all([
      "/engine/library.js", "/engine/functions.js", "/src/worker.js", "/engine/teaching-clock.js",
    ].map(async path => {
      const response = await fetch(assetUrl(path));
      if (!response.ok) throw Error(`Cannot load ${path}`);
      return response.text();
    })).catch(error => { sourceLoad = undefined; throw error; });
  }
  return sourceLoad;
}
// Each run receives a new opaque sandbox and a terminable worker.
export class Preview {
  constructor(canvas, onStatus, onFrame, onState, onPlayback, onDebug) {
    this.canvas = canvas;
    this.onStatus = onStatus;
    this.onFrame = onFrame;
    this.onState = onState;
    this.onPlayback = onPlayback;
    this.onDebug = onDebug;
    this.sequence = 0;
  }
  stop() {
    this.sequence++;
    this.onDebug?.(null);
    this.detachInput?.(); this.detachInput = null;
    this.onState?.(null); this.lastState = null; this.inputKeys = new Set(); this.onPlayback?.(null);
    this.frame?.remove();
    this.frame = null;
    if (this.receive) window.removeEventListener("message", this.receive);
    this.receive = null;
    this.onStatus({ type: "stopped" });
  }
  control(action, delay, lines) { this.frame?.contentWindow?.postMessage({control:{action,delay,lines}}, "*"); }
  async run(code, render, replay = false, debug = null) {
    this.stop();
    const run = this.sequence;
    const send = input => this.frame?.contentWindow?.postMessage({ input }, "*");
    const key = event => {
      if (!this.inputKeys?.has(event.key)) return;
      if (event.repeat || event.ctrlKey || event.metaKey || event.altKey || event.key.length > 64) return;
      if (event.key.startsWith("Arrow") || event.key === " ") event.preventDefault();
      send({ kind: "key", key: event.key });
    };
    const pointer = event => {
      if (event.button !== 0) return;
      this.canvas.focus(); const rect = this.canvas.getBoundingClientRect();
      send({kind: "click", x: (render?.x || 0) + (event.clientX - rect.left) / rect.width * (render?.side || 700) - 350,
        y: 350 - (render?.y || 0) - (event.clientY - rect.top) / rect.height * (render?.side || 700)});
    };
    this.canvas.addEventListener("keydown", key);
    this.canvas.addEventListener("pointerdown", pointer);
    this.detachInput = () => { this.canvas.removeEventListener("keydown", key); this.canvas.removeEventListener("pointerdown", pointer); };
    this.onStatus({ type: "running" });
    try {
      const sources = await loadSources();
      if (run !== this.sequence) return;
      const frame = document.createElement("iframe");
      this.frame = frame;
      frame.hidden = true;
      frame.setAttribute("sandbox", "allow-scripts");
      frame.title = "Isolated program";
      const bridge = `let worker; onmessage=e=>{if(e.source!==parent)return; if(e.data.input){worker?.postMessage({input:e.data.input});return;} if(e.data.control){worker?.postMessage({control:e.data.control});return;} if(!e.data.start)return; const blob=new Blob([e.data.worker],{type:'text/javascript'}); const url=URL.createObjectURL(blob); worker=new Worker(url); URL.revokeObjectURL(url); worker.onmessage=event=>{const d=event.data;if(d.type==='error')worker.terminate();parent.postMessage(d,'*',d.bitmap?[d.bitmap]:[]);}; worker.onerror=event=>parent.postMessage({type:'error',message:event.message},'*'); worker.postMessage({code:e.data.code,engine:e.data.engine,render:e.data.render,replay:e.data.replay,debug:e.data.debug});}; parent.postMessage({type:'ready'},'*');`;
      frame.srcdoc = `<!doctype html><meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline' 'unsafe-eval'; worker-src blob:; connect-src 'none'"><script>${bridge}<\/script>`;
      const receive = (event) => {
        if (event.source !== frame.contentWindow) return;
        if (run !== this.sequence) {
          event.data?.bitmap?.close?.();
          return;
        }
        const data = event.data;
        if (!data || typeof data !== "object") return;
        if (data.type === "ready")
          frame.contentWindow.postMessage(
            {
              start: true,
              worker: sources[2],
              engine: sources[3] + "\n" + sources[0] + "\n" + sources[1],
              code,
              render,
              replay,
              debug,
            },
            "*",
          );
        else if (data.type === "frame" && data.bitmap) {
          this.inputKeys = new Set(Array.isArray(data.keys) ? data.keys.filter(key => typeof key === "string" && key.length <= 64) : []);
          if (this.canvas.width !== data.bitmap.width || this.canvas.height !== data.bitmap.height) {
            this.canvas.width = data.bitmap.width;
            this.canvas.height = data.bitmap.height;
          }
          const context = this.canvas.getContext("2d");
          context.clearRect(0, 0, this.canvas.width, this.canvas.height);
          context.drawImage(data.bitmap, 0, 0);
          data.bitmap.close();
          const inspected=inspectionState(data.state);
          if (inspected) {
            const next = JSON.stringify(inspected);
            if (next !== this.lastState) { this.lastState = next; this.onState?.(inspected); }
          }
          this.onFrame?.({ render });
        } else if (data.type === "debug" && Number.isInteger(data.line) && data.line >= 0 && Array.isArray(data.variables)) {
          this.onStatus({type:data.done === true ? "ready" : data.playing === true ? "executing" : "paused"});
          const condition=v=>v && Number.isInteger(v.line) && v.line>0 && typeof v.result === "boolean" && ["if","loop"].includes(v.control) && typeof v.source === "string" ? {line:v.line,result:v.result,control:v.control,source:v.source.slice(0,500)} : null;
          this.onDebug?.({stack:Array.isArray(data.stack) ? data.stack.slice(0,64).filter(name=>typeof name === "string").map(name=>name.slice(0,100)) : [],condition:condition(data.condition),line:data.line,done:data.done === true,playing:data.playing === true,breakpoint:data.breakpoint === true,source:typeof data.source === "string" ? data.source.slice(0,500) : "",kind:["body","control","condition","function","return"].includes(data.kind) ? data.kind : "statement",history:Array.isArray(data.history) ? data.history.slice(-8).filter(v=>v && Number.isInteger(v.line) && v.line>0 && typeof v.source === "string").map(v=>({...condition(v),line:v.line,source:v.source.slice(0,500),kind:["body","control","condition","function","return"].includes(v.kind) ? v.kind : "statement"})) : [],variables:data.variables.slice(0,100).filter(v=>v && typeof v.name === "string" && typeof v.value === "string").map(v=>({name:v.name.slice(0,100),value:v.value.slice(0,240)}))});
        } else if (data.type === "playback" && Number.isInteger(data.step) && Number.isInteger(data.total)) {
          this.onPlayback?.({step:data.step, total:data.total, detail:inspectionStep(data.detail), playing:data.playing === true});
        } else if (data.type === "executing")
          this.onStatus({ type: "executing" });
        else if (data.type === "paused")
          this.onStatus({ type: "paused" });
        else if (data.type === "error") {
          this.stop();
          this.onStatus({
            type: "error",
            message: String(data.message),
            kind: data.kind === "syntax" ? "syntax" : "runtime",
            line: Number.isInteger(data.line) ? data.line : null,
          });
        }
      };
      if (this.receive) window.removeEventListener("message", this.receive);
      this.receive = receive;
      window.addEventListener("message", receive);
      document.body.append(frame);
    } catch (error) {
      if (run === this.sequence)
        this.onStatus({ type: "error", kind: "load", message: error.message });
    }
  }
}
