# Stabilization checkpoint — 12 October 2026

Completed locally:
- Stable exploration ranges, complete 360-degree ovals and the default 24 firework rays.
- Shared parser-based defaults/call replacement for catalogue, inspector and Dino editor.
- Single-run device-resolution catalogue rendering; stable 400/700-unit cameras replace calibration workers and pixel scans.
- Demand-driven teaching clock and drawing snapshots, preserving isolated terminable sandboxes.
- Pause intent survives automatic scrolling and visibility changes.
- Generated asset destinations are refreshed on build; unused SpotlightCard sources removed, retained component licences preserved.
- Pages waits for full Chromium/Firefox verification of the same commit.

Validation: production export passed; 44 Chromium checks passed before the final pause adjustment, affected Chromium checks repeated afterward; 44 Firefox checks passed after the adjustment. Tests include actual geometry, Retina rendering, all recipes, five languages, offline ZIP execution and error/isolation behavior. Visual screenshot inspected; owner acceptance remains separate.

Performance samples on local production build (not controlled benchmarks): Chromium first filtered drawing 503ms, warm slider 129ms; Firefox 574ms and 206ms. Includes browser automation overhead. The desired 150ms interaction budget is not yet consistently achieved. No before-change baseline was captured, so these numbers do not establish a measured speedup.

Next bounded ticket:
1. Repeat cold/warm measurements without concurrent suites and capture scroll/idle CPU profiles.
2. Profile the fresh iframe/worker startup cost before changing isolation. Consider debouncing or safe catalogue-only reuse only if measured benefit warrants it; keep learner execution terminable.
3. Check each figure at minimum/maximum exploration sizes; fixed framing can clip deliberately oversized drawings.
4. Owner review of figure scale and card density; no further visual redesign until feedback.

The application remains React/Next/Bun. Rust/Wasm is deferred until profiling identifies an expensive computation that benefits from it. Changes are local; this checkpoint does not claim a push or successful hosted deployment.

## Second checkpoint: measured latency and figure boundaries

The Studio now labels completed static drawings Ready and stops their indeterminate status spinner; animated examples retain Running. Explicit ranges match engine behavior (butterfly wing angles are 0–90 degrees, oval/arc sweep is 0–360). Known small figures have exploration bounds that fit their stable camera. Stars use the full fixed 700-unit view. Learner code is unrestricted by UI exploration limits.

Sequential profiling (`bun run profile:previews`, against a running production server) measured five fresh browser contexts and five range changes each. Input-to-frame median/p95 was 59/65ms in Chromium and 67/89ms in Firefox after the change. The isolated iframe/worker is retained: these local samples do not justify weakening isolation or migrating to Rust. First-frame medians were 205ms and 388ms respectively; these include fresh context startup with a warm shared browser process, not real-world cold network performance.

One Chromium main-thread idle TaskDuration sample fell from 128ms to 27ms over 1.5 seconds. This excludes worker/GPU CPU, and is not a controlled cross-device benchmark. Raw measurements and method are in `performance/2026-10-12.json`. The profiles do not establish a universal performance guarantee.

New geometry tests check actual canvas pixels at both exploration extremes for Dino, butterfly, Pacman, circle, semicircle, triangle, star, flower and rectangle. Scenes with backgrounds, random placement and spirals intentionally use the full view and may touch canvas edges. Next acceptance remains teacher review of scale/layout and a slower-device check; automated tests cannot substitute for that review.

Final second-checkpoint verification: production build and 46/46 Chromium plus 46/46 Firefox behavior tests passed. The reusable profile command also completed successfully; its final smoke run overlapped browser tests and is excluded from the sequential performance comparison. No commit, push or hosted deployment is claimed for this checkpoint.

## Owner feedback: larger starting figures

Increased the example arguments (both executable source and displayed short calls) for 14 small figures. Dino starts at 120, butterfly at 110 and Pacman at radius 85; fish, submarine, rocket, jet, bomb, fireball, dog, circle, triangle, star and flower also start larger. Fixed framing remains unchanged, so parameter edits retain an honest visible scale. Existing learner drafts are preserved. Validation: production build, full Chromium suite and the six affected Firefox geometry/reset checks; current desktop screenshot inspected.
