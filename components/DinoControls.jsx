"use client";
import { useEffect, useState } from "react";
import { exampleCall } from "../src/parameters";
// Edit literal arguments of the displayed parser-identified call, preserving all surrounding code.
export default function DinoControls({ source, onApply, t }) {
  const call = exampleCall(source, "drawDino");
  const values = call?.values || [];
  const size = Number(values[0]),
    angle = Number(values[2]);
  const literalColour = values[1]?.match(/^(["'])([^"'\\]*)\1$/)?.[2];
  const supported =
    values.length === 3 &&
    values[0]?.trim() !== "" &&
    Number.isFinite(size) &&
    values[2]?.trim() !== "" &&
    Number.isFinite(angle) &&
    literalColour !== undefined;
  const [draft, setDraft] = useState(["80", "LimeGreen", "25"]);
  useEffect(() => {
    if (supported) setDraft([String(size), literalColour, String(angle)]);
  }, [size, literalColour, angle, supported]);
  if (!supported) return <p className="control-note">{t("literalHelp")}</p>;
  const valid =
    draft[0].trim() !== "" &&
    Number.isFinite(Number(draft[0])) &&
    draft[2].trim() !== "" &&
    Number.isFinite(Number(draft[2])) &&
    draft[1].trim() !== "";
  return (
    <div className="dino-controls">
      {["size", "paintColor", "legAngle"].map((name, i) => (
        <label key={name}>
          <span className="number">{i + 1}</span>
          <code>{name}</code>
          <input
            aria-label={name}
            type={i === 1 ? "text" : "number"}
            step="any"
            value={draft[i]}
            onChange={(e) =>
              setDraft(draft.map((v, j) => (i === j ? e.target.value : v)))
            }
          />
          <small>{t(["sizeEffect", "colourEffect", "angleEffect"][i])}</small>
        </label>
      ))}
      <button
        className="button primary"
        disabled={!valid}
        onClick={() => {
          const replacement = `drawDino(${Number(draft[0])}, ${JSON.stringify(draft[1])}, ${Number(draft[2])})`;
          onApply(
            source.slice(0, call.position) +
              replacement +
              source.slice(call.position + call.source.length),
          );
        }}
      >
        {t("applyRun")}
      </button>
      <p className="control-note">{t("applyHelp")}</p>
    </div>
  );
}
