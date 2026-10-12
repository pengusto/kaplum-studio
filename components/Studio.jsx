"use client";
import { docsCopy } from "../src/docs-copy";
import { legalCopy } from "../src/legal";
import { assetUrl } from "../src/asset-url";
import { useEffect, useRef, useState } from "react";
import {
  GitBranch,
  Shapes,
  Terminal,
  Clapperboard,
  BookOpen,
  FolderOpen,
  Settings2,
  Globe,
  PanelLeft,
} from "lucide-react";
import Dock from "./react-bits/Dock";
import Gallery from "./Gallery";
import Explorer from "./Explorer";
import WarmTooltip, { WarmTooltipGroup } from "./react-bits/WarmTooltip";
import Workspace from "./Workspace";
import Settings, { ThemeSwitch } from "./Settings";
import { messages, languages } from "./messages";
import { colorPresets } from "./colorPresets";
const defaults = { theme: "dark", canvas: "dark", locale: "en", colorPreset: "ocean" };
function validate(value) {
  return {
    colorPreset: colorPresets.some((preset) => preset.id === value?.colorPreset) ? value.colorPreset : "ocean",
    theme: ["dark", "light"].includes(value?.theme) ? value.theme : "dark",
    canvas: ["dark", "light"].includes(value?.canvas) ? value.canvas : "dark",
    locale: ["en", "de", "ja", "tr", "hy"].includes(value?.locale) ? value.locale : "en",
  };
}
export default function Studio() {
  const [route, setRoute] = useState("figures"),
    [preferences, setPreferences] = useState(defaults),
    [settings, setSettings] = useState(false),
    [preferencesReady, setPreferencesReady] = useState(false),
    [storageError, setStorageError] = useState(false),
    [libraryOpen, setLibraryOpen] = useState(false);
  const drafts = useRef(new Map());
  const pausedPreviews = useRef(new Set());
  const t = messages(preferences.locale);
  useEffect(() => {
    try {
      setPreferences(
        validate(
          JSON.parse(localStorage.getItem("kaplum-settings-v1") || localStorage.getItem("kaplu-settings-v1") || "null"),
        ),
      );
    } catch {
      setStorageError(true);
    }
    const read = () => {
      const hash = location.hash.slice(1);
      setRoute(
        /^(figures|commands|animations|course|personal|figure\/[^/]+|command\/[^/]+|animation\/[^/]+|inspect-figure\/[^/]+|inspect-command\/[^/]+)$/.test(
          hash,
        )
          ? hash
          : "figures",
      );
    };
    read();
    setPreferencesReady(true);
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);
  useEffect(() => {
    if (route.includes("/")) setLibraryOpen(false);
  }, [route]);
  useEffect(() => {
    document.documentElement.dataset.theme = preferences.theme;
    document.documentElement.dataset.canvas = preferences.canvas;
    document.documentElement.lang = preferences.locale;
    const preset = colorPresets.find((entry) => entry.id === preferences.colorPreset);
    document.documentElement.dataset.colorPreset = preset.id;
    document.documentElement.style.setProperty("--accent", preset[preferences.theme]);
    document.documentElement.style.setProperty("--strong", preset.strong);
  }, [preferences]);
  useEffect(() => {
    const controller = new AbortController();
    let observer;
    const preset = colorPresets.find((entry) => entry.id === preferences.colorPreset);
    fetch(assetUrl("/favicon.svg"), { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Favicon unavailable");
        return response.text();
      })
      .then((svg) => {
        if (controller.signal.aborted) return;
        const tinted = svg.replace('fill="#329cff"', `fill="${preset[preferences.theme]}"`);
        const url = `data:image/svg+xml,${encodeURIComponent(tinted)}`;
        const applyIcon = () => {
          document.querySelectorAll('link[rel="icon"]').forEach((link) => {
            if (link.href !== url) link.href = url;
            if (link.type !== "image/svg+xml") link.type = "image/svg+xml";
            if (link.sizes.value !== "any") link.sizes.value = "any";
          });
        };
        applyIcon();
        // Next may stream static metadata after hydration; keep those icons in sync too.
        observer = new MutationObserver(applyIcon);
        observer.observe(document.head, { childList: true, subtree: true, attributes: true, attributeFilter: ["href", "rel", "type", "sizes"] });
      })
      .catch(() => { /* Keep the static icon if loading fails. */ });
    return () => { controller.abort(); observer?.disconnect(); };
  }, [preferences.colorPreset, preferences.theme]);
  function update(patch) {
    const next = validate({ ...preferences, ...patch });
    setPreferences(next);
    try {
      localStorage.setItem("kaplum-settings-v1", JSON.stringify(next));
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }
  const section = (route.startsWith("figure/") || route.startsWith("inspect-figure/"))
    ? "figures"
    : (route.startsWith("command/") || route.startsWith("inspect-command/"))
      ? "commands"
      : route.startsWith("animation/")
        ? "animations"
        : route;
  return (
    <>
      <div className="preview-note">
        KAPLUM STUDIO <span>{t("scope")}</span>
      </div>
      <header>
        <a className="brand" href="#figures">
          <svg className="logo" style={{ color: "var(--accent)" }} viewBox="0 0 64 58" aria-hidden="true">
            <g fill="currentColor">
              <path d="M20 13 18 4 24 7 28 1 32 7 39 3 35 13Z" fill="#ffcf57" />
              <path d="m9 37-6 3c-3 2-2 5 1 5l8-1zm6 9-3 7c-1 3 3 5 5 3l6-8zm21-1 4 7c2 3 6 0 5-3l-3-8z" />
              <ellipse
                cx="26"
                cy="31"
                rx="20"
                ry="18"
                transform="rotate(-15 26 31)"
              />
              <path d="m40 26 5-9 8 9-12 10z" />
              <circle cx="52" cy="23" r="9" />
            </g>
            <circle cx="55" cy="21" r="1.7" fill="var(--bg)" />
          </svg>
          Kaplum <strong>Studio</strong>
        </a>
        <span className="header-place">
          {["course", "personal"].includes(section)
            ? t(section)
            : t("discover")}
        </span>
        <nav className="release-links" aria-label={docsCopy[preferences.locale].title}>
          <a href={assetUrl(`/docs/?lang=${preferences.locale}`)}><BookOpen size={18}/><span>{docsCopy[preferences.locale].title}</span></a>
          <a href="https://github.com/pengusto/kaplum-studio" aria-label="GitHub"><GitBranch size={18}/><span>GitHub</span></a>
        </nav>
        <WarmTooltipGroup delay={300} lean={0}>
          <div className="header-tools">
            <label className="language-picker">
              <Globe size={16} aria-hidden="true" />
              <select
                disabled={!preferencesReady}
                aria-label={t("language")}
                value={preferences.locale}
                onChange={(e) => update({ locale: e.target.value })}
              >
                {languages.map(([id, flag, name]) => (
                  <option key={id} value={id}>
                    {flag} {name}
                  </option>
                ))}
              </select>
            </label>
            <ThemeSwitch
              theme={preferences.theme}
              onChange={(theme) => update({ theme })}
              label={t("darkMode")}
              help={t("themeTip")}
            />
            <WarmTooltip
              content={t("settingsTip")}
              side="bottom"
              surfaceColor="var(--raised)"
              inkColor="var(--text)"
            >
              <button
                className="icon-button"
                aria-label={t("settings")}
                onClick={() => setSettings(true)}
              >
                <Settings2 size={20} />
              </button>
            </WarmTooltip>
          </div>
        </WarmTooltipGroup>
      </header>
      <button
        className="library-toggle"
        hidden={["figures", "commands", "animations"].includes(route) || route.startsWith("inspect-")}
        aria-expanded={libraryOpen}
        onClick={() => setLibraryOpen(!libraryOpen)}
      >
        <PanelLeft size={17} aria-hidden="true" />
        {t("library")}
      </button>
      <main className="atlas-layout" data-library-open={libraryOpen} data-exploring={["figures", "commands", "animations"].includes(route) || route.startsWith("inspect-")}>
        <aside className="atlas-library" aria-label={t("library")}>
          {!(["figures", "commands", "animations"].includes(route) || route.startsWith("inspect-")) && <Gallery
            key={section}
            section={
              ["figures", "commands", "animations"].includes(section)
                ? section
                : "figures"
            }
            preferences={preferences}
            t={t}
            selectedRoute={route}
          />}
        </aside>
        <div className="atlas-workspace">
          {storageError && <p role="alert">{t("storageError")}</p>}
          {["figures", "commands", "animations"].includes(route) || route.startsWith("inspect-") ? (
            <Explorer key={route} route={route} preferences={preferences} t={t} drafts={drafts.current} pausedPreviews={pausedPreviews.current} />
          ) : <Workspace
            key={route}
            route={
              route === "figures"
                ? "figure/figur-dino"
                : route === "commands"
                  ? "command/forward"
                  : route === "animations"
                    ? "animation/bouncing-ball"
                    : route
            }
            preferences={preferences}
            t={t}
            drafts={drafts.current}
          />}
      <footer className="studio-legal-links">
        <a href={assetUrl(`/legal/#${preferences.locale}`)}>{legalCopy[preferences.locale].notice}</a>
        <a href={assetUrl(`/legal/#privacy-${preferences.locale}`)}>{legalCopy[preferences.locale].privacy}</a>
      </footer>
        </div>
      </main>
      <nav className="studio-dock" aria-label={t("navigationLabel")}>
        <Dock
          theme={preferences.theme}
          baseItemSize={50}
          magnification={70}
          panelHeight={68}
          gap={10}
          bounce={false}
          showLabels={true}
          accentColor="var(--accent)"
          style={{
            "--dock-panel": "color-mix(in srgb, var(--surface) 88%, transparent)",
            "--dock-panel-edge": "var(--line)",
            "--dock-tile": "linear-gradient(180deg, var(--raised), var(--surface))",
            "--dock-tile-edge": "var(--line)",
            "--dock-ink": "var(--text)",
            "--dock-label": "var(--raised)",
            "--dock-label-ink": "var(--text)",
          }}
          items={[
            ["figures", "figures", Shapes, section === "figures"],
            ["commands", "commands", Terminal, section === "commands"],
            ["animations", "animations", Clapperboard, section === "animations"],
            ["course", "course", BookOpen, section === "course"],
            ["personal", "projects", FolderOpen, section === "personal"],
          ].map(([id, label, Icon, active]) => ({
            href: `#${id}`,
            label: t(label),
            active,
            icon: <Icon size={22} aria-hidden="true" />,
          }))}
        />
      </nav>
      <Settings
        open={settings}
        onClose={() => setSettings(false)}
        preferences={preferences}
        update={update}
        t={t}
      />
    </>
  );
}
