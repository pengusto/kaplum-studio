# Teacher inspection update

## Scope and delivery order

1. Expand the existing coalesced live inspector with pen colour, line width, visibility and stamp count. Preserve synchronous program queries and the 700-unit coordinate system.
2. Explain each selected recording checkpoint using before/after state and actual canvas effects. Report endpoints, not an invented forward distance or JavaScript line. Include styles, pen, heading, stamps, fills and clear. Reset starts at the initial state; rewind and Undo show the surviving checkpoint.
3. Extend the existing five-language course lab with position queries, styles and wrapping experiments. Reuse draft/reset/export flows; keep general commands separate from example helpers.
4. Verify geometry/state contracts, playback cancellation, five-language narrow layout and offline export; publish through existing CI and Pages and verify the actual live assets.

## Testing boundary

Automated workshop smoke checks verify runnable examples, state transitions and usable controls, not learner comprehension. A real class trial, native translation review and Safari remain owner/reviewer gates. Code-line mapping, variables and breakpoints stay in the separate debugger issue. No new framework or package is needed.

## Implementation

Implemented live position, direction, pen, colour, width, visibility and stamp count; selected checkpoint before/after with actual canvas effects; three multilingual experiments; bounded message normalization and offline inspection checks. Existing category filters already distinguish Turtle commands, drawing helpers and example figures.

Verification: 24 focused browser/engine checks passed in Chromium and Firefox; the expanded test suite has 74 checks. Local full-suite runs found an accidentally broadened legal-paragraph assertion (corrected and verified) and one Firefox animation-status failure (isolated rerun passed). Publication requires full green CI, mounted Pages checks and live browser verification.

## Canvas usability follow-up

The toolbar uses the edited program's parsed syntax to distinguish finite drawing,
frame animation and timer/input/async work. This is a UI hint, not a security or
recording guarantee: the recording engine still rejects unsupported dynamic calls.
Only finite drawings offer recording. Frame-only animations expose pause/resume;
pausing retains pending frame callbacks and shifts the clock origin on resume,
so no suspended-time backlog is played. Stop terminates the sandbox and restart
creates a fresh one. Timer/input programs use normal Run/Stop.

The programme kind is labelled in all five languages, independent of the catalogue
section (the circle activity is a finite drawing even under Animations). Mobile
controls remain visible; optional state and comparison panels stay collapsed.
p5.js remains deferred. The genuine source debugger and independent turtles are
separate next stages and are not implemented by this usability change.

## Lesson task follow-up

All eight finite lessons now separate goal, observable baseline outcome and one
bounded source-edit challenge in five languages. Overview cards show the goal.
The edit action selects and focuses the existing editor; the walkthrough runs
its current source, never a replacement solution. Expected values explicitly
refer to the original example, not an automatic correctness claim about edits.
No completion tracking or grading is inferred from clicks.
