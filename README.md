# AskClippy — Local Setup Guide

## What It Is
AskClippy is an offline-capable AI assistant for your infrastructure. It loads Tenable scan data (CSV/JSON), lets you ask questions in plain English, queue remediations, and comes with an animated Clippy mascot with 11 moods.

## Quick Start

### 1. Open the page
Two ways:

| Method | URL | AI features? |
|--------|-----|-------------|
| **GitHub Pages** | https://mrdchiang.github.io/askclippy/ | ❌ Keyword search only |
| **Local server** | http://localhost:8081/ | ✅ Full AI + remediation actions |

### 2. Start the local server
Double-click `C:\Users\David\Desktop\askclippy\serve.bat`

Or from terminal:
```
C:\Users\David\AppData\Roaming\uv\python\cpython-3.11-windows-x86_64-none\python.exe -m http.server 8081
```

### 3. Make sure Ollama is running
Open a terminal and run:
```
ollama serve
```

This starts the local AI engine on port 11434. Keep it running in the background.

### 4. Open in browser
Go to **http://localhost:8081/index.html**

## What You Can Ask
Click the example buttons, or type your own:
- "Executive summary of our security posture"
- "Which assets have critical KEV vulnerabilities?"
- "Remediate CVE-2026-12345" — queues a fix in RemFlow
- "What's pending in the remediation queue?"
- "Show me the health status of all domain controllers"
- "What is our GPO compliance rate?"

## How It All Connects

```
AskClippy (port 8081) → Ollama (port 11434) → phi3:mini model
                  ↘ localStorage bridge → ShieldView → RemFlow → TheValidator
```

AskClippy talks to Ollama locally (no internet needed). It also reads/writes to the same `security-tools:` localStorage keys used by ShieldView, RemFlow, and TheValidator — so telling it to "remediate CVE-2026-12345" actually queues it in the pipeline.

## Cross-Tool Pipeline
Open the Launchpad at **https://mrdchiang.github.io/launchpad/** (or local) to see the pipeline:
1. **ShieldView** finds vulnerabilities
2. **RemFlow** deploys fixes
3. **TheValidator** verifies endpoints
4. **AskClippy** answers questions and queues actions

## If Something Doesn't Work

### "Ollama error: Failed to fetch"
- Make sure `ollama serve` is running in a terminal window
- Restart it: kill the process, then run `ollama serve` again
- The `OLLAMA_ORIGINS=*` env var should already be set system-wide (was set with `setx`)

### No models installed
```
ollama pull phi3:mini
```
This downloads ~2.2GB. Only needs to be done once.

### Port 8081 already in use
Change to another port:
```
python -m http.server 8082
```
Then visit http://localhost:8082/index.html

### Page shows directory listing instead of the app
The server started in the wrong folder. Kill all Python processes on that port and restart from the `C:\Users\David\Desktop\askclippy` directory.

## File Locations
| Item | Path |
|------|------|
| Main app | `C:\Users\David\Desktop\askclippy\index.html` |
| Start script | `C:\Users\David\Desktop\askclippy\serve.bat` |
| Knowledge data | `C:\Users\David\Desktop\askclippy\knowledge-snapshot.md` |
| Ollama models | `~\.ollama\models\` |
| Ollama config | `~\.ollama\` |
| Git repo | `https://github.com/mrdchiang/askclippy` |
