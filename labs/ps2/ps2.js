/* Konsolarium – PS2-Labor: steuert die WebAssembly-Version von Play! (BSD-Lizenz, Jean-Philip Desjardins).
   Tastatur, Gamepad und Bildschirm-Tasten werden in Tastatur-Ereignisse auf #outputCanvas übersetzt,
   denn darauf hört die Browser-Version von Play!. Die Disc wird stückweise aus der Datei gelesen. */

const B = window.KSBridge;
const canvas = document.getElementById('outputCanvas');
const statusEl = document.getElementById('status');
const fpsEl = document.getElementById('fps');
const pad = document.getElementById('pad');
const padToggle = document.getElementById('padtoggle');

const ALLOWED = ['iso', 'cso', 'chd', 'isz', 'bin', 'elf'];
const KEYMAP = {
  ArrowUp: 'ArrowUp', ArrowDown: 'ArrowDown', ArrowLeft: 'ArrowLeft', ArrowRight: 'ArrowRight',
  Enter: 'Enter', NumpadEnter: 'Enter', Backspace: 'Backspace',
  KeyA: 'KeyA', KeyS: 'KeyS', KeyZ: 'KeyZ', KeyX: 'KeyX',
  KeyF: 'KeyF', KeyH: 'KeyH', KeyT: 'KeyT', KeyG: 'KeyG', KeyJ: 'KeyJ', KeyL: 'KeyL', KeyI: 'KeyI', KeyK: 'KeyK',
  Digit1: 'Key1', Digit2: 'Key2', Digit3: 'Key3', Digit8: 'Key8', Digit9: 'Key9', Digit0: 'Key0'
};
const GAMEPAD = { 0: 'KeyZ', 1: 'KeyX', 2: 'KeyA', 3: 'KeyS', 4: 'Key1', 5: 'Key8', 6: 'Key2', 7: 'Key9', 8: 'Backspace', 9: 'Enter', 10: 'Key3', 11: 'Key0', 12: 'ArrowUp', 13: 'ArrowDown', 14: 'ArrowLeft', 15: 'ArrowRight' };

let play = null;
const held = new Map(); // code -> Set von Quellen

function status(text) { statusEl.textContent = text || ''; }

function send(code, down) {
  canvas.dispatchEvent(new KeyboardEvent(down ? 'keydown' : 'keyup', { code, key: code, bubbles: true, cancelable: true }));
  pad.querySelectorAll(`[data-code="${code}"]`).forEach(b => b.classList.toggle('held', down));
}
function setKey(code, down, src) {
  let s = held.get(code);
  if (!s) { s = new Set(); held.set(code, s); }
  const before = s.size > 0;
  if (down) s.add(src); else s.delete(src);
  if (before !== s.size > 0) send(code, s.size > 0);
}
function releaseAll() { for (const [code, s] of held) if (s.size) { s.clear(); send(code, false); } }

/* Tastatur */
function onKey(e) {
  if (!e.isTrusted || e.ctrlKey || e.metaKey || e.altKey) return;
  const code = KEYMAP[e.code];
  if (!code) return;
  e.preventDefault(); e.stopPropagation();
  if (e.repeat) return;
  setKey(code, e.type === 'keydown', 'kbd:' + code);
}
window.addEventListener('keydown', onKey, true);
window.addEventListener('keyup', onKey, true);
window.addEventListener('blur', releaseAll);

/* Gamepad (Standard-Belegung) */
function axis(v, neg, pos, src) { setKey(neg, v < -0.35, src + 'n'); setKey(pos, v > 0.35, src + 'p'); }
function pollPads() {
  const pads = navigator.getGamepads ? navigator.getGamepads() : [];
  const p = Array.from(pads).find(x => x && x.connected);
  if (p) {
    for (const [i, code] of Object.entries(GAMEPAD)) {
      const b = p.buttons[Number(i)];
      setKey(code, !!(b && (b.pressed || b.value > 0.4)), 'pad:' + i);
    }
    const a = p.axes || [];
    axis(a[0] || 0, 'KeyF', 'KeyH', 'pad:lx'); axis(a[1] || 0, 'KeyT', 'KeyG', 'pad:ly');
    axis(a[2] || 0, 'KeyJ', 'KeyL', 'pad:rx'); axis(a[3] || 0, 'KeyI', 'KeyK', 'pad:ry');
  }
  requestAnimationFrame(pollPads);
}
requestAnimationFrame(pollPads);

