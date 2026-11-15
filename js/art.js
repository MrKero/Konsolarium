/* Konsolarium – eigene SVG-Illustrationen der Konsolen und App-Icons.
   Alle Grafiken sind stilisierte Eigenzeichnungen (keine Logos, keine Markennamen). */

const Art = (() => {
  let counter = 0;

  function hexToRgb(h) {
    h = h.replace('#', '');
    if (h.length === 3) h = h.split('').map(x => x + x).join('');
    const n = parseInt(h, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
  }
  /* amt > 0 heller, amt < 0 dunkler */
  function shade(hex, amt) {
    const [r, g, b] = hexToRgb(hex);
    if (amt >= 0) return rgbToHex(r + (255 - r) * amt, g + (255 - g) * amt, b + (255 - b) * amt);
    return rgbToHex(r * (1 + amt), g * (1 + amt), b * (1 + amt));
  }

  /* Kleine Pixel-Szene für Bildschirme */
  function pixelScene(x, y, w, h, base, id, opts = {}) {
    const dark = opts.dark || shade(base, -0.55);
    const mid = shade(base, -0.25);
    const px = Math.max(2, Math.round(Math.min(w, h) / 12));
    let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${Math.min(3, h / 8)}" fill="url(#${id}scr)"/>`;
    // Hügel
    const gy = y + h * 0.68;
    s += `<path d="M${x} ${gy} Q${x + w * 0.25} ${gy - h * 0.18} ${x + w * 0.5} ${gy} T${x + w} ${gy - h * 0.05} V${y + h} H${x}Z" fill="${mid}" opacity=".85"/>`;
    s += `<rect x="${x}" y="${y + h * 0.84}" width="${w}" height="${h * 0.16}" fill="${dark}" opacity=".8"/>`;
    // Sonne / Münze
    s += `<rect x="${x + w * 0.72}" y="${y + h * 0.16}" width="${px * 2}" height="${px * 2}" fill="${shade(base, 0.55)}"/>`;
    // Figur
    const fx = x + w * 0.28, fy = gy - px * 3;
    s += `<rect x="${fx}" y="${fy}" width="${px * 2}" height="${px}" fill="${dark}"/>`;
    s += `<rect x="${fx - px * 0.5}" y="${fy + px}" width="${px * 3}" height="${px}" fill="${dark}"/>`;
    s += `<rect x="${fx}" y="${fy + px * 2}" width="${px * 0.8}" height="${px}" fill="${dark}"/>`;
    s += `<rect x="${fx + px * 1.2}" y="${fy + px * 2}" width="${px * 0.8}" height="${px}" fill="${dark}"/>`;
    // Glanz
    s += `<path d="M${x} ${y} H${x + w * 0.55} L${x + w * 0.35} ${y + h} H${x}Z" fill="#fff" opacity=".07"/>`;
    return s;
  }

  function dpad(cx, cy, size, color) {
    const a = size / 3;
    return `<path d="M${cx - a / 2} ${cy - size / 2}h${a}v${a}h${a}v${a}h-${a}v${a}h-${a}v-${a}h-${a}v-${a}h${a}z" fill="${color}"/>` +
      `<circle cx="${cx}" cy="${cy}" r="${a * 0.28}" fill="#000" opacity=".25"/>`;
  }

  function defs(id, c, scr) {
    return `<defs>
      <linearGradient id="${id}body" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${shade(c[0], 0.18)}"/><stop offset="1" stop-color="${c[0]}"/></linearGradient>
      <linearGradient id="${id}front" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c[0]}"/><stop offset="1" stop-color="${c[1]}"/></linearGradient>
      <linearGradient id="${id}top" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${shade(c[0], 0.28)}"/><stop offset="1" stop-color="${shade(c[0], 0.05)}"/></linearGradient>
      <linearGradient id="${id}scr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${shade(scr, 0.25)}"/><stop offset="1" stop-color="${scr}"/></linearGradient>
      <radialGradient id="${id}glow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="${c[2]}" stop-opacity=".9"/><stop offset="1" stop-color="${c[2]}" stop-opacity="0"/></radialGradient>
      <linearGradient id="${id}wood" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#6b3f1f"/><stop offset=".5" stop-color="#8a5429"/><stop offset="1" stop-color="#5b3318"/></linearGradient>
    </defs>`;
  }

  function shadow(cx = 120, rx = 98) {
    return `<ellipse cx="${cx}" cy="147" rx="${rx}" ry="7" fill="#000" opacity=".28"/>`;
  }

  /* ---------- Controller ---------- */
  function controller(kind, c, x = 196, y = 126) {
    const body = shade(c[0], 0.08), dark = c[1], acc = c[2];
    const cable = `<path d="M${x - 18} ${y - 6} C${x - 34} ${y - 30}, ${x - 40} ${y - 12}, ${x - 52} ${y - 22}" stroke="${dark}" stroke-width="2" fill="none" opacity=".8"/>`;
    if (kind === 'joystick') {
      return cable + `<rect x="${x - 16}" y="${y - 10}" width="32" height="22" rx="4" fill="${dark}"/>
        <rect x="${x - 16}" y="${y - 10}" width="32" height="6" rx="3" fill="${shade(dark, 0.2)}"/>
        <rect x="${x - 2.5}" y="${y - 32}" width="5" height="24" rx="2.5" fill="#222"/>
        <circle cx="${x}" cy="${y - 33}" r="6" fill="${acc}"/><circle cx="${x - 2}" cy="${y - 35}" r="2" fill="#fff" opacity=".5"/>
        <circle cx="${x - 9}" cy="${y - 5}" r="3" fill="#d33"/>`;
    }
    if (kind === 'rect') {
      return cable + `<rect x="${x - 22}" y="${y - 12}" width="44" height="22" rx="3" fill="${body}"/>
        <rect x="${x - 20}" y="${y - 7}" width="40" height="13" rx="2" fill="${dark}"/>
        ${dpad(x - 11, y - 0.5, 10, shade(c[0], 0.5))}
        <circle cx="${x + 9}" cy="${y}" r="3" fill="${acc}"/><circle cx="${x + 16}" cy="${y - 1}" r="3" fill="${acc}"/>`;
    }
    if (kind === 'trident') {
      return cable + `<path d="M${x - 24} ${y - 8} q24 -12 48 0 l-4 10 q-4 14 -10 2 q-6 -4 -10 0 l-2 14 q-2 6 -6 0 l-2 -14 q-4 -4 -10 0 q-6 12 -10 -2z" fill="${body}"/>
        ${dpad(x - 13, y - 3, 8, dark)}
        <circle cx="${x + 10}" cy="${y - 5}" r="2.6" fill="#2b6fd8"/><circle cx="${x + 15}" cy="${y - 1}" r="2.6" fill="#2a9a3a"/>
        <circle cx="${x + 16}" cy="${y - 8}" r="1.8" fill="${acc}"/><circle cx="${x}" cy="${y + 2}" r="2.6" fill="#333"/>`;
    }
    // bone
    return cable + `<path d="M${x - 20} ${y - 10} h40 q12 0 12 12 q0 12 -10 12 q-6 0 -10 -6 h-24 q-4 6 -10 6 q-10 0 -10 -12 q0 -12 12 -12z" fill="${body}"/>
      ${dpad(x - 16, y + 1, 10, dark)}
      <circle cx="${x + 13}" cy="${y - 3}" r="2.4" fill="${acc}"/><circle cx="${x + 18}" cy="${y + 1}" r="2.4" fill="${shade(acc, -0.2)}"/>
      <circle cx="${x + 13}" cy="${y + 5}" r="2.4" fill="${shade(acc, 0.3)}"/><circle cx="${x + 8}" cy="${y + 1}" r="2.4" fill="${shade(acc, -0.4)}"/>`;
  }

  /* ---------- Heimkonsole ---------- */
  function box(a, id) {
    const c = a.c;
    let w = a.wide ? 160 : a.small ? 96 : 140;
    const x0 = (a.ctrl === 'none' ? 120 : 104) - w / 2, x1 = x0 + w;
    const yFront = a.small ? 98 : 88, yBottom = a.small ? 124 : 124, depth = a.small ? 22 : 30;
    const inset = a.angular ? 18 : 12;
    const r = a.rounded ? 10 : 3;
    let s = shadow(a.ctrl === 'none' ? 120 : 112, w / 2 + 34);
    // Oberseite
    if (a.lid === 'curve') {
      s += `<path d="M${x0} ${yFront} C${x0 + 10} ${yFront - depth - 10}, ${x1 - 10} ${yFront - depth - 10}, ${x1} ${yFront}Z" fill="url(#${id}top)"/>`;
      s += `<path d="M${x0 + 20} ${yFront - 14} C${x0 + 40} ${yFront - depth - 2}, ${x1 - 50} ${yFront - depth - 4}, ${x1 - 30} ${yFront - 18}" stroke="#fff" stroke-width="3" opacity=".18" fill="none"/>`;
    } else {
      s += `<path d="M${x0} ${yFront} L${x0 + inset} ${yFront - depth + r} Q${x0 + inset} ${yFront - depth} ${x0 + inset + r} ${yFront - depth} L${x1 - inset - r} ${yFront - depth} Q${x1 - inset} ${yFront - depth} ${x1 - inset} ${yFront - depth + r} L${x1} ${yFront}Z" fill="url(#${id}top)"/>`;
    }
    // Vorderseite
    s += `<rect x="${x0}" y="${yFront}" width="${w}" height="${yBottom - yFront}" rx="${r}" fill="url(#${id}front)"/>`;
    s += `<rect x="${x0}" y="${yFront}" width="${w}" height="2" fill="#fff" opacity=".18"/>`;
    if (a.wood) {
      s += `<rect x="${x0 + 4}" y="${yFront + 6}" width="${w - 8}" height="${yBottom - yFront - 12}" rx="2" fill="url(#${id}wood)"/>`;
      for (let i = 0; i < 6; i++) s += `<path d="M${x0 + 6} ${yFront + 9 + i * 3.4} q${w * 0.3} ${i % 2 ? 2 : -2} ${w - 12} 0" stroke="#3b220f" stroke-width=".7" fill="none" opacity=".5"/>`;
      // Rippen auf der Oberseite
      for (let i = 0; i < 8; i++) s += `<path d="M${x0 + inset + 6 + i * 4} ${yFront - depth + 4} l-3 ${depth - 6}" stroke="#000" stroke-width="1.2" opacity=".35"/>`;
    }
    const cx = (x0 + x1) / 2, topMidY = yFront - depth / 2;
    switch (a.lid) {
      case 'cart-top': {
        const cw = a.small ? 30 : 44;
        s += `<rect x="${cx - cw / 2 - 4}" y="${topMidY - 7}" width="${cw + 8}" height="12" rx="2" fill="${c[1]}"/>`;
        s += `<rect x="${cx - cw / 2}" y="${topMidY - 30}" width="${cw}" height="30" rx="3" fill="${shade(c[1], 0.15)}"/>`;
        s += `<rect x="${cx - cw / 2 + 4}" y="${topMidY - 26}" width="${cw - 8}" height="16" rx="2" fill="${c[3]}"/>`;
        s += `<rect x="${cx - cw / 2 + 7}" y="${topMidY - 22}" width="${(cw - 14) * 0.6}" height="3" rx="1.5" fill="#fff" opacity=".6"/>`;
        s += `<rect x="${cx - cw / 2 + 7}" y="${topMidY - 17}" width="${(cw - 14) * 0.85}" height="3" rx="1.5" fill="#000" opacity=".2"/>`;
        if (a.n64) s += `<circle cx="${x0 + 26}" cy="${topMidY + 2}" r="5" fill="${c[1]}"/><circle cx="${x1 - 26}" cy="${topMidY + 2}" r="5" fill="${c[1]}"/>`;
        break;
      }
      case 'cart-round': {
        s += `<ellipse cx="${cx}" cy="${topMidY + 1}" rx="40" ry="11" fill="${c[1]}"/>`;
        s += `<ellipse cx="${cx}" cy="${topMidY}" rx="34" ry="8.5" fill="${shade(c[0], 0.12)}"/>`;
        s += `<rect x="${cx - 18}" y="${topMidY - 26}" width="36" height="26" rx="3" fill="#222"/>`;
        s += `<rect x="${cx - 14}" y="${topMidY - 23}" width="28" height="13" rx="2" fill="${c[3]}"/>`;
        s += `<rect x="${cx + 38}" y="${topMidY - 2}" width="12" height="4" rx="2" fill="${c[2]}"/>`;
        break;
      }
      case 'disc-round': {
        s += `<ellipse cx="${cx - (a.grey ? 18 : 0)}" cy="${topMidY + 1}" rx="${a.grey ? 30 : 34}" ry="${depth / 2.6}" fill="${shade(c[0], -0.12)}"/>`;
        s += `<ellipse cx="${cx - (a.grey ? 18 : 0)}" cy="${topMidY}" rx="${a.grey ? 26 : 30}" ry="${depth / 3.1}" fill="${shade(c[0], 0.2)}"/>`;
        s += `<ellipse cx="${cx - (a.grey ? 18 : 0)}" cy="${topMidY}" rx="6" ry="2.4" fill="${shade(c[0], -0.2)}"/>`;
        if (a.grey) {
          s += `<circle cx="${cx + 36}" cy="${topMidY - 2}" r="4" fill="${shade(c[0], -0.15)}"/><circle cx="${cx + 50}" cy="${topMidY + 2}" r="4" fill="${shade(c[0], -0.15)}"/>`;
        }
        break;
      }
      case 'disc-tray':
        s += `<rect x="${x0 + 14}" y="${yFront + 9}" width="${w * 0.48}" height="5" rx="2" fill="${c[1]}"/>`;
        s += `<ellipse cx="${cx}" cy="${topMidY}" rx="26" ry="${depth / 3.2}" fill="${shade(c[0], 0.15)}" opacity=".7"/>`;
        s += `<ellipse cx="${cx}" cy="${topMidY}" rx="5" ry="2" fill="${c[1]}"/>`;
        break;
      case 'front-door':
        s += `<rect x="${x0 + 10}" y="${yFront + 6}" width="${w * 0.42}" height="${yBottom - yFront - 14}" rx="2" fill="${shade(c[0], -0.22)}"/>`;
        s += `<rect x="${x0 + 14}" y="${yFront + 10}" width="${w * 0.42 - 8}" height="2" fill="#000" opacity=".25"/>`;
        s += `<rect x="${x0}" y="${yFront - 4}" width="${w}" height="4" fill="${shade(c[0], -0.1)}" opacity=".5"/>`;
        s += `<rect x="${x0 + inset + 6}" y="${yFront - depth + 4}" width="${w - inset * 2 - 12}" height="${depth - 10}" rx="2" fill="${shade(c[0], -0.3)}" opacity=".9"/>`;
        s += `<rect x="${cx + 18}" y="${yFront + 9}" width="10" height="5" rx="1" fill="${c[2]}"/>`;
        s += `<rect x="${cx + 32}" y="${yFront + 9}" width="10" height="5" rx="1" fill="${c[2]}"/>`;
        break;
      case 'card':
        s += `<rect x="${cx - 18}" y="${yFront + 6}" width="36" height="4" rx="2" fill="${c[1]}"/>`;
        s += `<rect x="${x0 + inset + 2}" y="${yFront - depth + 5}" width="${w - inset * 2 - 4}" height="${depth - 10}" rx="2" fill="${c[2]}" opacity=".9"/>`;
        break;
      case 'mushroom':
        s += `<path d="M${cx - 30} ${topMidY + 2} L${cx - 22} ${topMidY - 26} H${cx + 22} L${cx + 30} ${topMidY + 2}Z" fill="${shade(c[0], 0.1)}"/>`;
        s += `<rect x="${cx - 22}" y="${topMidY - 30}" width="44" height="6" rx="3" fill="${c[2]}"/>`;
        s += `<rect x="${cx - 14}" y="${topMidY - 18}" width="28" height="12" rx="2" fill="#222"/>`;
        break;
      default: break;
    }
    // Front-Details
    s += `<circle cx="${x1 - 14}" cy="${yFront + 10}" r="2.6" fill="${c[2]}"/><circle cx="${x1 - 14}" cy="${yFront + 10}" r="6" fill="url(#${id}glow)" opacity=".7"/>`;
    s += `<rect x="${x1 - 46}" y="${yBottom - 13}" width="10" height="6" rx="2" fill="${c[1]}"/><rect x="${x1 - 32}" y="${yBottom - 13}" width="10" height="6" rx="2" fill="${c[1]}"/>`;
    if (a.gloss) s += `<path d="M${x0 + 6} ${yFront + 4} H${x1 - 6}" stroke="#fff" stroke-width="1.5" opacity=".25"/>`;
    if (a.ctrl && a.ctrl !== 'none') s += controller(a.ctrl, c);
    return s;
  }

  /* ---------- Handheld hochkant ---------- */
  function handheldV(a, id) {
    const c = a.c;
    const w = a.compact ? 70 : 78, h = a.compact ? 112 : 122;
    const x = 120 - w / 2, y = 140 - h;
    let s = shadow(120, 52);
    s += `<path d="M${x + 6} ${y} H${x + w - 6} Q${x + w} ${y} ${x + w} ${y + 6} V${y + h - 22} Q${x + w} ${y + h} ${x + w - 22} ${y + h} H${x + 6} Q${x} ${y + h} ${x} ${y + h - 6} V${y + 6} Q${x} ${y} ${x + 6} ${y}Z" fill="url(#${id}body)" ${a.translucent ? 'opacity=".92"' : ''}/>`;
    s += `<path d="M${x + 3} ${y + 3} H${x + w - 3}" stroke="#fff" stroke-width="1.5" opacity=".35"/>`;
    // Rahmen + Bildschirm
    const bx = x + 7, by = y + 9, bw = w - 14, bh = h * 0.42;
    s += `<path d="M${bx} ${by} H${bx + bw} V${by + bh - 8} Q${bx + bw} ${by + bh} ${bx + bw - 10} ${by + bh} H${bx} Z" fill="${shade(c[1], -0.35)}"/>`;
    s += `<circle cx="${bx + 5}" cy="${by + bh * 0.35}" r="1.6" fill="#ff3344"/>`;
    s += pixelScene(bx + 11, by + 6, bw - 22, bh - 13, c[3], id, { dark: a.screenDark });
    // Bedienelemente
    const cy = by + bh + 26;
    s += dpad(x + 19, cy, 17, '#2a2a2e');
    s += `<circle cx="${x + w - 14}" cy="${cy - 4}" r="5.6" fill="${c[2]}"/><circle cx="${x + w - 27}" cy="${cy + 3}" r="5.6" fill="${c[2]}"/>`;
    s += `<rect x="${x + w / 2 - 15}" y="${cy + 16}" width="11" height="3.4" rx="1.7" fill="#555" transform="rotate(-25 ${x + w / 2 - 10} ${cy + 18})"/>`;
    s += `<rect x="${x + w / 2 + 1}" y="${cy + 16}" width="11" height="3.4" rx="1.7" fill="#555" transform="rotate(-25 ${x + w / 2 + 6} ${cy + 18})"/>`;
    for (let i = 0; i < 5; i++) s += `<rect x="${x + w - 26 + i * 4}" y="${y + h - 18 + i * -1.6}" width="2" height="12" rx="1" fill="#000" opacity=".22" transform="rotate(-30 ${x + w - 20} ${y + h - 12})"/>`;
    return s;
  }

  /* ---------- Handheld quer ---------- */
  function handheldH(a, id) {
    const c = a.c;
    let w = a.long ? 176 : a.psp ? 168 : a.thin ? 150 : 150, h = a.psp ? 66 : a.thin ? 68 : 78;
    const x = 120 - w / 2, y = 132 - h;
    let s = shadow(120, w / 2 + 6);
    let body;
    if (a.gba || a.oval || a.psp) {
      const rr = h / 2;
      body = `<path d="M${x + rr} ${y} H${x + w - rr} A${rr} ${rr} 0 0 1 ${x + w - rr} ${y + h} H${x + rr} A${rr} ${rr} 0 0 1 ${x + rr} ${y}Z" fill="url(#${id}body)"/>`;
    } else if (a.long) {
      body = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="url(#${id}body)"/>`;
    } else {
      body = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${a.thin ? 8 : 14}" fill="url(#${id}body)"/>`;
    }
    s += body;
    s += `<path d="M${x + 16} ${y + 3} H${x + w - 16}" stroke="#fff" stroke-width="1.5" opacity=".3"/>`;
    // Bildschirm
    const sw = a.psp ? w * 0.52 : a.long ? w * 0.42 : w * 0.42, sh = a.psp ? h * 0.62 : h * 0.6;
    const sx = 120 - sw / 2 - (a.thin ? 10 : 0), sy = y + (h - sh) / 2 - (a.psp ? 0 : 2);
    s += `<rect x="${sx - 6}" y="${sy - 5}" width="${sw + 12}" height="${sh + 10}" rx="5" fill="${shade(c[1], -0.4)}"/>`;
    s += pixelScene(sx, sy, sw, sh, c[3], id);
    // links
    const lx = x + (a.psp ? 22 : a.long ? 24 : 22), ly = y + h / 2 + (a.psp ? 2 : 4);
    if (a.stick) {
      s += `<circle cx="${lx}" cy="${ly}" r="9" fill="${shade(c[1], -0.2)}"/><circle cx="${lx}" cy="${ly}" r="6" fill="${c[2]}"/>`;
    } else if (a.thin) {
      s += dpad(lx - 2, ly - 12, 12, shade(c[1], -0.3)) + dpad(lx - 2, ly + 12, 12, shade(c[1], -0.3));
    } else {
      s += dpad(lx, ly, a.psp ? 14 : 16, a.psp ? '#3a3a40' : '#2a2a2e');
    }
    if (a.psp) s += `<circle cx="${lx}" cy="${ly + 20}" r="4" fill="#333"/>`;
    if (a.oval) s += `<circle cx="${x + w - 22}" cy="${ly + 20}" r="4" fill="#333"/>`;
    // rechts
    const rx = x + w - (a.psp ? 22 : 24), ry = ly;
    if (a.psp) {
      s += `<circle cx="${rx}" cy="${ry - 8}" r="3.4" fill="${c[2]}"/><circle cx="${rx + 8}" cy="${ry}" r="3.4" fill="${c[2]}"/><circle cx="${rx}" cy="${ry + 8}" r="3.4" fill="${c[2]}"/><circle cx="${rx - 8}" cy="${ry}" r="3.4" fill="${c[2]}"/>`;
    } else if (a.thin) {
      s += `<circle cx="${x + w - 22}" cy="${ry - 6}" r="5" fill="${c[2]}"/><circle cx="${x + w - 32}" cy="${ry + 6}" r="5" fill="${c[2]}"/>`;
    } else {
      s += `<circle cx="${rx + 2}" cy="${ry - 6}" r="5.2" fill="${c[2]}"/><circle cx="${rx - 9}" cy="${ry + 3}" r="5.2" fill="${c[2]}"/>`;
    }
    if (a.gba) s += `<path d="M${x + 16} ${y + 1} q-12 4 -14 18" stroke="${c[1]}" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M${x + w - 16} ${y + 1} q12 4 14 18" stroke="${c[1]}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
    if (a.long) s += `<rect x="${x + 8}" y="${y + h - 10}" width="22" height="4" rx="2" fill="${c[2]}" opacity=".8"/>`;
    return s;
  }

  /* ---------- Klapp-Handheld ---------- */
  function clam(a, id) {
    const c = a.c;
    const w = 128, x = 120 - w / 2;
    let s = shadow(120, 72);
    // Unterteil
    s += `<rect x="${x}" y="88" width="${w}" height="50" rx="10" fill="url(#${id}body)"/>`;
    s += `<rect x="${x + 2}" y="88" width="${w - 4}" height="3" rx="1.5" fill="#fff" opacity=".3"/>`;
    s += `<rect x="${120 - 26}" y="94" width="52" height="38" rx="3" fill="${shade(c[1], -0.4)}"/>`;
    s += `<rect x="${120 - 22}" y="97" width="44" height="32" rx="2" fill="url(#${id}scr)" opacity=".85"/>`;
    s += `<rect x="${120 - 18}" y="103" width="14" height="8" rx="2" fill="#fff" opacity=".25"/><rect x="${120 + 2}" y="103" width="14" height="8" rx="2" fill="#fff" opacity=".25"/><rect x="${120 - 18}" y="115" width="34" height="8" rx="2" fill="#fff" opacity=".18"/>`;
    s += dpad(x + 18, 112, 15, c[2]);
    s += `<circle cx="${x + w - 12}" cy="${106}" r="3.2" fill="${c[2]}"/><circle cx="${x + w - 18}" cy="${112}" r="3.2" fill="${c[2]}"/><circle cx="${x + w - 12}" cy="${118}" r="3.2" fill="${c[2]}"/><circle cx="${x + w - 6}" cy="${112}" r="3.2" fill="${c[2]}"/>`;
    if (a.wide3d) s += `<circle cx="${x + 18}" cy="${97}" r="5" fill="${shade(c[2], 0.25)}"/>`;
    // Scharnier
    s += `<rect x="${x + 4}" y="82" width="${w - 8}" height="8" rx="4" fill="${shade(c[0], -0.25)}"/>`;
    // Oberteil (leicht perspektivisch)
    const tw = a.wide3d ? w : w - 6, tx = 120 - tw / 2;
    s += `<path d="M${x + 2} 84 L${tx + 6} 20 Q${tx + 8} 16 ${tx + 12} 16 H${tx + tw - 12} Q${tx + tw - 8} 16 ${tx + tw - 6} 20 L${x + w - 2} 84Z" fill="url(#${id}top)"/>`;
    const sw = a.wide3d ? 78 : 60;
    s += `<path d="M${120 - sw / 2 - 4} 28 H${120 + sw / 2 + 4} L${120 + sw / 2 + 7} 76 H${120 - sw / 2 - 7}Z" fill="${shade(c[1], -0.45)}"/>`;
    s += `<path d="M${120 - sw / 2} 32 H${120 + sw / 2} L${120 + sw / 2 + 2.5} 72 H${120 - sw / 2 - 2.5}Z" fill="url(#${id}scr)"/>`;
    s += pixelScene(120 - sw / 2 + 2, 34, sw - 4, 36, c[3], id).replace(/<rect x="[^"]+" y="34"[^>]*fill="url\(#[^)]+scr\)"\/>/, '');
    s += `<circle cx="${tx + 12}" cy="44" r="1.6" fill="#000" opacity=".4"/><circle cx="${tx + tw - 12}" cy="44" r="1.6" fill="#000" opacity=".4"/>`;
    return s;
  }

  /* ---------- Heimcomputer ---------- */
  function breadbin(a, id) {
    const c = a.c;
    let s = shadow(120, 100);
    s += `<path d="M24 132 L40 82 Q42 76 48 76 H192 Q198 76 200 82 L216 132 Z" fill="url(#${id}body)"/>`;
    s += `<rect x="22" y="128" width="196" height="10" rx="4" fill="${c[1]}"/>`;
    s += `<path d="M50 84 H190 L198 120 H42Z" fill="${c[2]}"/>`;
    // Tasten
    const rows = 4;
    for (let r = 0; r < rows; r++) {
      const y = 88 + r * 8, inset = 2 * (rows - r);
      for (let k = 0; k < 15; k++) {
        const x = 48 + inset + k * 8.4 + r * 1.2;
        if (x > 178) continue;
        s += `<rect x="${x}" y="${y}" width="7" height="6" rx="1" fill="${shade(c[2], -0.35)}"/><rect x="${x + 0.6}" y="${y + 0.4}" width="5.8" height="3.8" rx=".8" fill="${shade(c[2], 0.12)}"/>`;
      }
    }
    s += `<rect x="72" y="121" width="80" height="5" rx="1.5" fill="${shade(c[2], -0.2)}"/>`;
    for (let i = 0; i < 4; i++) s += `<rect x="186" y="${88 + i * 8}" width="10" height="6" rx="1" fill="${c[3]}"/>`;
    s += `<circle cx="58" cy="80" r="2" fill="#e33"/>`;
    s += `<path d="M150 80 h30" stroke="${c[3]}" stroke-width="2" opacity=".7"/>`;
    return s;
  }

  function keyboard(a, id) {
    const c = a.c;
    let s = shadow(120, 104);
    s += `<path d="M20 128 L30 96 Q32 90 38 90 H202 Q208 90 210 96 L220 128 Z" fill="url(#${id}body)"/>`;
    s += `<rect x="18" y="124" width="204" height="10" rx="4" fill="${c[1]}"/>`;
    if (a.rainbow) {
      const cols = ['#e53935', '#fdd835', '#43a047', '#1e88e5'];
      cols.forEach((col, i) => { s += `<path d="M${168 + i * 7} 128 L${186 + i * 7} 92 H${190 + i * 7} L${172 + i * 7} 128Z" fill="${col}"/>`; });
    }
    for (let r = 0; r < 4; r++) {
      for (let k = 0; k < 14; k++) {
        const x = 40 + k * 9 + r * 2.4, y = 96 + r * 7;
        if (a.rainbow && x > 158) continue;
        if (a.drive && x > 150) continue;
        const col = a.keyAccent && (k + r) % 5 === 0 ? c[2] : shade(c[1], 0.12);
        s += `<rect x="${x}" y="${y}" width="7.6" height="5.4" rx="1.2" fill="${col}"/>`;
      }
    }
    s += `<rect x="70" y="124" width="70" height="4" rx="1.5" fill="${shade(c[1], 0.2)}"/>`;
    if (a.drive) {
      s += `<rect x="168" y="100" width="40" height="18" rx="2" fill="${shade(c[0], -0.12)}"/><rect x="172" y="107" width="30" height="3" rx="1.5" fill="${c[2]}"/><circle cx="204" cy="114" r="1.6" fill="#e33"/>`;
      s += `<rect x="196" y="74" width="2" height="16" fill="#000" opacity="0"/>`;
    }
    // kleiner Bildschirm dahinter
    s += `<rect x="78" y="24" width="84" height="62" rx="6" fill="${shade(c[1], -0.1)}"/>`;
    s += `<rect x="84" y="30" width="72" height="50" rx="3" fill="url(#${id}scr)"/>`;
    s += `<rect x="90" y="36" width="44" height="4" fill="#fff" opacity=".7"/><rect x="90" y="44" width="30" height="4" fill="#fff" opacity=".5"/><rect x="90" y="52" width="6" height="5" fill="#fff" opacity=".9"/>`;
    s += `<rect x="110" y="86" width="20" height="5" fill="${shade(c[1], -0.2)}"/>`;
    return s;
  }

  function pc(a, id) {
    const c = a.c;
    let s = shadow(120, 96);
    s += `<rect x="40" y="100" width="160" height="24" rx="3" fill="url(#${id}front)"/>`;
    s += `<rect x="52" y="108" width="34" height="5" rx="1" fill="${c[1]}"/><rect x="52" y="115" width="34" height="3" rx="1" fill="${shade(c[1], -0.2)}"/>`;
    s += `<circle cx="186" cy="112" r="2.2" fill="${c[3]}"/>`;
    s += `<rect x="64" y="20" width="112" height="82" rx="8" fill="url(#${id}body)"/>`;
    s += `<rect x="74" y="28" width="92" height="62" rx="6" fill="#0d1a10"/>`;
    s += `<text x="80" y="46" font-family="monospace" font-size="10" fill="${c[3]}">C:\\&gt;_</text>`;
    s += `<rect x="80" y="54" width="54" height="3" fill="${c[3]}" opacity=".5"/><rect x="80" y="61" width="38" height="3" fill="${c[3]}" opacity=".4"/>`;
    s += `<path d="M74 28 H120 L104 90 H74Z" fill="#fff" opacity=".05"/>`;
    s += `<path d="M28 138 L36 126 H204 L212 138Z" fill="${shade(c[0], -0.05)}"/>`;
    for (let k = 0; k < 18; k++) s += `<rect x="${40 + k * 9}" y="129" width="7" height="3" rx="1" fill="${c[1]}"/>`;
    return s;
  }

  function arcade(a, id) {
    const c = a.c;
    let s = shadow(120, 60);
    s += `<path d="M78 140 V30 L86 12 H154 L162 30 V140Z" fill="url(#${id}body)"/>`;
    s += `<rect x="84" y="14" width="72" height="16" rx="2" fill="${c[2]}"/>`;
    s += `<rect x="84" y="14" width="72" height="16" rx="2" fill="url(#${id}glow)" opacity=".6"/>`;
    s += `<rect x="96" y="19" width="48" height="6" rx="3" fill="#fff" opacity=".55"/>`;
    s += `<rect x="86" y="36" width="68" height="52" rx="4" fill="#0b0b10"/>`;
    s += pixelScene(90, 40, 60, 44, c[3], id);
    s += `<path d="M78 90 H162 L170 104 H70Z" fill="${shade(c[0], 0.2)}"/>`;
    s += `<rect x="94" y="88" width="3" height="10" fill="#222"/><circle cx="95.5" cy="88" r="4" fill="#e33"/>`;
    s += `<circle cx="120" cy="97" r="3" fill="${c[2]}"/><circle cx="130" cy="95" r="3" fill="${c[3]}"/><circle cx="140" cy="97" r="3" fill="#4cf"/>`;
    s += `<rect x="70" y="104" width="100" height="5" fill="${c[1]}"/>`;
    s += `<rect x="108" y="116" width="24" height="16" rx="2" fill="${c[1]}"/><rect x="113" y="120" width="4" height="8" rx="1" fill="${c[2]}"/><rect x="123" y="120" width="4" height="8" rx="1" fill="${c[2]}"/>`;
    return s;
  }

  function visor(a, id) {
    const c = a.c;
    let s = shadow(120, 70);
    s += `<path d="M100 92 L76 140 M140 92 L164 140" stroke="#222" stroke-width="5" stroke-linecap="round"/>`;
    s += `<rect x="112" y="90" width="16" height="20" fill="#2a2a2e"/>`;
    s += `<path d="M46 44 Q46 30 60 30 H180 Q194 30 194 44 V80 Q194 96 178 96 H138 Q128 80 120 80 Q112 80 102 96 H62 Q46 96 46 80Z" fill="url(#${id}body)"/>`;
    s += `<path d="M56 36 H184" stroke="#fff" stroke-width="2" opacity=".25"/>`;
    s += `<rect x="62" y="50" width="116" height="26" rx="10" fill="${c[2]}"/>`;
    s += `<rect x="72" y="56" width="38" height="14" rx="5" fill="${c[3]}" opacity=".5"/><rect x="130" y="56" width="38" height="14" rx="5" fill="${c[3]}" opacity=".5"/>`;
    s += `<rect x="76" y="60" width="10" height="3" fill="${c[3]}"/><rect x="134" y="60" width="10" height="3" fill="${c[3]}"/>`;
    return s;
  }

  function cube(a, id) {
    const c = a.c;
    let s = shadow(120, 68);
    // Front
    s += `<rect x="70" y="62" width="76" height="72" rx="6" fill="url(#${id}front)"/>`;
    // Seite
    s += `<path d="M146 62 L176 46 V118 L146 134Z" fill="${shade(c[1], -0.15)}"/>`;
    // Oberseite
    s += `<path d="M70 62 L100 46 H176 L146 62Z" fill="url(#${id}top)"/>`;
    s += `<ellipse cx="123" cy="54" rx="22" ry="6" fill="${shade(c[0], 0.3)}"/><ellipse cx="123" cy="54" rx="4" ry="1.4" fill="${c[1]}"/>`;
    // Griff
    s += `<path d="M150 108 q20 -6 24 6" stroke="${shade(c[1], -0.25)}" stroke-width="6" fill="none" stroke-linecap="round"/>`;
    s += `<rect x="80" y="112" width="12" height="8" rx="2" fill="${c[3]}"/><rect x="96" y="112" width="12" height="8" rx="2" fill="${c[3]}"/>`;
    s += `<circle cx="132" cy="76" r="4" fill="${c[2]}"/>`;
    s += `<path d="M74 66 H142" stroke="#fff" stroke-width="1.5" opacity=".25"/>`;
    s += controller('bone', [c[0], c[1], c[2]], 204, 128);
    return s;
  }

  function tower(a, id) {
    const c = a.c;
    let s = shadow(110, 100);
    s += `<path d="M30 88 L46 60 H170 L186 88Z" fill="url(#${id}top)"/>`;
    s += `<rect x="30" y="88" width="156" height="38" rx="4" fill="url(#${id}front)"/>`;
    s += `<ellipse cx="108" cy="74" rx="22" ry="9" fill="${c[3]}"/><ellipse cx="108" cy="73" rx="12" ry="5" fill="${c[2]}"/><ellipse cx="108" cy="73" rx="16" ry="7" fill="url(#${id}glow)"/>`;
    s += `<rect x="42" y="100" width="56" height="5" rx="2" fill="${c[1]}"/>`;
    for (let i = 0; i < 4; i++) s += `<rect x="${118 + i * 14}" y="112" width="10" height="7" rx="2" fill="${c[1]}"/>`;
    s += `<circle cx="174" cy="100" r="2.5" fill="${c[2]}"/>`;
    s += controller('bone', [c[3], c[1], c[2]], 204, 128);
    return s;
  }

  function slimV(a, id) {
    const c = a.c;
    let s = shadow(110, 70);
    s += `<path d="M86 30 L112 18 V124 L86 136Z" fill="${shade(c[1], -0.1)}"/>`;
    s += `<rect x="112" y="18" width="34" height="106" rx="3" fill="url(#${id}front)" transform="skewY(0)"/>`;
    s += `<path d="M112 18 L86 30 V136 L112 124" fill="url(#${id}body)" opacity=".85"/>`;
    if (a.white) {
      s += `<rect x="96" y="44" width="4" height="58" rx="2" fill="${c[2]}" opacity=".9"/>`;
      s += `<rect x="96" y="44" width="4" height="58" rx="2" fill="url(#${id}glow)"/>`;
      s += `<rect x="86" y="134" width="60" height="6" rx="3" fill="${shade(c[0], -0.12)}"/>`;
    } else {
      for (let i = 0; i < 8; i++) s += `<path d="M86 ${40 + i * 10} L112 ${28 + i * 10}" stroke="#000" stroke-width="1.6" opacity=".45"/>`;
      s += `<rect x="116" y="30" width="26" height="5" rx="2" fill="${c[2]}" opacity=".8"/>`;
      s += `<rect x="86" y="134" width="60" height="6" rx="3" fill="${c[3]}"/>`;
    }
    s += `<path d="M114 22 V120" stroke="#fff" stroke-width="1.5" opacity=".18"/>`;
    s += controller('bone', [a.white ? '#e8e9ee' : c[3], c[1], c[2]], 190, 128);
    return s;
  }

  function tablet(a, id) {
    const c = a.c;
    let s = shadow(120, 96);
    s += `<rect x="134" y="54" width="70" height="40" rx="5" fill="url(#${id}front)"/><rect x="140" y="62" width="40" height="3" rx="1.5" fill="${c[3]}" opacity=".7"/>`;
    s += `<path d="M30 92 Q30 78 48 78 H170 Q188 78 188 92 V120 Q188 138 168 138 H50 Q30 138 30 120Z" fill="url(#${id}body)"/>`;
    s += `<rect x="72" y="84" width="74" height="46" rx="3" fill="#1c1c22"/>`;
    s += pixelScene(76, 88, 66, 38, c[3], id);
    s += `<circle cx="50" cy="96" r="7" fill="${c[2]}"/><circle cx="50" cy="96" r="4.6" fill="${shade(c[2], 0.2)}"/>`;
    s += `<circle cx="168" cy="96" r="7" fill="${c[2]}"/><circle cx="168" cy="96" r="4.6" fill="${shade(c[2], 0.2)}"/>`;
    s += dpad(50, 118, 13, c[2]);
    s += `<circle cx="164" cy="113" r="2.8" fill="${c[2]}"/><circle cx="170" cy="118" r="2.8" fill="${c[2]}"/><circle cx="164" cy="123" r="2.8" fill="${c[2]}"/><circle cx="158" cy="118" r="2.8" fill="${c[2]}"/>`;
    return s;
  }

  const FORMS = { box, 'handheld-v': handheldV, 'handheld-h': handheldH, clam, breadbin, keyboard, pc, arcade, visor, cube, tower, 'slim-v': slimV, tablet };

  function consoleSVG(sys) {
    const id = 'k' + (counter++) + '_';
    const a = sys.art;
    const fn = FORMS[a.form] || box;
    const inner = fn(a, id);
    return `<svg viewBox="0 0 240 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${sys.name}">${defs(id, a.c, a.c[3])}${inner}</svg>`;
  }

  /* ---------- App-Icons (1024 × 1024) ---------- */
  const ICONS = {
    cart: {
      bg: ['#2b1f63', '#5a3fd1'],
      draw: () => `
        <rect x="292" y="210" width="440" height="560" rx="44" fill="#ffc94a"/>
        <rect x="292" y="210" width="440" height="80" rx="40" fill="#ffd978"/>
        <rect x="350" y="330" width="324" height="240" rx="22" fill="#1e1640"/>
        <rect x="378" y="358" width="268" height="184" rx="10" fill="#3a2a8c"/>
        <circle cx="512" cy="430" r="46" fill="#ff5ca8"/>
        <rect x="378" y="470" width="268" height="18" fill="#1e1640" opacity=".5"/>
        <rect x="378" y="500" width="268" height="14" fill="#1e1640" opacity=".35"/>
        <path d="M378 542 L460 470 L530 520 L590 480 L646 530 V542Z" fill="#5be0b0"/>
        <rect x="292" y="700" width="440" height="70" rx="20" fill="#c99a20"/>
        ${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<rect x="${330 + i * 48}" y="720" width="28" height="50" rx="6" fill="#8a6610"/>`).join('')}`
    },
    dpad: {
      bg: ['#ff6a3d', '#ff9f43'],
      draw: () => `
        <circle cx="512" cy="512" r="330" fill="#fff" opacity=".14"/>
        <path d="M432 232 h160 a20 20 0 0 1 20 20 v160 h160 a20 20 0 0 1 20 20 v160 a20 20 0 0 1 -20 20 h-160 v160 a20 20 0 0 1 -20 20 h-160 a20 20 0 0 1 -20 -20 v-160 h-160 a20 20 0 0 1 -20 -20 v-160 a20 20 0 0 1 20 -20 h160 v-160 a20 20 0 0 1 20 -20z" fill="#2a1a3a"/>
        <circle cx="512" cy="512" r="40" fill="#fff" opacity=".18"/>
        <path d="M512 286 l40 60 h-80z M512 738 l40 -60 h-80z M286 512 l60 -40 v80z M738 512 l-60 -40 v80z" fill="#fff" opacity=".35"/>`
    },
    heart: {
      bg: ['#1b1433', '#3b2470'],
      draw: () => {
        const map = [
          '..XX...XX..',
          '.XXXX.XXXX.',
          'XXXXXXXXXXX',
          'XXXXXXXXXXX',
          'XXXXXXXXXXX',
          '.XXXXXXXXX.',
          '..XXXXXXX..',
          '...XXXXX...',
          '....XXX....',
          '.....X.....'
        ];
        const size = 58, ox = 512 - (11 * size) / 2, oy = 230;
        let s = '';
        map.forEach((row, r) => row.split('').forEach((ch, k) => {
          if (ch === 'X') {
            const hi = (r === 1 && (k === 2 || k === 3)) || (r === 2 && k === 2);
            s += `<rect x="${ox + k * size}" y="${oy + r * size}" width="${size + 1}" height="${size + 1}" fill="${hi ? '#ffd1e6' : r > 6 ? '#d63a7a' : '#ff5ca8'}"/>`;
          }
        }));
        return s + `<rect x="${ox}" y="${oy + 10 * size + 20}" width="${11 * size}" height="14" rx="7" fill="#ffc94a" opacity=".8"/>`;
      }
    },
    joy: {
      bg: ['#0f6e7a', '#2fc1c9'],
      draw: () => `
        <ellipse cx="512" cy="760" rx="300" ry="70" fill="#0b3f46" opacity=".5"/>
        <path d="M232 690 Q232 620 300 620 H724 Q792 620 792 690 V740 Q792 790 740 790 H284 Q232 790 232 740Z" fill="#1c1c2a"/>
        <rect x="232" y="640" width="560" height="30" fill="#fff" opacity=".08"/>
        <rect x="486" y="360" width="52" height="300" rx="26" fill="#2a2a3a"/>
        <circle cx="512" cy="330" r="118" fill="#ff4d6d"/>
        <circle cx="474" cy="290" r="36" fill="#fff" opacity=".45"/>
        <circle cx="660" cy="700" r="34" fill="#ffc94a"/><circle cx="360" cy="700" r="34" fill="#5be0b0"/>`
    },
    sun: {
      bg: ['#1a0f3d', '#7a2a8c'],
      draw: () => {
        let s = `<defs><linearGradient id="isun" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe066"/><stop offset="1" stop-color="#ff4fa3"/></linearGradient><clipPath id="iclip"><circle cx="512" cy="470" r="250"/></clipPath></defs>`;
        s += `<circle cx="512" cy="470" r="250" fill="url(#isun)"/>`;
        s += `<g clip-path="url(#iclip)">${[0, 1, 2, 3, 4].map(i => `<rect x="200" y="${500 + i * 46}" width="624" height="${10 + i * 5}" fill="#3a1660"/>`).join('')}</g>`;
        s += `<rect x="0" y="720" width="1024" height="304" fill="#14082e"/>`;
        for (let i = 0; i <= 12; i++) s += `<path d="M512 720 L${-400 + i * 152} 1024" stroke="#ff4fa3" stroke-width="5" opacity=".7"/>`;
        [740, 770, 815, 880, 970].forEach(y => { s += `<path d="M0 ${y} H1024" stroke="#ff4fa3" stroke-width="5" opacity=".7"/>`; });
        return s;
      }
    }
  };

  function iconSVG(key, size = 1024, rounded = true) {
    const ic = ICONS[key] || ICONS.cart;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="${size}" height="${size}">
      <defs><linearGradient id="ibg_${key}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${ic.bg[0]}"/><stop offset="1" stop-color="${ic.bg[1]}"/></linearGradient>
      <clipPath id="iclipbg_${key}"><rect width="1024" height="1024" ${rounded ? 'rx="224"' : ''}/></clipPath></defs>
      <g clip-path="url(#iclipbg_${key})"><rect width="1024" height="1024" fill="url(#ibg_${key})"/>
      ${ic.draw()}</g>
    </svg>`;
  }

  return { consoleSVG, iconSVG, ICON_KEYS: Object.keys(ICONS), shade };
})();

if (typeof module !== 'undefined') module.exports = Art;
