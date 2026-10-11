"use client";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { Preview } from "../src/runtime";
import StatusMark from "./react-bits/StatusMark";
// Only visible catalogue canvases own an active sandbox. Explicit pauses survive route changes.
export default function CataloguePreview({ source, title, id, pausedPreviews, t, fitFigure = false }) {
  const host = useRef(null), canvas = useRef(null), instance = useRef(null), cropRef = useRef(undefined);
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [paused, setPaused] = useState(pausedPreviews.has(id));
  const [allowed, setAllowed] = useState(false);
  const [status, setStatus] = useState({ type: "ready" });
  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    const scratch = document.createElement("canvas");
    scratch.width = scratch.height = 700;

    const preview = new Preview(canvas.current, setStatus, () => {
      setDrawn(true);
      if (!fitFigure) return;
      const context = canvas.current.getContext("2d");
      if (cropRef.current === undefined) {
        const pixels = context.getImageData(0, 0, 700, 700).data;
        let left = 700, top = 700, right = -1, bottom = -1;
        for (let y = 0; y < 700; y++) for (let x = 0; x < 700; x++) {
          if (pixels[(y * 700 + x) * 4 + 3] > 20) {
            left = Math.min(left, x); right = Math.max(right, x);
            top = Math.min(top, y); bottom = Math.max(bottom, y);
          }
        }
        if (right < 0) return;
        // Opaque backgrounds are intentional scenes: preserve their complete canvas.
        if (right - left > 630 || bottom - top > 630) { cropRef.current = false; return; }
        const side = Math.min(700, Math.max(right - left + 1, bottom - top + 1) * 1.45);
        cropRef.current = { x: Math.max(0, Math.min(700 - side, (left + right) / 2 - side / 2)), y: Math.max(0, Math.min(700 - side, (top + bottom) / 2 - side / 2)), side };
      }
      const crop = cropRef.current;
      if (!crop) return;
      const buffer = scratch.getContext("2d");
      buffer.clearRect(0, 0, 700, 700);
      buffer.drawImage(canvas.current, 0, 0);
      context.clearRect(0, 0, 700, 700);
      context.drawImage(scratch, crop.x, crop.y, crop.side, crop.side, 0, 0, 700, 700);
    });
    instance.current = preview;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting && entry.intersectionRatio >= 0.35), { threshold: [0, 0.35] });
    observer.observe(host.current);
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const motion = () => setReduced(media.matches);
    const visibility = () => setHidden(document.hidden);
    motion(); visibility();
    media.addEventListener("change", motion);
    document.addEventListener("visibilitychange", visibility);
    return () => { observer.disconnect(); media.removeEventListener("change", motion); document.removeEventListener("visibilitychange", visibility); preview.stop(); instance.current = null; };
  }, []);
  useEffect(() => {
    const preview = instance.current;
    if (!preview) return;
    cropRef.current = undefined;
    if (visible && !hidden && !paused && (!reduced || allowed)) {
      const timer = setTimeout(() => preview.run(source.replace(/^setBackground\("white"\);\s*/, "")), 100);
      return () => clearTimeout(timer);
    } else preview.stop();
  }, [source, visible, hidden, paused, reduced, allowed]);
  const playing = visible && !hidden && !paused && (!reduced || allowed);
  return <div ref={host} className="catalogue-preview" data-playing={playing} data-paused={paused} data-drawn={drawn}>
    <div className="canvas-surface"><canvas ref={canvas} width="700" height="700" aria-label={title} /></div>
    <div className="catalogue-playback">
      <span role={status.type === "error" ? "alert" : "status"}>
        <span aria-hidden="true"><StatusMark size={14} color="var(--accent)" strike={false} status={status.type === "error" ? "failed" : playing ? "running" : "cancelled"} /></span>
        {status.type === "error" ? t("engineUnavailable") : playing ? t("running") : paused ? t("previewPaused") : t("previewIdle")}
      </span>
      <button aria-label={`${playing ? t("pausePreview") : t("playPreview")}: ${title}`} onClick={() => {
        if (playing) { pausedPreviews.add(id); setPaused(true); }
        else { pausedPreviews.delete(id); setPaused(false); setAllowed(true); }
      }}>{playing ? <Pause size={15} /> : <Play size={15} />}</button>
    </div>
  </div>;
}
