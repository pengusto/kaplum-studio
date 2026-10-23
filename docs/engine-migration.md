# Turtle core replacement

The adapted teaching-fork core has been replaced with a Canvas implementation. The API used by the 62 command examples remains available. The existing helper layer owns `beginFill` and `endFill` and shares the core through `getTurtleState`.

Changes: coordinates retain decimals, negative forward distances move backwards, invalid non-finite movement inputs raise readable errors, and wrapping splits paths at edges and corners. CSS colour parsing uses Canvas directly. Unused legacy speed queues, random texture commands, clipboard DOM hooks and documentation-link injection were removed; these are not part of the studio command catalogue.

Verification: production build; 19 Playwright tests in Chromium and Firefox, including real standalone ZIP execution; all 32 dark figure previews regenerated with the worker runtime. Image differences are recorded in the implementation handoff. Native colour parsing and decimal positions can change rasterization slightly.

On 12 October 2026, the owner confirmed that the drawing helpers in `engine/functions.js` were created by Enis Uysal with Codex assistance. They are covered by the project license in `LICENSE`; the previous blanket helper-provenance warning has been removed on the basis of that statement. This is an owner declaration, not an independent source audit. The local teaching archive retains the earlier adapted core and its history; the old private GitHub repository was deleted with owner authorization. This separate release repository contains only the current source snapshot.

## Public source snapshot

This release repository starts from the current source snapshot and has no earlier teaching-fork engine commits. The original local teaching archive remains preserved. The old private GitHub repository was deleted on 12 October 2026.
