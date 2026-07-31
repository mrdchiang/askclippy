# AskClippy — AI Infrastructure Chat

[![Security Tools](https://img.shields.io/badge/Security-Tools-0066ff)](https://mrdchiang.github.io/launchpad/)
[![Live](https://img.shields.io/badge/Live-mrdchiang.github.io-22cc66)](https://mrdchiang.github.io/askclippy/)

AI-powered chat assistant for your security infrastructure. Ask about assets, CVEs, and endpoint health in plain English — with an animated Clippy companion.

## Key Features

- **Live Pipeline Mode** — Reads real-time data from ShieldView, RemFlow, and TheValidator via shared localStorage
- **Structured Retrieval** — Two-step: JSON filter spec → local execution → narrated results (reliable with small local models)
- **Source Citations** — Every factual claim links to the originating tool with pre-applied filters
- **File Upload** — Drop a Tenable CSV/JSON for instant Q&A
- **Offline Knowledge Snapshot** — Generate a static snapshot for fully offline use
- **Ollama Integration** — Runs against local LLM via `localhost:11434`
- **Three Data Sources** — Static snapshot, uploaded file, or live pipeline with freshness indicators
- **Cross-Tool Prompt Chips** — "KEV deployed but unverified", "Overall remediation rate", "EOL OS + critical CVEs"

## Architecture

- Single-file HTML (~1500 lines)
- Vanilla JS, no build step, no dependencies
- AskClippy is the natural-language query layer across ShieldView, RemFlow, and TheValidator
- Launchpad's async storage adapter is the persistence boundary
- The shared contract owns suite keys, record shapes, and validation
- Same-origin localStorage bus (`mrdchiang.github.io`) provides the current offline backend
- The async adapter boundary allows a future IndexedDB or `security-tools-api` backend
- CSP: `connect-src 'self' http://localhost:11434`

See [BUILD_PLAN.md](BUILD_PLAN.md) for the suite-aware delivery plan and guardrails.

## Live Demo

**https://mrdchiang.github.io/askclippy/**

### Getting Started

1. Open in browser
2. Select data source: Snapshot / Upload / Live Pipeline
3. Type a question or click a prompt chip
4. Ollama must be running locally on port 11434 for AI responses

## Related Tools

| Tool | URL | Role |
|---|---|---|
| 🛡️ ShieldView | [shieldview](https://mrdchiang.github.io/shieldview/) | Vulnerability management |
| 🛠️ RemFlow | [remflow](https://mrdchiang.github.io/remflow/) | Remediation pipeline |
| ⚡ TheValidator | [thevalidator](https://mrdchiang.github.io/thevalidator/) | Endpoint health + compliance |
| 🚀 Launchpad | [launchpad](https://mrdchiang.github.io/launchpad/) | Tool index + pipeline view |

## Technology

HTML5 · CSS3 · Vanilla JavaScript · Ollama API · localStorage · Same-origin shared contract

## Development

The project has no runtime build step or third-party dependencies. Run the
automated logic tests with:

```bash
npm test
```
