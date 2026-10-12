"use client";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { Preview } from "../src/runtime";
import StatusMark from "./react-bits/StatusMark";
// Only visible catalogue canvases own an active sandbox. Explicit pauses survive route changes.
export default function CataloguePreview({ source, title, id, pausedPreviews, t, fitFigure = false }) {
  const host = useRef(null), canvas = useRef(null), instance = useRef(null), cameraRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [paused, setPaused] = useState(pausedPreviews.has(id));
  const [allowed, setAllowed] = useState(false);
  const [status, setStatus] = useState({ type: "ready" });
  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    const preview = new Preview(canvas.current, setStatus, () => setDrawn(true));
    const camera = () => {
      const bounds = canvas.current.getBoundingClientRect();
      const size = Math.min(1600, Math.max(700, Math.ceil(Math.max(bounds.width, bounds.height) * devicePixelRatio)));
      // Stable teaching camera: sizes change visibly, with no calibration run.
      const side = fitFigure && /figur-(pacman|dino|schmetterling|kreis|halbkreis|dreieck|blume)$/.test(id) ? 400 : 700;
      cameraRef.current = { x: (700 - side) / 2, y: (700 - side) / 2, side, size };
    };
    camera();
    const resize = new ResizeObserver(camera);
    resize.observe(canvas.current);
    instance.current = preview;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting && entry.intersectionRatio >= 0.35), { threshold: [0, 0.35] });
    observer.observe(host.current);
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const motion = () => setReduced(media.matches);
    const visibility = () => setHidden(document.hidden);
    motion(); visibility();
    media.addEventListener("change", motion);
    document.addEventListener("visibilitychange", visibility);
    return () => { observer.disconnect(); resize.disconnect(); media.removeEventListener("change", motion); document.removeEventListener("visibilitychange", visibility); preview.stop(); instance.current = null; };
  }, []);
  useEffect(() => {
    const preview = instance.current;
    if (!preview) return;
    preview.stop();
    setDrawn(false);
    if (visible && !hidden && !paused && (!reduced || allowed)) {
      const timer = setTimeout(() => preview.run(source.replace(/^setBackground\("white"\);\s*/, ""), cameraRef.current), 50);
      return () => { clearTimeout(timer); preview.stop(); };
    } else preview.stop();
  }, [source, visible, hidden, paused, reduced, allowed]);
  const animated = /requestAnimationFrame|setInterval|setTimeout/.test(source);
  const settled = drawn && !animated;
  const wantsToPlay = !paused && (!reduced || allowed);
  const playing = visible && !hidden && wantsToPlay;
  return <div ref={host} className="catalogue-preview" data-playing={playing} data-paused={paused} data-drawn={drawn}>
    <div className="canvas-surface"><canvas ref={canvas} width="700" height="700" aria-label={title} /></div>
    <div className="catalogue-playback">
      <span role={status.type === "error" ? "alert" : "status"}>
        <span aria-hidden="true"><StatusMark size={14} color="var(--accent)" strike={false} status={status.type === "error" ? "failed" : playing ? (settled ? "done" : "running") : "cancelled"} /></span>
        {status.type === "error" ? t("engineUnavailable") : playing ? t(settled ? "ready" : "running") : paused ? t("previewPaused") : t("previewIdle")}
      </span>
      <button aria-label={`${wantsToPlay ? t("pausePreview") : t("playPreview")}: ${title}`} onClick={() => {
        if (wantsToPlay) { pausedPreviews.add(id); setPaused(true); }
        else { pausedPreviews.delete(id); setPaused(false); setAllowed(true); }
      }}>{wantsToPlay ? <Pause size={15} /> : <Play size={15} />}</button>
    </div>
  </div>;
}
