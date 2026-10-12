"use client";
import { messages } from "./messages";
import ScrubField from "./react-bits/ScrubField";
import StudioCard from "./StudioCard";
import { parameterMeanings } from "../src/parameters";
function bounds(name, value) {
  if (name === "legAngle") return [-45, 45];
  if (name === "mouth") return [10, 160];
  if (/Angle|degrees|rotation|direction|facing/i.test(name)) return [-180, 180];
  if (/points|petals|rays/.test(name)) return [3, 20];
  if (/size|radius|width|height|distance/i.test(name)) return [1, Math.max(200, value)];
  return [Math.min(-100, value), Math.max(100, value)];
}
function colourHex(value) {
  if (typeof document === "undefined") return "#32cd32";
  const context = document.createElement("canvas").getContext("2d");
  context.fillStyle = value;
  const result = context.fillStyle;
  return /^#[\da-f]{6}$/i.test(result) ? result : "#32cd32";
}
export default function ParameterControls({ entry, values, change, preferences, locale }) {
const t = messages(locale);
return <div className="parameter-inputs">
          {parameterMeanings(entry, locale).map((parameter, index) => {
            const value = values[index];
            const number = value !== undefined && value.trim() !== "" && Number.isFinite(Number(value));
            const color = /color/i.test(parameter.name) && /^(["']).*\1$/.test(value || "");
            const [min, max] = bounds(parameter.name, Number(value));
            return <StudioCard key={parameter.name} className="configurator-parameter" style={{ padding: 14, borderRadius: 12, background: "var(--surface)" }}>
              <h3><span className="number">{index + 1}</span><code>{parameter.name}</code></h3><p>{parameter.meaning}</p>
              {number ? <><ScrubField label={parameter.name} suffix={/angle|mouth|degrees|rotation/i.test(parameter.name) ? "°" : ""} value={Number(value)} min={min} max={max} onChange={v => change(index, String(v))} accent="var(--accent)" chipColor="var(--raised)" />
                <input type="range" aria-label={`${parameter.name} ${t("slider")}`} min={min} max={max} step="1" value={Number(value)} onChange={e => change(index, e.target.value)} /></> : color ? <label className="configurator-colour"><input type="color" aria-label={parameter.name} value={colourHex(value.slice(1, -1))} onChange={e => change(index, JSON.stringify(e.target.value))} /><code>{value}</code></label> : /^(true|false)$/.test(value || "") ? <label><input type="checkbox" checked={value === "true"} onChange={e => change(index, String(e.target.checked))} />{parameter.meaning}</label> : parameter.name === "facing" && /^(["']).*\1$/.test(value || "") ? <select aria-label={parameter.name} value={value.slice(1, -1)} onChange={e => change(index, JSON.stringify(e.target.value))}><option value="right">{t("right")}</option><option value="left">{t("left")}</option></select> : <code>{value === "undefined" ? "—" : value ?? parameter.value ?? "—"}</code>}
            </StudioCard>;
          })}

</div>;
}
