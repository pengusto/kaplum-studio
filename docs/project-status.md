# Project status

Paused by the owner on 12 October 2026 after accepting the current UI.

This is a separate release snapshot. The old private GitHub repository was deleted on 12 October 2026 after owner authorization; its API now returns 404. Local teaching archives remain preserved. Website deployment uses a separate GitHub Pages workflow.

## Accepted baseline

- Three-column desktop catalogue, responsive two/one-column layouts.
- Visible-only sandbox previews with explicit pause retained across navigation.
- Parameters can be explored directly in figure and command cards, with live code updates, reset and draft-safe transfer to Studio.
- Quiet card surfaces without spotlight effects; React Bits category controls, Dock, numeric controls, status indicators and tooltips.
- Dark appearance and dark canvas defaults; independent appearance/canvas choices and colour presets.

## Verification at handoff

Production build and whitespace checks passed. Relevant browser checks passed in Chromium and Firefox for inline angle/colour changes, reset, pause, Studio handoff, responsive layout, category keyboard interaction, search, theme borders and reduced motion. Desktop dark/light and mobile layouts were visually reviewed. At release closeout, the complete suite passed locally: 31 Chromium and 31 Firefox tests, including engine contracts and real offline ZIP execution. Two outdated UI test assumptions were corrected; screenshot capture now waits for a rendered preview. GitHub CI is checked separately.

## Resume

Start by checking the current checkout and runtime, then agree on the next bounded change. Curriculum content remains future work. Five-language UI completion and GitHub Pages were authorized on 12 October 2026. Source publication is complete. Preserve original course sources and local tracker files.

## Helper authorship clarification

On 12 October 2026, the owner confirmed that `engine/functions.js` contains helpers he created with Codex assistance. The source header, README and third-party notices now record their project MIT licensing. The historical teaching-fork engine and third-party component licences remain separate concerns. Feature development remains paused; source publication was subsequently authorized and completed in this separate repository.

## Release closeout

All five UI dictionaries and existing teaching translations are selectable and persist across reloads. Native-speaker review remains outstanding. Root deployment remains supported; GitHub Pages builds at `/kaplum-studio` and asset loading, favicon and ZIP exports share that mount path. Browser and deployment verification are recorded in the GitHub workflow runs.
