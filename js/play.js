/* Konsolarium – Spieler-Seite: startet EmulatorJS mit der gewählten ROM */

const PI = {
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  ff: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 6.2v11.6a.8.8 0 0 0 1.3.6L11.5 12 4.3 5.6A.8.8 0 0 0 3 6.2zm9 0v11.6a.8.8 0 0 0 1.3.6L20.5 12l-7.2-6.4a.8.8 0 0 0-1.3.6z"/></svg>',
  save: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3h11l4 4v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 1-2z"/><path d="M8 3v5h7V3"/><rect x="7.5" y="13" width="9" height="8" rx="1"/></svg>',
  load: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H10l2 2h6.5A2.5 2.5 0 0 1 21 9.5v8a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5z"/><path d="M12 10.5v6M9.5 14l2.5 2.5 2.5-2.5"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><rect x="4" y="4" width="16" height="16" rx="4"/><path d="M12 8.5v7M8.5 12h7"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  sound: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/></svg>',
  pad: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="7" width="19" height="11" rx="5.5"/><path d="M7 10.5v4M5 12.5h4"/><circle cx="16" cy="11.5" r="1" fill="currentColor"/><circle cx="18" cy="13.8" r="1" fill="currentColor"/></svg>',
  gear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M4.2 6.2l2.1 2.1M17.7 15.7l2.1 2.1M2.5 12h3M18.5 12h3M4.2 17.8l2.1-2.1M17.7 8.3l2.1-2.1"/></svg>',
  restart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12a8 8 0 1 0 2.3-5.7L4 8.5M4 4v4.5h4.5"/></svg>',
  wand: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20L15 9M14 4v3M18.5 5.5l-2 2M20 10h-3M9.5 4.5l1 1"/></svg>',
  chev: '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M9 7V4.5h6V7M6.5 7l1 13h9l1-13"/></svg>',
  play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13a1 1 0 0 0 1.5.9l10.4-6.5a1 1 0 0 0 0-1.8L9.5 4.6A1 1 0 0 0 8 5.5z"/></svg>',
  cam: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8.5A2.5 2.5 0 0 1 6.5 6H8l1.5-2h5L16 6h1.5A2.5 2.5 0 0 1 20 8.5v8a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 16.5z"/><circle cx="12" cy="12.5" r="3.5"/></svg>',
  edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16z"/></svg>',
  move: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18M3 12h18M12 3l-3 3M12 3l3 3M12 21l-3-3M12 21l3-3M3 12l3-3M3 12l3 3M21 12l-3-3M21 12l-3 3"/></svg>',
  share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12M7.5 7.5L12 3l4.5 4.5M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/></svg>'
};

const P = { frame: null, rom: null, sys: null, started: false, speed: 1, muted: !Settings.get('gameSound'), cheats: [], exiting: false, lastAuto: 0, stateId: null, menuOpen: false, pad: null, rewind: false, busy: false };
/* Zurückspulen kostet Rechenzeit – nur für Konsolen mit kleinen Speicherständen */
const REWIND_SYS = ['nes', 'gb', 'gbc', 'gba', 'snes', 'segaMS', 'segaGG', 'segaMD', 'sega32x', 'pce', 'atari2600', 'atari7800', 'lynx', 'ngp', 'ws', 'vb', 'coleco', 'a5200'];
const AUTO_KEEP = 3;
const TIME = { pending: 0, sinceAuto: 0 };
const sleep = ms => new Promise(r => setTimeout(r, ms));
const emu = () => window.EJS_emulator;
const gm = () => window.EJS_emulator && window.EJS_emulator.gameManager;

function showMsg(text, opts = {}) {
  const el = $('#pmsg');
  el.hidden = false;
  el.innerHTML = `<div class="box">${P.sys ? `<div class="art">${Art.consoleSVG(P.sys)}</div>` : ''}<p>${esc(text)}</p>
    ${opts.button ? `<a class="btn primary" href="${opts.href || 'index.html#/library'}">${esc(opts.button)}</a>` : ''}</div>`;
}
function hideMsg() { $('#pmsg').hidden = true; }

/* Kleine Meldung oben (stört die Bildschirmtasten unten nicht) */
function notice(text) {
  let el = $('#notice');
  if (!el) { el = document.createElement('div'); el.id = 'notice'; document.body.appendChild(el); }
  el.textContent = text;
  el.classList.remove('show'); void el.offsetWidth; el.classList.add('show');
  clearTimeout(notice.timer);
  notice.timer = setTimeout(() => el.classList.remove('show'), 1700);
}
function stateLabel(s) {
  return s.name || (s.kind === 'auto' ? t('saves.auto') : s.kind === 'quick' ? t('saves.quick') : t('saves.slot'));
}

