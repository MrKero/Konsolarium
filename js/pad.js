/* Konsolarium – eigenes Bildschirm-Gamepad
   - Tastenbelegung je Konsole (RetroArch-Eingaben wie bei EmulatorJS)
   - Skins, Transparenz, Größe
   - Tasten frei verschieben und vergrößern (je Konsole, Hoch- und Querformat getrennt)
   Positionen: [Anker x (l|c|r), Anker y (t|b), Abstand x, Abstand y, Größe] in Design-Pixeln.
   „l/r“: Abstand vom linken/rechten Rand zur Tastenmitte, „c“: Versatz zur Bildmitte,
   „t/b“: Abstand vom oberen/unteren Rand zur Tastenmitte. */

const Pad = (() => {
  const SKINS = ['konsolarium', 'glas', 'klassisch', 'farbig', 'neon', 'minimal'];
  const SIZE = { face: 64, pill: 66, sh: 80, sm: 46, dpad: 150, stick: 128 };
  const AXIS = 0x7fff;
  const REWIND_ICON = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 6.2v11.6a.8.8 0 0 1-1.3.6L12.5 12l7.2-6.4a.8.8 0 0 1 1.3.6zm-9 0v11.6a.8.8 0 0 1-1.3.6L3.5 12l7.2-6.4a.8.8 0 0 1 1.3.6z"/></svg>';

  /* ---------- Bausteine ---------- */
  const DP = { p: ['l', 'b', 100, 150], q: ['l', 'b', 108, 132] };
  const SEL = { p: ['c', 'b', -48, 46], q: ['c', 'b', -46, 24] };
  const STA = { p: ['c', 'b', 48, 46], q: ['c', 'b', 46, 24] };
  const SHL = { p: ['l', 'b', 62, 282], q: ['l', 't', 62, 34] };
  const SHR = { p: ['r', 'b', 62, 282], q: ['r', 't', 62, 34] };
  const RW = { p: ['c', 'b', 0, 218], q: ['l', 't', 62, 92] };

  const dpad = (id = 'dpad', vs = [4, 5, 6, 7], p = DP.p, q = DP.q) => ({ id, t: 'dpad', vs, p, q });
  const btn = (id, l, v, k, p, q, extra) => Object.assign({ id, t: 'btn', l, v, k, p, q }, extra || {});
  const face = (id, l, v, p, q, c) => btn(id, l, v, 'face', p, q, { c: c || id });
  const pill = (id, l, v, p, q) => btn(id, l, v, 'pill', p, q);
  const sh = (id, l, v, p, q) => btn(id, l, v, 'sh', p, q);
  const sel = (l = 'Select', v = 2) => pill('select', l, v, SEL.p, SEL.q);
  const sta = (l = 'Start', v = 3) => pill('start', l, v, STA.p, STA.q);
  const shL = (l = 'L', v = 10, id = 'l') => sh(id, l, v, SHL.p, SHL.q);
  const shR = (l = 'R', v = 11, id = 'r') => sh(id, l, v, SHR.p, SHR.q);

  /* Raute: oben, links, rechts, unten – je [id, Beschriftung, Eingabe] */
  function diamond(top, left, right, bottom) {
    const P = [104, 150], Q = [110, 132], o = 54, oq = 50;
    return [
      face(top[0], top[1], top[2], ['r', 'b', P[0], P[1] + o], ['r', 'b', Q[0], Q[1] + oq]),
      face(left[0], left[1], left[2], ['r', 'b', P[0] + o, P[1]], ['r', 'b', Q[0] + oq, Q[1]]),
      face(right[0], right[1], right[2], ['r', 'b', P[0] - o, P[1]], ['r', 'b', Q[0] - oq, Q[1]]),
      face(bottom[0], bottom[1], bottom[2], ['r', 'b', P[0], P[1] - o], ['r', 'b', Q[0], Q[1] - oq])
    ];
  }
  /* Zwei Tasten schräg (links unten, rechts oben) */
  function two(lo, hi) {
    return [
      face(lo[0], lo[1], lo[2], ['r', 'b', 150, 122], ['r', 'b', 150, 104]),
      face(hi[0], hi[1], hi[2], ['r', 'b', 72, 164], ['r', 'b', 72, 146])
    ];
  }
  /* Reihe(n) mit drei Tasten (Mega Drive, Saturn, Jaguar, 3DO) */
  function row3(btns, top) {
    const dy = top ? 186 : 118, dyq = top ? 160 : 96, xs = [186, 116, 46], xq = [160, 102, 44];
    return btns.map((b, i) => face(b[0], b[1], b[2], ['r', 'b', xs[i], dy], ['r', 'b', xq[i], dyq, 0.9]));
  }
  const PS = [['tri', '△', 9], ['sq', '□', 1], ['cir', '○', 8], ['crs', '✕', 0]];
  const NIN = [['x', 'X', 9], ['y', 'Y', 1], ['a', 'A', 8], ['b', 'B', 0]];

  const LAYOUTS = {
    nes: () => [dpad(), ...two(['b', 'B', 0], ['a', 'A', 8]), sel(), sta()],
    gba: () => [dpad(), ...two(['b', 'B', 0], ['a', 'A', 8]), shL(), shR(), sel(), sta()],
    snes: () => [dpad(), ...diamond(...NIN), shL(), shR(), sel(), sta()],
    psx: () => [dpad(), ...diamond(...PS),
      sh('l1', 'L1', 10, ['l', 'b', 58, 282], ['l', 't', 58, 34]), sh('l2', 'L2', 12, ['l', 'b', 148, 282], ['l', 't', 58, 80]),
      sh('r1', 'R1', 11, ['r', 'b', 58, 282], ['r', 't', 58, 34]), sh('r2', 'R2', 13, ['r', 'b', 148, 282], ['r', 't', 58, 80]),
      sel(), sta()],
    psp: () => [dpad('dpad', [4, 5, 6, 7], ['l', 'b', 92, 212, 0.85], ['l', 'b', 100, 196, 0.8]),
      { id: 'stick', t: 'stick', p: ['l', 'b', 70, 78, 0.8], q: ['l', 'b', 72, 70, 0.72] },
      ...diamond(...PS),
      sh('l', 'L', 10, ['l', 'b', 62, 302], ['l', 't', 62, 34]), shR(),
      pill('select', 'Select', 2, ['c', 'b', -38, 40, 0.85], SEL.q), pill('start', 'Start', 3, ['c', 'b', 38, 40, 0.85], STA.q)],
    n64: () => [
      { id: 'stick', t: 'stick', p: ['l', 'b', 96, 140], q: ['l', 'b', 96, 112, 0.9] },
      dpad('dpad', [4, 5, 6, 7], ['l', 'b', 58, 276, 0.66], ['l', 'b', 150, 250, 0.6]),
      sh('l', 'L', 10, ['l', 'b', 150, 304], ['l', 't', 58, 34]),
      sh('z', 'Z', 12, ['l', 'b', 150, 256], ['l', 't', 58, 80]),
      sh('r', 'R', 11, ['r', 'b', 62, 304], ['r', 't', 62, 34]),
      face('a', 'A', 0, ['r', 'b', 140, 108], ['r', 'b', 132, 92], 'n64a'),
      face('b', 'B', 1, ['r', 'b', 200, 150], ['r', 'b', 190, 130], 'n64b'),
      btn('cu', 'C▲', 23, 'sm', ['r', 'b', 70, 240], ['r', 'b', 62, 214], { ax: true, c: 'c' }),
      btn('cd', 'C▼', 22, 'sm', ['r', 'b', 70, 160], ['r', 'b', 62, 142], { ax: true, c: 'c' }),
      btn('cl', 'C◀', 21, 'sm', ['r', 'b', 110, 200], ['r', 'b', 98, 178], { ax: true, c: 'c' }),
      btn('cr', 'C▶', 20, 'sm', ['r', 'b', 30, 200], ['r', 'b', 26, 178], { ax: true, c: 'c' }),
      pill('start', 'Start', 3, ['c', 'b', 0, 40], ['c', 'b', 0, 24])],
    md: () => [dpad(), ...row3([['a', 'A', 1], ['b', 'B', 0], ['c', 'C', 8]]), ...row3([['x', 'X', 10], ['y', 'Y', 9], ['z', 'Z', 11]], true), sel('Mode', 2), sta()],
    saturn: () => [dpad(), ...row3([['a', 'A', 1], ['b', 'B', 0], ['c', 'C', 8]]), ...row3([['x', 'X', 9], ['y', 'Y', 10], ['z', 'Z', 11]], true),
      shL('L', 12), shR('R', 13), pill('start', 'Start', 3, ['c', 'b', 0, 46], ['c', 'b', 0, 24])],
    sms: () => [dpad(), ...two(['b1', '1', 0], ['b2', '2', 8]), pill('start', 'Pause', 3, ['c', 'b', 0, 46], ['c', 'b', 0, 24])],
    gg: () => [dpad(), ...two(['b1', '1', 0], ['b2', '2', 8]), pill('start', 'Start', 3, ['c', 'b', 0, 46], ['c', 'b', 0, 24])],
    a26: () => [dpad(), face('fire', 'Fire', 0, ['r', 'b', 96, 140], ['r', 'b', 100, 124]), sel(), sta('Reset', 3)],
    a78: () => [dpad(), ...two(['b1', '1', 0], ['b2', '2', 8]), sel(), sta('Pause', 3), pill('reset', 'Reset', 9, ['c', 'b', 0, 90], ['c', 'b', 0, 58])],
    lynx: () => [dpad(), ...two(['b', 'B', 0], ['a', 'A', 8]),
      pill('opt1', 'Opt 1', 10, ['c', 'b', -48, 90], ['c', 'b', -46, 58]), pill('opt2', 'Opt 2', 11, ['c', 'b', 48, 90], ['c', 'b', 46, 58]),
      pill('start', 'Start', 3, ['c', 'b', 0, 46], ['c', 'b', 0, 24])],
    jag: () => [dpad(), ...row3([['a', 'A', 8], ['b', 'B', 0], ['c', 'C', 1]]), sel('Pause', 2), sta('Option', 3)],
    vb: () => [dpad('dpad', [4, 5, 6, 7]), dpad('dpad2', [19, 18, 17, 16], ['r', 'b', 100, 150], ['r', 'b', 108, 132]),
      face('b', 'B', 0, ['r', 'b', 140, 262, 0.85], ['r', 'b', 140, 250, 0.8]), face('a', 'A', 8, ['r', 'b', 66, 262, 0.85], ['r', 'b', 66, 250, 0.8]),
      sh('l', 'L', 10, ['l', 'b', 62, 282], ['l', 't', 62, 34]), sh('r', 'R', 11, ['r', 'b', 62, 330], ['r', 't', 62, 34]), sel(), sta()],
    '3do': () => [dpad(), ...row3([['a', 'A', 1], ['b', 'B', 0], ['c', 'C', 8]]), shL(), shR(), sel('X', 2), sta('P', 3)],
    pce: () => [dpad(), ...two(['ii', 'II', 0], ['i', 'I', 8]), sel(), sta('Run', 3)],
    ngp: () => [dpad(), ...two(['a', 'A', 0], ['b', 'B', 8]), pill('start', 'Option', 3, ['c', 'b', 0, 46], ['c', 'b', 0, 24])],
    ws: () => [dpad('dpad', [4, 5, 6, 7]), dpad('dpad2', [13, 12, 10, 11], ['r', 'b', 100, 150], ['r', 'b', 108, 132]),
      face('b', 'B', 0, ['r', 'b', 140, 262, 0.85], ['r', 'b', 140, 250, 0.8]), face('a', 'A', 8, ['r', 'b', 66, 262, 0.85], ['r', 'b', 66, 250, 0.8]),
      pill('start', 'Start', 3, ['c', 'b', 0, 46], ['c', 'b', 0, 24])],
    coleco: () => [dpad(), ...two(['l', 'L', 8], ['r', 'R', 0])],
    arcade: () => [dpad(),
      face('a', 'A', 0, ['r', 'b', 186, 112], ['r', 'b', 160, 96, 0.9]), face('b', 'B', 8, ['r', 'b', 116, 112], ['r', 'b', 102, 96, 0.9]),
      face('c', 'C', 1, ['r', 'b', 186, 182], ['r', 'b', 160, 156, 0.9]), face('d', 'D', 9, ['r', 'b', 116, 182], ['r', 'b', 102, 156, 0.9]),
      face('e', 'E', 10, ['r', 'b', 46, 112], ['r', 'b', 44, 96, 0.9]), face('f', 'F', 11, ['r', 'b', 46, 182], ['r', 'b', 44, 156, 0.9]),
      sel('Coin', 2), sta()],
    gen: () => [dpad(), ...diamond(...NIN), shL(), shR(), sel(), sta()]
  };
  LAYOUTS.nds = LAYOUTS.snes;
  const SCHEME = {
    nes: 'nes', gb: 'nes', gbc: 'nes', gba: 'gba', snes: 'snes', nds: 'nds', psx: 'psx', psp: 'psp', n64: 'n64',
    segaMD: 'md', segaCD: 'md', sega32x: 'md', segaSaturn: 'saturn', segaMS: 'sms', segaGG: 'gg',
    atari2600: 'a26', atari7800: 'a78', lynx: 'lynx', jaguar: 'jag', vb: 'vb', '3do': '3do', pce: 'pce', ngp: 'ngp',
    ws: 'ws', coleco: 'coleco', arcade: 'arcade'
  };
  const schemeOf = sysId => SCHEME[sysId] || 'gen';

  function controlsFor(sysId, rewind) {
    const list = LAYOUTS[schemeOf(sysId)]();
    if (rewind) list.push(btn('rewind', REWIND_ICON, 28, 'sm', RW.p, RW.q, { icon: true, c: 'rw' }));
    return list;
  }

  /* ---------- Gespeicherte Anordnung ---------- */
  function savedLayout(sysId, orient) {
    const all = Settings.get('padLayouts') || {};
    return (all[sysId] && all[sysId][orient]) || {};
  }
  function storeLayout(sysId, orient, data) {
    const all = JSON.parse(JSON.stringify(Settings.get('padLayouts') || {}));
    all[sysId] = all[sysId] || {};
    if (data && Object.keys(data).length) all[sysId][orient] = data; else delete all[sysId][orient];
    if (!Object.keys(all[sysId]).length) delete all[sysId];
    Settings.set('padLayouts', all);
  }

  function hasTouch() { return ('ontouchstart' in window) || navigator.maxTouchPoints > 0; }
  function gamepadConnected() {
    try { return Array.from(navigator.getGamepads ? navigator.getGamepads() : []).some(g => g && g.connected); } catch (e) { return false; }
  }

  /* ---------- Gamepad erzeugen ---------- */
  function create(root, opts) {
    const o = Object.assign({ sys: 'snes', send: () => {}, rewind: false, preview: false, zoom: 1 }, opts || {});
    const ctrls = controlsFor(o.sys, o.rewind);
    const byId = {};
    root.classList.add('kpad');
    root.innerHTML = '';
    let editing = false, working = null, selected = null, editBar = null, visible = true;

    for (const c of ctrls) {
      const el = document.createElement('div');
      el.className = 'pc ' + (c.t === 'btn' ? 'kb k-' + c.k : c.t);
      el.dataset.id = c.id;
      if (c.c) el.dataset.c = c.c;
      if (c.t === 'btn') el.innerHTML = c.icon ? c.l : `<span>${c.l}</span>`;
      else if (c.t === 'dpad') el.innerHTML = '<i class="arm h"></i><i class="arm v"></i><b class="ar u"></b><b class="ar d"></b><b class="ar l"></b><b class="ar r"></b>';
      else if (c.t === 'stick') el.innerHTML = '<i class="knob"></i>';
      root.appendChild(el);
      byId[c.id] = { c, el, pressed: false, dirs: [0, 0, 0, 0] };
    }

    function orient() { const r = root.getBoundingClientRect(); return r.width > r.height ? 'q' : 'p'; }
    function factor() {
      const r = root.getBoundingClientRect();
      let f = (o.zoom || 1) * (Number(Settings.get('padScale')) || 1);
      if (!o.preview && r.width > r.height && r.height < 430) f *= 0.9;
      return f;
    }
    function posOf(id, or) {
      const c = byId[id].c;
      const custom = (working && working[id]) || (!working && savedLayout(o.sys, or)[id]);
      const base = c[or];
      const pos = custom || base;
      return { ax: pos[0], ay: pos[1], dx: pos[2], dy: pos[3], s: pos[4] || 1 };
    }
    function place(id) {
      const { el, c } = byId[id];
      const r = root.getBoundingClientRect();
      const or = r.width > r.height ? 'q' : 'p';
      const f = factor();
      const p = posOf(id, or);
      const size = SIZE[c.t === 'btn' ? c.k : c.t] * p.s * f;
      const x = p.ax === 'l' ? p.dx * f : p.ax === 'r' ? r.width - p.dx * f : r.width / 2 + p.dx * f;
      const y = p.ay === 't' ? p.dy * f : r.height - p.dy * f;
      el.style.left = x + 'px';
      el.style.top = y + 'px';
      el.style.setProperty('--sz', size + 'px');
      el.style.setProperty('--fs', f * p.s);
    }
    function layout() {
      root.dataset.skin = SKINS.includes(Settings.get('padSkin')) ? Settings.get('padSkin') : 'konsolarium';
      root.style.setProperty('--pad-op', String(Math.min(1, Math.max(0.25, Number(Settings.get('padOpacity')) || 0.85))));
      Object.keys(byId).forEach(place);
    }

    /* ---------- Eingabe ---------- */
    const active = new Map();
    function press(st, on) {
      if (st.pressed === on) return;
      st.pressed = on;
      st.el.classList.toggle('on', on);
      o.send(st.c.v, on ? (st.c.ax ? AXIS : 1) : 0);
    }
    function setDirs(st, d) {
      const vs = st.c.vs;
      for (let i = 0; i < 4; i++) {
        if (st.dirs[i] !== d[i]) { st.dirs[i] = d[i]; o.send(vs[i], d[i] ? 1 : 0); }
      }
      st.el.classList.toggle('u', !!d[0]); st.el.classList.toggle('d', !!d[1]);
      st.el.classList.toggle('l', !!d[2]); st.el.classList.toggle('r', !!d[3]);
    }
    function dpadFrom(st, x, y) {
      const r = st.el.getBoundingClientRect();
      const nx = (x - (r.left + r.width / 2)) / (r.width / 2), ny = (y - (r.top + r.height / 2)) / (r.height / 2);
      if (Math.hypot(nx, ny) < 0.18) return setDirs(st, [0, 0, 0, 0]);
      const t = 0.36;
      setDirs(st, [ny < -t ? 1 : 0, ny > t ? 1 : 0, nx < -t ? 1 : 0, nx > t ? 1 : 0]);
    }
    let axes = { x: 0, y: 0 };
    function stickFrom(st, x, y, release) {
      const r = st.el.getBoundingClientRect();
      const rad = r.width / 2;
      let nx = release ? 0 : (x - (r.left + rad)) / rad, ny = release ? 0 : (y - (r.top + rad)) / rad;
      const len = Math.hypot(nx, ny);
      if (len > 1) { nx /= len; ny /= len; }
      const knob = st.el.firstElementChild;
      knob.style.transform = `translate(calc(-50% + ${nx * rad * 0.62}px), calc(-50% + ${ny * rad * 0.62}px))`;
      st.el.classList.toggle('on', !release);
      const dz = v => (Math.abs(v) < 0.12 ? 0 : v);
      const X = dz(nx), Y = dz(ny);
      if (X !== axes.x) {
        axes.x = X;
        if (X > 0) { o.send(16, Math.round(AXIS * X)); o.send(17, 0); } else { o.send(17, Math.round(-AXIS * X)); o.send(16, 0); }
      }
      if (Y !== axes.y) {
        axes.y = Y;
        if (Y > 0) { o.send(18, Math.round(AXIS * Y)); o.send(19, 0); } else { o.send(19, Math.round(-AXIS * Y)); o.send(18, 0); }
      }
    }
    function ctrlAt(x, y) {
      const el = document.elementFromPoint(x, y);
      const pc = el && el.closest && el.closest('.pc');
      return pc && root.contains(pc) ? byId[pc.dataset.id] : null;
    }

    function onDown(e) {
      if (!visible) return;
      const pc = e.target.closest && e.target.closest('.pc');
      if (!pc || !root.contains(pc)) return;
      e.preventDefault();
      const st = byId[pc.dataset.id];
      if (editing) { startDrag(st, e); return; }
      if (o.preview) return;
      active.set(e.pointerId, st);
      if (st.c.t === 'btn') press(st, true);
      else if (st.c.t === 'dpad') dpadFrom(st, e.clientX, e.clientY);
      else stickFrom(st, e.clientX, e.clientY);
    }
    function onMove(e) {
      if (drag && drag.id === e.pointerId) { moveDrag(e); return; }
      const st = active.get(e.pointerId);
      if (!st) return;
      e.preventDefault();
      if (st.c.t === 'dpad') dpadFrom(st, e.clientX, e.clientY);
      else if (st.c.t === 'stick') stickFrom(st, e.clientX, e.clientY);
      else {
        /* Mit dem Finger von Taste zu Taste gleiten */
        const hit = ctrlAt(e.clientX, e.clientY);
        if (hit && hit !== st && hit.c.t === 'btn') { press(st, false); press(hit, true); active.set(e.pointerId, hit); }
      }
    }
    function onUp(e) {
      if (drag && drag.id === e.pointerId) { endDrag(); return; }
      const st = active.get(e.pointerId);
      if (!st) return;
      active.delete(e.pointerId);
      if (st.c.t === 'btn') { if (![...active.values()].includes(st)) press(st, false); }
      else if (st.c.t === 'dpad') setDirs(st, [0, 0, 0, 0]);
      else stickFrom(st, 0, 0, true);
    }
    function releaseAll() {
      active.clear();
      Object.values(byId).forEach(st => {
        if (st.c.t === 'btn') press(st, false);
        else if (st.c.t === 'dpad') setDirs(st, [0, 0, 0, 0]);
        else stickFrom(st, 0, 0, true);
      });
    }

    /* ---------- Anordnen ---------- */
    let drag = null;
    function select(st) {
      selected = st;
      Object.values(byId).forEach(x => x.el.classList.toggle('sel', x === st));
      if (editBar) {
        const sl = editBar.querySelector('input[type=range]');
        sl.disabled = !st;
        if (st) sl.value = String(Math.round(posOf(st.c.id, orient()).s * 100));
      }
    }
    function startDrag(st, e) {
      select(st);
      const r = st.el.getBoundingClientRect();
      drag = { id: e.pointerId, st, ox: e.clientX - (r.left + r.width / 2), oy: e.clientY - (r.top + r.height / 2) };
    }
    function moveDrag(e) {
      e.preventDefault();
      const rr = root.getBoundingClientRect();
      const cx = Math.min(rr.width, Math.max(0, e.clientX - drag.ox - rr.left));
      const cy = Math.min(rr.height, Math.max(0, e.clientY - drag.oy - rr.top));
      drag.st.el.style.left = cx + 'px';
      drag.st.el.style.top = cy + 'px';
      drag.cx = cx; drag.cy = cy;
    }
    function endDrag() {
      const d = drag; drag = null;
      if (d.cx == null) return;
      const rr = root.getBoundingClientRect(), f = factor();
      const id = d.st.c.id, cur = posOf(id, orient());
      const ax = d.cx < rr.width / 3 ? 'l' : d.cx > rr.width * 2 / 3 ? 'r' : 'c';
      const ay = d.cy < rr.height / 2 ? 't' : 'b';
      const dx = ax === 'l' ? d.cx : ax === 'r' ? rr.width - d.cx : d.cx - rr.width / 2;
      const dy = ay === 't' ? d.cy : rr.height - d.cy;
      working[id] = [ax, ay, Math.round(dx / f), Math.round(dy / f), cur.s];
      place(id);
    }
    function edit() {
      return new Promise(resolve => {
        editing = true;
        releaseAll();
        const or = orient();
        working = {};
        const saved = savedLayout(o.sys, or);
        Object.keys(byId).forEach(id => { const p = posOf(id, or); working[id] = saved[id] || [p.ax, p.ay, p.dx, p.dy, p.s]; });
        root.classList.add('editing');
        editBar = document.createElement('div');
        editBar.className = 'kpad-edit';
        editBar.innerHTML = `<p>${esc(t('pad.editHint'))}</p>
          <label class="sz"><span>${esc(t('pad.size'))}</span><input type="range" min="60" max="160" step="5" value="100" disabled></label>
          <div class="row3"><button data-k="cancel">${esc(t('c.cancel'))}</button><button data-k="reset">${esc(t('pad.reset'))}</button><button data-k="done" class="pri">${esc(t('c.done'))}</button></div>`;
        document.body.appendChild(editBar);
        const sl = editBar.querySelector('input[type=range]');
        sl.oninput = () => {
          if (!selected) return;
          const id = selected.c.id;
          working[id][4] = Number(sl.value) / 100;
          place(id);
        };
        const finish = save => {
          if (save) {
            /* Nur speichern, was sich von der Vorgabe unterscheidet */
            const out = {};
            Object.keys(working).forEach(id => {
              const w = working[id], b = byId[id].c[or];
              if (!b || w[0] !== b[0] || w[1] !== b[1] || Math.abs(w[2] - b[2]) > 0.5 || Math.abs(w[3] - b[3]) > 0.5 || Math.abs((w[4] || 1) - (b[4] || 1)) > 0.01) out[id] = w;
            });
            storeLayout(o.sys, or, out);
          }
          working = null; editing = false; selected = null;
          Object.values(byId).forEach(x => x.el.classList.remove('sel'));
          root.classList.remove('editing');
          editBar.remove(); editBar = null;
          layout();
          resolve(save);
        };
        editBar.querySelectorAll('button').forEach(b => b.onclick = () => {
          if (typeof Sfx !== 'undefined') Sfx.tap();
          const k = b.dataset.k;
          if (k === 'reset') {
            Object.keys(byId).forEach(id => { const base = byId[id].c[or]; working[id] = [base[0], base[1], base[2], base[3], base[4] || 1]; });
            layout(); select(null);
          } else finish(k === 'done');
        });
        select(null);
      });
    }

    function setVisible(v) {
      if (visible === v) return;
      visible = v;
      root.hidden = !v;
      if (!v) releaseAll();
    }

    root.addEventListener('pointerdown', onDown, { passive: false });
    window.addEventListener('pointermove', onMove, { passive: false });
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    const ro = new ResizeObserver(() => { if (!drag) layout(); });
    ro.observe(root);
    layout();

    return {
      layout, edit, releaseAll, setVisible,
      get editing() { return editing; },
      destroy() {
        ro.disconnect();
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerup', onUp);
        window.removeEventListener('pointercancel', onUp);
        root.innerHTML = '';
      }
    };
  }

  return { SKINS, create, schemeOf, hasTouch, gamepadConnected, resetAll: () => Settings.set('padLayouts', {}) };
})();
