/* =====================================================================
 * deplorphan — A/V LAYER COLLIDER (app.js)
 * Vanilla, zero-dep, stacked monitor engine.
 * =====================================================================
 * 
 * Doug & Brandon: Edit the LAYERS array below in git to add, remove,
 * or stack visuals. Everything renders bottom-to-top on the display screen.
 *
 * Layer Properties:
 *  - id:        (string) unique ID
 *  - type:      'video' | 'iframe' | 'image' | 'procedural'
 *  - src:       (string) file path (e.g. 'snippets/clip.mp4') or external URL
 *  - generator: (string) 'vitals' | 'testpattern' (only when type is 'procedural')
 *  - opacity:   (number) 0.0 to 1.0 (semi-transparency)
 *  - blendMode: (string) 'normal' | 'screen' | 'overlay' | 'difference' |
 *                        'exclusion' | 'multiply' | 'hard-light' | 'color-dodge'
 *  - filter:    (string) CSS filter (e.g. 'contrast(1.4) saturate(0.4) invert(0.2)')
 *  - glitch:    (boolean) subtle periodic tracking displacement
 *  - label:     (string) HUD identifier / camera tag
 *  - visible:   (boolean)
 *  - trim:      (object) video only — { start, end } seconds; loops just this
 *                        sub-range of the file (skips end-cards / dead tails)
 * =====================================================================
 */
'use strict';

// NOTE: ad-free policy — monetized YouTube embeds serve Google ads (Gemini
// promos etc.) inside their cross-origin iframe, where this page cannot touch
// them. All default layers are therefore native <video> files (type: 'video')
// hotlinked from Wikimedia Commons (CC / public-domain, direct files, zero
// ads). The iframe/YouTube path still works if you wire in a non-monetized
// feed; credits for the files below live in README.md.
const LAYERS = [
  {
    id: 'layer-live-jelly',
    type: 'video',
    // Wikimedia Commons · CC BY 2.0 · Jim G (jimg944) · Monterey Bay Aquarium
    // The clip's final seconds are a baked-in "Monterey Bay Aquarium / Sea
    // Nettles" title card — trim loops only the clean footage below it.
    src: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/9/94/Sea_Nettle_%28%22Chrysaora_Fuscescens%22%29%2C_Monterey_Bay_Aquarium.ogv/Sea_Nettle_%28%22Chrysaora_Fuscescens%22%29%2C_Monterey_Bay_Aquarium.ogv.480p.vp9.webm',
    trim: { start: 0, end: 54 },
    label: 'ARCHIVE 01 — PACIFIC SEA NETTLES [MONTEREY BAY AQUARIUM]',
    opacity: 0.55,
    blendMode: 'normal',
    filter: 'contrast(1.3) saturate(1.2) hue-rotate(10deg)',
    glitch: false,
    visible: true,
  },
  {
    id: 'layer-crystals',
    type: 'video',
    // Wikimedia Commons · CC BY 3.0 · Brandon Rasaka · phenyl salicylate crystallization
    // Final ~3s are a fade to dead black — trimmed so the layer never idles dark.
    src: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/1/10/Crystallization_of_Phenyl_Salicylate.webm/Crystallization_of_Phenyl_Salicylate.webm.480p.vp9.webm',
    trim: { start: 0, end: 321 },
    label: 'MICRO 02 — PHENYL SALICYLATE CRYSTAL GROWTH [POLARIZED MACRO]',
    opacity: 0.38,
    blendMode: 'screen',
    filter: 'contrast(1.35) saturate(1.1) brightness(0.9)',
    glitch: true,
    visible: true,
  },
  {
    id: 'layer-popcorn',
    type: 'video',
    // Wikimedia Commons · CC BY 4.0 · 驭龙飞车手 · old-fashioned fire popcorn machine
    src: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/2/2b/Equipment_debugging_of_old-fashioned_popcorn_machine.webm/Equipment_debugging_of_old-fashioned_popcorn_machine.webm.480p.vp9.webm',
    label: 'HEARTH 03 — OLD-FASHIONED FIRE POPCORN MACHINE [ROARING]',
    opacity: 0.30,
    blendMode: 'overlay',
    filter: 'contrast(1.3) saturate(0.4) hue-rotate(-20deg)',
    glitch: false,
    visible: true,
  },
  {
    id: 'layer-stingray',
    type: 'video',
    // Wikimedia Commons · CC BY-SA 2.0 · Ashwin Kumar · stingray gliding, Maldives
    src: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Stingray_in_Maldives.webm',
    label: 'MARKET 04 — STINGRAY GLIDE [MALDIVES SHALLOWS]',
    opacity: 0.24,
    blendMode: 'difference',
    filter: 'contrast(1.5) grayscale(0.8)',
    glitch: true,
    visible: true,
  },
  {
    id: 'layer-siphonophore',
    type: 'video',
    // Wikimedia Commons · CC BY 4.0 · Ifremer · ROV approach to hydrothermal vent
    src: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/1/1c/Arriv%C3%A9e_lente_vers_la_source_hydrothermale_Tour_Eiffel_%28Ifremer_00701-81288%29.webm/Arriv%C3%A9e_lente_vers_la_source_hydrothermale_Tour_Eiffel_%28Ifremer_00701-81288%29.webm.480p.vp9.webm',
    label: 'ABYSS 05 — HYDROTHERMAL VENT APPROACH [IFREMER ROV]',
    opacity: 0.38,
    blendMode: 'screen',
    filter: 'contrast(1.25) saturate(0.9) hue-rotate(15deg)',
    glitch: false,
    visible: true,
  },
  {
    id: 'layer-vitals',
    type: 'procedural',
    generator: 'vitals',
    label: 'BIOSIGNAL 06 — SURGICAL OSCILLOSCOPE [AUDIO-REACTIVE]',
    opacity: 0.75,
    blendMode: 'screen',
    filter: 'contrast(1.4) drop-shadow(0 0 4px #b6ff2e)',
    glitch: false,
    visible: true,
  },
  {
    id: 'layer-pattern',
    type: 'procedural',
    generator: 'testpattern',
    label: 'SCOPE 07 — CALIBRATION RETICLE',
    opacity: 0.16,
    blendMode: 'overlay',
    filter: 'contrast(1.2)',
    glitch: true,
    visible: true,
  },
];

