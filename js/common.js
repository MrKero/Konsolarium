/* Konsolarium – gemeinsame Grundfunktionen (App + Spieler) */

const APP = { name: 'Konsolarium', version: '1.3.0', date: '2026-11-15', ejs: '4.2.3', author: 'Kerem' };

/* ---------- Einstellungen ---------- */
const Settings = (() => {
  const KEY = 'ks.settings';
  const defaults = {
    lang: null, theme: 'auto', bg: 'vitrine', icon: 'cart',
    gameSound: true, clicks: true, autoUpdate: true, autosave: true,
    ffSpeed: 2, sortSys: 'old', sortLib: 'recent', cores: {}, offlineDone: false,
    autosaveMin: 5, rewind: true, padSkin: 'konsolarium', padOpacity: 0.85, padScale: 1, padMode: 'auto', padLayouts: {}
  };
  let data;
  try { data = Object.assign({}, defaults, JSON.parse(localStorage.getItem(KEY) || '{}')); }
  catch (e) { data = Object.assign({}, defaults); }
  if (!data.lang) data.lang = (typeof detectLang === 'function') ? detectLang() : 'de';
  const listeners = [];
  function save() { try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) { /* Speicher voll */ } }
  return {
    get: k => data[k],
    set(k, v) { data[k] = v; save(); listeners.forEach(fn => fn(k, v)); },
    on(fn) { listeners.push(fn); },
    reset() { localStorage.removeItem(KEY); }
  };
})();
window.Settings = Settings;

/* ---------- Darstellung ---------- */
const Look = (() => {
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  function resolvedTheme() {
    const t = Settings.get('theme');
    return t === 'auto' ? (mq.matches ? 'dark' : 'light') : t;
  }
  function apply() {
    const root = document.documentElement;
    const theme = resolvedTheme();
    root.dataset.theme = theme;
    root.dataset.bg = Settings.get('bg');
    const li = langInfo(Settings.get('lang'));
    root.lang = li.code === 'zht' ? 'zh-Hant' : li.code === 'zh' ? 'zh-Hans' : li.code;
    root.dir = li.rtl ? 'rtl' : 'ltr';
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === 'dark' ? '#15122a' : '#efecf8';
    applyIcon();
  }
  function applyIcon() {
    const key = Settings.get('icon');
    const href = `icons/icon-${key}-180.png`;
    let l = document.querySelector('link[rel="apple-touch-icon"]');
    if (l && !l.href.endsWith(href)) l.href = href;
    let f = document.querySelector('link[rel="icon"]');
    if (f) f.href = `icons/icon-${key}-192.png`;
  }
  mq.addEventListener && mq.addEventListener('change', apply);
  Settings.on(k => { if (['theme', 'bg', 'lang', 'icon'].includes(k)) apply(); });
  return { apply, resolvedTheme };
})();

/* ---------- Zoomen deaktivieren ---------- */
(function blockZoom() {
  ['gesturestart', 'gesturechange', 'gestureend'].forEach(ev => document.addEventListener(ev, e => e.preventDefault(), { passive: false }));
  document.addEventListener('touchmove', e => { if (e.scale !== undefined && e.scale !== 1) e.preventDefault(); }, { passive: false });
  document.addEventListener('wheel', e => { if (e.ctrlKey) e.preventDefault(); }, { passive: false });
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && ['+', '-', '=', '0'].includes(e.key)) e.preventDefault();
  });
})();

