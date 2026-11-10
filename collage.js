// Colagem: desenha os adesivos de ferramenta e os pontos que fogem do mouse no hero.
(() => {
const TOOLS = {
  claude: { tip: 'Claude Code', bg: '#D97757', html: '<svg viewBox="0 0 24 24"><g stroke="#fff" stroke-width="2.6" stroke-linecap="round"><path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9 4.9 19.1"/></g></svg>' },
  vscode: { tip: 'VS Code', bg: '#1F6FB2', html: '<span style="color:#fff;font-family:JetBrains Mono">&lt;/&gt;</span>' },
  antigravity: { tip: 'Antigravity', bg: '#111', html: '<svg viewBox="0 0 24 24"><path d="M3 20 12 4l9 16" fill="none" stroke="#fff" stroke-width="2.6" stroke-linejoin="round"/><circle cx="12" cy="15" r="2.4" fill="#4C8BF5"/></svg>' },
  figma: { tip: 'Figma', bg: '#fff', html: '<svg viewBox="0 0 38 57"><path fill="#F24E1E" d="M19 0H9.5a9.5 9.5 0 0 0 0 19H19z"/><path fill="#FF7262" d="M19 0h9.5a9.5 9.5 0 0 1 0 19H19z"/><path fill="#A259FF" d="M19 19H9.5a9.5 9.5 0 0 0 0 19H19z"/><circle fill="#1ABCFE" cx="28.5" cy="28.5" r="9.5"/><path fill="#0ACF83" d="M9.5 38H19v9.5a9.5 9.5 0 1 1-9.5-9.5z"/></svg>' },
  ps: { tip: 'Photoshop', bg: '#001E36', html: '<span style="color:#31A8FF">Ps</span>' },
  ai: { tip: 'Illustrator', bg: '#330000', html: '<span style="color:#FF9A00">Ai</span>' },
  excel: { tip: 'Excel', bg: '#107C41', html: '<span style="color:#fff">X</span>' },
  jira: { tip: 'Jira', bg: '#0052CC', html: '<svg viewBox="0 0 24 24"><path d="M12 3 21 12 12 21 3 12z" fill="none" stroke="#fff" stroke-width="2.6" stroke-linejoin="round"/><path d="M12 8.5 15.5 12 12 15.5 8.5 12z" fill="#fff"/></svg>' },
  github: { tip: 'GitHub', bg: '#181717', html: '<svg viewBox="0 0 24 24"><g fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"><circle cx="6" cy="5" r="2.2"/><circle cx="6" cy="19" r="2.2"/><circle cx="18" cy="8" r="2.2"/><path d="M6 7.2v9.6M18 10.2c0 4-6 3-11 6.6"/></g></svg>' },
  sketch: { tip: 'Sketch', bg: '#fff', html: '<svg viewBox="0 0 24 24"><path d="M6 3h12l4 6-10 12L2 9z" fill="#FDB300"/><path d="M2 9h20L12 21z" fill="#EA6C00"/><path d="M6.5 9 12 21 17.5 9z" fill="#FDAD00"/><path d="M6 3 6.5 9 12 3l5.5 6L18 3z" fill="#FEEEB7" opacity=".7"/></svg>' },
  miro: { tip: 'Miro', bg: '#FFD02F', html: '<svg viewBox="0 0 24 24"><path d="M5 19 9 5M10 19l4-14M15 19l4-14" stroke="#050038" stroke-width="2.6" stroke-linecap="round"/></svg>' },
  trello: { tip: 'Trello', bg: '#0079BF', html: '<svg viewBox="0 0 24 24"><rect x="2.5" y="2.5" width="19" height="19" rx="3.5" fill="none" stroke="#fff" stroke-width="1.6"/><rect x="5.5" y="5.5" width="5.5" height="12" rx="1.3" fill="#fff"/><rect x="13" y="5.5" width="5.5" height="7.5" rx="1.3" fill="#fff"/></svg>' },
  confluence: { tip: 'Confluence', bg: '#1868DB', html: '<svg viewBox="0 0 24 24"><g fill="none" stroke="#fff" stroke-width="2.8" stroke-linecap="round"><path d="M3 17c4-6 8-6 13-3.5l4 2"/><path d="M21 7c-4 6-8 6-13 3.5l-4-2"/></g></svg>' },
  metabase: { tip: 'Metabase', bg: '#509EE3', html: '<svg viewBox="0 0 24 24" fill="#fff"><circle cx="5" cy="5" r="1.9"/><circle cx="5" cy="10" r="1.9"/><circle cx="5" cy="15" r="1.9"/><circle cx="5" cy="20" r="1.9"/><circle cx="10" cy="10" r="1.9"/><circle cx="12" cy="5" r="1.9" opacity=".45"/><circle cx="14" cy="15" r="1.9"/><circle cx="19" cy="5" r="1.9"/><circle cx="19" cy="10" r="1.9"/><circle cx="19" cy="15" r="1.9"/><circle cx="19" cy="20" r="1.9"/><circle cx="12" cy="20" r="1.9" opacity=".45"/></svg>' },
  js: { tip: 'JavaScript', bg: '#F7DF1E', html: '<span style="color:#17191E;align-self:end;justify-self:end;margin:0 12% 10% 0;font-size:.85em">JS</span>' },
  html: { tip: 'HTML5', bg: '#E34F26', html: '<svg viewBox="0 0 24 24"><path d="M4 2h16l-1.5 17L12 22l-6.5-3z" fill="#fff" opacity=".25"/><path d="M15.6 7H8.3l.3 3.3h6.7l-.5 5.4L12 16.6l-2.8-.9-.2-2" fill="none" stroke="#fff" stroke-width="2" stroke-linejoin="round"/></svg>' },
  css: { tip: 'CSS', bg: '#1572B6', html: '<svg viewBox="0 0 24 24"><path d="M4 2h16l-1.5 17L12 22l-6.5-3z" fill="#fff" opacity=".25"/><path d="M8.3 7h7.3l-.6 6.3L12 14.4l-2.8-.9-.2-2M8.6 10.3h6.6" fill="none" stroke="#fff" stroke-width="2" stroke-linejoin="round"/></svg>' },
  ppt: { tip: 'PowerPoint', bg: '#C43E1C', html: '<span style="color:#fff">P</span>' },
  notion: { tip: 'Notion', bg: '#fff', html: '<span style="color:#17191E;font-family:Georgia,serif;font-weight:700;border:2px solid #17191E;border-radius:4px;padding:0 4px">N</span>' },
  bi: { tip: 'Power BI / dados', bg: '#F2C811', html: '<svg viewBox="0 0 24 24"><rect x="3" y="12" width="4.5" height="9" rx="1.5" fill="#17191E"/><rect x="9.75" y="7" width="4.5" height="14" rx="1.5" fill="#17191E"/><rect x="16.5" y="3" width="4.5" height="18" rx="1.5" fill="#17191E"/></svg>' },
};
const paintTools = root => root.querySelectorAll('.tool[data-t]').forEach(el => {
  const t = TOOLS[el.dataset.t]; if (!t) return;
  el.style.background = t.bg; el.dataset.tip = t.tip; el.innerHTML = t.html; el.setAttribute('aria-label', t.tip);
});
paintTools(document);
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
document.querySelectorAll('.letras').forEach(panel => {
  const cv = panel.querySelector('canvas'), ctx = cv.getContext('2d');
  let W, H, dots = [], m = { x: -999, y: -999 };
  const resize = () => {
    const dpr = devicePixelRatio || 1; W = panel.clientWidth; H = panel.clientHeight;
    cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    dots = Array.from({ length: Math.round(W * H / 2600) }, () => { const x = Math.random() * W, y = Math.random() * H; return { x, y, ox: x, oy: y, r: Math.random() * 1.4 + .6 }; });
  };
  const tick = () => {
    ctx.clearRect(0, 0, W, H); ctx.fillStyle = '#3A3D44';
    for (const d of dots) {
      const dx = d.x - m.x, dy = d.y - m.y, dist = Math.hypot(dx, dy);
      if (dist < 120) { const f = (120 - dist) / 120 * 6; d.x += dx / dist * f; d.y += dy / dist * f; }
      d.x += (d.ox - d.x) * .06; d.y += (d.oy - d.y) * .06;
      ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, 7); ctx.fill();
    }
    if (!reduce && visible) requestAnimationFrame(tick); else running = false;
  };
  panel.addEventListener('pointermove', e => { const r = panel.getBoundingClientRect(); m = { x: e.clientX - r.left, y: e.clientY - r.top }; });
  panel.addEventListener('pointerleave', () => m = { x: -999, y: -999 });
  let visible = true, running = true;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !running && !reduce) { running = true; requestAnimationFrame(tick); } }).observe(panel);
  document.addEventListener('visibilitychange', () => { visible = !document.hidden; if (visible && !running && !reduce) { running = true; requestAnimationFrame(tick); } });
  new ResizeObserver(resize).observe(panel); resize(); tick();
});

})();
