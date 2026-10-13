"use client";
import {analyzeDebugSource} from "../src/source-debugger";
import {debuggerCopy,conditionExplanation} from "../src/debugger-copy";
import {lessonTasks,taskLabels} from "../src/lesson-tasks";
import {executionMode} from "../src/execution-mode";
import { assetUrl } from "../src/asset-url";
import { useEffect, useRef, useState } from "react";
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Undo2,
  SkipForward,
  Grid2X2,
  MoreHorizontal,
  CircleDot,
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
import {TurtleState,DrawingStep} from "./TurtleInspection";
import FeatureLessons from "./FeatureLessons";
import {featureLessons,lessonCopy,lessonGuide} from "../src/feature-lessons";
import ExampleConstruction from "./ExampleConstruction";
import DinoControls from "./DinoControls";
import EditorPane from "./EditorPane";
import StatusMark from "./react-bits/StatusMark";
import RubberSegment from "./react-bits/RubberSegment";
import Parameters, { findEntry } from "./Parameters";
import { canvasToolCopy } from "../src/canvas-tool-copy";
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
  const lesson = kind === "course" ? featureLessons.find(x => x.id === id) : null;
  const source =
    kind === "course"
      ? lesson?.code || "hideTurtle();\ngoto(0, 0);\n// Make a filled coral circle with radius 60.\n"
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
        ? reference.find((x) => x.name === (lesson?.command || "drawCircle"))
        : findEntry(source, reference);
  const [status, setStatus] = useState({ type: "ready" }),
    [panel, setPanel] = useState("code"),
    [inspector, setInspector] = useState(false),
    [liveCode, setLiveCode] = useState(initial),
    [exporting, setExporting] = useState(false),
    [exportError, setExportError] = useState(""),
    [showVault, setShowVault] = useState(false),
    [selected, setSelected] = useState(new Set(entry ? [entry.name] : []));
  const [split, setSplit] = useState(50);
  function resizeSplit(event) {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    const rect = event.currentTarget.parentElement.getBoundingClientRect();
    setSplit(Math.max(25, Math.min(75, Math.round((event.clientX - rect.left) / rect.width * 100))));
  }
  function resizeSplitKey(event) {
    const values = { ArrowLeft: split - 5, ArrowRight: split + 5, Home: 25, End: 75 };
    if (!(event.key in values)) return;
    event.preventDefault();
    setSplit(Math.max(25, Math.min(75, values[event.key])));
  }
  const locale = preferences.locale;
  const labels = capabilityLabels[locale];
  const tools = canvasToolCopy[locale];
  const debugText = debuggerCopy[locale];
  const [debug,setDebug]=useState(null),[debugError,setDebugError]=useState("");
  const [breakpoints,setBreakpoints]=useState([]),[breakpointLine,setBreakpointLine]=useState(1),[breakpointError,setBreakpointError]=useState(false);
  const executableLines=useRef([]);
  const mode = executionMode(liveCode);
  const task = lesson && lessonTasks[lesson.id][locale];
  const taskText = taskLabels[locale];
  const [playback, setPlayback] = useState(null), [playbackDelay, setPlaybackDelay] = useState(300);
  const [turtleState, setTurtleState] = useState(null), [grid, setGrid] = useState(false), [pointer, setPointer] = useState(null), [copyError, setCopyError] = useState(false);
  const title =
    kind === "course"
      ? lesson?.title[locale] || t("lesson")
      : kind === "personal"
        ? t("personal")
        : kind === "figure"
          ? item?.title[locale]
          : kind === "animation"
            ? locales[locale].activities[id]?.title
            : item?.name;
  useEffect(() => {
    const instance = new Preview(canvas.current, setStatus, null, setTurtleState, setPlayback, setDebug);
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
  function startDebug() {
    preview.current?.stop();
    setDebugError("");
    try { const compiled=analyzeDebugSource(code.current); executableLines.current=compiled.lines; setBreakpointError(false); setPanel("result"); requestAnimationFrame(() => document.querySelector(".code-pane")?.scrollIntoView({block:"start"})); preview.current?.run(code.current,undefined,false,{code:compiled.code,breakpoints}); }
    catch(error) {setDebugError(error.message);}
  }
  useEffect(()=>{editor.current?.debugLine(debug?.line || null);editor.current?.condition(debug?.condition ? {...debug.condition,text:conditionExplanation(debug.condition,locale)} : null);if(debug?.line) editor.current?.showLine(debug.line);editor.current?.breakpoints(debug ? breakpoints : []);},[debug,breakpoints,locale]);
  function updateBreakpoints(lines) {
    setBreakpoints(lines);setBreakpointError(false);
    preview.current?.control("debug-breakpoints",undefined,lines);
  }
  function addBreakpoint() {
    const line=Number(breakpointLine);
    if(!executableLines.current.includes(line) || (!breakpoints.includes(line) && breakpoints.length>=100)) {setBreakpointError(true);return;}
    updateBreakpoints([...new Set([...breakpoints,line])].sort((a,b)=>a-b));
    editor.current?.showLine(line);
  }

  function run() {
    setDebugError("");
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
    status.type === "paused" ? labels.pause : status.type === "executing"
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
      {kind === "course" && !lesson && <FeatureLessons locale={locale} />}
      {lesson && <section className="lesson-task">
        <a href="#course">{lessonCopy[locale][3]}</a>
        <div className="lesson-goal"><h2>{taskText[0]}</h2><p>{task.goal}</p></div>
        <div className="lesson-expected"><h3>{taskText[1]}</h3><p>{task.expected}</p><small>{taskText[4]}</small></div>
        <p className="lesson-how">{lessonGuide[locale][1]}</p>
        <button className="button primary" onClick={() => {
          setPanel("result");
          preview.current?.run(code.current, undefined, true);
          requestAnimationFrame(() => document.querySelector(".result-pane")?.scrollIntoView({block:"start"}));
        }}><Play size={16} aria-hidden="true"/>{lessonGuide[locale][0]}</button>
        <button className="button secondary lesson-debug-start" onClick={startDebug}><FileCode2 size={16}/>{debugText.startShort}</button>
        <div className="lesson-challenge"><h3>{taskText[2]}</h3><p>{task.challenge}</p>
          <button className="button secondary" onClick={() => {setPanel("code");requestAnimationFrame(() => {document.querySelector(".code-pane")?.scrollIntoView({block:"start"});editor.current?.focus();});}}><FileCode2 size={16}/>{taskText[3]}</button>
        </div>
      </section>}
      <div className="workspace-heading">
        <div>
          <a
            className="back"
            href={`#${kind === "course" ? "course" : kind === "animation" ? "animations" : kind === "command" ? "commands" : "figures"}`}
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
      {kind === "course" && !lesson && (
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
      <div className="mobile-tabs" data-debug={!!debug}>
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
        data-debug={!!debug}
      >
        <div className="workbench" style={{ "--workspace-columns": `minmax(0, ${split}fr) 12px minmax(0, ${100 - split}fr)` }}>
          <section className="code-pane">
            <div className="pane-header">
              <span>
                <FileCode2 size={16} />
                main.js
              </span>
              {mode === "drawing" && !debug ? <button className="canvas-tool editor-debug-start" onClick={startDebug}><FileCode2 size={16}/><span>{debugText.startShort}</span></button> : <span>JavaScript</span>}
            </div>
            <EditorPane
              source={initial}
              theme={preferences.theme}
              editorRef={editor}
              label={t("editor")}
              onChange={(value) => {
                if(debug) preview.current?.stop();
                setBreakpoints([]);setBreakpointError(false);
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
          <div
            className="workspace-divider"
            role="separator"
            aria-label={`${t("code")} / ${t("result")}`}
            aria-orientation="vertical"
            aria-valuemin={25}
            aria-valuemax={75}
            aria-valuenow={split}
            tabIndex={0}
            onPointerDown={event => { event.preventDefault(); event.currentTarget.setPointerCapture(event.pointerId); }}
            onPointerMove={resizeSplit}
            onPointerUp={event => { if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId); }}
            onKeyDown={resizeSplitKey}
            onDoubleClick={() => setSplit(50)}
          />
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
            <div className="canvas-mode" data-mode={mode}><span>{tools[mode]}</span>{mode !== "drawing" && <small>{mode === "animation" ? tools.animationHelp : tools.liveHelp}</small>}</div>
            <div className="canvas-toolbar">
              <div className="canvas-primary-controls" role="group" aria-label={playback ? labels.playback : t("result")}>
                {debug ? <>
                  <button className="canvas-tool primary" aria-label={debugText.next} title={debugText.next} disabled={debug.done || debug.playing} onClick={()=>preview.current.control("debug-next")}><ChevronRight size={19}/><span>{debugText.nextShort}</span></button>
                  <button className="canvas-tool" aria-label={debug.playing ? debugText.pause : debugText.continue} title={debug.playing ? debugText.pause : debugText.continue} disabled={debug.done} onClick={()=>preview.current.control(debug.playing ? "debug-pause" : "debug-continue")}>{debug.playing ? <Pause size={19}/> : <Play size={19}/>}<span>{debug.playing ? debugText.pauseShort : debugText.continueShort}</span></button>
                </> : playback ? <>
                  <button className="canvas-tool" aria-label={labels.back} title={labels.back} disabled={!playback.step} onClick={() => preview.current.control("back")}><ChevronLeft size={19}/></button>
                  <button className="canvas-tool primary" aria-label={playback.playing ? labels.pause : labels.play} title={playback.playing ? labels.pause : labels.play} disabled={playback.step >= playback.total} onClick={() => {preview.current.control("speed",playbackDelay);preview.current.control(playback.playing ? "pause" : "play");}}>{playback.playing ? <Pause size={19}/> : <Play size={19}/>}</button>
                  <button className="canvas-tool" aria-label={labels.next} title={labels.next} disabled={playback.step >= playback.total} onClick={() => preview.current.control("next")}><ChevronRight size={19}/></button>
                  <output aria-live="polite">{playback.step} / {playback.total}</output>
                </> : mode === "animation" && ["executing","paused"].includes(status.type) ? <button className="canvas-tool primary" aria-label={status.type === "paused" ? tools.resume : tools.pauseAnimation} title={status.type === "paused" ? tools.resume : tools.pauseAnimation} onClick={() => preview.current.control(status.type === "paused" ? "resume-animation" : "pause-animation")}>{status.type === "paused" ? <Play size={19}/> : <Pause size={19}/>}<span>{status.type === "paused" ? tools.resume : labels.pause}</span></button> : <button className="canvas-tool primary" aria-label={t("run")} title={t("run")} onClick={run}><Play size={19}/><span>{t("run")}</span></button>}

                <button className="canvas-tool" aria-label={playback ? labels.resetReplay : t("restart")} title={playback ? labels.resetReplay : t("restart")} onClick={() => debug ? startDebug() : playback ? preview.current.control("reset") : run()}><RotateCcw size={18}/></button>
                <button className="canvas-tool" aria-label={t("stop")} title={t("stop")} onClick={() => preview.current.stop()}><Square size={17}/></button>
              </div>
              {mode === "drawing" && !debug && <button className="canvas-tool" aria-label={labels.record} title={labels.record} onClick={() => preview.current?.run(code.current, undefined, true)}><CircleDot size={19}/></button>}
              {mode === "drawing" && !debug && <button className="canvas-tool debug-start" aria-label={debugText.start} onClick={startDebug}><FileCode2 size={18}/><span>{debugText.startShort}</span></button>}
              <details className="canvas-more">
                <summary className="canvas-tool" aria-label={tools.more} title={tools.more}><MoreHorizontal size={20}/></summary>
                <div className="canvas-tools-panel">
                  <strong>{tools.more}</strong>

                  <label><input type="checkbox" checked={grid} onChange={e => setGrid(e.target.checked)}/><Grid2X2 size={17}/>{labels.grid}</label>
                  {playback && <>
                    <button className="button secondary" onClick={run}><Play size={16}/>{t("run")}</button>
                    <button className="button secondary" disabled={playback.step >= playback.total} onClick={() => preview.current.control("finish")}><SkipForward size={16}/>{labels.finish}</button>
                    <button className="button secondary" disabled={!playback.step} onClick={() => preview.current.control("undo")}><Undo2 size={16}/>{labels.undo}</button>
                    <label>{labels.delay}<input type="range" min="30" max="1000" step="10" value={playbackDelay} onChange={e => {setPlaybackDelay(Number(e.target.value));preview.current.control("speed",Number(e.target.value));}}/><output>{playbackDelay} ms</output></label>
                  </>}
                  {pointer && <span>{labels.pointer}: {pointer.x}, {pointer.y}</span>}
                  {pointer && <button type="button" className="button secondary" onClick={async () => { try { await navigator.clipboard.writeText(`goto(${pointer.x}, ${pointer.y});`); setCopyError(false); } catch { setCopyError(true); } }}>{labels.copy}</button>}
                  {copyError && <code>{pointer && `goto(${pointer.x}, ${pointer.y});`}</code>}
                  {mode === "drawing" && <small>{labels.replayHelp}</small>}
                </div>
              </details>
            </div>
            {debug && <section className="debug-command" aria-label={debugText.upNext} aria-live="polite">
              <strong>{debug.done ? debugText.finished : `${debugText.upNext}: ${debugText.line} ${debug.line}`}</strong>
              {!debug.done && <small>{debug.kind === "condition" ? debugText.condition : debugText.stepHint}</small>}
              {debug.condition && <p className="condition-feedback" data-result={debug.condition.result} role="status"><code>{debug.condition.source}</code> · {conditionExplanation(debug.condition,locale)}</p>}
            </section>}
            {debugError && <p className="source-debugger" role="alert">{debugError}</p>}
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
              <TurtleState state={turtleState} locale={locale}/>
              <small>{labels.focus}</small>
            </div>
            {debug && <section className="source-debugger" aria-label={debugText.title}>
              <strong>{debugText.title}</strong>
              <details className="debug-history"><summary>{debugText.recent}</summary>
                {!debug.history.length ? <p>{debugText.initialStep}</p> : <ol>{debug.history.map((step,index)=><li key={index}><span>{debugText.line} {step.line} · {debugText[step.kind]}</span><code>{step.source}</code></li>)}</ol>}
                <small>{debugText.historyHelp}</small>
              </details>
              {debug.breakpoint && <p role="status">{debugText.breakpointHit}</p>}
              <p aria-live="polite">{debug.done ? debugText.finished : `${debugText.line} ${debug.line}`}</p>
              <details className="breakpoint-settings"><summary>{debugText.breakpoints}</summary>
                <form onSubmit={event=>{event.preventDefault();addBreakpoint();}}>
                  <label>{debugText.breakpointLine}<input type="number" min="1" max={code.current.split("\n").length} step="1" value={breakpointLine} onChange={event=>setBreakpointLine(event.target.value)}/></label>
                  <button className="button secondary" type="submit">{debugText.addBreakpoint}</button>
                </form>
                {breakpointError && <p role="alert">{debugText.breakpointError}</p>}
                <div className="breakpoint-list">{breakpoints.map(line=><button className="button secondary" key={line} aria-label={`${debugText.removeBreakpoint}: ${debugText.line} ${line}`} onClick={()=>updateBreakpoints(breakpoints.filter(n=>n!==line))}>{debugText.line} {line} ×</button>)}</div>
                {!!breakpoints.length && <button className="button secondary" onClick={()=>updateBreakpoints([])}>{debugText.clearBreakpoints}</button>}
                <small>{debugText.breakpointHelp}</small>
              </details>
              <details open><summary>{debugText.variables}</summary><dl>{debug.variables.map(v=><div key={v.name}><dt>{v.name}</dt><dd>{v.value}</dd></div>)}</dl></details>
              <details><summary>{debugText.limits}</summary><small>{debugText.help}</small></details>
            </section>}
            {playback && <DrawingStep playback={playback} locale={locale}/>}
          </section>
        </div>
        <section className="explanation-pane" id="parameter-inspector">
          <h2>{t("parameters")}</h2>
          <p>{t("inspectorHelp")}</p>
          <ExampleConstruction name={entry?.name} locale={locale} />
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
                    if(debug) preview.current?.stop();
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
