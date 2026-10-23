# Contributing to Kaplum Studio

Small, focused contributions are welcome. Describe the learner-facing problem in a GitHub issue before starting a large change. Do not upload student projects, personal data or classroom materials.

Use Bun 1.4.2 and the committed lockfile:

```sh
bun install --frozen-lockfile
bun run build
bun run test
PLAYWRIGHT_BROWSER=firefox bun run test
```

For deployment changes, also build and test with `NEXT_PUBLIC_BASE_PATH=/kaplum-studio`. Public UI text must cover English, German, Japanese, Turkish and Armenian. Keep JavaScript identifiers English. Translation completeness is separate from native-speaker quality; language corrections are welcome.

The complete Firefox suite runs with one worker. Parallel canvas tests produced intermittent actionability timeouts while isolated runs passed; serialization preserves the full suite without relaxing assertions or timeouts. Chromium retains two workers.

After an interrupted browser-test run, check whether its preview server still owns port 4187 before restarting. Stop only a process whose working directory is this checkout, or use a free `PLAYWRIGHT_PORT`. Do not enable `reuseExistingServer` to test against an unidentified build.

The public homepage metadata in `app/page.jsx` contains the Google Search Console ownership-verification tag for the GitHub Pages project URL. Preserve it when changing metadata: verification is checked periodically. `app/sitemap.js` lists only the standalone application and documentation pages, not hash-based Studio states.

Command signatures, descriptions and examples live in `src/reference.js` and are shared by Studio and documentation. Change the contract, runtime and relevant behaviour tests together. Keep drawing size independent from screen resolution, visible-only preview execution, pause intent, sandbox isolation and exact-source offline exports.

In a pull request, explain the problem, change and checks. Include screenshots for visible changes. Preserve third-party licence notices. Never submit credentials or private teaching archives.
