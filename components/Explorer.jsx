"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowUpRight, RotateCcw, SlidersHorizontal } from "lucide-react";
import Gallery from "./Gallery";
import Parameters, { findEntry } from "./Parameters";
import ParameterControls from "./ParameterControls";
import StudioCard from "./StudioCard";
import StatusMark from "./react-bits/StatusMark";
import { recipes, reference } from "../src/reference";
import { exampleCall, parameterMeanings } from "../src/parameters";
import { Preview } from "../src/runtime";

export default function Explorer({ route, preferences, t, drafts, pausedPreviews }) {
  if (!route.startsWith("inspect-")) return (
    <section className="explorer-overview">
      <h1>{t(route)}</h1><p>{t("exploreHelp")}</p>
      <Gallery section={route} preferences={preferences} t={t} overview drafts={drafts} pausedPreviews={pausedPreviews} />
    </section>
  );
  return <Configurator route={route} preferences={preferences} t={t} drafts={drafts} />;
}
function Configurator({ route, preferences, t, drafts }) {
  const [kind, id] = route.split("/");
  const figure = kind === "inspect-figure";
  const item = figure ? recipes.find(x => x.id === id) : reference.find(x => x.name === id);
  const original = (item?.code || "").replace(/^setBackground\("white"\);\s*/, "");
  const entry = figure ? findEntry(original, reference) : item;
  const call = entry && exampleCall(original, entry.name);
  const initialValues = entry ? parameterMeanings(entry, preferences.locale).map((parameter, index) => call?.values[index] ?? parameter.value ?? "undefined") : [];
  const [values, setValues] = useState(initialValues);
  const [status, setStatus] = useState({ type: "ready" });
  const canvas = useRef(null), preview = useRef(null);
  const source = call ? original.slice(0, call.position) + `${entry.name}(${values.join(", ")})` + original.slice(call.position + call.source.length) : original;
  useEffect(() => {
    if (!item) return;
    const instance = new Preview(canvas.current, setStatus);
    preview.current = instance;
    const hide = () => { if (document.hidden) instance.stop(); };
    document.addEventListener("visibilitychange", hide);
    return () => { instance.stop(); preview.current = null; document.removeEventListener("visibilitychange", hide); };
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => preview.current?.run(source), 100);
    return () => clearTimeout(timer);
  }, [source]);
  if (!item || !entry) return <p>{t("noResults")}</p>;
  const target = `${figure ? "figure" : "command"}/${id}`;
  const parameters = parameterMeanings(entry, preferences.locale);
  const change = (index, value) => setValues(previous => previous.map((old, i) => i === index ? value : old));
  const label = status.type === "error" ? `${t("engineUnavailable")} ${status.message}` : t(status.type === "executing" ? "running" : status.type === "running" ? "loading" : status.type === "stopped" ? "stopped" : "ready");
  return (
    <section className="configurator-page">
      <a className="back" href={`#${figure ? "figures" : "commands"}`}><ArrowLeft size={16} />{t("back")}</a>
      <div className="configurator-heading"><div><h1>{figure ? item.title[preferences.locale] : item.name}</h1><p>{entry.text[preferences.locale]}</p></div>
        <a className="button primary" href={`#${target}`} onClick={() => { if (!drafts.has(target)) drafts.set(target, source); }}>{t("openStudio")}<ArrowUpRight size={16} /></a>
      </div>
      <div className="configurator-grid">
        <StudioCard className="configurator-preview" style={{ padding: 0, borderRadius: 14, background: "var(--surface)" }}>
          <div className="pane-header"><span>{t("livePreview")}</span><span aria-hidden="true"><StatusMark status={status.type === "error" ? "failed" : status.type === "stopped" ? "cancelled" : status.type === "ready" ? "pending" : "running"} strike={false} size={18} color="var(--accent)" /></span></div>
          <div className="canvas-surface"><canvas ref={canvas} width="700" height="700" aria-label={t("livePreview")} /></div>
          <p role={status.type === "error" ? "alert" : "status"}>{label}</p>
          <pre className="configurator-code"><code>{source}</code></pre>
        </StudioCard>
        <div className="configurator-controls">
          <h2><SlidersHorizontal size={20} />{t("parameters")}</h2><p>{t("configuratorHelp")}</p>
          {parameters.length === 0 && <p>{t("noParameters")}</p>}
          <ParameterControls entry={entry} values={values} change={change} preferences={preferences} locale={preferences.locale} />
          <button onClick={() => setValues(initialValues)}><RotateCcw size={16} />{t("resetExample")}</button>
          <details><summary>{entry.signature}</summary><Parameters entry={entry} source={source} locale={preferences.locale} /><p>{entry.anchor[preferences.locale]}</p><p>{entry.rotation[preferences.locale]}</p></details>
          {drafts.has(target) && <p>{t("existingDraft")}</p>}
        </div>
      </div>
    </section>
  );
}