/* ---------- Klicksounds (8-Bit-Töne per WebAudio) ---------- */
const Sfx = (() => {
  let ctx = null;
  function ac() {
    if (!ctx) { const C = window.AudioContext || window.webkitAudioContext; if (!C) return null; ctx = new C(); }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }
  function tone(freqs, dur = 0.05, type = 'square', vol = 0.035) {
    if (!Settings.get('clicks')) return;
    const c = ac(); if (!c) return;
    let t0 = c.currentTime;
    freqs.forEach(f => {
      const o = c.createOscillator(), g = c.createGain();
      o.type = type; o.frequency.setValueAtTime(f, t0);
      g.gain.setValueAtTime(vol, t0); g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      o.connect(g); g.connect(c.destination); o.start(t0); o.stop(t0 + dur + 0.01);
      t0 += dur * 0.9;
    });
  }
  return {
    tap: () => tone([880], 0.035),
    toggle: on => tone(on ? [660, 990] : [990, 660], 0.04),
    back: () => tone([520], 0.04, 'triangle', 0.05),
    ok: () => tone([660, 880, 1320], 0.05),
    err: () => tone([220, 180], 0.08, 'sawtooth', 0.03),
    coin: () => tone([988, 1319], 0.07, 'square', 0.04),
    jingle: () => tone([523, 659, 784, 1047, 784, 1047], 0.09, 'square', 0.035)
  };
})();

/* ---------- Hilfsfunktionen ---------- */
function $(sel, root = document) { return root.querySelector(sel); }
function $$(sel, root = document) { return Array.from(root.querySelectorAll(sel)); }
function esc(s) { return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
function uid() { return (crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2)); }
function fmtBytes(n) {
  if (!n && n !== 0) return '–';
  const u = ['B', 'KB', 'MB', 'GB']; let i = 0;
  while (n >= 1024 && i < u.length - 1) { n /= 1024; i++; }
  return (i === 0 ? n : n.toFixed(n < 10 ? 1 : 0)) + ' ' + u[i];
}
function locale() {
  const l = Settings.get('lang');
  return { zht: 'zh-TW', zh: 'zh-CN', de: 'de-DE', en: 'en-GB', tr: 'tr-TR', es: 'es-ES', fr: 'fr-FR', it: 'it-IT', ru: 'ru-RU', ja: 'ja-JP', ko: 'ko-KR', ar: 'ar', fa: 'fa-IR' }[l] || l;
}
function fmtDate(ts, withTime) {
  if (!ts) return t('rom.never');
  const o = withTime ? { dateStyle: 'medium', timeStyle: 'short' } : { dateStyle: 'medium' };
  try { return new Intl.DateTimeFormat(locale(), o).format(new Date(ts)); } catch (e) { return new Date(ts).toLocaleString(); }
}
function fmtNum(n) { try { return new Intl.NumberFormat(locale()).format(n); } catch (e) { return String(n); } }
/* Spielzeit lesbar: „45 Min.“, „3 Std. 12 Min.“ */
function fmtDuration(ms) {
  const m = Math.floor((ms || 0) / 60000);
  if (m < 1) return t('dur.lt1');
  if (m < 60) return t('dur.m', { m: fmtNum(m) });
  return t('dur.hm', { h: fmtNum(Math.floor(m / 60)), m: fmtNum(m % 60) });
}
function nGames(n) { return n === 1 ? t('n.game') : t('n.games', { n: fmtNum(n) }); }

let toastTimer = null;
function toast(msg, kind, ms) {
  let el = document.getElementById('toast');
  if (!el) { el = document.createElement('div'); el.id = 'toast'; document.body.appendChild(el); }
  el.textContent = msg;
  el.className = 'show' + (kind ? ' ' + kind : '');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.className = ''; }, ms || 2600);
}

