# AskClippy Voice Setup Guide

## Overview
AskClippy runs on your local machine and serves as an AI assistant for your infrastructure. This guide adds **voice output** — AskClippy reads answers aloud on Telegram via Hermes TTS.

The flow works like this:

```
You: "Executive summary?" → AskClippy (phi3:mini) → Answer → Hermes TTS → Telegram voice message
```

## Prerequisites
- AskClippy running locally (see README.md)
- Ollama running with phi3:mini
- Hermes connected to Telegram
- TTS provider configured in Hermes (Edge TTS works by default — no API key needed)

## How It Works (the concept)

Instead of you opening AskClippy in a browser to ask questions, this setup lets you ask through **Hermes on Telegram**, and Hermes queries AskClippy's AI backend, then reads the answer aloud.

There are two approaches:

---

### Option A: Hermes queries AskClippy directly (simplest)

When you ask a security question in this Hermes chat, I can:

1. Call the local Ollama API directly (`http://localhost:11434/api/generate`)
2. Get the AI answer
3. Hand it off as TTS audio to Telegram

**Try it now:** Ask me a security question and I'll answer with voice.

Example:
> "What's our security posture?"
> "Remediate CVE-2026-12345"

I'll query Ollama (same model AskClippy uses) and send the response as a voice message.

---

### Option B: Cron job for daily voice briefing

Set up a daily cron job that:
1. Reads the localStorage bridge (via the security-tools API if running, or mock data)
2. Summarizes the state of your security tools
3. Sends a voice briefing to your Telegram

**To enable:** 
```
/cron create "0 8 * * *" "Give me a 60-second voice security briefing for today"
```

---

### Option C: Full AskClippy bridge via Hermes

For the full AskClippy experience through Telegram, set up a `/handoff telegram` workflow where:
1. You ask a question here
2. I forward it to AskClippy's Ollama backend
3. I return the answer as TTS audio

This is already available — just ask a security question and I'll respond with voice.

---

## TTS Configuration

Hermes uses **Edge TTS** by default — free, no API key, natural-sounding voices.

To check your current TTS setup:
```
/voice on
```

To change the voice:
```
hermes config set tts.provider edge
```

Available providers:
| Provider | Free? | API Key Needed |
|----------|-------|---------------|
| Edge TTS | ✅ Free | None |
| ElevenLabs | ⚠️ Free tier | `ELEVENLABS_API_KEY` |
| OpenAI | ❌ Paid | `VOICE_TOOLS_OPENAI_KEY` |
| MiniMax | ❌ Paid | `MINIMAX_API_KEY` |

---

## Quick Test

Say:
> /voice on

Then ask:
> "Give me an executive summary of our security posture"

I'll query the local Ollama AI and respond with a voice message.
