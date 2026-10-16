# AGENTS.md — A/V junk drawer rules (there are almost none)

Vanilla HTML/JS/CSS only. No build, no deps, no framework. Keep it under ~50KB total if you can.

- Visuals: edit the `LAYERS` array in `app.js` to stack video, iframes, images, or procedural generators.
- Stack layers bottom-to-top with `opacity`, `blendMode`, and `filter`. Broken / offline feeds are part of the aesthetic ("NO SIGNAL").
- Keep the TV static canvas layer and Web Audio noise engine centered on the main display monitor.
- Toss snippets or media files in `snippets/` and wire them into `LAYERS`.
- Zero-cost only: static host (Cloudflare Pages / Netlify), no servers, no paid APIs, no SaaS AI bills.
- Local models only for agent work: default `ollama/qwen2.5-coder:7b` (see `opencode.json`). Requires `ollama serve` + `ollama pull qwen2.5-coder:7b` on the machine.
- Non-interactive: `opencode run "do the thing"` works with the local model, no subscription needed.
- Deploy: push to main → Pages/Netlify auto-deploys. Or `wrangler pages deploy . --project-name deplorphan`.
