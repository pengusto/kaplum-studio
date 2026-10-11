"use client";
import CataloguePreview from "./CataloguePreview";
import { useState } from "react";
import { Search, ArrowUpRight, RotateCcw, X, Shapes, PawPrint, LayoutGrid } from "lucide-react";
import RubberSegment from "./react-bits/RubberSegment";
import StudioCard from "./StudioCard";
import ParameterControls from "./ParameterControls";
import { exampleCall, parameterMeanings } from "../src/parameters";
import Parameters, { findEntry } from "./Parameters";
import { recipes, reference } from "../src/reference";
import { examples } from "../src/examples";
import { locales } from "../src/i18n";
export default function Gallery({ section, preferences, t, selectedRoute, overview = false, drafts, pausedPreviews }) {
  const [search, setSearch] = useState(""),
    [category, setCategory] = useState("all");
  const locale = preferences.locale;
  const items =
    section === "animations"
      ? examples
      : section === "commands"
        ? reference
        : recipes;
  const filtered = items.filter((item) => {
    const title =
      section === "commands"
        ? item.name
        : section === "animations"
          ? locales[locale].activities[item.id].title
          : item.title[locale];
    return (
      `${title} ${item.name || ""} ${item.shortCode || ""}`
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      (section !== "figures" ||
        category === "all" ||
        (category === "animals") ===
          /dino|schmetterling|fisch|katze|hund/.test(item.id))
    );
  });
  return (
    <div className={overview ? "catalogue-page" : "library-collection"}>
      <div className="collection-heading">
        <h2>{t(section)}</h2>
        <span>
          {filtered.length} {t("galleryCount")}
        </span>
      </div>
      <div className="filters">
        <label className="search-field">
          <Search size={19} />
          <input
            aria-label={t("search")}
            type="search"
            placeholder={t("search")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && <button type="button" className="clear-search" aria-label={t("clearSearch")} onClick={() => setSearch("")}><X size={16} aria-hidden="true" /></button>}
        </label>
        {section === "figures" && (
          <RubberSegment className="catalogue-categories" aria-label={t("figures")}
            items={[{ value: "all", label: t("all"), icon: <LayoutGrid size={15} aria-hidden="true" /> }, { value: "animals", label: t("animals"), icon: <PawPrint size={15} aria-hidden="true" /> }, { value: "shapes", label: t("shapes"), icon: <Shapes size={15} aria-hidden="true" /> }]}
            value={category} onChange={setCategory} draggable={false} stretch={18} squash={1} size="lg"
            trackColor="var(--raised)" thumbColor="var(--accent)" textColor="var(--text)" activeTextColor="var(--bg)" />
        )}
      </div>
      <div className="gallery-grid">
        {filtered.map((item) => {
          const isCommand = section === "commands";
          const source = isCommand
            ? item.code
            : section === "animations"
              ? item.starter
              : item.shortCode;
          const title = isCommand
            ? item.name
            : section === "animations"
              ? locales[locale].activities[item.id].title
              : item.title[locale];
          const entry = isCommand ? item : findEntry(source, reference);
          const href = `#${isCommand ? (overview ? "inspect-command" : "command") : section === "animations" ? "animation" : (overview ? "inspect-figure" : "figure")}/${item.id || item.name}`;
          return <GalleryCard key={item.id || item.name} {...{ item, isCommand, section, source, title, entry, href, overview, preferences, locale, t, selectedRoute, pausedPreviews, drafts }} />;
        })}
      </div>
      {!filtered.length && <p role="status">{t("noResults")}</p>}
    </div>
  );
}

function GalleryCard({ item, isCommand, section, source, title, entry, href, overview, preferences, locale, t, selectedRoute, pausedPreviews, drafts }) {
  const original = item.code || item.starter;
  const call = entry && exampleCall(original, entry.name);
  const initialValues = entry ? parameterMeanings(entry, locale).map((p, i) => call?.values[i] ?? p.value ?? "undefined") : [];
  const [values, setValues] = useState(initialValues);
  const change = (index, value) => setValues(previous => previous.map((old, i) => i === index ? value : old));
  const replaceCall = text => {
    const match = entry && exampleCall(text, entry.name);
    const argumentsToShow = [...values];
    while (argumentsToShow.at(-1) === "undefined") argumentsToShow.pop();
    return match ? text.slice(0, match.position) + `${entry.name}(${argumentsToShow.join(", ")})` + text.slice(match.position + match.source.length) : text;
  };
  const liveSource = overview ? replaceCall(original) : original;
  const displaySource = overview ? replaceCall(source) : source;
  const studioHref = `#${isCommand ? "command" : section === "animations" ? "animation" : "figure"}/${item.id || item.name}`;
  return (
            <StudioCard
              style={overview ? { padding: 16, borderRadius: 12, background: "var(--surface)" } : undefined}

              className={`example-card ${selectedRoute === href.slice(1) || (selectedRoute === "figures" && item.id === "figur-dino") ? "is-selected" : ""}`}
            >
              <h2>
                <a href={overview ? studioHref : href}>{title}</a>
              </h2>
              {overview ? <CataloguePreview source={liveSource} title={title} id={`${section}/${item.id || item.name}`} pausedPreviews={pausedPreviews} t={t} fitFigure={section === "figures" && !/zufall|spring/.test(item.id)} /> : !isCommand && (
                <a href={href} tabIndex={-1} aria-hidden="true">
                  <img
                    src={`/assets/${section === "figures" && preferences.canvas === "dark" ? "previews-dark" : "previews"}/${section === "animations" ? "activity" : "recipe"}-${item.id}.png`}
                    alt=""
                    width="360"
                    height="360"
                  />
                </a>
              )}
              <div className="card-copy">
                {section === "animations" ? (
                  <p>{locales[locale].activities[item.id].goal}</p>
                ) : (
                  <>
                    <code className="example-call">{displaySource}</code>
                    <h3>{t("parameters")}</h3>
                    {overview && entry ? <ParameterControls entry={entry} values={values} change={change} preferences={preferences} locale={locale} /> : <Parameters entry={entry} source={source} locale={locale} compact />}
                    {overview && entry && values.length > 0 && <button className="reset-parameters" onClick={() => setValues(initialValues)}><RotateCcw size={14} />{t("resetExample")}</button>}
                    {isCommand && <p>{item.text[locale]}</p>}
                  </>
                )}
                <a href={overview ? studioHref : href} className="button primary" onClick={() => { if (overview && drafts && !drafts.has(studioHref.slice(1))) drafts.set(studioHref.slice(1), liveSource); }}>
                  {t(overview ? "openStudio" : "open")} <ArrowUpRight size={16} />
                </a>
              </div>
            </StudioCard>
          );
}