function extractVideoId(url) {
  if (!url) return null;
  const ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|live)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
  return ytMatch ? ytMatch[1] : null;
}

function updateHudLayersCount() {
  const activeCount = LAYERS.filter(c => c.visible !== false && c.isVerifiedActive !== false).length;
  const layerInfoEl = document.getElementById('hud-layers-info');
  if (layerInfoEl) layerInfoEl.textContent = `LAYERS: ${activeCount} ACTIVE`;
}

// Helper to auto-format YouTube URLs (watch, share, live, or embed) into muted looping embeds with randomized start offsets
function formatEmbedUrl(url, randomize = true) {
  if (!url) return '';
  const vidId = extractVideoId(url);
  if (vidId) {
    const startParam = randomize ? `&start=${Math.floor(Math.random() * 240)}` : '';
    return `https://www.youtube-nocookie.com/embed/${vidId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${vidId}&playsinline=1&modestbranding=1&rel=0&iv_load_policy=3&enablejsapi=1${startParam}`;
  }
  return url;
}

// ——— 1. LAYER STAGE BUILDER ———
const stage = document.getElementById('stage');
const proceduralDrawers = [];

function buildStage() {
  stage.innerHTML = '';
  proceduralDrawers.length = 0;

  LAYERS.forEach((cfg) => {
    if (cfg.visible === false) return;

    cfg.baseOpacity = cfg.opacity !== undefined ? cfg.opacity : 1.0;
    cfg.isVerifiedActive = true;

    const layerEl = document.createElement('div');
    layerEl.className = 'layer';
    layerEl.id = `el-${cfg.id}`;
    layerEl.style.opacity = cfg.baseOpacity;
    layerEl.style.mixBlendMode = cfg.blendMode || 'normal';
    if (cfg.filter) layerEl.style.filter = cfg.filter;
    if (cfg.glitch) layerEl.classList.add('layer-glitch');

    if (cfg.type === 'video') {
      if (cfg.src) {
        const v = document.createElement('video');
        v.autoplay = true;
        v.loop = true;
        v.muted = true;
        v.playsInline = true;
        v.preload = 'auto';
        v.src = cfg.src;
        // trim: { start, end } loops only a sub-range of the file (e.g. to
        // skip a baked-in end-card). Media-fragment #t= URLs are NOT enough —
        // browsers ignore the fragment end bound once you seek — so the range
        // is enforced on timeupdate here instead.
        const trim = cfg.trim || null;
        const rangeEnd = () =>
          trim ? Math.min(trim.end, v.duration || trim.end) : v.duration;
        // Random start offset: layer timelines drift against each other, so
        // the composite never aligns the same way twice.
        v.addEventListener('loadedmetadata', () => {
          if (v.duration && isFinite(v.duration)) {
            const start = trim ? trim.start : 0;
            v.currentTime = start + Math.random() * Math.max(0.1, (rangeEnd() - start) * 0.8);
          }
        }, { once: true });
        if (trim) {
          v.addEventListener('timeupdate', () => {
            if (v.currentTime >= trim.end - 0.05) v.currentTime = trim.start;
          });
        }
        v.onerror = () => {
          cfg.isVerifiedActive = false;
          layerEl.style.display = 'none';
          updateHudLayersCount();
        };
        layerEl.appendChild(v);
      }
    } else if (cfg.type === 'iframe') {
      if (cfg.src) {
        const f = document.createElement('iframe');
        f.id = `frame-${cfg.id}`;
        f.referrerPolicy = 'strict-origin-when-cross-origin';
        f.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
        f.src = formatEmbedUrl(cfg.src, !cfg.isLive);
        f.title = cfg.label || cfg.id;
        layerEl.appendChild(f);
      }
    } else if (cfg.type === 'procedural') {
      const pCanvas = document.createElement('canvas');
      pCanvas.className = 'procedural-canvas';
      layerEl.appendChild(pCanvas);
      proceduralDrawers.push({
        canvas: pCanvas,
        ctx: pCanvas.getContext('2d'),
        generator: cfg.generator,
      });
    }

    stage.appendChild(layerEl);
  });

  updateHudLayersCount();
}

