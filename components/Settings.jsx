"use client";
import { Sun, Moon, X, Monitor, Palette } from "lucide-react";
import { useEffect, useRef } from "react";
import { colorPresets } from "./colorPresets";
import WarmTooltip from "./react-bits/WarmTooltip";
export function ThemeSwitch({ theme, onChange, label, help }) {
  const button = (
    <button
      className="theme-switch"
      role="switch"
      aria-label={label}
      aria-checked={theme === "dark"}
      onClick={() => onChange(theme === "dark" ? "light" : "dark")}
    >
      <Sun size={17} />
      <span className="switch-track">
        <span className="switch-knob">
          {theme === "dark" ? <Moon size={13} /> : <Sun size={13} />}
        </span>
      </span>
      <Moon size={17} />
    </button>
  );
  return help ? (
    <WarmTooltip
      content={help}
      side="bottom"
      surfaceColor="var(--raised)"
      inkColor="var(--text)"
    >
      {button}
    </WarmTooltip>
  ) : (
    button
  );
}
export default function Settings({ open, onClose, preferences, update, t }) {
  const dialog = useRef(null);
  useEffect(() => {
    const node = dialog.current;
    if (open && !node.open) node.showModal();
    if (!open && node.open) node.close();
  }, [open]);
  return (
    <dialog
      ref={dialog}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === dialog.current) onClose();
      }}
      className="settings-dialog"
    >
      <div className="dialog-heading">
        <h2>{t("settings")}</h2>
        <button
          className="icon-button"
          aria-label={t("close")}
          onClick={onClose}
        >
          <X size={20} />
        </button>
      </div>
      <fieldset>
        <legend>
          <Monitor size={17} /> {t("appearance")}
        </legend>
        <div className="setting-row">
          <span>{t("darkMode")}</span>
          <ThemeSwitch
            theme={preferences.theme}
            onChange={(theme) => update({ theme })}
            label={t("darkMode")}
          />
        </div>
      </fieldset>
      <fieldset>
        <legend><Palette size={17} /> {t("colorDesign")}</legend>
        <p>{t("colorDesignHelp")}</p>
        <div className="color-presets">
          {colorPresets.map((preset) => (
            <label key={preset.id} className="color-preset">
              <input type="radio" name="color-preset" value={preset.id}
                checked={preferences.colorPreset === preset.id}
                onChange={() => update({ colorPreset: preset.id })} />
              <span className="preset-swatch" style={{ background: preset[preferences.theme] }} aria-hidden="true" />
              {preset[preferences.locale] || preset.en}
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend>
          <Palette size={17} /> {t("canvas")}
        </legend>
        <p>{t("canvasHelp")}</p>
        <div className="segmented">
          {["dark", "light"].map((canvas) => (
            <button
              key={canvas}
              aria-pressed={preferences.canvas === canvas}
              onClick={() => update({ canvas })}
            >
              <span className={`canvas-swatch ${canvas}`} />
              {t(canvas)}
            </button>
          ))}
        </div>
      </fieldset>
      <p className="settings-note">{t("savedSettings")}</p>
      <button className="button primary" onClick={onClose}>
        {t("done")}
      </button>
    </dialog>
  );
}
