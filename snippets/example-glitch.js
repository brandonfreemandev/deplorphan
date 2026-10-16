// example glitch snippet — paste into app.js or extend freely.
// usage: GlitchSnippet.strobe(document.querySelectorAll('.feed'));
export const GlitchSnippet = {
  strobe(els, ms = 120) {
    return setInterval(() => {
      const el = els[Math.floor(Math.random() * els.length)];
      if (!el) return;
      el.classList.add('glitching');
      setTimeout(() => el.classList.remove('glitching'), ms);
    }, ms * 3);
  },
};