function attachYouTubeErrorHandlers() {
  if (!window.YT || !window.YT.Player) return;
  LAYERS.forEach((cfg) => {
    if (cfg.visible === false || cfg.type !== 'iframe') return;
    const frameId = `frame-${cfg.id}`;
    const frameEl = document.getElementById(frameId);
    if (!frameEl) return;

    try {
      new YT.Player(frameId, {
        events: {
          onError: (e) => {
            console.warn(`Layer ${cfg.id} signal dropped (code ${e.data})`);
            cfg.isVerifiedActive = false;
            const layerEl = document.getElementById(`el-${cfg.id}`);
            if (layerEl) {
              layerEl.innerHTML = '';
              layerEl.appendChild(makeBrokenSignal(cfg.label, 'NO SIGNAL · FEED DROPPED'));
              layerEl.style.opacity = '0.35';
            }
            updateHudLayersCount();
          }
        }
      });
    } catch (_) {}
  });
}

function makeBrokenSignal(label, detail) {
  const wrap = document.createElement('div');
  wrap.className = 'broken-signal';
  wrap.innerHTML = `
    <div class="reticle">
      <div class="reticle-corner tl"></div>
      <div class="reticle-corner tr"></div>
      <div class="reticle-corner bl"></div>
      <div class="reticle-corner br"></div>
    </div>
    <div class="broken-tag">${label || 'CH-VOID'}</div>
    <div class="broken-status">${detail || 'OFFLINE'}</div>
  `;
  return wrap;
}

