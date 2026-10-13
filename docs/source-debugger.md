# Source debugger prototype — issue #6

The first native prototype is available under **Debug code** directly in the course task and editor header, as well as above the canvas in a finite drawing workspace. Starting it scrolls to the shared source view. It creates a fresh isolated worker, pauses before an instruction and highlights its original source line. Next executes until the next checkpoint. Continue schedules checkpoints with a cancellable timer; Pause holds the next instruction. Stop destroys the worker, Restart recompiles the current source. Editing ends the debug session; exports retain the exact original program, without instrumentation.

## Supported subset

- `let`/`const` with plain identifier bindings; primitive values, arithmetic and assignments.
- Direct catalogue teaching-command calls, including maintained figure helpers, executed atomically.
- Braced `for`, `while` and `if` blocks; `break` and `continue`.
- Native JavaScript lexical scopes, including shadowing. The variable list displays unique declared names resolved in the current scope. A binding outside its scope or before initialization says `not in scope`; this prototype does not distinguish TDZ from absent scope.

The existing Lezer parser validates a bounded syntax whitelist and injects generator yields before statements and at loop-body entry. Empty infinite loops still yield. JavaScript evaluates the original expressions; no secondary interpreter or new dependency is introduced. Only the instrumentation runs in Debug mode. Ordinary execution and drawing replay retain their original contracts.

## Deliberate limits

No functions, closures, callbacks, async/timers, property access, object/array literals, destructuring, try/catch, switch, do/while, imports or var. Unsupported source is rejected before execution, leaving Run available. Helper internals are not stepped. Each if/for/while condition is evaluated once in the worker, then pauses with its actual Boolean result before selecting a branch. Next resumes using that stored result, including side effects such as n++. For initialization and updates still run between checkpoints; a body-entry marker can share the loop header's line. Final snapshots retain the last visible binding scope, not a complete heap or post-loop scope browser. The next highlighted statement has not executed yet. At a condition-result checkpoint the test itself has already run, but its branch has not.

There is no step-into/step-over for calls or code rewind. Drawing undo and drawing playback are separate capabilities. Paused source is not a recording of an already-completed program.

## Safety and budgets

Keep iframe/worker isolation, cancellation and ordinary Stop. Variable snapshots read declared identifiers only and serialize primitive values; objects and functions are opaque type labels, with no property enumeration, getter calls or user-defined string conversion. Input dispatch is disabled during debugging. Source is limited to 50,000 characters, 100 declared names, 2,000 instrumentation points and 100,000 advances. Strings are truncated. The host bounds received fields. The whitelist is a supported-language boundary, not a replacement for sandbox isolation.

Checks cover genuinely delayed drawing and assignments, code highlight, loop variables, branching/shadowing/break/continue, empty infinite-loop yields, continue/pause/stop, edit cancellation, unsupported-source preservation and mobile controls in five languages. Chromium and Firefox are release gates. Native translation review, Safari and classroom comprehension remain open.

## Next increment

Target child-facing comprehension testing of condition stepping. Function stepping and safe richer inspection need a separate design; do not expand the subset silently or present this prototype as a full debugger.

## Source-line breakpoints

Below the drawing, open **Breakpoints**. The debugger panel accepts a line number that has a supported checkpoint. Blank/comment-only lines and closing braces are rejected rather than silently moved to another line. The editor marks configured lines; listed buttons remove one breakpoint and Clear removes all. There are at most 100 breakpoints.

Continue advances past the current checkpoint, then stops before the next matching checkpoint. The breakpoint statement has not run yet. Next ignores breakpoint matching and advances exactly one checkpoint. A loop can hit the same breakpoint repeatedly. Several statements/checkpoints on a single source line can each stop there; a line breakpoint is not a once-per-loop-iteration promise. The initial start always pauses at the first checkpoint.

Restart keeps breakpoints for the same source. Stop ends execution and clears editor marks while retaining the configuration until the next Debug start; ordinary Run ignores it. Editing/resetting source clears all breakpoint configuration, avoiding stale locations. Breakpoints are local workspace UI state and never injected into exported learner source. Native generator yields and the existing worker handle the pause; there is no host evaluation of learner expressions.

## Shared code and drawing view

Debug mode displays the actual editable source beside the drawing on desktop, and in a compact 180px code pane above it on mobile. The editor highlights the next source line and scrolls it into view without taking keyboard focus. The normal mobile panel tabs and parameter inspector are hidden during the session, then restored on Stop. A compact Up next status gives the line number; the source remains in its surrounding program rather than a duplicate one-line card. Below the drawing, the collapsed Recent steps section retains the last eight completed checkpoints, including repeated loop visits. Control-flow checks and loop-body entry are labelled separately; they are not claimed to be drawing commands. Helpers such as drawCircle execute atomically. Expressions are shown as authored; primitive variable values appear separately, without evaluating expressions again in the host. The history clears on a new run or editing and is not exported.

## Condition feedback

The most recent actual if/for/while result marks its source line green for true or red for false, with an inline explanation in the selected language. During condition feedback the editor wraps long lines so explanations remain readable on mobile. The same explanation is available as a status above the drawing. False means normal branch selection or loop termination, not an error. Results remain visible until the next condition, Restart, Stop or edit. Notes are editor decorations, never inserted into learner code or downloads. The final false loop test remains visible after completion. Helpers remain atomic. Tests compare native results, including side-effecting tests, continue/break, empty for tests and nested branches.

## Optional example tray

The workspace uses the full available width. Example library is a collapsed section below the editor and drawing, with search, category filters and a horizontally scrollable row of examples. Opening it does not narrow the workspace. Selecting another example closes the tray and preserves the existing per-example drafts. This layout applies on desktop and mobile.

## Workspace sizing

Normal desktop editing places source and drawing side by side and reserves enough height for both rather than shrinking them to fit exports or teaching text into one viewport. The workspace scrolls to reach additional controls. Parameter visibility works from 701px upward; mobile keeps the existing Code/Result/Explanation tabs. Dock clearance is reserved once at the end of the content, not as a large gap after the export controls.

## Adjustable split

On desktop, drag the separator between code and drawing to allocate 25–75% of the workspace to code. The same split applies in normal and debug mode. Keyboard users can focus the separator and use Left/Right in 5% steps, Home/End for the limits; double-click resets to 50/50. The split is saved in browser localStorage and restored across reloads and examples. Invalid saved values fall back to 50/50; blocked storage does not prevent resizing. This does not modify source or exports. Parameters start collapsed and open below the workspace, preserving its width. Mobile retains panel tabs and hides the divider.
