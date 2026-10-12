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
  constructor(canvas, onStatus, onFrame, onState, onPlayback) {
    this.canvas = canvas;
    this.onStatus = onStatus;
    this.onFrame = onFrame;
    this.onState = onState;
    this.onPlayback = onPlayback;
    this.sequence = 0;
  }
  stop() {
    this.sequence++;
    this.detachInput?.(); this.detachInput = null;
    this.onState?.(null); this.lastState = null; this.inputKeys = new Set(); this.onPlayback?.(null);
    this.frame?.remove();
    this.frame = null;
    if (this.receive) window.removeEventListener("message", this.receive);
    this.receive = null;
    this.onStatus({ type: "stopped" });
  }
  control(action, delay) { this.frame?.contentWindow?.postMessage({control:{action,delay}}, "*"); }
  async run(code, render, replay = false) {
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
      const bridge = `let worker; onmessage=e=>{if(e.source!==parent)return; if(e.data.input){worker?.postMessage({input:e.data.input});return;} if(e.data.control){worker?.postMessage({control:e.data.control});return;} if(!e.data.start)return; const blob=new Blob([e.data.worker],{type:'text/javascript'}); const url=URL.createObjectURL(blob); worker=new Worker(url); URL.revokeObjectURL(url); worker.onmessage=event=>{const d=event.data;if(d.type==='error')worker.terminate();parent.postMessage(d,'*',d.bitmap?[d.bitmap]:[]);}; worker.onerror=event=>parent.postMessage({type:'error',message:event.message},'*'); worker.postMessage({code:e.data.code,engine:e.data.engine,render:e.data.render,replay:e.data.replay});}; parent.postMessage({type:'ready'},'*');`;
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
          if (data.state && [data.state.x, data.state.y, data.state.angleDeg].every(Number.isFinite)) {
            const next = JSON.stringify(data.state);
            if (next !== this.lastState) { this.lastState = next; this.onState?.(data.state); }
          }
          this.onFrame?.({ render });
        } else if (data.type === "executing")
          this.onStatus({ type: "executing" });
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