// ——— 2. PROCEDURAL GENERATORS (Vitals ECG & Analog Reticle Pattern) ———
function resizeProcedurals(w, h) {
  proceduralDrawers.forEach(({ canvas }) => {
    canvas.width = w;
    canvas.height = h;
  });
}

let ecgX = 0;
let lastEcgY = 0;
function drawVitals(ctx, w, h, t, audioStats, timeData) {
  // Faint phosphor decay trail
  ctx.fillStyle = 'rgba(2, 4, 3, 0.06)';
  ctx.fillRect(0, 0, w, h);

  // Subtle grid
  if (t % 150 === 0) {
    ctx.strokeStyle = 'rgba(182, 255, 46, 0.03)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 0; x < w; x += 48) { ctx.moveTo(x, 0); ctx.lineTo(x, h); }
    for (let y = 0; y < h; y += 48) { ctx.moveTo(0, y); ctx.lineTo(w, y); }
    ctx.stroke();
  }

  // ECG Heartbeat line
  const speed = 3;
  const nextX = (ecgX + speed) % w;
  const centerY = h * 0.5;

  let wave = Math.sin(t * 0.06) * 3;

  // Real-time audio wave rippling through the line
  if (timeData && timeData.length > 0 && audioStats.totalEnergy > 0.02) {
    const sampleIdx = Math.floor((ecgX / w) * (timeData.length - 1));
    const audioSample = ((timeData[sampleIdx] - 128) / 128);
    // Lower frequencies produce larger, heavier undulations
    const waveScale = h * (0.12 + audioStats.lowEnergy * 0.22 + audioStats.totalEnergy * 0.1);
    wave += audioSample * waveScale;
  }

  const cycle = (ecgX / w) * 5 % 1;
  if (cycle > 0.45 && cycle < 0.55) {
    const spike = Math.sin((cycle - 0.45) * 10 * Math.PI);
    wave = -spike * (h * 0.22 + audioStats.lowEnergy * 80 + audioStats.totalEnergy * 40);
  } else if (cycle > 0.55 && cycle < 0.62) {
    const rebound = Math.sin((cycle - 0.55) * 14 * Math.PI);
    wave = rebound * (h * 0.09 + audioStats.lowEnergy * 35);
  }

  // Cursor slice ahead
  ctx.fillStyle = '#020403';
  ctx.fillRect(nextX, 0, 14, h);

  const nextY = centerY + wave + (Math.random() - 0.5) * (2 + audioStats.lowEnergy * 4);

  const glowBlur = 4 + Math.round(audioStats.lowEnergy * 10 + audioStats.totalEnergy * 6);
  ctx.strokeStyle = `rgba(182, 255, 46, ${0.75 + audioStats.totalEnergy * 0.25})`;
  ctx.lineWidth = 1.3 + audioStats.lowEnergy * 1.2;
  ctx.shadowColor = '#b6ff2e';
  ctx.shadowBlur = glowBlur;
  ctx.beginPath();
  ctx.moveTo(ecgX, lastEcgY || centerY);
  ctx.lineTo(nextX, nextY);
  ctx.stroke();
  ctx.shadowBlur = 0;

  ecgX = nextX;
  lastEcgY = nextY;
}