/* ---------- Datenbank (IndexedDB) ---------- */
const DB = (() => {
  const NAME = 'konsolarium', VERSION = 1;
  let dbp = null;
  function open() {
    if (dbp) return dbp;
    dbp = new Promise((resolve, reject) => {
      const r = indexedDB.open(NAME, VERSION);
      r.onupgradeneeded = () => {
        const d = r.result;
        if (!d.objectStoreNames.contains('roms')) d.createObjectStore('roms', { keyPath: 'id' });
        if (!d.objectStoreNames.contains('romdata')) d.createObjectStore('romdata', { keyPath: 'id' });
        if (!d.objectStoreNames.contains('bios')) { const b = d.createObjectStore('bios', { keyPath: 'id' }); b.createIndex('system', 'system'); }
        if (!d.objectStoreNames.contains('states')) { const s = d.createObjectStore('states', { keyPath: 'id' }); s.createIndex('romId', 'romId'); }
        if (!d.objectStoreNames.contains('statedata')) d.createObjectStore('statedata', { keyPath: 'id' });
        if (!d.objectStoreNames.contains('cheats')) { const c = d.createObjectStore('cheats', { keyPath: 'id' }); c.createIndex('romId', 'romId'); }
      };
      r.onsuccess = () => resolve(r.result);
      r.onerror = () => reject(r.error);
    });
    return dbp;
  }
  function req2p(r) { return new Promise((res, rej) => { r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); }); }
  async function store(name, mode = 'readonly') { const d = await open(); return d.transaction(name, mode).objectStore(name); }
  return {
    open,
    async get(s, k) { return req2p((await store(s)).get(k)); },
    async put(s, v) { return req2p((await store(s, 'readwrite')).put(v)); },
    async del(s, k) { return req2p((await store(s, 'readwrite')).delete(k)); },
    async all(s) { return req2p((await store(s)).getAll()); },
    async keys(s) { return req2p((await store(s)).getAllKeys()); },
    async byIndex(s, idx, v) { return req2p((await store(s)).index(idx).getAll(v)); },
    async clear(s) { return req2p((await store(s, 'readwrite')).clear()); },
    close() { if (dbp) dbp.then(d => d.close()); dbp = null; }
  };
})();

/* Spielstände eines Spiels inkl. Löschen */
const Store = {
  async deleteRom(id) {
    const states = await DB.byIndex('states', 'romId', id);
    for (const s of states) { await DB.del('states', s.id); await DB.del('statedata', s.id); }
    const cheats = await DB.byIndex('cheats', 'romId', id);
    for (const c of cheats) await DB.del('cheats', c.id);
    await DB.del('romdata', id);
    await DB.del('roms', id);
  },
  async deleteState(id) { await DB.del('states', id); await DB.del('statedata', id); },
  async latestState(romId) {
    const st = await DB.byIndex('states', 'romId', romId);
    st.sort((a, b) => b.created - a.created);
    return st[0] || null;
  }
};

/* ---------- Service Worker, Offline & Updates ---------- */
const Updater = (() => {
  async function register() {
    if (!('serviceWorker' in navigator)) return null;
    try { return await navigator.serviceWorker.register('sw.js'); } catch (e) { return null; }
  }
  async function remoteVersion() {
    const r = await fetch('version.json?ts=' + Date.now(), { cache: 'no-store' });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return r.json();
  }
  function newer(a, b) {
    const pa = a.split('.').map(Number), pb = b.split('.').map(Number);
    for (let i = 0; i < 3; i++) { if ((pa[i] || 0) > (pb[i] || 0)) return true; if ((pa[i] || 0) < (pb[i] || 0)) return false; }
    return false;
  }
  function swMessage(msg) {
    return new Promise((resolve, reject) => {
      const sw = navigator.serviceWorker && navigator.serviceWorker.controller;
      if (!sw) return reject(new Error('no-sw'));
      const ch = new MessageChannel();
      ch.port1.onmessage = e => e.data && e.data.error ? reject(new Error(e.data.error)) : resolve(e.data);
      sw.postMessage(msg, [ch.port2]);
    });
  }
  /* Prüft auf eine neuere Version. Liefert {status:'none'|'available'|'offline', version} */
  async function check() {
    if (!navigator.onLine) return { status: 'offline' };
    try {
      const v = await remoteVersion();
      if (newer(v.version, APP.version)) return { status: 'available', version: v.version };
      return { status: 'none', version: APP.version };
    } catch (e) { return { status: 'offline' }; }
  }
  async function install(version) {
    localStorage.setItem('ks.updTried', version || '');
    try { await swMessage({ type: 'update' }); } catch (e) { /* ohne SW einfach neu laden */ }
    localStorage.setItem('ks.updated', version || '');
    location.reload();
  }
  async function auto() {
    if (!Settings.get('autoUpdate')) return;
    const r = await check();
    /* Schutz vor Endlosschleife, falls version.json und App-Dateien nicht zusammenpassen */
    if (r.status === 'available' && localStorage.getItem('ks.updTried') !== r.version) install(r.version);
  }
  function announce() {
    const v = localStorage.getItem('ks.updated');
    if (v) { localStorage.removeItem('ks.updated'); setTimeout(() => toast(t('upd.done', { v: APP.version })), 600); }
  }
  return { register, check, install, auto, announce, swMessage };
})();