function sanitizeName(s) { return s.replace(/[#<$+%>!`&*'|{}/\\?"=@:^\r\n]/g, '').trim() || 'game'; }
function cheatCode(c) { return c.code.split(/\n+/).map(x => x.trim()).filter(Boolean).join('+'); }

/* ---------- Kopfleiste ---------- */
function setupBar() {
  $('#b-exit').innerHTML = PI.x; $('#b-exit').setAttribute('aria-label', t('pl.exit'));
  $('#b-qs').innerHTML = PI.save; $('#b-qs').setAttribute('aria-label', t('pl.qsave'));
  $('#b-menu').innerHTML = PI.menu; $('#b-menu').setAttribute('aria-label', t('pl.menu'));
  updateFfButton();
  $('#ptitle b').textContent = P.rom.name;
  $('#ptitle span').textContent = P.sys.name;
  $('#b-exit').onclick = () => { Sfx.back(); exitGame(); };
  $('#b-qs').onclick = async () => { Sfx.tap(); if (await saveState('quick')) toast(t('pl.saved')); };
  $('#b-menu').onclick = () => { Sfx.tap(); openMenu(); };
  $('#b-ff').onclick = () => { setSpeed(P.speed === 1 ? Settings.get('ffSpeed') : 1); Sfx.toggle(P.speed !== 1); };
  ['#b-qs', '#b-ff'].forEach(s => $(s).disabled = true);
}
function updateFfButton() {
  const b = $('#b-ff');
  b.innerHTML = PI.ff + `<span>${P.speed === 1 ? fmtNum(Settings.get('ffSpeed')) : fmtNum(P.speed)}×</span>`;
  b.setAttribute('aria-pressed', P.speed !== 1);
  b.setAttribute('aria-label', t('pl.ff'));
}

/* ---------- Tempo, Ton, Cheats ---------- */
function setSpeed(v) {
  P.speed = v;
  const g = gm();
  if (g) {
    try {
      if (v === 1) g.toggleFastForward(0);
      else { g.setFastForwardRatio(v); g.toggleFastForward(1); }
    } catch (e) { console.warn(e); }
  }
  updateFfButton();
}
function setMuted(m) {
  P.muted = m;
  try { emu().setVolume(m ? 0 : 0.6); } catch (e) { /* noch nicht bereit */ }
}
function applyCheats() {
  const g = gm(); if (!g) return;
  try { g.resetCheat(); } catch (e) { /* Kern ohne Cheats */ }
  P.cheats.forEach((c, i) => { if (c.enabled) { try { g.setCheat(i, 1, cheatCode(c)); } catch (e) { console.warn(e); } } });
}

/* ---------- Speicherstände ---------- */
/* Aktuelles Bild für Vorschaubilder: vom Emulator-Kern (zuverlässig, solange das Spiel läuft),
   im Menü das kurz vor dem Pausieren gemerkte Bild */
function canvasPng() {
  return new Promise(res => { try { emu().screenshot(b => res(b), 'canvas', 'png', 1); } catch (e) { res(null); } setTimeout(() => res(null), 1500); });
}
async function frameBlob() {
  const e = emu();
  const paused = !e || e.paused || document.hidden;
  if (paused && P.frame && Date.now() - P.frame.t < 120000) return P.frame.blob;
  if (paused) return canvasPng();
  return corePng();
}
async function snapshotThumb() {
  try {
    const blob = await frameBlob();
    if (!blob) return null;
    const bmp = await createImageBitmap(blob);
    const w = 320, h = Math.max(1, Math.round(bmp.height * w / bmp.width));
    const c = document.createElement('canvas'); c.width = w; c.height = h;
    const ctx = c.getContext('2d'); ctx.imageSmoothingEnabled = false; ctx.drawImage(bmp, 0, 0, w, h);
    return await new Promise(res => c.toBlob(res, 'image/jpeg', 0.82));
  } catch (err) { return null; }
}

async function saveState(kind, overwriteId) {
  const g = gm(); if (!g || !P.started) return false;
  let data;
  try { data = g.getState(); } catch (e) { Sfx.err(); toast(t('pl.noStates'), 'err'); return false; }
  data = new Uint8Array(data); // Kopie aus dem Emulator-Speicher
  const thumb = await snapshotThumb();
  const id = overwriteId || (kind === 'quick' ? 'q-' + P.rom.id : kind === 'auto' ? 'a-' + P.rom.id + '-' + Date.now().toString(36) : uid());
  const prev = overwriteId ? await DB.get('states', overwriteId) : null;
  const rec = { id, romId: P.rom.id, kind, created: Date.now(), thumb, size: data.length };
  if (prev && prev.name) rec.name = prev.name;
  await DB.put('statedata', { id, data });
  await DB.put('states', rec);
  if (kind === 'auto') await pruneAuto(); else Sfx.ok();
  return true;
}

/* Von den automatischen Ständen bleiben die neuesten drei */
async function pruneAuto() {
  const autos = (await DB.byIndex('states', 'romId', P.rom.id)).filter(s => s.kind === 'auto').sort((a, b) => b.created - a.created);
  for (const s of autos.slice(AUTO_KEEP)) await Store.deleteState(s.id);
}

/* ---------- Spielzeit & Autospeichern ---------- */
async function flushPlayTime() {
  const add = TIME.pending;
  if (!add || !P.rom) return;
  TIME.pending = 0;
  try {
    const r = await DB.get('roms', P.rom.id);
    if (r) { r.playTime = (r.playTime || 0) + add; await DB.put('roms', r); }
  } catch (e) { TIME.pending += add; }
}
function startTicker() {
  setInterval(() => {
    if (!P.started || P.exiting) return;
    const e = emu();
    if (document.hidden || P.menuOpen || (P.pad && P.pad.editing) || !e || e.paused) return;
    TIME.pending += 1000;
    TIME.sinceAuto += 1000;
    if (TIME.pending >= 30000) flushPlayTime();
    const min = Number(Settings.get('autosaveMin')) || 0;
    if (min > 0 && TIME.sinceAuto >= min * 60000 && !P.busy) {
      TIME.sinceAuto = 0;
      P.busy = true;
      saveState('auto').then(ok => { if (ok) notice(t('pl.autosaved')); }).catch(() => {}).finally(() => { P.busy = false; });
    }
  }, 1000);
}

async function loadState(id) {
  const g = gm(); if (!g) return false;
  const d = await DB.get('statedata', id);
  if (!d) return false;
  try { g.loadState(new Uint8Array(d.data)); Sfx.ok(); toast(t('pl.loaded')); return true; }
  catch (e) { Sfx.err(); toast(t('c.error', { e: e.message }), 'err'); return false; }
}

async function autoSave() {
  if (!P.started || !Settings.get('autosave')) return;
  if (Date.now() - P.lastAuto < 15000) return;
  P.lastAuto = Date.now();
  try { await saveState('auto'); } catch (e) { /* ignorieren */ }
}

/* In-Game-Saves (Batteriespeicher) sicher in die Datenbank schreiben, bevor die Seite wechselt */
function flushSaves() {
  return new Promise(resolve => {
    const g = gm();
    if (!g || !g.FS) { resolve(); return; }
    try { g.saveSaveFiles(); } catch (e) { /* weiter */ }
    setTimeout(() => {
      try { g.FS.syncfs(false, () => resolve()); } catch (e) { resolve(); }
      setTimeout(resolve, 3000); /* Notbremse */
    }, 400);
  });
}

async function exitGame() {
  if (P.exiting) return; P.exiting = true;
  if (P.started) {
    if (Settings.get('autosave')) { try { P.lastAuto = 0; await saveState('auto'); toast(t('pl.autosaved')); } catch (e) { /* weiter */ } }
    await flushSaves();
    try { emu().pause(); } catch (e) { /* egal */ }
    await flushPlayTime();
    await sleep(150);
  }
  location.href = 'index.html#/rom/' + encodeURIComponent(P.rom.id);
}

/* ---------- Menü ---------- */
async function openMenu() {
  const e = emu();
  const wasPaused = e ? e.paused : true;
  if (P.started && !wasPaused) {
    /* Bild merken, bevor pausiert wird – für Vorschaubilder neuer Speicherstände */
    const fp = corePng(600).then(b => { if (b) P.frame = { blob: b, t: Date.now() }; });
    await Promise.race([fp, sleep(300)]);
  }
  try { if (P.started && e.pause) e.pause(); } catch (err) { /* egal */ }
  const ov = document.createElement('div');
  ov.className = 'pmenu-ov';
  ov.innerHTML = `<div class="pmenu" role="dialog" aria-modal="true"><div class="grab" style="width:40px;height:5px;border-radius:3px;background:rgba(255,255,255,.18);margin:0 auto 6px"></div><div id="pm"></div></div>`;
  document.body.appendChild(ov);
  P.menuOpen = true;
  const close = (keepPaused) => {
    ov.remove();
    P.menuOpen = false;
    if (keepPaused === true) return;
    try { if (P.started && !wasPaused && e.play) e.play(); } catch (err) { /* egal */ }
  };
  close.wasPaused = wasPaused;
  ov.addEventListener('click', ev => { if (ev.target === ov) { Sfx.back(); close(); } });
  renderMenu(ov, close);
}

async function renderMenu(ov, close) {
  const box = $('#pm', ov);
  const states = (await DB.byIndex('states', 'romId', P.rom.id)).sort((a, b) => b.created - a.created);
  const speeds = [1, 1.5, 2, 3, 4, 8];
  box.innerHTML = `
    <div class="bigbtns">
      <button data-a="new">${PI.plus}<span>${esc(t('pl.saveNew'))}</span></button>
      <button data-a="qs">${PI.save}<span>${esc(t('pl.qsave'))}</span></button>
      <button data-a="ql">${PI.load}<span>${esc(t('pl.qload'))}</span></button>
      <button data-a="shot">${PI.cam}<span>${esc(t('pl.shot'))}</span></button>
    </div>
    <h4>${esc(t('rom.states'))}</h4>
    ${states.length ? `<div class="states">${states.map(s => `<button class="st" data-st="${s.id}"><div class="shot" data-th="${s.id}"></div><div class="m"><b>${esc(stateLabel(s))}</b>${esc(fmtDate(s.created, true))}</div></button>`).join('')}</div>`
      : `<div class="empty-s">${esc(t('saves.empty'))}</div>`}
    <h4>${esc(t('pl.speed'))}</h4>
    <div class="seg" id="spd">${speeds.map(v => `<button data-v="${v}" aria-pressed="${P.speed === v}">${v === 1 ? esc(t('pl.normal')) : fmtNum(v) + '×'}</button>`).join('')}</div>
    <h4></h4>
    <div class="group">
      <div class="row"><span class="ico" style="background:#ff7a45">${PI.sound}</span><span class="lbl">${esc(t('pl.sound'))}</span>
        <label class="switch"><input type="checkbox" id="snd" ${P.muted ? '' : 'checked'}><span class="track"></span><span class="knob"></span></label></div>
      <div class="row"><span class="ico" style="background:#2fb784">${PI.pad}</span><span class="lbl">${esc(t('pad.onscreen'))}</span>
        <label class="switch"><input type="checkbox" id="padsw" ${padWanted() ? 'checked' : ''}><span class="track"></span><span class="knob"></span></label></div>
      <button class="row" data-a="arrange"><span class="ico" style="background:#e07a3a">${PI.move}</span><span class="lbl">${esc(t('pad.arrange'))}</span>${PI.chev}</button>
      <button class="row" data-a="ctl"><span class="ico" style="background:#3a8ce0">${PI.gear}</span><span class="lbl">${esc(t('pl.controls'))}</span>${PI.chev}</button>
      <button class="row" data-a="core"><span class="ico" style="background:#5a6b85">${PI.gear}</span><span class="lbl">${esc(t('pl.coreSet'))}</span>${PI.chev}</button>
      <button class="row" data-a="rst"><span class="ico" style="background:#e0a400">${PI.restart}</span><span class="lbl">${esc(t('pl.restart'))}</span></button>
    </div>
    <h4>${esc(t('rom.cheats'))}</h4>
    <div class="group">
      ${P.cheats.map((c, i) => `<div class="row"><span class="lbl">${esc(c.desc)}<span class="sub">${esc(c.code.split('\n')[0])}</span></span>
        <label class="switch"><input type="checkbox" data-ch="${i}" ${c.enabled ? 'checked' : ''}><span class="track"></span><span class="knob"></span></label></div>`).join('')}
      <button class="row" data-a="addc"><span class="ico" style="background:#8c5cff">${PI.wand}</span><span class="lbl">${esc(t('cheat.add'))}</span></button>
    </div>
    <p class="muted small" style="margin:8px 4px">${esc(P.sys.cheats.length ? t('cheat.formats', { f: P.sys.cheats.join(', ') }) : t('cheats.core'))}. ${esc(t('cheat.note'))}</p>
    <button class="btn danger block exit" data-a="exit">${PI.x}${esc(t('pl.exit'))}</button>`;

  for (const s of states) {
    const th = $(`[data-th="${s.id}"]`, box);
    if (s.thumb && th) { const img = new Image(); img.src = URL.createObjectURL(s.thumb); th.appendChild(img); }
  }
  const act = async a => {
    if (a === 'new') { if (await saveState('slot')) { toast(t('pl.saved')); renderMenu(ov, close); } }
    else if (a === 'qs') { if (await saveState('quick')) { toast(t('pl.saved')); renderMenu(ov, close); } }
    else if (a === 'ql') { const q = states.find(s => s.kind === 'quick'); if (q && await loadState(q.id)) close(); else if (!q) { Sfx.err(); toast(t('saves.empty'), 'err'); } }
    else if (a === 'ctl') { close(); try { emu().controlMenu.style.display = ''; } catch (e) { /* egal */ } }
    else if (a === 'shot') { close(); await sleep(120); takeScreenshot(); }
    else if (a === 'arrange') {
      const wasPaused = close.wasPaused;
      close(true);
      try { if (P.started) emu().pause(); } catch (e) { /* egal */ }
      if (!padWanted()) Settings.set('padMode', 'on');
      P.pad.setVisible(true);
      await P.pad.edit();
      updatePad();
      try { if (P.started && !wasPaused) emu().play(); } catch (e) { /* egal */ }
    }
    else if (a === 'core') {
      close();
      try { const e = emu(); e.menu.open(true); const btn = e.settingParent.querySelector('.ejs_menu_button, button'); if (btn) btn.click(); } catch (e) { /* egal */ }
    }
    else if (a === 'rst') {
      if (confirm(t('pl.restartConfirm'))) { try { gm().restart(); } catch (e) { /* egal */ } close(); }
    }
    else if (a === 'addc') addCheatForm(ov, close);
    else if (a === 'exit') { close(); exitGame(); }
  };
  $$('[data-a]', box).forEach(b => b.onclick = () => { Sfx.tap(); act(b.dataset.a); });
  $$('#spd button', box).forEach(b => b.onclick = () => {
    setSpeed(Number(b.dataset.v)); Sfx.toggle(P.speed !== 1);
    $$('#spd button', box).forEach(x => x.setAttribute('aria-pressed', x === b));
  });
  $('#snd', box).onchange = e => { setMuted(!e.target.checked); Sfx.toggle(e.target.checked); };
  $('#padsw', box).onchange = e => { Settings.set('padMode', e.target.checked ? 'on' : 'off'); Sfx.toggle(e.target.checked); updatePad(); };
  $$('[data-ch]', box).forEach(inp => inp.onchange = async () => {
    const c = P.cheats[Number(inp.dataset.ch)]; c.enabled = inp.checked; await DB.put('cheats', c); applyCheats(); Sfx.toggle(c.enabled);
  });
  $$('[data-st]', box).forEach(b => b.onclick = () => {
    Sfx.tap();
    const id = b.dataset.st;
    const sheet = document.createElement('div');
    sheet.className = 'overlay center';
    sheet.style.zIndex = 70;
    const cur = states.find(s => s.id === id);
    sheet.innerHTML = `<div class="dialog" style="background:#262146;color:#f2efff"><h3>${esc(stateLabel(cur))}</h3><p>${esc(fmtDate(cur.created, true))}</p>
      <div class="btn-row" style="flex-direction:column">
        <button class="btn primary" data-x="load">${PI.play}${esc(t('saves.load'))}</button>
        <button class="btn" data-x="over">${PI.save}${esc(t('pl.overwrite'))}</button>
        <button class="btn" data-x="ren">${PI.edit}${esc(t('saves.rename'))}</button>
        <button class="btn" data-x="del">${PI.trash}${esc(t('c.delete'))}</button>
        <button class="btn" data-x="cancel">${esc(t('c.cancel'))}</button></div></div>`;
    document.body.appendChild(sheet);
    $$('[data-x]', sheet).forEach(x => x.onclick = async () => {
      sheet.remove();
      const k = x.dataset.x;
      if (k === 'load') { if (await loadState(id)) close(); }
      else if (k === 'over') { const st = states.find(s => s.id === id); if (await saveState(st.kind, id)) { toast(t('pl.saved')); renderMenu(ov, close); } }
      else if (k === 'del') { await Store.deleteState(id); renderMenu(ov, close); }
      else if (k === 'ren') {
        const n = await askName(cur.name || '');
        if (n !== null) { const st = await DB.get('states', id); if (n) st.name = n; else delete st.name; await DB.put('states', st); Sfx.ok(); renderMenu(ov, close); }
      }
    });
  });
}

/* Name eingeben (leer = Standardbezeichnung) */
function askName(value) {
  return new Promise(resolve => {
    const sheet = document.createElement('div');
    sheet.className = 'overlay center';
    sheet.style.zIndex = 75;
    sheet.innerHTML = `<div class="dialog" style="background:#262146;color:#f2efff"><h3>${esc(t('saves.rename'))}</h3>
      <label class="field"><input id="nm" maxlength="40" value="${esc(value)}" placeholder="${esc(t('saves.namePh'))}" autocomplete="off"></label>
      <div class="btn-row"><button class="btn" data-n="c">${esc(t('c.cancel'))}</button><button class="btn primary" data-n="s">${esc(t('c.save'))}</button></div></div>`;
    document.body.appendChild(sheet);
    const inp = $('#nm', sheet);
    setTimeout(() => inp.focus(), 60);
    const done = v => { sheet.remove(); resolve(v); };
    $('[data-n="c"]', sheet).onclick = () => done(null);
    $('[data-n="s"]', sheet).onclick = () => done(inp.value.trim());
    inp.onkeydown = e => { if (e.key === 'Enter') done(inp.value.trim()); };
  });
}

/* ---------- Bildschirmfoto ---------- */
async function corePng(timeout = 2000) {
  const g = gm();
  try {
    const png = await Promise.race([g.screenshot(), sleep(timeout).then(() => null)]);
    if (png && png.length) return new Blob([png], { type: 'image/png' });
  } catch (e) { /* Ersatz unten */ }
  return canvasPng();
}
async function takeScreenshot() {
  if (!P.started) return;
  const raw = await corePng();
  if (!raw) { Sfx.err(); toast(t('c.error', { e: 'screenshot' }), 'err'); return; }
  let out = raw;
  try {
    /* Pixelgenau vergrößern, damit das Foto scharf bleibt */
    const bmp = await createImageBitmap(raw);
    const k = Math.max(1, Math.min(6, Math.floor(1280 / Math.max(bmp.width, bmp.height))));
    if (k > 1) {
      const c = document.createElement('canvas'); c.width = bmp.width * k; c.height = bmp.height * k;
      const ctx = c.getContext('2d'); ctx.imageSmoothingEnabled = false; ctx.drawImage(bmp, 0, 0, c.width, c.height);
      out = await new Promise(res => c.toBlob(res, 'image/png'));
    }
  } catch (e) { out = raw; }
  Sfx.ok();
  const d = new Date(), pad = n => String(n).padStart(2, '0');
  const name = `${sanitizeName(P.rom.name).replace(/\s+/g, '-')}-${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}.png`;
  const file = new File([out], name, { type: 'image/png' });
  const e = emu();
  const wasPaused = e ? e.paused : true;
  try { if (P.started) e.pause(); } catch (err) { /* egal */ }
  P.menuOpen = true;
  const url = URL.createObjectURL(file);
  const sheet = document.createElement('div');
  sheet.className = 'overlay center';
  sheet.style.zIndex = 75;
  sheet.innerHTML = `<div class="dialog shot-dlg" style="background:#262146;color:#f2efff"><img src="${url}" alt="">
    <div class="btn-row" style="flex-direction:column"><button class="btn primary" data-s="save">${PI.share}${esc(t('pl.shotSave'))}</button><button class="btn" data-s="close">${esc(t('c.close'))}</button></div></div>`;
  document.body.appendChild(sheet);
  const close = () => {
    sheet.remove(); URL.revokeObjectURL(url); P.menuOpen = false;
    try { if (P.started && !wasPaused) e.play(); } catch (err) { /* egal */ }
  };
  $('[data-s="close"]', sheet).onclick = () => { Sfx.back(); close(); };
  $('[data-s="save"]', sheet).onclick = () => {
    let canShare = false;
    try { canShare = isTouchDevice() && navigator.canShare && navigator.canShare({ files: [file] }); } catch (err) { canShare = false; }
    if (canShare) {
      navigator.share({ files: [file] }).then(() => { toast(t('pl.shotDone')); close(); }).catch(err => { if (!err || err.name !== 'AbortError') download(); });
    } else download();
    function download() {
      const a = document.createElement('a'); a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove();
      toast(t('pl.shotDone'));
      setTimeout(close, 300);
    }
  };
}
function isTouchDevice() { return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1); }

/* ---------- Bildschirmtasten ---------- */
function padWanted() {
  const m = Settings.get('padMode') || 'auto';
  if (m === 'off') return false;
  if (m === 'on') return true;
  return Pad.hasTouch() && !Pad.gamepadConnected();
}
function ejsMenuOpen() {
  const e = emu();
  try { return !!(e && ((e.settingsMenu && e.settingsMenu.style.display !== 'none') || (e.isPopupOpen && e.isPopupOpen()))); } catch (err) { return false; }
}
function updatePad() { if (P.pad && !P.pad.editing) P.pad.setVisible(padWanted() && !ejsMenuOpen()); }
function setupPad() {
  P.pad = Pad.create($('#pad'), {
    sys: P.sys.id, rewind: P.rewind,
    send: (i, v) => { const g = gm(); if (g && P.started) { try { g.simulateInput(0, i, v); } catch (e) { /* egal */ } } }
  });
  updatePad();
  window.addEventListener('gamepadconnected', updatePad);
  window.addEventListener('gamepaddisconnected', updatePad);
  setInterval(updatePad, 500);
}

/* EmulatorJS merkt sich Einstellungen pro Spiel – unsere Vorgaben dort eintragen */
function patchEjsSettings(gameName, patch) {
  const suffix = '-' + gameName + '-settings';
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (!k || !k.startsWith('ejs-') || !k.endsWith(suffix)) continue;
    try { const o = JSON.parse(localStorage.getItem(k)) || {}; o.settings = Object.assign(o.settings || {}, patch); localStorage.setItem(k, JSON.stringify(o)); } catch (e) { /* egal */ }
  }
}

function addCheatForm(ov, close) {
  const box = $('#pm', ov);
  box.innerHTML = `<h4>${esc(t('cheat.add'))}</h4>
    <label class="field"><span>${esc(t('cheat.name'))}</span><input id="cd" placeholder="${esc(t('cheat.namePh'))}" autocomplete="off"></label>
    <label class="field"><span>${esc(t('cheat.code'))} – ${esc(t('cheat.codeHint'))}</span><textarea id="cc" autocapitalize="characters" autocorrect="off" spellcheck="false"></textarea></label>
    <div class="btn-row"><button class="btn" data-c>${esc(t('c.cancel'))}</button><button class="btn primary" data-s>${esc(t('c.save'))}</button></div>`;
  $('[data-c]', box).onclick = () => { Sfx.back(); renderMenu(ov, close); };
  $('[data-s]', box).onclick = async () => {
    const desc = $('#cd', box).value.trim(), code = $('#cc', box).value.trim().toUpperCase();
    if (!desc || !code) { Sfx.err(); toast(t('cheat.invalid'), 'err'); return; }
    const c = { id: uid(), romId: P.rom.id, desc, code, enabled: true, created: Date.now() };
    await DB.put('cheats', c);
    P.cheats.push(c);
    applyCheats();
    Sfx.ok();
    renderMenu(ov, close);
  };
}

/* ---------- Start ---------- */
/* Schutz für In-Game-Saves: EmulatorJS hängt beim Verlassen der Seite „/data/saves“ aus.
   Läuft danach noch ein automatischer Abgleich, hält er den leeren Ordner für aktuell und
   löscht alle gespeicherten Spielstände in der Datenbank. Darum bleibt der Ordner eingehängt. */
function guardSaveMount() {
  const g = gm();
  if (!g || !g.FS || g.FS.__ksGuard) return;
  const FS = g.FS, unmount = FS.unmount.bind(FS);
  FS.unmount = path => { if (String(path).replace(/\/+$/, '') === '/data/saves') return; return unmount(path); };
  FS.__ksGuard = true;
}

async function onGameStart() {
  P.started = true;
  guardSaveMount();
  hideMsg();
  ['#b-qs', '#b-ff'].forEach(s => $(s).disabled = false);
  await sleep(300);
  if (P.muted) setMuted(true);
  applyCheats();
  if (P.stateId) { await sleep(400); await loadState(P.stateId); }
}

(async function init() {
  document.addEventListener('contextmenu', e => e.preventDefault());
  const params = new URLSearchParams(location.search);
  const romId = params.get('rom');
  P.stateId = params.get('state');
  await DB.open();
  const rom = romId ? await DB.get('roms', romId) : null;
  if (!rom) { showMsg(t('pl.notFound'), { button: t('pl.backLib') }); return; }
  P.rom = rom;
  P.sys = sysById(rom.system);
  const sys = P.sys;
  setupBar();
  P.rewind = Settings.get('rewind') !== false && REWIND_SYS.includes(sys.id);
  setupPad();
  showMsg(t('pl.loading'));

  if (sys.threads && !window.crossOriginIsolated) {
    if ('serviceWorker' in navigator && !sessionStorage.getItem('ks.coiReload')) {
      try { await navigator.serviceWorker.register('sw.js'); await navigator.serviceWorker.ready; } catch (e) { /* weiter */ }
      sessionStorage.setItem('ks.coiReload', '1');
      showMsg(t('pl.needReload'));
      setTimeout(() => location.reload(), 700);
      return;
    }
    showMsg(t('pl.unsupported'), { button: t('pl.backLib') });
    return;
  }
  sessionStorage.removeItem('ks.coiReload');

  const biosRecs = sys.bios ? await DB.byIndex('bios', 'system', sys.id) : [];
  if (sys.bios && sys.bios.required && !biosRecs.length) {
    showMsg(t('pl.biosMissing', { sys: sys.name }), { button: t('c.next'), href: 'index.html#/sys/' + sys.id });
    return;
  }
  const data = await DB.get('romdata', rom.id);
  if (!data) { showMsg(t('pl.notFound'), { button: t('pl.backLib') }); return; }
  P.cheats = (await DB.byIndex('cheats', 'romId', rom.id)).sort((a, b) => a.created - b.created);

  rom.lastPlayed = Date.now(); rom.playCount = (rom.playCount || 0) + 1;
  await DB.put('roms', rom);

  const ext = {};
  biosRecs.forEach(b => { ext['/' + b.fileName] = URL.createObjectURL(b.blob); });
  const coreSel = (Settings.get('cores') || {})[sys.id];

  window.EJS_player = '#game';
  window.EJS_core = coreSel && coreSel !== 'auto' && sys.cores.some(c => c.id === coreSel) ? coreSel : sys.ejs;
  window.EJS_pathtodata = 'emulatorjs/';
  window.EJS_gameUrl = new File([data.blob], rom.fileName, { type: 'application/octet-stream' });
  window.EJS_gameName = sanitizeName(rom.name + '-' + rom.id.slice(0, 8));
  if (Object.keys(ext).length) window.EJS_externalFiles = ext;
  window.EJS_language = langInfo(Settings.get('lang')).ejs;
  window.EJS_startOnLoaded = false;
  window.EJS_startButtonName = t('pl.start');
  window.EJS_color = '#ffc94a';
  window.EJS_backgroundColor = '#0b0a14';
  window.EJS_volume = 0.6;
  window.EJS_threads = !!sys.threads;
  window.EJS_disableDatabases = true; /* Kerne liegen schon im Offline-Cache, ROMs in der eigenen Dateiablage */
  window.EJS_hideSettings = ['retroarch_core', 'ejs_threads', 'webgl2Enabled', 'save-state-location', 'rewindEnabled', 'virtual-gamepad', 'menu-bar-button', 'virtual-gamepad-left-handed-mode'];
  const ejsOpts = { rewindEnabled: P.rewind ? 'enabled' : 'disabled', 'virtual-gamepad': 'disabled', 'menu-bar-button': 'hidden' };
  window.EJS_defaultOptions = ejsOpts;
  patchEjsSettings(window.EJS_gameName, ejsOpts);
  window.EJS_Buttons = {
    playPause: false, restart: false, mute: false, settings: true, fullscreen: false, saveState: false, loadState: false,
    screenRecord: false, gamepad: true, cheat: false, volume: false, saveSavFiles: false, loadSavFiles: false,
    quickSave: false, quickLoad: false, screenshot: false, cacheManager: false, exitEmulation: false, netplay: false, diskButton: true
  };
  window.EJS_onGameStart = onGameStart;
  window.EJS_ready = () => hideMsg();

  const s = document.createElement('script');
  s.src = 'emulatorjs/loader.js';
  s.onerror = () => showMsg(t('c.error', { e: 'loader.js' }), { button: t('pl.backLib') });
  document.body.appendChild(s);
  setTimeout(hideMsg, 4000);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden && P.started && !P.exiting) {
      autoSave();
      flushPlayTime();
      try { gm().saveSaveFiles(); } catch (e) { /* egal */ }
    }
  });
  window.addEventListener('pagehide', () => { try { if (P.started && !P.exiting) gm().saveSaveFiles(); } catch (e) { /* egal */ } });
  startTicker();
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
})();