function drawTestPattern(ctx, w, h, t, audioStats) {
  // Atmospheric, low-contrast grayscale calibration bands
  const bands = 7;
  const barW = w / bands;
  const bassBoost = audioStats ? audioStats.lowEnergy * 18 : 0;
  for (let i = 0; i < bands; i++) {
    const lum = Math.floor(12 + (i / bands) * 40 + bassBoost);
    ctx.fillStyle = `rgb(${lum}, ${lum + 2}, ${lum + 4})`;
    ctx.fillRect(i * barW, 0, barW, h);
  }

  // Minimal circular oscilloscope ring / crosshair pulsing with bass
  const cx = w * 0.5, cy = h * 0.5;
  const rPulse = Math.min(w, h) * (0.3 + (audioStats ? audioStats.lowEnergy * 0.035 : 0));
  const ringAlpha = 0.05 + (audioStats ? audioStats.totalEnergy * 0.09 : 0);
  ctx.strokeStyle = `rgba(255, 255, 255, ${ringAlpha.toFixed(3)})`;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(cx, cy, rPulse, 0, Math.PI * 2);
  ctx.arc(cx, cy, rPulse * 0.5, 0, Math.PI * 2);
  ctx.moveTo(cx - rPulse - 20, cy); ctx.lineTo(cx + rPulse + 20, cy);
  ctx.moveTo(cx, cy - rPulse - 20); ctx.lineTo(cx, cy + rPulse + 20);
  ctx.stroke();

  // Subtle analog scan jitter - amplified by low-frequency rumble
  const jitterChance = 0.06 + (audioStats ? audioStats.lowEnergy * 0.35 : 0);
  if (Math.random() < jitterChance) {
    const jy = Math.random() * h;
    const jh = 4 + Math.random() * (16 + (audioStats ? audioStats.lowEnergy * 24 : 0));
    const jx = (Math.random() - 0.5) * (12 + (audioStats ? audioStats.lowEnergy * 20 : 0));
    ctx.drawImage(ctx.canvas, 0, jy, w, jh, jx, jy, w, jh);
  }
}

// ——— 3. TV STATIC CANVAS ENGINE (Preserved & Enhanced) ———
const canvas = document.getElementById('viz');
const ctx = canvas.getContext('2d');
const crtGlow = document.querySelector('.crt-glow');
const hudFreq = document.getElementById('hud-freq');
let staticPercent = parseFloat(document.getElementById('rng-static').value);
let glitchAmt = parseFloat(document.getElementById('rng-glitch').value);
let showScanlines = true;
let showHud = true;
let analyserNode = null;
let freqData = null;
let timeData = null;

// Use chunky retro pixel grain resolution for authentic CRT look & ultra-fast rendering
const GRAIN_SCALE = 2;

function sizeCanvas() {
  const r = canvas.getBoundingClientRect();
  const w = Math.max(320, Math.floor(r.width));
  const h = Math.max(240, Math.floor(r.height));
  canvas.width = Math.floor(w / GRAIN_SCALE);
  canvas.height = Math.floor(h / GRAIN_SCALE);
  resizeProcedurals(w, h);
}
window.addEventListener('resize', sizeCanvas);

