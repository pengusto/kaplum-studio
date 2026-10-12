# Teaching API

The maintained helper implementations use English names and identifiers. Each public command in `src/reference.js` has a German alias listed in `src/command-names.js`; aliases share defaults, return values and side effects. `zeichneHund` and `zeichneFisch` additionally understand `rechts` / `links` for facing. English implementations use `right` / `left`.

The guide contains 73 command contracts and all 32 original figure-reference recipes. Each contract includes ordered parameters and defaults in its signature, translated values/units, drawing anchors, rotation guidance and a runnable example. Optional `direction` in `drawPacman` uses the current turtle angle. Colours and JavaScript keywords remain English. Coordinates remain logical 700 × 700 units regardless of CSS size, with (0, 0) in the centre, up positive y and clockwise positive rotation.

`requestAnimationFrame` runs at normalized 60 Hz teaching ticks; `jumpHeight` duration is measured in those ticks. Timers use milliseconds. Run/Stop creates and destroys the whole isolated runtime.

## Differences from the original course library

The maintained engine simplifies the library used in earlier lessons:

- Duplicate German forwarding wrappers and `TurtleIntern` indirection were removed. German aliases point toward one English implementation.
- Obsolete position-based `drawButterfly(x,y,...)` and `drawButterflyAt` are removed; no maintained activity uses them. `drawButterfly(size, paintColor, wingAngle)` is the current body-start contract.
- Legacy speed stepping (`setSpeed`), debug grid (`showGrid`), `strangeSquare`, `strangeGalaxy`, `strangeCircle`, `strangeLine`, `colour`, `randomColor_h` and exported `drawIf` are removed from the child-facing runtime. They are environment/debug compatibility paths, not gallery commands. Internal drawing routines and the RGB colour parser remain implementation details; they are not teaching API.
- The fill tracker uses the library's actual turtle position rather than maintaining another position copy. `beginFill` starts a path and `endFill` closes it. Calling `endFill` without a path does nothing.
- `hideArrow` preserves its original behavior: pen up, position (1000,1000). Use `hideTurtle` to hide the arrow while preserving position.


## Languages and translation status

English is the default. German, Japanese, Turkish and Eastern Armenian cover the interface, accessibility labels, activities, teaching comments, command descriptions and reference recipe titles. They are AI-assisted drafts with **no native-speaker review**, especially Japanese and Armenian; key/content completeness does not certify linguistic quality. README/release documentation must retain this distinction.

Only curated starter/solution source passes the teaching-text translation boundary. Curated command-reference snippets use the same call-token alias conversion and selected command language. It translates the single teaching comment and intentional canvas messages, and substitutes known call tokens for German aliases while protecting string literals/comments. A child's buffer never passes that transformation. Interface switching preserves edited code; explicit starter/solution/command-variant replacements require confirmation. Stored baselines preserve replacement protection after reload.

## General commands and example helpers

Reference records explicitly distinguish `turtle` commands, general `drawing` helpers and `example` figures. Dino and Pacman are Kaplum helper examples, not standard JavaScript/Turtle primitives. Existing routes and figure browsing are preserved.

`position()` returns a new `{x,y}` object; `heading()` preserves the current absolute angle. `distanceTo(x,y)` reads Euclidean distance; `directionTo(x,y)` reads a clockwise direction in [0,360), or the current heading when both points coincide. All queries are synchronous and do not draw. `getTurtleState()` keeps its existing return contract. `backward(distance)` uses the existing pen/wrapping rules; `home()` teleports to centre and faces up without clearing. `showTurtle()`, `isVisible()` and `isPenDown()` do not move.

`onKey(key, handler)` delivers a non-repeated, unmodified key press on the focused canvas; the callback receives the key string. `onClick(handler)` delivers a primary pointer press as `{x,y}` in logical units. Both return an unsubscribe function. Studio input never captures typing in the editor. Stop/navigation/restart destroys the runtime and its handlers. Standalone exports focus their canvas and use the same callbacks. Keyboard chords with Ctrl/Meta/Alt and repeated keydown events are ignored.

The workspace shows position, direction and pen state from coalesced drawing frames, plus an optional 50-unit grid and pointer-coordinate copy aid. These studio aids are not part of exported learner code. Finite drawing playback is opt-in in the workspace. General undo, stamps and multiple turtles remain planned.

## Finite drawing recording

`recordDrawing(program)` starts a new blank drawing and executes a synchronous finite drawing callback immediately. Queries inside it see logical program state. It returns a controller with `length`, `step`, `bytes`, `next()`, `back()`, `reset()`, `finish()` and `seek(index)`. Playback displays recorded state without reversing JavaScript variables. History is limited to 10,000 display checkpoints, 100,000 canvas operations and 4 MB serialized operation data. Timer/input registration, asynchronous callbacks, object-valued canvas arguments and unsupported canvas methods are rejected explicitly. It is opt-in; normal programs allocate no trace. A second recording requires a fresh program run. Existing Kaplum helpers use the shared recording context.

Workspace “Record drawing” records the current finite program, then starts paused at step zero. Controls play/pause, advance/back one drawing checkpoint, reset playback and choose 30–1000 ms per checkpoint. The inspector reports displayed state; program queries retain computed logical state. Previous step is playback rewind, not general runtime undo. Stop destroys the recording. Input and timer programs must use normal Run.

## Turtle circle paths

`circle(radius, extent = 360, steps)` follows polygonal chords from the current position and tangent. Positive radius places the centre on the left; negative radius places it on the right. Positive extent moves forward, negative extent backward. Heading changes by `-extent * sign(radius)`. It respects pen-up, wrapping, current colour/width and helper fills. Full circles return to their starting point when wrapping is disabled. Unlike the static `drawCircle`, it moves the Turtle and changes its heading.

Radius must be finite and nonzero, extent finite in [-360,360], and explicit steps an integer in [3,2000]. Extent zero is a no-op after validation. The default uses at least 12 segments and approximately four degrees per segment. `kreisPfad` is the German alias. Large circles can cross the wrapping boundary; turn wrapping off when demonstrating geometric endpoints.

## Removable stamps

`stamp()` returns a monotonically increasing positive integer ID per runtime. It leaves a filled arrow (current pen colour, position and heading) even when the turtle is hidden or pen raised. Up to 1000 live impressions are permitted. Stamps are a separate overlay above ordinary ink, in insertion order; subsequent ink does not cover them. This explicit layer allows removal without erasing underlying lines or other impressions. `clearStamp(id)` rejects non-positive/non-integer IDs, returns false for missing IDs and true for removal. `clear()` removes ink and stamps but does not reuse IDs. Recording starts with a blank stamp layer; stamp creation/removal/clear are ordered trace operations and survive rewind/reset/finish. Aliases: `stemple`, `loescheStempel`.
