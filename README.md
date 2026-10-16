# deplorphan — A/V layer collider

Ultra-low-overhead, zero-cost experimental web art. Tastefully creepy, glitchy CRT monitor with stacked semi-transparent and broken visibility visual layers.

**Live:** https://brandonfreemandev.github.io/deplorphan/

Doug McKinney (Lawrence, KS) + Brandon Freeman (Port Ludlow, WA).

## Run it (pick one)

```bash
# zero-dep static server (built into macOS)
python3 -m http.server 8080
# → http://localhost:8080

# or
npx serve .
```

No build, no npm install. Open `index.html` directly also works.

## What's inside

- `index.html` — CRT surveillance monitor frame, stacked layer canvas viewport, audio + glitch controls, OSD HUD
- `styles.css` — CRT scanlines, tracking roll, phosphor glow, blend-modes, slice-tear animations
- `app.js` — Three engines:
  1. `LAYERS` array → stacked semi-transparent / broken visibility layers (`video`, `iframe`, `image`, `procedural`)
  2. TV static noise canvas engine → analog CRT snow, slice tearing, audio-reactive grain modulation
  3. Web Audio noise generator → white noise buffer, biquad bandpass filter, gain, analyser
- `snippets/` — drop video loops, glitch shaders, or code snippets here to wire into `LAYERS`

## Stacking Visuals (Git-Driven)

Edit the `LAYERS` array in `app.js`. Layers stack bottom-to-top:

```javascript
{
  id: 'my-layer',
  type: 'video', // 'video' | 'iframe' | 'image' | 'procedural'
  src: 'snippets/my-clip.mp4',
  opacity: 0.65,
  blendMode: 'screen', // 'screen' | 'difference' | 'overlay' | 'exclusion'
  filter: 'contrast(1.4) saturate(0.5)',
  glitch: true,
  visible: true,
}
```

## Deploy (free static, instant on push)

- Option A — GitHub Pages (live now): push to `main` auto-deploys to the live URL above.
- Option B — one-shot CLI: `wrangler pages deploy . --project-name deplorphan`
- Option C — Netlify Drop / Git: drag the folder or connect the repo, no build command.

## Feed credits (ad-free video sources)

Monetized YouTube embeds inject ads (Gemini promos, etc.) that a host page cannot remove, so the default stack plays direct video files from Wikimedia Commons instead — native `<video>` elements never carry ads. Full list with authors and licenses on each file's Commons page:

- **Pacific sea nettles, Monterey Bay Aquarium** — Jim G (jimg944), CC BY 2.0
- **Phenyl salicylate crystallization** — Brandon Rasaka, CC BY 3.0
- **Old-fashioned fire popcorn machine** — 驭龙飞车手, CC BY 4.0
- **Stingray gliding, Maldives** — Ashwin Kumar, CC BY-SA 2.0
- **Hydrothermal vent ROV approach** — Ifremer, CC BY 4.0

To swap a feed, replace the `src` of a `type: 'video'` layer with any direct `.webm`/`.mp4` URL (Commons and archive.org are reliable, hotlinkable, and free). Self-hosted loops in `snippets/` work the same way and make the installation fully independent of remote hosts.

## Local agent config (no subscription)

`opencode.json` points at local Ollama by default:

```bash
ollama serve
ollama pull qwen2.5-coder:7b
opencode run "add a blood-red pulse to the vitals layer"
```