let t = 0;
function draw() {
  t += 1;
  const w = canvas.width;
  const h = canvas.height;
  if (w <= 0 || h <= 0) {
    requestAnimationFrame(draw);
    return;
  }

  // Audio multi-band frequency and waveform analysis
  let lowEnergy = 0;
  let midEnergy = 0;
  let highEnergy = 0;
  let totalEnergy = 0;

  if (analyserNode && freqData && timeData && actx && actx.state === 'running') {
    analyserNode.getByteFrequencyData(freqData);
    analyserNode.getByteTimeDomainData(timeData);

    // Sub-bass / low rumble (approx 60Hz - 380Hz, bins 1 to 4 with fftSize 512)
    let lowSum = 0;
    for (let i = 1; i <= 4; i++) lowSum += freqData[i] || 0;
    lowEnergy = lowSum / (4 * 255);

    // Mids (approx 380Hz - 2kHz, bins 5 to 22)
    let midSum = 0;
    for (let i = 5; i <= 22; i++) midSum += freqData[i] || 0;
    midEnergy = midSum / (18 * 255);

    // Highs (approx 2kHz - 8kHz, bins 23 to 85)
    let highSum = 0;
    for (let i = 23; i <= 85; i++) highSum += freqData[i] || 0;
    highEnergy = highSum / (63 * 255);

    // Total spectrum energy
    let totalSum = 0;
    for (let i = 1; i < 90; i++) totalSum += freqData[i] || 0;
    totalEnergy = totalSum / (89 * 255);
  }
  const audioStats = { lowEnergy, midEnergy, highEnergy, totalEnergy };

  // 1. SUB-BASS CRT CHASSIS VIBRATION & RASTER BREATHING
  if (stage) {
    if (lowEnergy > 0.035) {
      const shakeX = (Math.random() - 0.5) * lowEnergy * 5.5;
      const shakeY = (Math.random() - 0.5) * lowEnergy * 3.5;
      const bloom = 1 + lowEnergy * 0.015;
      stage.style.transform = `translate3d(${shakeX.toFixed(1)}px, ${shakeY.toFixed(1)}px, 0) scale(${bloom.toFixed(3)})`;
    } else {
      stage.style.transform = '';
    }
  }

  // 2. CRT PHOSPHOR GLOW BLOOM WITH BASS ENERGY
  if (crtGlow) {
    const innerDark = Math.max(48, Math.floor(80 - lowEnergy * 32));
    const bloomRadius = Math.floor(16 + lowEnergy * 50);
    const greenAlpha = (0.04 + lowEnergy * 0.16 + totalEnergy * 0.06).toFixed(3);
    crtGlow.style.boxShadow = `inset 0 0 ${innerDark}px rgba(0,0,0,0.88), inset 0 0 ${bloomRadius}px rgba(182, 255, 46, ${greenAlpha})`;
  }

  // 3. ORGANIC LAYER RESPIRATION (Non-repeating living installation drift)
  LAYERS.forEach((cfg, idx) => {
    if (!cfg.visible) return;
    const el = document.getElementById(`el-${cfg.id}`);
    if (el && cfg.baseOpacity !== undefined && cfg.isVerifiedActive !== false) {
      // Incommensurate sinusoidal breathing phases (periods: ~45s - ~90s)
      const phase = idx * 1.618;
      const breath = Math.sin(t * 0.0035 + phase) * 0.12;
      const dynOpacity = Math.max(0.08, Math.min(1.0, cfg.baseOpacity + breath + audioStats.lowEnergy * 0.08));
      el.style.opacity = dynOpacity.toFixed(2);
    }
  });

  // 4. DRAW PROCEDURAL LAYERS
  proceduralDrawers.forEach(({ ctx: pCtx, canvas: pCanvas, generator }) => {
    if (generator === 'vitals') {
      drawVitals(pCtx, pCanvas.width, pCanvas.height, t, audioStats, timeData);
    } else if (generator === 'testpattern') {
      drawTestPattern(pCtx, pCanvas.width, pCanvas.height, t, audioStats);
    }
  });

  // 4. TV STATIC NOISE GENERATION (Audio-Modulated)
  const img = ctx.createImageData(w, h);
  const d = img.data;
  const staticRatio = staticPercent / 100;
  const density = 0.07 + glitchAmt * 0.35 + totalEnergy * 0.35 + (highEnergy * 0.15);
  const baseAlpha = Math.floor(staticRatio * 255);

  // Slow-moving analog ground-loop hum bar (prominent during low frequencies)
  const humBarY = (t * 1.5) % h;
  const humBandHeight = h * 0.35;

  for (let y = 0; y < h; y++) {
    // Hum modulation based on vertical proximity to humBarY
    const distToHum = Math.abs(y - humBarY);
    const humMod = (distToHum < humBandHeight) ? (1 - distToHum / humBandHeight) * lowEnergy * 0.4 : 0;
    const rowDensity = density + humMod;

    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const n = Math.random();
      const v = (n < rowDensity) ? Math.random() * 255 : 4 + Math.random() * 20;

      // Color tints: low frequencies warm into phosphor acid green/amber, highs add cold blue
      d[i] = v * (0.8 + glitchAmt * 0.5 + lowEnergy * 0.4);       // Red
      d[i + 1] = v * (0.85 + lowEnergy * 0.55 + totalEnergy * 0.2); // Green (phosphor)
      d[i + 2] = v * (1.0 + highEnergy * 0.5);                    // Blue

      // Semi-transparent alpha so underlying visual layers show through, pulsing with audio
      const alphaVal = (v > 30) ? baseAlpha : Math.floor(baseAlpha * (0.28 + lowEnergy * 0.25));
      d[i + 3] = Math.min(255, alphaVal);
    }
  }
  ctx.putImageData(img, 0, 0);

  // 5. HORIZONTAL SYNC TEAR (Glitch + Bass Spikes)
  const tearChance = glitchAmt * 0.25 + (lowEnergy > 0.4 ? 0.16 : 0);
  if (Math.random() < tearChance) {
    const y = Math.random() * h;
    const hh = 3 + Math.random() * (18 + lowEnergy * 24);
    const dx = (Math.random() - 0.5) * (60 * glitchAmt + lowEnergy * 60);
    ctx.drawImage(canvas, 0, y, w, hh, dx, y, w, hh);
    ctx.fillStyle = `rgba(255, 46, 77, ${(0.14 + lowEnergy * 0.16).toFixed(2)})`;
    ctx.fillRect(0, y, w, hh);
  }

  // 6. MOVING TRACKING SCAN BAR
  if (t % 180 < 60) {
    const barY = ((t * 3) % h);
    ctx.fillStyle = `rgba(255, 255, 255, ${(0.06 + lowEnergy * 0.08).toFixed(2)})`;
    ctx.fillRect(0, barY, w, 8);
  }

  // 7. RESPONSIVE HUD FREQ / VU TELEMETRY
  if (hudFreq) {
    const filterVal = document.getElementById('rng-filter').value;
    if (actx && actx.state === 'running' && totalEnergy > 0.01) {
      const barsCount = 6;
      const filled = Math.min(barsCount, Math.round(totalEnergy * 9));
      const meter = '▮'.repeat(filled) + '▯'.repeat(Math.max(0, barsCount - filled));
      const subTag = (lowEnergy > 0.35) ? ' [SUB-HUM]' : '';
      hudFreq.textContent = `FREQ: ${filterVal}Hz · SIG: ${meter}${subTag}`;
    } else {
      hudFreq.textContent = `FREQ: ${filterVal}Hz`;
    }
  }

  requestAnimationFrame(draw);
}

