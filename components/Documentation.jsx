"use client";
import GitHubMark from "./GitHubMark";
import { useEffect, useRef, useState } from "react";
import { BookOpen, ArrowUpRight, Search, Sun, Moon } from "lucide-react";
import { docsCopy } from "../src/docs-copy";
import { reference } from "../src/reference";
import { parameterMeanings } from "../src/parameters";
import { assetUrl } from "../src/asset-url";
import { messages, languages } from "./messages";
import { legalCopy } from "../src/legal";
import { capabilityLabels } from "../src/capability-labels";
import CataloguePreview from "./CataloguePreview";
const repository = "https://github.com/pengusto/kaplum-studio";
export default function Documentation() {
  const [locale, setLocale] = useState("en"), [theme, setTheme] = useState("dark");
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState(""), [selected, setSelected] = useState("forward");
  const paused = useRef(new Set());
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("kaplum-settings-v1") || "{}");
      const requested = new URLSearchParams(location.search).get("lang");
      if (docsCopy[requested || saved.locale]) setLocale(requested || saved.locale);
      if (saved.theme === "light") setTheme("light");
    } catch {}
  }, []);
  useEffect(() => { document.documentElement.lang = locale; document.documentElement.dataset.theme = theme; }, [locale, theme]);
  function preference(key, value) {
    if (key === "locale") setLocale(value); else setTheme(value);
    try { const saved = JSON.parse(localStorage.getItem("kaplum-settings-v1") || "{}"); localStorage.setItem("kaplum-settings-v1", JSON.stringify({ ...saved, [key]: value })); } catch {}
  }
  const d = docsCopy[locale], t = messages(locale);
  const entry = reference.find(item => item.name === selected);
  const params = parameterMeanings(entry, locale);
  const filtered = reference.filter(item => (category === "all" || item.category === category) && `${item.name} ${item.alias} ${item.text[locale]}`.toLowerCase().includes(query.toLowerCase()));
  const sections = ["start", "parameters", "coordinates", "reference", "offline", "about"];
  return <div className="documentation">
    <div className="docs-topbar">
      <a className="brand" href={assetUrl("/#figures")}>Kaplum <strong>Studio</strong></a>
      <div className="docs-tools">
        <label><span className="sr-only">{t("language")}</span><select aria-label={t("language")} value={locale} onChange={e => preference("locale", e.target.value)}>{languages.map(([id, , name]) => <option key={id} value={id}>{name}</option>)}</select></label>
        <button className="icon-button" aria-label={t("darkMode")} onClick={() => preference("theme", theme === "dark" ? "light" : "dark")}>{theme === "dark" ? <Sun size={19}/> : <Moon size={19}/>}</button>
        <a href={repository} className="docs-repo"><GitHubMark/>GitHub</a>
      </div>
    </div>
    <div className="docs-layout">
      <aside className="docs-sidebar"><nav aria-label={d.title}>{sections.map(id => <a key={id} href={`#${id}`}>{d[id]}</a>)}</nav><a className="docs-studio-link" href={assetUrl("/#figures")}>{d.studio}<ArrowUpRight size={17}/></a></aside>
      <main className="docs-content">
        <div className="docs-heading"><BookOpen size={28}/><h1>{d.title}</h1></div>
        {['start','parameters','coordinates'].map(id => <section id={id} key={id}><h2>{d[id]}</h2><p>{d[id+'Text']}</p>{id === 'parameters' && <pre><code>drawDino(size, paintColor, legAngle);{"\n"}drawDino(120, "LimeGreen", 25);</code></pre>}</section>)}
        <section id="reference"><h2>{d.reference} <small>{reference.length}</small></h2>
          <label className="docs-search"><Search size={18}/><input type="search" aria-label={d.search} placeholder={d.search} value={query} onChange={e => setQuery(e.target.value)}/></label>
          <select aria-label={d.reference} value={category} onChange={e => setCategory(e.target.value)}>{["all","turtle","drawing","example"].map(group => <option key={group} value={group}>{capabilityLabels[locale][group]}</option>)}</select>
          <div className="docs-reference">
            <nav className="docs-command-list" aria-label={d.reference}>{filtered.map(item => <button key={item.name} aria-pressed={selected === item.name} onClick={() => setSelected(item.name)}>{item.name}() <small>{capabilityLabels[locale][item.category]}</small></button>)}{!filtered.length && <p>{d.empty}</p>}</nav>
            <article className="docs-command" aria-label={entry.name}>
              <h3>{entry.name}()</h3><pre><code>{entry.signature}</code></pre><p>{entry.text[locale]}</p>
              {params.length > 0 && <div className="docs-table-wrap"><table><thead><tr><th>{d.parameters}</th><th>{d.meaning}</th><th>{d.defaultValue}</th></tr></thead><tbody>{params.map((p,i) => <tr key={p.name}><td><code>{i+1}. {p.name}</code></td><td>{p.meaning}</td><td><code>{p.value ?? "—"}</code></td></tr>)}</tbody></table></div>}
              <p>{entry.anchor?.[locale]}</p><p>{entry.rotation?.[locale]}</p><h4>{d.example}</h4><pre><code>{entry.code}</code></pre>
              <CataloguePreview key={entry.name} source={entry.code} title={entry.name} id={`docs-${entry.name}`} pausedPreviews={paused.current} t={t}/>
              <a className="docs-studio-link" href={assetUrl(`/#command/${entry.name}`)}>{d.try}<ArrowUpRight size={17}/></a>
            </article>
          </div>
        </section>
        {['offline','about'].map(id => <section id={id} key={id}><h2>{d[id]}</h2><p>{d[id+'Text']}</p>{id === 'about' && <p><a href={`${repository}/blob/main/LICENSE`}>MIT</a> · <a href={`${repository}/blob/main/THIRD_PARTY_NOTICES.txt`}>Third-party notices</a> · <a href={`${repository}/issues`}>GitHub Issues</a></p>}</section>)}
        <footer className="docs-footer"><a href={assetUrl(`/legal/#${locale}`)}>{legalCopy[locale].notice}</a><a href={assetUrl(`/legal/#privacy-${locale}`)}>{legalCopy[locale].privacy}</a></footer>
      </main>
    </div>
  </div>;
}
