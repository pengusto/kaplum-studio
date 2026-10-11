# Teaching API

The maintained helper implementations use English names and identifiers. Each public command in `src/reference.js` has a German alias listed in `src/command-names.js`; aliases share defaults, return values and side effects. `zeichneHund` and `zeichneFisch` additionally understand `rechts` / `links` for facing. English implementations use `right` / `left`.

The guide contains 62 command contracts and all 32 original figure-reference recipes. Each contract includes ordered parameters and defaults in its signature, translated values/units, drawing anchors, rotation guidance and a runnable example. Optional `direction` in `drawPacman` uses the current turtle angle. Colours and JavaScript keywords remain English. Coordinates remain logical 700 × 700 units regardless of CSS size, with (0, 0) in the centre, up positive y and clockwise positive rotation.

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