// Running timecode for surveillance tape effect: HH:MM:SS:FF
const timecodeEl = document.getElementById('hud-time');
function updateTimecode() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  const f = String(Math.floor((now.getMilliseconds() / 1000) * 30)).padStart(2, '0');
  if (timecodeEl) timecodeEl.textContent = `${h}:${m}:${s}:${f}`;
  requestAnimationFrame(updateTimecode);
}
requestAnimationFrame(updateTimecode);

// ——— 4. GLITCH BURST ———
function glitchBurst() {
  document.body.classList.remove('glitch-all');
  void document.body.offsetWidth; // re-trigger animation
  document.body.classList.add('glitch-all');
  setTimeout(() => document.body.classList.remove('glitch-all'), 400);

  // momentarily surge static density
  const prevGlitch = glitchAmt;
  glitchAmt = 1.0;
  setTimeout(() => {
    glitchAmt = prevGlitch;
  }, 350);
}
document.getElementById('btn-glitch').onclick = glitchBurst;

// ——— 5. WEB AUDIO NOISE SKELETON (Preserved) ———
let actx = null, noiseSrc = null, filterNode = null, gainNode = null, analyser = null;
let muted = false;

function buildAudioGraph() {
  actx = new (window.AudioContext || window.webkitAudioContext)();
  const len = actx.sampleRate * 2;
  const buf = actx.createBuffer(1, len, actx.sampleRate);
  const ch = buf.getChannelData(0);
  for (let i = 0; i < len; i++) ch[i] = Math.random() * 2 - 1;

  noiseSrc = actx.createBufferSource();
  noiseSrc.buffer = buf;
  noiseSrc.loop = true;

  filterNode = actx.createBiquadFilter();
  filterNode.type = 'bandpass';
  filterNode.frequency.value = parseFloat(document.getElementById('rng-filter').value);
  filterNode.Q.value = 1.35; // Rich resonant character for low filter sweeps

  gainNode = actx.createGain();
  gainNode.gain.value = parseFloat(document.getElementById('rng-gain').value);

  analyser = actx.createAnalyser();
  analyser.fftSize = 512;
  analyser.smoothingTimeConstant = 0.72;
  freqData = new Uint8Array(analyser.frequencyBinCount);
  timeData = new Uint8Array(analyser.fftSize);
  analyserNode = analyser;

  noiseSrc.connect(filterNode).connect(gainNode).connect(analyser).connect(actx.destination);
  noiseSrc.start();
}

