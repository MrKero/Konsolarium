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
  file: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M12 11v6M9.5 14.5L12 17l2.5-2.5"/></svg>',
  notes: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3.5" width="14" height="17" rx="2"/><path d="M8.5 8h7M8.5 12h7M8.5 16h4"/></svg>',
  bat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7.5" width="16" height="9" rx="2"/><path d="M21 11v2"/><path d="M6.5 10.5v3M9.5 10.5v3"/></svg>',
  share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12M7.5 7.5L12 3l4.5 4.5M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/></svg>'
};

const P = { frame: null, rom: null, sys: null, started: false, speed: 1, muted: !Settings.get('gameSound'), cheats: [], exiting: false, lastAuto: 0, stateId: null, menuOpen: false, pad: null, rewind: false, busy: false, padShown: false, frameKey: '', battery: false, lastInput: Date.now(), idlePaused: false };
const IDLE_MS = 5 * 60000;
/* Eigene Skin-Bilder dieser Konsole (Hochformat p, Querformat q) */
const SK = { img: { p: null, q: null } };
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

/* ---------- Einstellungen pro Spiel ---------- */
const PREF_KEY = { ffSpeed: 'ff', rewind: 'rewind', autosaveMin: 'autoMin', padMode: 'padMode' };
function pref(k) {
  const p = (P.rom && P.rom.prefs) || {};
  const v = p[PREF_KEY[k]];
  return v === undefined || v === null || v === 'default' ? Settings.get(k) : v;
}
async function setPadMode(v) {
  if (P.rom.prefs && P.rom.prefs.padMode && P.rom.prefs.padMode !== 'default') {
    P.rom.prefs.padMode = v;
    try { const r = await DB.get('roms', P.rom.id); r.prefs = Object.assign(r.prefs || {}, { padMode: v }); await DB.put('roms', r); } catch (e) { /* egal */ }
  } else Settings.set('padMode', v);
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
  $('#b-ff').onclick = () => { setSpeed(P.speed === 1 ? pref('ffSpeed') : 1); Sfx.toggle(P.speed !== 1); };
  ['#b-qs', '#b-ff'].forEach(s => $(s).disabled = true);
}
function updateFfButton() {
  const b = $('#b-ff');
  b.innerHTML = PI.ff + `<span>${P.speed === 1 ? fmtNum(pref('ffSpeed')) : fmtNum(P.speed)}×</span>`;
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
    logPlayDay(add);
  } catch (e) { TIME.pending += add; }
}
function startTicker() {
  setInterval(() => {
    if (!P.started || P.exiting) return;
    const e = emu();
    if (document.hidden || P.menuOpen || (P.pad && P.pad.editing) || !e || e.paused) return;
    /* Akku-Modus: nach 5 Minuten ohne Eingabe pausieren */
    if (P.battery && Date.now() - P.lastInput > IDLE_MS) {
      try { e.pause(); } catch (err) { /* egal */ }
      P.idlePaused = true;
      autoSave();
      notice(t('bat.paused'));
      return;
    }
    TIME.pending += 1000;
    TIME.sinceAuto += 1000;
    if (TIME.pending >= 30000) flushPlayTime();
    const min = Number(pref('autosaveMin')) || 0;
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
      <button class="row" data-a="players"><span class="ico" style="background:#e5433d">${PI.pad}</span><span class="lbl">${esc(t('pl2.title'))}</span><span class="val">${esc(playersSummary())}</span>${PI.chev}</button>
      <button class="row" data-a="notes"><span class="ico" style="background:#e0a400">${PI.notes}</span><span class="lbl">${esc(t('notes.title'))}${P.rom.notes ? `<span class="sub">${esc(P.rom.notes.split('\n')[0].slice(0, 60))}</span>` : ''}</span>${PI.chev}</button>
      <button class="row" data-a="sav"><span class="ico" style="background:#2fa4e7">${PI.file}</span><span class="lbl">${esc(t('sf.title'))}</span>${PI.chev}</button>
      <div class="row"><span class="ico" style="background:#2fb784">${PI.bat}</span><span class="lbl">${esc(t('bat.title'))}</span>
        <label class="switch"><input type="checkbox" id="batsw" ${P.battery ? 'checked' : ''}><span class="track"></span><span class="knob"></span></label></div>
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
    else if (a === 'players') playersSheet(ov, close);
    else if (a === 'notes') notesSheet(ov, close);
    else if (a === 'sav') savSheet(ov, close);
    else if (a === 'ctl') { close(); try { emu().controlMenu.style.display = ''; } catch (e) { /* egal */ } }
    else if (a === 'shot') { close(); await sleep(120); takeScreenshot(); }
    else if (a === 'arrange') {
      const wasPaused = close.wasPaused;
      close(true);
      try { if (P.started) emu().pause(); } catch (e) { /* egal */ }
      if (!padWanted()) await setPadMode('on');
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
  $('#batsw', box).onchange = e => { setBattery(e.target.checked); Sfx.toggle(e.target.checked); if (e.target.checked) toast(t('bat.next')); };
  $('#snd', box).onchange = e => { setMuted(!e.target.checked); Sfx.toggle(e.target.checked); };
  $('#padsw', box).onchange = async e => { await setPadMode(e.target.checked ? 'on' : 'off'); Sfx.toggle(e.target.checked); updatePad(); };
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

/* ---------- Notizen zum Spiel (Codes, Passwörter, Fortschritt) ---------- */
function notesSheet(ov, close) {
  const box = $('#pm', ov);
  box.innerHTML = `<h4>${esc(t('notes.title'))}</h4>
    <textarea class="notes-area" id="nt" placeholder="${esc(t('notes.ph'))}" maxlength="5000">${esc(P.rom.notes || '')}</textarea>
    <div class="btn-row" style="margin-top:12px"><button class="btn" data-b>${esc(t('c.back'))}</button></div>`;
  const ta = $('#nt', box);
  let timer = 0;
  const save = async () => {
    clearTimeout(timer);
    const v = ta.value;
    if (v === (P.rom.notes || '')) return;
    P.rom.notes = v;
    try { const r = await DB.get('roms', P.rom.id); if (v.trim()) r.notes = v; else delete r.notes; await DB.put('roms', r); } catch (e) { /* egal */ }
  };
  ta.oninput = () => { clearTimeout(timer); timer = setTimeout(save, 600); };
  ta.onblur = save;
  $('[data-b]', box).onclick = async () => { await save(); Sfx.back(); renderMenu(ov, close); };
}

/* ---------- Spielstand-Datei (.sav) austauschen ---------- */
function savSheet(ov, close) {
  const box = $('#pm', ov);
  box.innerHTML = `<h4>${esc(t('sf.title'))}</h4>
    <p class="muted small" style="margin:0 4px 12px">${esc(t('sf.intro'))}</p>
    <div class="group">
      <button class="row" data-s="exp"><span class="ico" style="background:#2fa4e7">${PI.share}</span><span class="lbl">${esc(t('sf.export'))}</span></button>
      <button class="row" data-s="imp"><span class="ico" style="background:#2fb784">${PI.file}</span><span class="lbl">${esc(t('sf.import'))}<span class="sub">${esc(t('sf.importSub'))}</span></span></button>
    </div>
    <div class="btn-row" style="margin-top:14px"><button class="btn" data-b>${esc(t('c.back'))}</button></div>`;
  $('[data-b]', box).onclick = () => { Sfx.back(); renderMenu(ov, close); };
  $('[data-s="exp"]', box).onclick = () => {
    let data = null;
    try { data = gm().getSaveFile(); } catch (e) { data = null; }
    if (!data || !data.length) { Sfx.err(); toast(t('sf.none'), 'err'); return; }
    shareOrDownload(new Blob([data]), fileSafe(P.rom.name) + '.sav').then(ok => { if (ok) toast(t('sf.exported')); });
  };
  $('[data-s="imp"]', box).onclick = () => {
    const inp = document.createElement('input');
    inp.type = 'file'; inp.style.display = 'none';
    document.body.appendChild(inp);
    inp.onchange = async () => {
      const f = inp.files && inp.files[0]; inp.remove();
      if (!f) return;
      if (!f.size || f.size > 16 * 1024 * 1024) { Sfx.err(); toast(t('sf.bad'), 'err'); return; }
      if (!confirm(t('sf.importX') + '\n\n' + t('sf.restart'))) return;
      try {
        const g = gm(), bytes = new Uint8Array(await f.arrayBuffer()), path = g.getSaveFilePath();
        let cp = '';
        path.split('/').slice(0, -1).forEach(part => { if (!part) return; cp += '/' + part; if (!g.FS.analyzePath(cp).exists) g.FS.mkdir(cp); });
        if (g.FS.analyzePath(path).exists) g.FS.unlink(path);
        g.FS.writeFile(path, bytes);
        g.loadSaveFiles();
        await new Promise(res => { try { g.FS.syncfs(false, () => res()); } catch (e) { res(); } });
        g.restart();
        Sfx.ok(); toast(t('sf.imported'));
        close();
      } catch (e) { Sfx.err(); toast(t('c.error', { e: e.message }), 'err'); }
    };
    inp.click();
  };
}

/* ---------- Akku-Modus ---------- */
function setBattery(on) {
  P.battery = !!on;
  Settings.set('battery', P.battery);
  document.body.classList.toggle('lowpower', P.battery);
  P.lastInput = Date.now();
}
function markInput() {
  P.lastInput = Date.now();
  if (P.idlePaused) {
    P.idlePaused = false;
    try { if (!P.menuOpen) emu().play(); } catch (e) { /* egal */ }
  }
}

function playersSummary() {
  const e = emu();
  const n = ((e && e.gamepadSelection) || []).filter(Boolean).length;
  return n ? t('pl2.count', { n }) : '';
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
  const m = pref('padMode') || 'auto';
  if (m === 'off') return false;
  if (m === 'on') return true;
  return Pad.hasTouch() && !player1HasController();
}
/* Hat Spieler 1 einen Controller? (sonst Bildschirmtasten, auch wenn Spieler 2 einen hat) */
function player1HasController() {
  const e = emu();
  if (e && Array.isArray(e.gamepadSelection) && e.gamepadSelection.length) return !!e.gamepadSelection[0];
  return Pad.gamepadConnected();
}
function ejsMenuOpen() {
  const e = emu();
  try { return !!(e && ((e.settingsMenu && e.settingsMenu.style.display !== 'none') || (e.isPopupOpen && e.isPopupOpen()))); } catch (err) { return false; }
}
function updatePad() {
  /* Controller-Tasten zählen als Eingabe (Akku-Modus) */
  try { for (const gp of (navigator.getGamepads ? navigator.getGamepads() : [])) if (gp && gp.buttons.some(b => b.pressed)) { markInput(); break; } } catch (e) { /* egal */ }
  if (!P.pad || P.pad.editing) return;
  const want = padWanted();
  P.pad.setVisible(want && !ejsMenuOpen());
  if (want !== P.padShown) { P.padShown = want; applyFrame(); }
}
function setupPad() {
  P.pad = Pad.create($('#pad'), {
    sys: P.sys.id, rewind: P.rewind, look: currentLook,
    send: (i, v) => { markInput(); const g = gm(); if (g && P.started) { try { g.simulateInput(0, i, v); } catch (e) { /* egal */ } } }
  });
  P.padShown = padWanted();
  applyFrame();
  updatePad();
  window.addEventListener('gamepadconnected', updatePad);
  window.addEventListener('gamepaddisconnected', updatePad);
  setInterval(updatePad, 500);
  new ResizeObserver(() => applyFrame()).observe($('#stage'));
  loadSkinImages().then(() => { applyFrame(); P.pad.layout(); });
}

/* ---------- Skins: Tasten, Gehäuse oder eigenes Bild ---------- */
function chosenSkin() {
  const p = (P.rom && P.rom.prefs) || {};
  if (p.skin && p.skin !== 'auto') return p.skin;
  const bySys = (Settings.get('padSkinBySys') || {})[P.sys.id];
  return bySys || Settings.get('padSkin') || 'konsolarium';
}
function stageOrient() { const r = $('#stage').getBoundingClientRect(); return r.width > r.height ? 'q' : 'p'; }
function currentLook() {
  let skin = chosenSkin();
  if (skin === 'bild') {
    const im = SK.img[stageOrient()];
    const g = Settings.get('padSkin');
    if (im) return { kind: 'img', skin: Pad.SKINS.includes(g) ? g : 'glas', ghost: !!im.hide, img: im };
    skin = g === 'bild' ? 'konsolarium' : g;
  }
  if (!Pad.ALL_SKINS.includes(skin)) skin = 'konsolarium';
  return { kind: Pad.isBody(skin) ? 'body' : 'none', skin };
}
async function loadSkinImages() {
  for (const o of ['p', 'q']) {
    try {
      const rec = await SkinStore.get(P.sys.id, o);
      if (rec && rec.blob && rec.w && rec.h) SK.img[o] = { url: URL.createObjectURL(rec.blob), w: rec.w, h: rec.h, hide: !!rec.hide };
    } catch (e) { /* ohne Bild weiter */ }
  }
}
function applyFrame() {
  if (!P.sys) return;
  const r = $('#stage').getBoundingClientRect();
  const look = currentLook();
  const kind = P.padShown ? look.kind : 'none';
  const rects = Pad.frameRects(r.width, r.height, P.sys.id, kind, look.img);
  const q = rects.game, key = [q.l, q.t, q.w, q.h].join(',');
  if (P.frameKey !== key) {
    P.frameKey = key;
    Object.assign($('#gamebox').style, { left: q.l + 'px', top: q.t + 'px', width: q.w + 'px', height: q.h + 'px' });
  }
  Pad.paintBody($('#kbody'), kind, look.skin, rects, look.img && look.img.url);
}

/* ---------- Gesten auf dem Spielbild (zwei Finger) ----------
   Wischen nach rechts: Vorspulen an/aus · nach links und halten: Zurückspulen · zweimal tippen: Schnellspeichern.
   Bewusst nur mit zwei Fingern und klaren Schwellen, damit nichts aus Versehen auslöst. */
function setupGestures() {
  const stage = $('#stage');
  const G = { pts: new Map(), t0: 0, c0: null, max: 0, mode: null, moved: false, lastTap: 0, rw: false };
  const on = () => Settings.get('gestures') !== false && P.started && !P.menuOpen && !(P.pad && P.pad.editing);
  const centroid = () => { let x = 0, y = 0; G.pts.forEach(p => { x += p.x; y += p.y; }); return { x: x / G.pts.size, y: y / G.pts.size }; };
  const stopRw = () => { if (G.rw) { G.rw = false; try { gm().simulateInput(0, 28, 0); } catch (e) { /* egal */ } } };
  stage.addEventListener('touchstart', ev => {
    for (const tch of ev.changedTouches) {
      const tgt = tch.target;
      if (tgt && tgt.closest && tgt.closest('.pc')) continue; /* Bildschirmtasten nicht mitzählen */
      G.pts.set(tch.identifier, { x0: tch.clientX, y0: tch.clientY, x: tch.clientX, y: tch.clientY });
    }
    if (G.pts.size === 2 && G.max < 2) { G.t0 = Date.now(); G.c0 = centroid(); G.mode = null; G.moved = false; }
    G.max = Math.max(G.max, G.pts.size);
  }, { passive: true, capture: true });
  stage.addEventListener('touchmove', ev => {
    for (const tch of ev.changedTouches) { const p = G.pts.get(tch.identifier); if (p) { p.x = tch.clientX; p.y = tch.clientY; } }
    if (G.pts.size !== 2 || !G.c0) return;
    const c = centroid(), dx = c.x - G.c0.x, dy = c.y - G.c0.y;
    if (Math.hypot(dx, dy) > 14) G.moved = true;
    if (G.mode || !on() || Date.now() - G.t0 > 900) return;
    const both = [...G.pts.values()].every(p => Math.sign(p.x - p.x0) === Math.sign(dx) && Math.abs(p.x - p.x0) > 45);
    if (Math.abs(dx) < 80 || Math.abs(dx) < Math.abs(dy) * 2.2 || !both) return;
    if (dx > 0) {
      G.mode = 'ff';
      setSpeed(P.speed === 1 ? pref('ffSpeed') : 1);
      Sfx.toggle(P.speed !== 1);
      notice(P.speed !== 1 ? t('ges.ffOn', { n: fmtNum(P.speed) }) : t('ges.ffOff'));
    } else if (P.rewind) {
      G.mode = 'rw'; G.rw = true;
      try { gm().simulateInput(0, 28, 1); } catch (e) { /* egal */ }
      notice(t('ges.rewind'));
    } else { G.mode = 'none'; notice(t('ges.noRewind')); }
  }, { passive: true, capture: true });
  const end = ev => {
    for (const tch of ev.changedTouches) G.pts.delete(tch.identifier);
    if (G.mode === 'rw' && G.pts.size < 2) stopRw();
    if (G.pts.size) return;
    const tap = G.max === 2 && !G.moved && !G.mode && G.c0 && Date.now() - G.t0 < 350;
    G.max = 0; G.c0 = null; G.mode = null;
    if (!tap || !on()) return;
    const now = Date.now();
    if (now - G.lastTap < 450) {
      G.lastTap = 0;
      saveState('quick').then(ok => { if (ok) notice(t('ges.saved')); });
    } else G.lastTap = now;
  };
  stage.addEventListener('touchend', end, { passive: true, capture: true });
  stage.addEventListener('touchcancel', ev => { end(ev); stopRw(); }, { passive: true, capture: true });
}

/* ---------- Zwei Spieler mit Controllern ---------- */
/* EmulatorJS belegt nur Spieler 1 vor. Spieler 2–4 bekommen dieselben Controller-Tasten (ohne Tastatur). */
function setupPlayers() {
  const e = emu();
  if (!e || !e.controls) return;
  const base = (e.defaultControllers && e.defaultControllers[0]) || e.controls[0] || {};
  const pads = {};
  Object.keys(base).forEach(k => { if (base[k] && base[k].value2 !== undefined) pads[k] = { value2: base[k].value2 }; });
  let changed = false;
  for (let pl = 1; pl < 4; pl++) {
    if (e.defaultControllers && (!e.defaultControllers[pl] || !Object.keys(e.defaultControllers[pl]).length)) e.defaultControllers[pl] = JSON.parse(JSON.stringify(pads));
    const cur = e.controls[pl] || {};
    const hasPad = Object.values(cur).some(v => v && v.value2 !== undefined && v.value2 !== '');
    if (!hasPad) { e.controls[pl] = Object.assign(cur, JSON.parse(JSON.stringify(pads))); changed = true; }
  }
  if (changed) { try { e.checkGamepadInputs && e.checkGamepadInputs(); e.saveSettings(); } catch (err) { /* egal */ } }
  /* Hinweis, wenn ein Controller einem Spieler zugeordnet wird */
  let last = JSON.stringify(e.gamepadSelection || []);
  setInterval(() => {
    const cur = e.gamepadSelection || [];
    const now = JSON.stringify(cur);
    if (now === last) return;
    const before = JSON.parse(last);
    last = now;
    cur.forEach((id, i) => { if (id && before[i] !== id) notice(t('pl2.joined', { n: i + 1 })); });
    updatePad();
  }, 700);
}
function gamepadName(id) { return String(id || '').replace(/_\d+$/, '').replace(/\s*\(.*?\)\s*/g, ' ').trim() || id; }
function playersSheet(ov, close) {
  const e = emu();
  const box = $('#pm', ov);
  const list = (e && e.gamepad && e.gamepad.gamepads) || [];
  const ids = list.map(g => g.id + '_' + g.index);
  const sel = (e && e.gamepadSelection) || [];
  box.innerHTML = `<h4>${esc(t('pl2.title'))}</h4>
    <p class="muted small" style="margin:0 4px 10px">${esc(t('pl2.intro'))}</p>
    ${ids.length ? `<div class="group">${[0, 1, 2, 3].map(i => `<div class="row"><span class="ico" style="background:${['#3a8ce0', '#e5433d', '#2fb784', '#e0a400'][i]}">${i + 1}</span><span class="lbl">${esc(t('pl2.player', { n: i + 1 }))}</span>
      <select class="select" data-pl="${i}"><option value="">${esc(i === 0 ? t('pl2.touch') : t('pl2.none'))}</option>${ids.map(id => `<option value="${esc(id)}" ${sel[i] === id ? 'selected' : ''}>${esc(gamepadName(id))}</option>`).join('')}</select></div>`).join('')}</div>`
      : `<div class="empty-s">${esc(t('pl2.noPads'))}</div>`}
    <div class="btn-row" style="margin-top:14px"><button class="btn" data-b>${esc(t('c.back'))}</button>${ids.length > 1 ? `<button class="btn" data-sw>${esc(t('pl2.swap'))}</button>` : ''}</div>`;
  const apply = () => { try { e.updateGamepadLabels && e.updateGamepadLabels(); } catch (err) { /* egal */ } updatePad(); };
  $$('[data-pl]', box).forEach(s => s.onchange = () => {
    const pl = Number(s.dataset.pl), v = s.value;
    if (!e.gamepadSelection) return;
    for (let i = 0; i < e.gamepadSelection.length; i++) if (i !== pl && v && e.gamepadSelection[i] === v) e.gamepadSelection[i] = '';
    e.gamepadSelection[pl] = v;
    Sfx.tap(); apply(); playersSheet(ov, close);
  });
  if ($('[data-sw]', box)) $('[data-sw]', box).onclick = () => {
    const a = e.gamepadSelection[0]; e.gamepadSelection[0] = e.gamepadSelection[1] || ''; e.gamepadSelection[1] = a || '';
    Sfx.tap(); apply(); playersSheet(ov, close);
  };
  $('[data-b]', box).onclick = () => { Sfx.back(); renderMenu(ov, close); };
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
  setupPlayers();
  /* Pfad der Spielstand-Datei merken – damit sie auch außerhalb des Spiels ausgetauscht werden kann */
  try {
    const sp = gm().getSaveFilePath();
    if (sp && P.rom.savePath !== sp) { P.rom.savePath = sp; DB.get('roms', P.rom.id).then(r => { if (r) { r.savePath = sp; return DB.put('roms', r); } }).catch(() => {}); }
  } catch (e) { /* egal */ }
  if (P.battery) notice(t('bat.on'));
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
  setBattery(Settings.get('battery') === true);
  P.rewind = pref('rewind') !== false && REWIND_SYS.includes(sys.id) && !P.battery;
  ['touchstart', 'keydown', 'pointerdown'].forEach(ev => window.addEventListener(ev, markInput, { passive: true, capture: true }));
  setupPad();
  setupGestures();
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
