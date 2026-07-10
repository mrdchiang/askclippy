# AskClippy — VM-to-AI Knowledge Pipeline

> "It looks like you're trying to find a vulnerability..."

Animated AI assistant that ingests vulnerability management tool outputs and lets you ask questions in natural language. **100% offline capable — no internet required.**

## Features

- **📂 Upload scan data** — Drop a Tenable CSV or JSON file directly in the browser
- **🧠 Local LLM** — Connect to Ollama for fully private AI answers (no data leaves your machine)
- **🔍 Local search** — Keyword matching on structured knowledge works without any AI
- **📎 Animated Clippy** — 11 mood animations, 50+ meme/pop culture quotes, auto-quotes every 10-20s
- **🔒 100% air-gap capable** — Works on classified/intranet networks with zero internet access

## Audiences

| Audience | Example Questions |
|----------|------------------|
| **IT Support** | "What version of Java is on WORKSTATION-42?" "Is the agent running on DC-PROD-01?" |
| **Security Analysts** | "What CVEs are active on our domain controllers?" "Which assets have KEV-tagged vulnerabilities?" |
| **Executives** | "What's our overall compliance score?" "How many endpoints have failed health checks?" |

## Offline / Intranet Deployment

**AskClippy requires zero internet access.** Everything runs locally:

| Feature | Network | How |
|---------|---------|-----|
| Local search | ❌ None needed | Pure JS in browser, no network calls |
| File upload (CSV/JSON) | ❌ None needed | All browser-side parsing |
| Animated Clippy | ❌ None needed | Pure CSS/SVG animations |
| Ollama LLM | ❌ None needed | Calls `http://localhost:11434` (loopback) |
| Knowledge building | ❌ None needed | Python script runs on your machine |
| Hosted URL (GitHub Pages) | ✅ Internet | Only if using `mrdchiang.github.io/askclippy/` |

### Intranet Serve (No Internet)
```bash
# Option A — Python HTTP server (easiest)
cd C:\Users\David\Desktop\askclippy
python -m http.server 8080
# Access at http://<your-ip>:8080/ from any machine on your LAN

# Option B — IIS / Nginx
# Point web root to C:\Users\David\Desktop\askclippy\
# Serve index.html as default document

# Option C — File share / USB
# Just open index.html directly from a file share or USB drive
# Works offline with file:// protocol
```

### Local LLM (Ollama) — Fully Offline
```bash
# Install once (need internet for this step)
winget install ollama
ollama pull llama3.2

# Then disconnect from the internet permanently.
# Ollama runs entirely on your machine.

# Edit index.html — uncomment these lines:
#   const USE_OLLAMA = true;
#   const OLLAMA_MODEL = "llama3.2";

# Refresh the page — it now uses your local LLM,
# calling http://localhost:11434 (loopback, no network)
```

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
  index.html (browser interface)
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

# 2. Open in browser
start index.html

# 3. Or drop a Tenable CSV/JSON directly in the browser
```

### Scheduled Refresh (Daily Cron)
```yaml
# Automatically rebuild knowledge every morning
schedule: "0 6 * * *"
command: cd /c/Users/David/Desktop/askclippy && python askclippy.py --input ../security-tools-connectors/seed-data.json --output .
```

## Files

| File | Purpose |
|------|---------|
| **index.html** | Web chat interface with animated Clippy + file upload + offline LLM support |
| **askclippy.py** | Knowledge Builder — reads seed-data.json, outputs structured snapshot |
| **knowledge-snapshot.md** | Latest knowledge snapshot (loaded by index.html) |
| **knowledge-snapshot.json** | Same data in programmatic JSON |
| **README.md** | This file |

## Live URL (requires internet)
https://mrdchiang.github.io/askclippy/