const btnAudio = document.getElementById('btn-audio');
btnAudio.onclick = async () => {
  if (!actx) {
    buildAudioGraph();
    await actx.resume();
    btnAudio.textContent = '⏸ stop noise';
  } else if (actx.state === 'running') {
    await actx.suspend();
    btnAudio.textContent = '▶ start noise';
  } else {
    await actx.resume();
    btnAudio.textContent = '⏸ stop noise';
  }
};

// Controls input listeners
document.getElementById('rng-static').oninput = (e) => {
  staticPercent = +e.target.value;
  document.getElementById('val-static').textContent = e.target.value;
};
document.getElementById('rng-glitch').oninput = (e) => {
  glitchAmt = +e.target.value;
  document.getElementById('val-glitch').textContent = e.target.value;
};
document.getElementById('rng-filter').oninput = (e) => {
  const val = e.target.value;
  document.getElementById('val-filter').textContent = val;
  const freqEl = document.getElementById('hud-freq');
  if (freqEl) freqEl.textContent = `FREQ: ${val}Hz`;
  if (filterNode && actx) filterNode.frequency.setTargetAtTime(+val, actx.currentTime, 0.02);
};
document.getElementById('rng-gain').oninput = (e) => {
  document.getElementById('val-gain').textContent = e.target.value;
  if (gainNode && actx) gainNode.gain.setTargetAtTime(muted ? 0 : +e.target.value, actx.currentTime, 0.02);
};
document.getElementById('chk-scanlines').onchange = (e) => {
  showScanlines = e.target.checked;
  const el = document.getElementById('scanline-overlay');
  if (el) el.style.display = showScanlines ? 'block' : 'none';
};
document.getElementById('chk-hud').onchange = (e) => {
  showHud = e.target.checked;
  const el = document.getElementById('hud');
  if (el) el.style.display = showHud ? 'flex' : 'none';
};

// Hotkeys & Fullscreen
window.addEventListener('keydown', (e) => {
  if (e.target.tagName === 'INPUT') return;
  if (e.key === 'g' || e.key === 'G') glitchBurst();
  if (e.key === 'm' || e.key === 'M') {
    muted = !muted;
    if (gainNode && actx) gainNode.gain.setTargetAtTime(muted ? 0 : +document.getElementById('rng-gain').value, actx.currentTime, 0.02);
  }
  if (e.key === 'f' || e.key === 'F') {
    if (!document.fullscreenElement) {
      document.getElementById('monitor-frame').requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }
});
document.getElementById('btn-fullscreen').onclick = () => {
  if (!document.fullscreenElement) {
    document.getElementById('monitor-frame').requestFullscreen?.();
  } else {
    document.exitFullscreen?.();
  }
};

// Build stage immediately — zero blank screen delay
buildStage();

// The YouTube IFrame API is only pulled in when an iframe layer is actually
// in use; an all-native-video stack makes zero requests to YouTube.
window.onYouTubeIframeAPIReady = function() {
  attachYouTubeErrorHandlers();
};

if (LAYERS.some(c => c.type === 'iframe' && c.visible !== false)) {
  const ytScript = document.createElement('script');
  ytScript.src = 'https://www.youtube.com/iframe_api';
  document.head.appendChild(ytScript);
} else if (window.YT && window.YT.Player) {
  attachYouTubeErrorHandlers();
}

sizeCanvas();
requestAnimationFrame(draw);
