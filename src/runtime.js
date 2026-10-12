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
  constructor(canvas, onStatus, onFrame) {
    this.canvas = canvas;
    this.onStatus = onStatus;
    this.onFrame = onFrame;
    this.sequence = 0;
  }
  stop() {
    this.sequence++;
    this.frame?.remove();
    this.frame = null;
    if (this.receive) window.removeEventListener("message", this.receive);
    this.receive = null;
    this.onStatus({ type: "stopped" });
  }
  async run(code, render) {
    this.stop();
    const run = this.sequence;
    this.onStatus({ type: "running" });
    try {
      const sources = await loadSources();
      if (run !== this.sequence) return;
      const frame = document.createElement("iframe");
      this.frame = frame;
      frame.hidden = true;
      frame.setAttribute("sandbox", "allow-scripts");
      frame.title = "Isolated program";
      const bridge = `let worker; onmessage=e=>{if(e.source!==parent||!e.data.start)return; const blob=new Blob([e.data.worker],{type:'text/javascript'}); const url=URL.createObjectURL(blob); worker=new Worker(url); URL.revokeObjectURL(url); worker.onmessage=event=>{const d=event.data;if(d.type==='error')worker.terminate();parent.postMessage(d,'*',d.bitmap?[d.bitmap]:[]);}; worker.onerror=event=>parent.postMessage({type:'error',message:event.message},'*'); worker.postMessage({code:e.data.code,engine:e.data.engine,render:e.data.render});}; parent.postMessage({type:'ready'},'*');`;
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
            },
            "*",
          );
        else if (data.type === "frame" && data.bitmap) {
          if (this.canvas.width !== data.bitmap.width || this.canvas.height !== data.bitmap.height) {
            this.canvas.width = data.bitmap.width;
            this.canvas.height = data.bitmap.height;
          }
          const context = this.canvas.getContext("2d");
          context.clearRect(0, 0, this.canvas.width, this.canvas.height);
          context.drawImage(data.bitmap, 0, 0);
          data.bitmap.close();
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