/* Liste aller Emulator-Kern-Dateien (für "Alle offline bereithalten") */
const CORE_FILES = [
  'stella2014-legacy-wasm.data', 'a5200-legacy-wasm.data', 'gearcoleco-legacy-wasm.data', 'vice_x64sc-legacy-wasm.data', 'fuse-legacy-wasm.data',
  'cap32-legacy-wasm.data', 'puae-legacy-wasm.data', 'fceumm-legacy-wasm.data', 'nestopia-legacy-wasm.data', 'smsplus-legacy-wasm.data',
  'prosystem-legacy-wasm.data', 'mednafen_pce-legacy-wasm.data', 'genesis_plus_gx-legacy-wasm.data', 'gambatte-legacy-wasm.data',
  'handy-legacy-wasm.data', 'snes9x-legacy-wasm.data', 'fbneo-legacy-wasm.data', 'virtualjaguar-legacy-wasm.data', 'opera-legacy-wasm.data',
  'picodrive-legacy-wasm.data', 'yabause-legacy-wasm.data', 'beetle_vb-legacy-wasm.data', 'mednafen_ngp-legacy-wasm.data',
  'mednafen_wswan-legacy-wasm.data', 'mgba-legacy-wasm.data', 'parallel_n64-legacy-wasm.data', 'melonds-wasm.data', 'desmume2015-wasm.data',
  'mupen64plus_next-wasm.data', 'pcsx_rearmed-wasm.data', 'ppsspp-thread-wasm.data', 'ppsspp-assets.zip', 'dosbox_pure-thread-legacy-wasm.data'
];
const CORE_CACHE = 'ks-ejs-' + APP.ejs;
/* Große Dateien der Labor-Emulatoren (3DS, PS2, GameCube/Wii) – eigener Cache, siehe sw.js */
const LAB_CACHE = 'ks-labs-1';
const LAB_FILES = [
  '3ds/azahar_webgl2.js', '3ds/azahar_webgl2.wasm', '3ds/azahar.js', '3ds/azahar.wasm',
  'ps2/Play.js', 'ps2/Play.wasm',
  'dolphin/cores/dolphin/dolphin-core-upstream.js', 'dolphin/cores/dolphin/dolphin-core-upstream.wasm'
];
const OFFLINE_FILES = CORE_FILES.map(f => [CORE_CACHE, 'emulatorjs/cores/' + f])
  .concat(LAB_FILES.map(f => [LAB_CACHE, 'labs/' + f]));
const CORE_TOTAL_MB = 98;

function absUrl(u) { return new URL(u, location.href).href; }
async function cacheAllCores(onProgress) {
  let i = 0;
  for (const [cacheName, url] of OFFLINE_FILES) {
    i++;
    onProgress && onProgress(i, OFFLINE_FILES.length);
    const cache = await caches.open(cacheName);
    if (await cache.match(absUrl(url))) continue;
    const r = await fetch(url);
    if (!r.ok) throw new Error(url + ': HTTP ' + r.status);
    await cache.put(absUrl(url), r);
  }
  return true;
}
async function coresCachedCount() {
  if (!('caches' in window)) return 0;
  let n = 0;
  for (const [cacheName, url] of OFFLINE_FILES) {
    const cache = await caches.open(cacheName);
    if (await cache.match(absUrl(url))) n++;
  }
  return n;
}

/* Beim Start anwenden */
Look.apply();
