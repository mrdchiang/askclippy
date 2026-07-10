# AskClippy — VM-to-AI Knowledge Pipeline

## Concept
Ingests outputs from vulnerability management tools, security consoles, and IT systems — then structures them into a knowledge base that an AI (Claude on Bedrock, or any LLM) can query conversationally.

> "It looks like you're trying to find which assets have CVE-2026-10001..."

## Audiences & Questions

| Audience | Questions They Ask |
|----------|-------------------|
| **IT Support Techs** | "What version of Java is on WORKSTATION-42?" "Is the CrowdStrike sensor running on DC-PROD-01?" |
| **Security Analysts** | "What CVEs are active on our domain controllers?" "Which assets have KEV-tagged vulnerabilities?" |
| **Executives** | "What's our overall compliance score?" "How many endpoints have failed health checks?" |

## Files
All in `C:\Users\David\Desktop\askclippy\`:

| File | Purpose |
|------|---------|
| **askclippy.py** | Knowledge Builder — reads seed-data.json, outputs structured snapshot |
| **chat.html** | Web chat interface — ask questions, get answers from the knowledge base |
| **knowledge/knowledge-snapshot.md** | Latest knowledge snapshot (human-readable markdown) |
| **knowledge/knowledge-snapshot.json** | Same data in programmatic JSON |

## Usage

### Build a knowledge snapshot
```bash
python askclippy.py --input ../security-tools-connectors/seed-data.json --output knowledge/
```

### Chat with your data
Open `chat.html` in a browser — it loads the knowledge snapshot and lets you ask questions like:
- "Which assets have critical KEV vulnerabilities?"
- "Show me health status of domain controllers"
- "Executive summary of our security posture"
- "Tell me about CVE-2026-10011"
- "What is our GPO compliance rate?"

### Scheduled refresh (daily cron)
```yaml
# Cron job to rebuild knowledge every morning
schedule: "0 6 * * *"
command: cd /c/Users/David/Desktop/askclippy && python askclippy.py --input ../security-tools-connectors/seed-data.json --output knowledge/
```

## Architecture
```
VM Tools (Tenable, Qualys, CrowdStrike, SCCM, etc.)
        │
        ▼
  Connector Scripts (pull_vulns.py, pull_assets.py, etc.)
        │
        ▼
  askclippy.py (Knowledge Builder)
        │
        ├──► knowledge-snapshot.json (programmatic)
        │
        └──► knowledge-snapshot.md (LLM-readable)
                │
                └──► chat.html (query interface)
                        │
                        ├── Local search (no API key needed)
                        └── AI-backed search (Claude Bedrock)
```

## Future
- Phase 2: Wire in Claude Bedrock API for smarter answers
- Phase 3: Auto-refresh on cron
- Phase 4: Integrate into the Security Tools API as `/v1/ask`
