# React Bits components

Vendored from the official DavidHDev/react-bits repository on 10 October 2026:

- https://github.com/DavidHDev/react-bits/tree/main/src/content/Components/SpotlightCard
- https://reactbits.dev/components/spotlight-card

JSX/CSS are upstream source (formatting only). The Studio passes the current theme, disables click flares, and reduces intensity. Local styles align the card surface with Studio tokens. Reduced-motion users get no decorative overlays. No React Bits code is included in learner project ZIPs.

The upstream license is **MIT + Commons Clause**, reproduced verbatim in LICENSE.md. It permits use within an application; redistributing/selling the components themselves is restricted. This is not an unconditional MIT license. Keep the source and license attribution when publishing the app. Source hashes before local formatting:

- SpotlightCard.jsx: e0b91ba07c173c98b87b44ec451d0243fe0a3edc67864e2779ad8507d455af67
- SpotlightCard.css: b646b7da4bb46f0a4d819d0af275804c49a845a5c2dc848700aaf9282db13a92

## Free controls added on 11 October 2026

Official `src/content/Micro/{StatusMark,WarmTooltip,RubberSegment}` JSX/CSS from https://github.com/DavidHDev/react-bits. These share exact-pinned Motion 14.1.0. The upstream license above applies to all three.

- StatusMark reflects actual runtime loading/running/error/stopped events. Its decorative English label is hidden; the existing translated status remains accessible. Reduced motion disables decorative movement.
- WarmTooltip adds focus/hover/long-press hints to header settings and appearance buttons. The upstream `layoutOf` function has a local SSR viewport guard: Next.js prerenders closed tooltips without `window`; browser positioning retains the real viewport. No tooltip is mounted behind the native settings dialog.
- RubberSegment switches the narrow workspace panels, with controlled radio semantics, Arrow keys and dragging disabled. Theme colors are supplied through props.

Original upstream source hashes, before the SSR guard:

| File | SHA-256 |
| --- | --- |
| StatusMark.jsx | 113fa90cd02db3186d984967e76c9ede53f71b71d569e1a410bd78af2a20ecb0 |
| StatusMark.css | 9c46c47df3729a4e1d258d7a77521faa08fc445fd1ea8b8c4ade8bdb8c2e45c9 |
| WarmTooltip.jsx | bec4e1fa39b681da5b4e88bde945f374bb87fe734ef745ab44ca82f8ac1bdcba |
| WarmTooltip.css | 241941731b1a83626caa3df16bb535e55ece65591154d5eac4ea9c5e3e940386 |
| RubberSegment.jsx | 35489f6c3c59dae1cd98d82c11e69f3ecee3cfb831bec70278365d07caac0bcf |
| RubberSegment.css | 8e27a0daf7c64dc09939020db11d0461b03368763bceaaa60b88accad1b06cb4 |

## Dock layout pilot (11 October 2026)

Dock.jsx/CSS are vendored from official src/content/Components/Dock. Original hashes: JSX f1eba9b158a023e78ff76242a0b17468ed733475918b1cb473158af19f59ebf9; CSS 68914a58df742acacbe82341d930f6ae6d2e0720176e9428f5edcad4353f53e6. Existing full upstream license applies. Local changes: optional native link items with aria-current, navigation focus does not magnify adjacent targets, reduced-motion/coarse pointers keep base size. Original labels appear on hover and keyboard focus. Menus/auto-hide/bounce/badges are unused in the Studio pilot. Theme overrides use Studio tokens.

Dock refinement: restored upstream 50px tiles, 68px bar and 70px magnification; original gradients, shadows and keyboard focus retained. Tile and panel colours use the shared Studio palette. Active indicator uses the Studio accent. Narrow workspace scrolls above the reserved Dock region.

## Live configurator
ScrubField.jsx/CSS are unmodified official src/content/Micro/ScrubField sources (12 October 2026). JSX SHA-256: b66db1de9e4da1dd2fe204099fecf1c915e4ab7d576332ad457769ad8547dedf; CSS: 8fc11c27d2f76bd1bb03de7e28e0dcaff1a8828213cc41bc924624fb69b7fa3b. Upstream license retained. Controlled values update the existing sandbox Preview; native range and colour inputs complement it. No extra UI dependency.
