"use client";
import { assetUrl } from "../src/asset-url";
import { useEffect, useRef, useState } from "react";
import {
  Play,
  Square,
  RotateCcw,
  ArrowLeft,
  Download,
  Lightbulb,
  Package,
  X,
  FileCode2,
  Image,
  SlidersHorizontal,
} from "lucide-react";
import DinoControls from "./DinoControls";
import EditorPane from "./EditorPane";
import StatusMark from "./react-bits/StatusMark";
import RubberSegment from "./react-bits/RubberSegment";
import Parameters, { findEntry } from "./Parameters";
import { capabilityLabels } from "../src/capability-labels";
import { Preview } from "../src/runtime";
import { projectFiles, download } from "../src/exports";
import { storedZip } from "../src/zip";
import { exampleCall } from "../src/parameters";
import { recipes, reference } from "../src/reference";
import { examples } from "../src/examples";
import { locales } from "../src/i18n";
function starterCode(source) {
  return source.replace(/^setBackground\("white"\);\s*/, "");
}
export default function Workspace({ route, preferences, t, drafts }) {
  const [kind, id] = route.split("/");
  const item =
    kind === "figure"
      ? recipes.find((x) => x.id === id)
      : kind === "animation"
        ? examples.find((x) => x.id === id)
        : kind === "command"
          ? reference.find((x) => x.name === id)
          : null;
  const source =
    kind === "course"
      ? "hideTurtle();\ngoto(0, 0);\n// Make a filled coral circle with radius 60.\n"
      : kind === "personal"
        ? 'hideTurtle();\ngoto(0, 0);\ncolor("DeepSkyBlue");\n// Try your first drawing here.\n'
        : starterCode(item?.code || item?.starter || "");
  const initial = drafts.get(route) ?? source;
  const code = useRef(initial),
    editor = useRef(null),
    canvas = useRef(null),
    preview = useRef(null),
    helperDialog = useRef(null),
    pointerFrame = useRef(null), pointerSample = useRef(null);
  const entry =
    kind === "command"
      ? item
      : kind === "course"
        ? reference.find((x) => x.name === "drawCircle")
        : findEntry(source, reference);
  const [status, setStatus] = useState({ type: "ready" }),
    [panel, setPanel] = useState("code"),
    [inspector, setInspector] = useState(true),
    [liveCode, setLiveCode] = useState(initial),
    [exporting, setExporting] = useState(false),
    [exportError, setExportError] = useState(""),
    [showVault, setShowVault] = useState(false),
    [selected, setSelected] = useState(new Set(entry ? [entry.name] : []));
  const locale = preferences.locale;
  const labels = capabilityLabels[locale];
  const [turtleState, setTurtleState] = useState(null), [grid, setGrid] = useState(false), [pointer, setPointer] = useState(null), [copyError, setCopyError] = useState(false);
  const title =
    kind === "course"
      ? t("lesson")
      : kind === "personal"
        ? t("personal")
        : kind === "figure"
          ? item?.title[locale]
          : kind === "animation"
            ? locales[locale].activities[id]?.title
            : item?.name;
  useEffect(() => {
    const instance = new Preview(canvas.current, setStatus, null, setTurtleState);
    preview.current = instance;
    const visibility = () => {
      if (document.hidden) instance.stop();
    };
    document.addEventListener("visibilitychange", visibility);
    if (
      kind !== "course" &&
      !(
        kind === "animation" &&
        matchMedia("(prefers-reduced-motion: reduce)").matches
      )
    )
      instance.run(code.current);
    return () => {
      instance.stop();
      if (pointerFrame.current !== null) cancelAnimationFrame(pointerFrame.current);
      document.removeEventListener("visibilitychange", visibility);
      preview.current = null;
    };
  }, []);
  function run() {
    preview.current?.run(code.current);
  }
  async function exportProject() {
    setExporting(true);
    setExportError("");
    try {
      download(
        storedZip(await projectFiles(code.current, preferences.canvas)),
        "turtle-project.zip",
      );
    } catch {
      setExportError(t("exportError"));
    } finally {
      setExporting(false);
    }
  }
  const statusText =
    status.type === "executing"
      ? t("running")
      : status.type === "running"
        ? t("loading")
        : status.type === "error"
          ? `${t("engineUnavailable")} ${status.message}`
          : status.type === "stopped"
            ? t("stopped")
            : t("ready");
  return (
    <>
      <div className="workspace-heading">
        <div>
          <a
            className="back"
            href={`#${kind === "animation" ? "animations" : kind === "command" ? "commands" : "figures"}`}
          >
            <ArrowLeft size={15} />
            {t("back")}
          </a>
          <p className="eyebrow">
            {kind === "course" ? t("course") : t("draft")}
          </p>
          <h1>{title || t("noResults")}</h1>
          <p>
            {kind === "animation"
              ? locales[locale].activities[id]?.goal
              : kind === "command"
                ? item?.text[locale]
                : t("tip")}
          </p>
        </div>
        <div className="workspace-actions">
          <button
            className="button secondary inspector-toggle"
            aria-expanded={inspector}
            aria-controls="parameter-inspector"
            onClick={() => setInspector(!inspector)}
          >
            <SlidersHorizontal size={17} aria-hidden="true" />
            {t("inspector")}
          </button>
          <button
            className="button secondary"
            onClick={() => helperDialog.current.showModal()}
          >
            <Package size={17} />
            {t("functions")} <span className="count">{selected.size}</span>
          </button>
        </div>
      </div>
      {kind === "course" && (
        <section className="lesson">
          <div>
            <h2>{t("lesson")}</h2>
            <p>{t("goal")}</p>
            <img
              src={assetUrl("/assets/previews/activity-circle.png")}
              alt={t("goal")}
              width="130"
              height="130"
            />
          </div>
          <div>
            <label>
              <input type="checkbox" />
              {t("goal")}
            </label>
            <details>
              <summary>{t("hint")}</summary>
              <code>drawCircle(60, "coral", true);</code>
            </details>
            <button
              className="button secondary"
              onClick={() => setShowVault(!showVault)}
            >
              {t("vault")}
            </button>
            {showVault && <p>{t("vaultHelp")}</p>}
          </div>
        </section>
      )}
      <div className="mobile-tabs">
        <RubberSegment
          aria-label={t("panelChoice")}
          items={["code", "result", "explanation"].map((value) => ({
            value,
            label: t(value),
          }))}
          value={panel}
          onChange={setPanel}
          draggable={false}
          stretch={20}
          squash={1}
          trackColor="var(--raised)"
          thumbColor="var(--strong)"
          textColor="var(--text)"
          activeTextColor="#ffffff"
        />
      </div>
      <div
        className="workspace-panels"
        data-panel={panel}
        data-inspector={inspector}
      >
        <div className="workbench">
          <section className="code-pane">
            <div className="pane-header">
              <span>
                <FileCode2 size={16} />
                main.js
              </span>
              <span>JavaScript</span>
            </div>
            <EditorPane
              source={initial}
              theme={preferences.theme}
              editorRef={editor}
              label={t("editor")}
              onChange={(value) => {
                code.current = value;
                setLiveCode(value);
                drafts.set(route, value);
              }}
            />
            <div className="code-footer">
              <span>{t("tip")}</span>
              <button
                onClick={() => {
                  if (code.current !== source && !confirm(t("discardConfirm")))
                    return;
                  editor.current.value = source;
                  run();
                }}
              >
                {t("reset")}
              </button>
            </div>
          </section>
          <section className="result-pane">
            <div className="pane-header">
              <span>
                <Image size={16} />
                {t("result")}
              </span>
              <span id="status" role="status" data-state={status.type}>
                <span aria-hidden="true">
                  <StatusMark
                    status={
                      status.type === "executing" || status.type === "running"
                        ? "running"
                        : status.type === "error"
                          ? "failed"
                          : status.type === "stopped"
                            ? "cancelled"
                            : "pending"
                    }
                    strike={false}
                    size={18}
                    color="var(--accent)"
                  />
                </span>
                {statusText}
              </span>
            </div>
            <div className="canvas-surface" data-grid={grid} data-canvas={preferences.canvas}>
              <canvas
                ref={canvas}
                id="canvas"
                tabIndex={0}
                onPointerMove={event => { const rect = event.currentTarget.getBoundingClientRect(); pointerSample.current = {x: Math.round((event.clientX - rect.left) * 700 / rect.width - 350), y: Math.round(350 - (event.clientY - rect.top) * 700 / rect.height)}; if (pointerFrame.current === null) pointerFrame.current = requestAnimationFrame(() => { pointerFrame.current = null; setPointer(previous => previous?.x === pointerSample.current.x && previous?.y === pointerSample.current.y ? previous : pointerSample.current); }); }}

                width="700"
                height="700"
                aria-label={t("preview")}
              />
            </div>
            <div className="turtle-state" aria-label={labels.state}>
              <span>{turtleState ? `x: ${turtleState.x.toFixed(1)} · y: ${turtleState.y.toFixed(1)} · ${turtleState.angleDeg.toFixed(1)}° · ${labels.pen}: ${turtleState.pen ? "✓" : "—"}` : `${labels.state}: —`}</span>
              <label><input type="checkbox" checked={grid} onChange={e => setGrid(e.target.checked)}/>{labels.grid}</label>
              {pointer && <span>{labels.pointer}: {pointer.x}, {pointer.y}</span>}
              {pointer && <button type="button" className="button secondary" onClick={async () => { try { await navigator.clipboard.writeText(`goto(${pointer.x}, ${pointer.y});`); setCopyError(false); } catch { setCopyError(true); } }}>{labels.copy}</button>}
              {copyError && <code>{pointer && `goto(${pointer.x}, ${pointer.y});`}</code>}
              <small>{labels.focus}</small>
            </div>
            <div className="playback">
              <button className="button primary" onClick={run}>
                <Play size={16} />
                {t("run")}
              </button>
              <button className="button secondary" onClick={run}>
                <RotateCcw size={16} />
                {t("restart")}
              </button>
              <button
                className="button secondary"
                onClick={() => preview.current.stop()}
              >
                <Square size={15} />
                {t("stop")}
              </button>
            </div>
          </section>
        </div>
        <section className="explanation-pane" id="parameter-inspector">
          <h2>{t("parameters")}</h2>
          <p>{t("inspectorHelp")}</p>
          {entry && (
            <>
              <details className="signature-details">
                <summary>{t("signatureDefaults")}</summary>
                <code className="signature">{entry.signature}</code>
              </details>
              <h3>{t("currentValues")}</h3>
              <div className="argument-map">
                <code>{entry.name}(</code>
                {(exampleCall(liveCode, entry.name)?.values || []).map(
                  (value, i) => (
                    <span className="argument-chip" key={i}>
                      <span className="number">{i + 1}</span>
                      <code>{value}</code>
                    </span>
                  ),
                )}
                <code>)</code>
              </div>
              {entry.name !== "drawDino" && (
                <Parameters entry={entry} source={liveCode} locale={locale} />
              )}
              {entry.name === "drawDino" && (
                <DinoControls
                  source={liveCode}
                  t={t}
                  onApply={(value) => {
                    editor.current.value = value;
                    code.current = value;
                    setLiveCode(value);
                    drafts.set(route, value);
                    preview.current?.run(value);
                  }}
                />
              )}
            </>
          )}
          <aside className="try-this">
            <Lightbulb size={25} />
            <div>
              <h2>{t("try")}</h2>
              <code>
                {id === "bouncing-ball"
                  ? "speedX = 2"
                  : entry?.name === "drawDino"
                    ? 'drawDino(120, "LimeGreen", 25);'
                    : entry?.signature || "forward(100);"}
              </code>
              <p>{id === "bouncing-ball" ? t("ballTip") : t("tip")}</p>
            </div>
          </aside>
        </section>
      </div>
      <div className="export-bar">
        <p>{t("exportHelp")}</p>
        <div>
          <button
            className="button secondary"
            onClick={() =>
              download(
                new Blob([code.current], { type: "text/javascript" }),
                "turtle-program.js",
              )
            }
          >
            <FileCode2 size={16} />
            {t("js")}
          </button>
          <button
            className="button primary"
            disabled={exporting}
            onClick={exportProject}
          >
            <Download size={16} />
            {t("zip")}
          </button>
        </div>
      </div>
      {exportError && <p role="alert">{exportError}</p>}
      <p className="scope-note">{t("draftNotice")}</p>
      <dialog ref={helperDialog} className="helper-dialog">
        <div className="dialog-heading">
          <h2>{t("toolbox")}</h2>
          <button
            className="icon-button"
            aria-label={t("close")}
            onClick={() => helperDialog.current.close()}
          >
            <X size={20} />
          </button>
        </div>
        <p>{t("helperHelp")}</p>
        {recipes
          .filter((x) =>
            [
              "figur-dino",
              "figur-pacman",
              "figur-schmetterling",
              "figur-kreis",
              "figur-stern",
              "figur-blume",
            ].includes(x.id),
          )
          .map((x) => {
            const helper = findEntry(x.shortCode, reference);
            return (
              <label className="helper" key={x.id}>
                <input
                  type="checkbox"
                  checked={selected.has(helper.name)}
                  onChange={(e) => {
                    const next = new Set(selected);
                    e.target.checked
                      ? next.add(helper.name)
                      : next.delete(helper.name);
                    setSelected(next);
                  }}
                />
                <img
                  src={assetUrl(`/assets/previews/recipe-${x.id}.png`)}
                  alt=""
                  width="50"
                  height="50"
                />
                <span>
                  {x.title[locale]}
                  <code>{helper.signature}</code>
                </span>
              </label>
            );
          })}
        <button
          className="button primary"
          onClick={() => helperDialog.current.close()}
        >
          {t("done")}
        </button>
      </dialog>
    </>
  );
}
