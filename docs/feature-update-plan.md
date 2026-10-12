# Testable Turtle feature update

Owner requested a concrete implementation plan, 2026-10-12. This document proposes the next update; it does not promise unattended overnight execution or a delivery time. Baseline: ea815f3, successfully deployed on GitHub Pages.

## Delivery order

Work one bounded issue at a time. Keep the default immediate runtime, existing examples, five locales, German aliases, worker isolation and exact-source offline exports. Follow the current project contracts in teaching-api.md and architecture.md.

### 1. Trace prototype — issue #1

First record a finite drawing program and replay a square and a pen-up journey. Decide and test logical program state versus displayed state before exposing controls. Prefer instrumenting existing drawing operations; do not introduce a second engine, JS interpreter or full-canvas snapshot per operation. Include transforms, style and fill boundaries; specify a finite history budget and a clear overflow error. If generic helper replay proves unsafe, report the precise supported operation set and retain immediate execution for unsupported examples. Never silently drop operations.

Acceptance: trace reaches the same final pixels and state as immediate execution; queries remain synchronous; stop/restart terminates playback; no timer while idle.

### 2. Playback UI — issue #2

Add speed, pause/continue, next drawing operation and replay reset to the focused workspace, not every catalogue card. Show progress and the displayed turtle position/direction. Keep Run/Stop/Restart distinct. Reduced motion defaults to immediate or manually requested playback. Define timer/input program behavior explicitly; initial finite drawing replay must not pretend to support an interactive live debugger.

Owner tests: slow square, pause halfway, next step, resume, restart, stop and switch examples. A pen-up example demonstrates movement without a line.

### 3. Stamps — issue #3

Add stamp() returning an ID and clearStamp(id); preserve ordinary ink and other stamps. Document appearance, hidden turtle, clear/reset and invalid IDs. Add a repeated pattern with individually removable impressions. Keep stamp storage bounded and integrate it with the ordered trace.

Owner tests: create five stamps, remove the middle stamp, rotate and recolour subsequent impressions, then export and repeat offline.

### 4. Turtle circles — issue #5

Implement path-based circle(radius, extent, steps) without changing drawCircle/drawArc helpers. Define signed radius, centre side, tangent, heading change, polygon steps and invalid values. Test against known positions and endpoints.

Owner tests: full circle, half circle, negative radius, five-sided polygon and pen-up arc. Compare with the static drawCircle helper.

### 5. Bounded undo — issue #4

Only after trace/stamp contracts pass, restore the prior supported drawing state and expose a clear Undo action. Specify clear/fill/stamp behavior. Undo is drawing history, not reversal of variables, callbacks or editor text. Test memory budget and redraw latency. If this gate fails, ship the earlier complete features with Undo explicitly pending.

### 6. Example source — issue #8

Provide an initial teaching-friendly construction view for Pacman and Dino through the existing reference/workspace. Reuse maintained source, protect learner drafts and avoid another duplicate gallery/navigation destination. Expand figure coverage later.

## Test collection

Add a discoverable “New functions” collection in the existing course/example surface: square replay, pen-up journey, stamp pattern, circle/arc comparison and optional undo walkthrough. Each has a short task, expected outcome, reset and open/edit actions. Keep general Turtle commands, general drawing helpers and example figures explicitly separated. Do not change the existing activity count until new activities and all their locale records are actually complete.

## Release gate for every increment

1. Relevant behavior tests for geometry, ordering, queries and cancellation.
2. Real browser interaction in Chromium and Firefox; keyboard access, narrow viewport and reduced motion.
3. Existing examples and learner draft/export protections remain intact.
4. Production build with /kaplum-studio and standalone ZIP behavior.
5. Final diff, focused commit, push and CI/Pages terminal result; verify the live intended commit and test collection.
6. Record what is implemented, experimentally limited or pending. Native translation review and Safari remain separate gates.

## Scope tiers

- Minimum coherent update: stages 1–2 and two test examples.
- Expanded update: add stamps and path circles (3–4).
- Stretch only after verification: bounded undo and two construction views (5–6).

Avoid a broad UI redesign during this increment. Keep the catalogue fast; replay history and controls are only allocated for an explicitly selected workspace. Measure frame traffic, active playback latency and bounded retained memory against the current preview baseline.

## Later work

Issue #6 remains a design/prototype for actual JavaScript debugging, including loops, function calls, breakpoints, source locations and safe variable inspection. It must not be presented as complete merely because drawing stepping exists. Multiple turtles (#7) and the p5.js workshop evaluation (#9) remain later independent decisions.

## Implementation checkpoint

Local commits 92e5c52, 41e6589, 0f542a9 and 9a781d0 implement bounded finite drawing recording, focused workspace playback and native circle paths. Chromium regression suite: 58 passed; Firefox targeted engine/playback/reference checks: 12 passed. The trace is a drawing replay, not a JavaScript debugger or general undo. Stamps, drawing undo, the dedicated new-functions collection and Pacman/Dino construction views remain next. Deployment must be verified separately; local checks alone are not release proof.

Quick local test: open My projects, paste a finite square, choose Record drawing, advance a step, play, pause, rewind and Stop. In Basic commands search circle and open the command to test arcs or a five-sided path. For geometric endpoints use wrap(false).
