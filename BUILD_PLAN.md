# AskClippy Build Plan

AskClippy is the natural-language query layer for the Security Tools Suite. It
must remain compatible with ShieldView, RemFlow, TheValidator, Launchpad, and
the shared persistence/data-contract infrastructure.

## Suite architecture

```text
ShieldView -> RemFlow -> TheValidator
     \             |             /
      \---- shared suite data ---/
                    |
                AskClippy
                    |
                Launchpad
```

- Launchpad's storage adapter is the persistence boundary.
- The shared contract defines keys, record shapes, and validation.
- Same-origin localStorage is the current offline backend.
- The adapter boundary must remain asynchronous so IndexedDB or a shared API
  can be introduced without rewriting AskClippy's query layer.
- `security-tools-api` is the likely shared-service path for multi-user or
  server-backed deployments.

## Delivery plan

### Phase 1 — Reliability and mobile usability

- [x] Fix mobile clipping and responsive controls.
- [x] Add bounded uploads.
- [x] Parse quoted, escaped, and multiline CSV fields correctly.
- [x] Fix literal newline and over-escaped regular-expression bugs.
- [x] Add a bounded Ollama timeout with local-search fallback.

### Phase 2 — Suite persistence and contracts

- [x] Correct the Launchpad storage-adapter import.
- [x] Give the local fallback the same async, parsed interface.
- [x] Route live-pipeline reads through the adapter.
- [x] Route remediation queue handoffs through the adapter.
- [x] Validate adapter-loaded records with the shared contract.
- [x] Add conformance tests for AskClippy's local adapter fallback.
- [ ] Add adapter conformance tests shared with the other suite repositories.
- [ ] Decide how contract versions are distributed and synchronized.

### Phase 3 — Accessibility and UI quality

- [x] Make prompt chips and Clippy keyboard accessible.
- [x] Add visible focus indicators.
- [x] Respect reduced-motion preferences.
- [ ] Improve low-contrast secondary text and dense pipeline navigation.
- [ ] Add a truthful Ollama availability indicator.
- [ ] Prevent Clippy bubbles from obscuring active content.

### Phase 4 — Security hardening

- [x] Restrict citation links to known suite destinations.
- [x] Isolate external links with `noopener noreferrer`.
- [x] Add CSP restrictions for objects, base URLs, and forms.
- [ ] Split inline CSS and JavaScript only after suite integration tests exist.
- [ ] Remove `unsafe-inline` from CSP after that refactor.

### Phase 5 — Verification and delivery

- [x] Extract and test CSV parsing, CVE normalization, and snapshot section parsing.
- [x] Test shared-contract validators and live-pipeline record filtering.
- [x] Add automated tests for CSV parsing, query matching, and contract filters.
- [ ] Test snapshot, upload, live-pipeline, adapter-fallback, and Ollama modes.
- [ ] Test mobile, tablet, and desktop breakpoints.
- [ ] Verify ShieldView -> RemFlow -> TheValidator -> AskClippy handoffs.
- [ ] Commit and push the verified build.

## Guardrails

- Do not remove cross-project modules or handoffs as isolated cleanup.
- Do not make AskClippy the owner of suite schemas.
- Preserve offline/local operation when adding a shared API backend.
- Treat transport adapters and record validation as separate layers.
- Prefer backward-compatible contract migrations over silent record dropping.
