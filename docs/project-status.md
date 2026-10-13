# Project status — 14 October 2026

Kaplum Studio is an early-development public teaching app. Development is paused for now after the verified own-function debugger update. Resume with the classroom trial and the remaining work below. The official repository is `pengusto/kaplum-studio`; its website is https://pengusto.github.io/kaplum-studio/. Original local course archives remain preserved. The earlier private repository was deleted with owner authorization; it is not the active development repository.

## Working today

- Searchable figures, commands and animations; general Turtle commands, drawing helpers and example figures are distinguished.
- Three-column desktop figure catalogue with inline parameters and real, visible-only previews; responsive mobile layouts and explicit pause.
- Code and canvas side by side on desktop. Width and shared height can be resized and saved locally. Parameters start collapsed below the workspace; the example library is an optional horizontal tray.
- Five interface/teaching languages, colour presets, independent canvas/appearance settings and theme-aware favicon.
- General position/direction/state queries, focused keyboard/pointer input, stamps and path-based circles.
- Bounded finite drawing recording, playback and drawing undo. Frame animation pause/resume is separate from drawing playback.
- Nine finite course experiments with a goal, an observable original-example outcome and an edit challenge.
- A bounded source debugger: next instruction, continue/pause/stop/restart, highlighted source, primitive variables, line breakpoints and true/false condition feedback. It steps into named learner functions with plain parameters and returns, and shows active calls; see [supported syntax and limits](source-debugger.md).
- Exact-source, network-free ZIP exports; public documentation, GitHub navigation and legal pages.
- Static JSON-LD for the application and documentation; see [structured data](structured-data.md).

## Latest verified baseline

The implementation at `d1d4b4f` passed all 123 Chromium and 123 Firefox tests, plus 15 mounted Pages and structured-data tests. Its [Pages workflow](https://github.com/pengusto/kaplum-studio/actions/runs/38479560067) completed successfully, including build, verification and deployment. Browser suites use two workers to keep concurrent canvas checks reliable.

The public [own-functions lesson](https://pengusto.github.io/kaplum-studio/#course/functions) was also checked in the browser: stepping entered `square`, highlighted the original source and showed its active call and parameter; continuing drew both squares and returned `perimeter = 400`. These results establish this implementation baseline; the handoff documentation commit is published through the same verification workflow.

The installed pre-push hook runs the full build/browser/Pages checks. `bun run push:verified` then waits for successful Pages publication of the exact commit. Install the hook once per clone with `bun run hooks:install`. Tests cannot establish child comprehension, native translation quality or Safari support.

## Remaining work

1. Run the [short classroom trial](classroom-trial.de.md), record where learners need help, and prioritize those observed problems.
2. Review translations with native speakers; current translations are AI-assisted.
3. Test Safari and slower devices; check control reachability, drawing clarity and interaction latency.
4. Evaluate broader debugger syntax and inspection deliberately; named own-function stepping is implemented: [issue #6](https://github.com/pengusto/kaplum-studio/issues/6). The existing prototype is implemented; full JavaScript debugging is not.
5. Independent named turtles: [issue #7](https://github.com/pengusto/kaplum-studio/issues/7).
6. Optional p5.js workshop mode remains deferred: [issue #9](https://github.com/pengusto/kaplum-studio/issues/9).

## Source and licensing

Project code is MIT-licensed. On 12 October the owner confirmed authorship of the figure helpers created with Codex assistance. The maintained engine and retained component notices are documented in [engine migration](engine-migration.md) and the repository's license/third-party notices. Preserve original teaching sources and their provenance.

Earlier feature plans and stabilization checkpoints describe historical implementation stages. Their test counts and measurements are dated evidence; this page is the current summary.
