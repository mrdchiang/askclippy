# AskClippy — VM-to-AI Knowledge Pipeline

> "It looks like you're trying to find a vulnerability..."

Animated AI assistant that ingests vulnerability management tool outputs and lets you ask questions in natural language. Powered by your data, running locally.

## Features

- **📂 Upload scan data** — Drop a Tenable CSV or JSON file directly in the browser
- **🧠 Local LLM** — Connect to Ollama for fully private AI answers (no data leaves your machine)
- **🔍 Local search** — Keyword matching on structured knowledge works without any AI
- **📎 Animated Clippy** — Bounces, blinks, and cracks IT jokes while you work
- **🔒 100% private** — Everything runs locally, your data never leaves your network

## Audiences

| Audience | Example Questions |
|----------|------------------|
| **IT Support** | "What version of Java is on WORKSTATION-42?" "Is the agent running on DC-PROD-01?" |
| **Security Analysts** | "What CVEs are active on our domain controllers?" "Which assets have KEV-tagged vulnerabilities?" |
| **Executives** | "What's our overall compliance score?" "How many endpoints have failed health checks?" |

## How It Works

### Data Flow
```
Tenable Export (CSV/JSON) or seed-data.json
        │
        ▼
  askclippy.py (Knowledge Builder)
        │
        ▼
  knowledge-snapshot.md (structured for AI)
        │
        ▼
  chat.html (browser interface)
        │
        ├── Upload: drag & drop any CSV/JSON scan file
        ├── Ollama: local LLM (set USE_OLLAMA=true)
        └── Search: keyword matching (no AI needed)
```

### Quick Start
```bash
# 1. Build knowledge from your connector data
cd C:\Users\David\Desktop\askclippy
python askclippy.py --input ../security-tools-connectors/seed-data.json --output .

# 2. Open chat in browser
start chat.html

# 3. Or drop a Tenable CSV/JSON directly in the browser
```

### Local LLM (Ollama)
```bash
# Install Ollama
winget install ollama

# Pull a model
ollama pull llama3.2

# Edit chat.html and uncomment:
#   const USE_OLLAMA = true;
#   const OLLAMA_MODEL = "llama3.2";

# Open chat.html — it now uses your local LLM
```

## Files

| File | Purpose |
|------|---------|
| **chat.html** | Web chat interface with animated Clippy + file upload |
| **askclippy.py** | Knowledge Builder — reads seed-data.json, outputs structured snapshot |
| **knowledge-snapshot.md** | Latest knowledge snapshot (loaded by chat.html) |
| **README.md** | This file |

## Live URL
https://mrdchiang.github.io/askclippy/
