import { exampleCall, parameterMeanings } from "../src/parameters";
export function findEntry(source, reference) {
  return (
    reference.find(
      (r) => r.name.startsWith("draw") && exampleCall(source, r.name),
    ) || reference.find((r) => exampleCall(source, r.name))
  );
}
export default function Parameters({ entry, source, locale, compact = false }) {
  if (!entry) return null;
  const values = exampleCall(source, entry.name)?.values || [];
  return (
    <div className={compact ? "mini-parameters" : "parameter-rows"}>
      {parameterMeanings(entry, locale).map((p, i) => (
        <div className="parameter-row" key={p.name}>
          <span className="number">{i + 1}</span>
          <code>{p.name}</code>
          <code className="parameter-value">{values[i] || p.value || "—"}</code>
          <span>{p.meaning}</span>
        </div>
      ))}
    </div>
  );
}
