# Architecture

Kaplum Studio is a static Next.js export. Everything runs in the browser; there is no server-side code.

## Execution model

```mermaid
flowchart LR
  E[CodeMirror editor] -- source --> P[Preview in src/runtime.js]
  P -- creates --> F[sandboxed iframe]
  F -- starts --> W[Web Worker]
  W -- loads --> L[engine/library.js + functions.js + teaching-clock.js]
  W -- draws on --> O[OffscreenCanvas]
  O -- ImageBitmap frames --> C[visible canvas]
```

Each Run or Restart builds a fresh sandboxed iframe with a new worker, so no state leaks between runs. Stop, navigation and hidden tabs terminate the worker, which also ends infinite loops. `requestAnimationFrame` inside the worker is driven by a deterministic 60 Hz teaching clock, so animations behave the same on fast and slow machines.

The offline export (`src/exports.js`, `src/zip.js`) writes a ZIP without any library: `index.html`, the exact learner `program.js`, the engine files and `THIRD_PARTY_NOTICES.txt`. The exported page runs the program directly, without the editor's isolation.

## Project layout

| Path | Contents |
| --- | --- |
| `app/` | Next.js entry, layout and global styles (`atlas.css` is the active layout) |
| `components/` | React UI: `Studio` shell, `Gallery` library, `Workspace` editor/result/inspector, settings, parameter views |
| `components/react-bits/` | Vendored React Bits components with their licence and source hashes |
| `src/` | Framework-free logic: runtime and worker, editor setup, catalogue data, parameter parsing, export, translations |
| `engine/` | The Turtle drawing library that runs inside the worker |
| `assets/` | Preview images rendered by the real engine (light originals and dark variants) |
| `scripts/` | Build preparation and dark-preview generation |
| `tests/` | Playwright behaviour tests against the production build |
| `docs/` | API reference, glossary, decision records, screenshots and design references |

`scripts/prepare-public.js` copies the engine, worker, assets and notices into `public/` before each build. `public/` is generated and not committed.

## Parameter teaching

`src/parameters.js` parses learner code with the Lezer JavaScript parser to find a call such as `drawDino(...)` and its arguments, including nested expressions. The inspector maps each argument to the parameter at the same position in the command's signature. The Dino fields only rewrite that call when every argument is a plain literal; variables and expressions are left for the learner to edit in the code.

## Decisions

- [Solution vault is a learning gate, not access control](adr/0001-solution-vault-is-a-learning-gate.md)

Catalogue cards expose the shared `ParameterControls` directly for figures and commands. Literal parameter edits update the call, the visible-only sandbox preview and the code shown in the card. Expressions remain read-only. Opening Studio transfers the edited source only when no existing draft is present. Explicitly paused previews remain paused during parameter changes.

Studio surfaces use `StudioCard`, without pointer-following light or edge layers. Catalogue entrances use the installed Motion runtime and respect reduced motion. Category filters reuse the official React Bits RubberSegment with radio/keyboard semantics; Dock, WarmTooltip, StatusMark and ScrubField retain their focused roles.

Catalogue framing is rendered directly in the worker at device-pixel resolution (capped at 1600). Small known figures use a fixed 400-unit camera; other figures, commands and scenes use the full 700-unit teaching surface. No calibration worker or main-thread pixel scan is required. Radius and size changes remain visible instead of being cancelled by automatic zoom. The camera resolution follows the canvas layout, and source changes stop the previous sandbox before starting another.

Preview instances share one successful engine-source load per page. Failed loads are evicted so a later run can retry. Workers still remain isolated and terminable per run. The worker tracks drawing operations and sends a bitmap only when the visible surface changes, eliminating the continuous 30-frame stream for static figures. Initial catalogue runs start immediately; slider edits retain a short 50ms debounce.

The teaching clock schedules a timeout only while animation callbacks are pending. Cancellation removes the last pending timer. Drawing operations schedule coalesced snapshots; static workers have no perpetual snapshot interval. Catch-up still preserves fixed 60Hz teaching ticks and discards long suspended-tab backlogs.

`src/parameter-controls.js` declares stable numeric exploration ranges, including per-command overrides. Values outside an exploration range remain visible as code instead of silently displaying a clamped slider. `src/parameters.js` provides shared positional defaults and call replacement for catalogue, inspector and Dino editor controls, preserving nested expressions and surrounding source.

Build preparation removes only its generated destinations before copying current assets. Pages deployment depends on both the mounted build checks and the reusable Chromium/Firefox CI job for the same commit. The performance test attaches first-drawing and warm-edit latency samples; its 2-second regression ceiling is not the desired 150ms interaction budget.

Completed static catalogue drawings use a settled React Bits StatusMark and the translated Ready label. Only animated/loading previews retain an indeterminate indicator. The exploration ranges for known small figures fit their fixed camera; the star uses the full surface. `scripts/profile-previews.js` measures range input-to-frame latency in sequential Chromium/Firefox sessions and a main-thread-only Chromium idle sample.

Finite recording allocates at most 4 MB serialized operation history, 100,000 operations and 10,000 checkpoints. Ordinary Run allocates no recording. The recorded display has separate state from synchronous program queries. Recorded undo restores the earlier drawing and Turtle state and truncates later history. Stamps use a bounded 1000-entry removable overlay; trace stamp operations keep replay order. The course feature lab reuses the existing workspace, per-route draft storage and exact-source export. Construction views parse the maintained helper file lazily with the existing Lezer parser; no duplicate implementation registry.
