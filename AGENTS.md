# Kaplum Studio delivery checks

- Before every push, run `bun run verify:push`. The installed `.githooks/pre-push` enforces build, the complete Chromium and Firefox suites, and the Pages subpath build/tests. Do not bypass the hook or skip failing tests.
- Install the versioned hook in each clone with `bun run hooks:install`.
- Publish main with `bun run push:verified`: it pushes through the hook and waits for the Pages workflow for that exact commit. Report completion only after its build, verification and deployment succeed. If GitHub fails or cannot be read, report the unresolved gate and fix authorized failures.
- Keep the working tree clean before publication. Verification writes screenshots to a temporary directory and restores the root-path preview build.