/* Bildschirm-Gamepad */
pad.querySelectorAll('button[data-code]').forEach(btn => {
  const code = btn.dataset.code;
  btn.addEventListener('pointerdown', e => { e.preventDefault(); try { btn.setPointerCapture(e.pointerId); } catch (x) { /* egal */ } setKey(code, true, 'touch:' + code + e.pointerId); });
  const up = e => setKey(code, false, 'touch:' + code + e.pointerId);
  btn.addEventListener('pointerup', up); btn.addEventListener('pointercancel', up);
});
pad.querySelectorAll('.stick').forEach(st => {
  const nub = st.querySelector('.nub'); let id = null;
  const keys = st.dataset;
  const apply = (dx, dy, r) => {
    const d = Math.hypot(dx, dy), k = d > r ? r / d : 1, x = dx * k, y = dy * k;
    nub.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    const nx = x / r, ny = y / r, dz = 0.3, src = 'stick:' + keys.negX;
    setKey(keys.negX, nx < -dz, src + 'xn'); setKey(keys.posX, nx > dz, src + 'xp');
    setKey(keys.negY, ny < -dz, src + 'yn'); setKey(keys.posY, ny > dz, src + 'yp');
  };
  const move = e => { if (e.pointerId !== id) return; const r = st.getBoundingClientRect(), rad = r.width / 2; apply(e.clientX - r.left - rad, e.clientY - r.top - rad, rad); };
  const reset = e => { if (e.pointerId !== id) return; id = null; apply(0, 0, 1); nub.style.transform = 'translate(-50%, -50%)'; };
  st.addEventListener('pointerdown', e => { e.preventDefault(); id = e.pointerId; try { st.setPointerCapture(id); } catch (x) { /* egal */ } move(e); });
  st.addEventListener('pointermove', move); st.addEventListener('pointerup', reset); st.addEventListener('pointercancel', reset);
});
function setPad(on) {
  pad.hidden = !on; padToggle.setAttribute('aria-pressed', on);
  try { localStorage.setItem('ks.ps2pad', on ? '1' : '0'); } catch (e) { /* egal */ }
}
padToggle.onclick = () => setPad(pad.hidden);
const savedPad = localStorage.getItem('ks.ps2pad');
setPad(savedPad ? savedPad === '1' : matchMedia('(pointer: coarse)').matches);
pad.addEventListener('contextmenu', e => e.preventDefault());

/* Disc wird blockweise gelesen, nichts wird hochgeladen */
class DiscImageDevice {
  constructor(m) { this.m = m; this.file = null; this.done = false; }
  setFile(f) { this.file = f; }
  getFileSize() { return this.file.size; }
  isDone() { return this.done; }
  read(ptr, offset, size) {
    this.done = false;
    this.file.slice(offset, offset + size).arrayBuffer().then(buf => {
      const bytes = new Uint8Array(buf), heap = this.m.HEAPU8;
      heap.set(bytes, ptr);
      if (bytes.length < size) heap.fill(0, ptr + bytes.length, ptr + size);
      this.done = true;
    }).catch(() => { this.m.HEAPU8.fill(0, ptr, ptr + size); this.done = true; });
  }
}

async function startEmulator() {
  if (!window.crossOriginIsolated) {
    if ('serviceWorker' in navigator && !sessionStorage.getItem('ks.ps2reload')) {
      sessionStorage.setItem('ks.ps2reload', '1');
      await navigator.serviceWorker.register('../../sw.js');
      await navigator.serviceWorker.ready;
      location.reload();
      return new Promise(() => {});
    }
    throw new Error('SharedArrayBuffer');
  }
  sessionStorage.removeItem('ks.ps2reload');
  const base = new URL('./', location.href);
  const Play = (await import(new URL('Play.js', base).href)).default;
  play = await Play({
    locateFile: p => new URL(p, base).href,
    mainScriptUrlOrBlob: new URL('Play.js', base).href,
    print: (...a) => log(a.join(' ')),
    printErr: (...a) => log(a.join(' '))
  });
  try { play.FS.mkdir('/work'); } catch (e) { /* vorhanden */ }
  play.discImageDevice = new DiscImageDevice(play);
  play.ccall('initVm', '', [], []);
  setInterval(() => {
    try { const f = play.getFrames(); play.clearStats(); fpsEl.textContent = f + ' fps'; } catch (e) { /* optional */ }
  }, 1000);
}

function log(line) {
  const t = String(line || '').trim();
  if (!t) return;
  if (/Failed to start/i.test(t)) status('Play!: ' + t);
  else if (/Starting/i.test(t)) status('');
}

async function boot(file) {
  const ext = file.name.split('.').pop().toLowerCase();
  if (!ALLOWED.includes(ext)) { B.toast('.' + ext + ' ✕ (ISO, CHD, CSO, ISZ, BIN, ELF)', 6000); return; }
  releaseAll();
  canvas.focus();
  if (ext === 'elf') {
    const data = new Uint8Array(await file.arrayBuffer());
    const s = play.FS.open(file.name, 'w+');
    try { play.FS.write(s, data, 0, data.length, 0); } finally { play.FS.close(s); }
    play.bootElf(file.name);
  } else {
    play.discImageDevice.setFile(file);
    play.bootDiscImage(file.name);
  }
}

(async () => {
  status(B.L.loading);
  let res = null;
  const emu = startEmulator().catch(e => { status(String(e.message || e)); throw e; });
  try { res = await B.loadRom(); } catch (e) { /* unten */ }
  if (!res) { status(B.L.notFound); B.toast(B.L.notFound, 5000); return; }
  document.querySelector('#title b').textContent = res.rom.name;
  status('PlayStation 2 – Play!');
  B.showStart(res.rom.name, async () => {
    await emu;
    await boot(res.file);
  });
})();
