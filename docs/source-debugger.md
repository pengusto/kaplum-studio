# Source debugger prototype — issue #6

The first native prototype is available under **More canvas tools → Start code debugger** in a finite drawing workspace. It creates a fresh isolated worker, pauses before an instruction and highlights its original source line. Next executes until the next checkpoint. Continue schedules checkpoints with a cancellable timer; Pause holds the next instruction. Stop destroys the worker, Restart recompiles the current source. Editing ends the debug session; exports retain the exact original program, without instrumentation.

## Supported subset

- `let`/`const` with plain identifier bindings; primitive values, arithmetic and assignments.
- Direct catalogue teaching-command calls, including maintained figure helpers, executed atomically.
- Braced `for`, `while` and `if` blocks; `break` and `continue`.
- Native JavaScript lexical scopes, including shadowing. The variable list displays unique declared names resolved in the current scope. A binding outside its scope or before initialization says `not in scope`; this prototype does not distinguish TDZ from absent scope.

The existing Lezer parser validates a bounded syntax whitelist and injects generator yields before statements and at loop-body entry. Empty infinite loops still yield. JavaScript evaluates the original expressions; no secondary interpreter or new dependency is introduced. Only the instrumentation runs in Debug mode. Ordinary execution and drawing replay retain their original contracts.

## Deliberate limits

No functions, closures, callbacks, async/timers, property access, object/array literals, destructuring, try/catch, switch, do/while, imports or var. Unsupported source is rejected before execution, leaving Run available. Helper internals are not stepped. Loop tests/updates run between checkpoints: a body-entry marker can share the loop header's line. Final snapshots retain the last visible binding scope, not a complete heap or post-loop scope browser. The next highlighted statement has not executed yet.

There are no breakpoints, step-into/step-over calls or code rewind. Drawing undo and drawing playback are separate capabilities. Paused source is not a recording of an already-completed program.

## Safety and budgets

Keep iframe/worker isolation, cancellation and ordinary Stop. Variable snapshots read declared identifiers only and serialize primitive values; objects and functions are opaque type labels, with no property enumeration, getter calls or user-defined string conversion. Input dispatch is disabled during debugging. Source is limited to 50,000 characters, 100 declared names, 2,000 instrumentation points and 100,000 advances. Strings are truncated. The host bounds received fields. The whitelist is a supported-language boundary, not a replacement for sandbox isolation.

Checks cover genuinely delayed drawing and assignments, code highlight, loop variables, branching/shadowing/break/continue, empty infinite-loop yields, continue/pause/stop, edit cancellation, unsupported-source preservation and mobile controls in five languages. Chromium and Firefox are release gates. Native translation review, Safari and classroom comprehension remain open.

## Next increment

Add source-location breakpoint selection and targeted loop-condition stepping after owner testing. Function stepping and safe richer inspection need a separate design; do not expand the subset silently or present this prototype as a full debugger.
