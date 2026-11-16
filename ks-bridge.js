/* Konsolarium – Brücke für die Labor-Emulatoren (3DS, PS2, GameCube/Wii)
   Liest die ROM aus der Konsolarium-Dateiablage (IndexedDB) und zeigt
   einen Zurück-Knopf sowie einen Start-Knopf (nötig für den Ton auf dem iPhone). */
(function () {
  'use strict';

  const DICT = {
    de: { back: 'Zurück', start: 'Spiel starten', loading: 'Lade Spiel aus deiner Dateiablage …', notFound: 'Spiel nicht gefunden.', note: 'Experimenteller Emulator – Speicherstände und Einstellungen findest du direkt im Emulator.' },
    en: { back: 'Back', start: 'Start game', loading: 'Loading game from your file storage …', notFound: 'Game not found.', note: 'Experimental emulator – save states and settings are inside the emulator itself.' },
    tr: { back: 'Geri', start: 'Oyunu başlat', loading: 'Oyun dosya arşivinden yükleniyor …', notFound: 'Oyun bulunamadı.', note: 'Deneysel emülatör – kayıtlar ve ayarlar doğrudan emülatörün içinde.' },
    es: { back: 'Atrás', start: 'Iniciar juego', loading: 'Cargando el juego desde tu almacén …', notFound: 'No se encontró el juego.', note: 'Emulador experimental: los estados y ajustes están dentro del propio emulador.' },
    fr: { back: 'Retour', start: 'Lancer le jeu', loading: 'Chargement du jeu depuis ton espace de fichiers …', notFound: 'Jeu introuvable.', note: 'Émulateur expérimental : sauvegardes et réglages se trouvent dans l’émulateur lui-même.' },
    it: { back: 'Indietro', start: 'Avvia gioco', loading: 'Carico il gioco dal tuo archivio …', notFound: 'Gioco non trovato.', note: 'Emulatore sperimentale: salvataggi e impostazioni si trovano nell’emulatore stesso.' },
    ru: { back: 'Назад', start: 'Начать игру', loading: 'Загрузка игры из хранилища …', notFound: 'Игра не найдена.', note: 'Экспериментальный эмулятор: сохранения и настройки находятся в самом эмуляторе.' },
    ja: { back: '戻る', start: 'ゲームを開始', loading: 'ファイル置き場からゲームを読み込み中…', notFound: 'ゲームが見つかりません。', note: '実験的なエミュレーターです。セーブと設定はエミュレーター内にあります。' },
    ko: { back: '뒤로', start: '게임 시작', loading: '파일 보관함에서 게임을 불러오는 중…', notFound: '게임을 찾을 수 없습니다.', note: '실험적 에뮬레이터입니다. 세이브와 설정은 에뮬레이터 안에 있습니다.' },
    zh: { back: '返回', start: '开始游戏', loading: '正在从文件库加载游戏…', notFound: '找不到游戏。', note: '实验性模拟器——存档和设置位于模拟器内部。' },
    zht: { back: '返回', start: '開始遊戲', loading: '正在從檔案庫載入遊戲…', notFound: '找不到遊戲。', note: '實驗性模擬器——存檔和設定位於模擬器內部。' },
    ar: { back: 'رجوع', start: 'ابدأ اللعبة', loading: 'جارٍ تحميل اللعبة من مخزن ملفاتك …', notFound: 'لم يُعثر على اللعبة.', note: 'محاكٍ تجريبي – نقاط الحفظ والإعدادات موجودة داخل المحاكي نفسه.' },
    fa: { back: 'بازگشت', start: 'شروع بازی', loading: 'در حال بارگذاری بازی از بایگانی …', notFound: 'بازی پیدا نشد.', note: 'شبیه‌ساز آزمایشی – ذخیره‌ها و تنظیمات داخل خود شبیه‌ساز هستند.' }
  };

  function settings() { try { return JSON.parse(localStorage.getItem('ks.settings') || '{}'); } catch (e) { return {}; } }
  const lang = settings().lang || 'de';
  const L = DICT[lang] || DICT.en;
  const rtl = lang === 'ar' || lang === 'fa';
  const params = new URLSearchParams(location.search);
  const romId = params.get('ksrom');

  /* Gleiches Schema wie in js/common.js, damit eine leere Datenbank korrekt angelegt wird */
  function openDB() {
    return new Promise((resolve, reject) => {
      const r = indexedDB.open('konsolarium', 1);
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
  }
  function req(store, mode, fn) {
    return openDB().then(db => new Promise((resolve, reject) => {
      const q = fn(db.transaction(store, mode).objectStore(store));
      q.onsuccess = () => resolve(q.result);
      q.onerror = () => reject(q.error);
    }));
  }

  async function loadRom() {
    if (!romId) return null;
    const rom = await req('roms', 'readonly', s => s.get(romId));
    const data = await req('romdata', 'readonly', s => s.get(romId));
    if (!rom || !data) return null;
    rom.lastPlayed = Date.now();
    rom.playCount = (rom.playCount || 0) + 1;
    try { await req('roms', 'readwrite', s => s.put(rom)); } catch (e) { /* Statistik ist optional */ }
    return { rom, file: new File([data.blob], rom.fileName, { type: 'application/octet-stream' }) };
  }

  const css = `
    .ks-back{position:fixed;z-index:2147483000;${window.KS_BACK_BOTTOM ? 'bottom:calc(env(safe-area-inset-bottom,0px) + 10px)' : 'top:calc(env(safe-area-inset-top,0px) + 8px)'};${rtl ? 'right' : 'left'}:calc(env(safe-area-inset-left,0px) + 8px);
      display:inline-flex;align-items:center;gap:6px;height:34px;padding:0 14px 0 10px;border-radius:17px;border:0;cursor:pointer;
      background:rgba(21,18,42,.86);color:#ffc94a;font:700 14px ui-rounded,system-ui,-apple-system,sans-serif;box-shadow:0 4px 14px rgba(0,0,0,.35);
      -webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}
    .ks-back svg{width:16px;height:16px}
    .ks-start{position:fixed;inset:0;z-index:2147482999;display:grid;place-items:center;padding:24px;background:rgba(11,10,20,.82);
      -webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);color:#f2efff;font:16px ui-rounded,system-ui,-apple-system,sans-serif;text-align:center}
    .ks-start .box{max-width:380px}
    .ks-start h2{margin:0 0 6px;font-size:22px;font-weight:800}
    .ks-start p{margin:0 0 18px;color:#cfc8f4;font-size:14px;line-height:1.4}
    .ks-start button{height:52px;padding:0 26px;border-radius:26px;border:0;background:#ffc94a;color:#2b1d00;font:800 17px ui-rounded,system-ui,sans-serif;cursor:pointer;box-shadow:0 10px 26px rgba(255,201,74,.35)}
    .ks-start button[disabled]{opacity:.5}
    .ks-toast{position:fixed;left:50%;bottom:calc(env(safe-area-inset-bottom,0px) + 22px);transform:translateX(-50%);z-index:2147483001;
      padding:10px 18px;border-radius:20px;background:#221d42;color:#fff;font:600 14px ui-rounded,system-ui,sans-serif;box-shadow:0 8px 24px rgba(0,0,0,.35)}`;

  function ready(fn) { if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn); else fn(); }

  /* Spielzeit: zählt, solange die Seite sichtbar ist und das Spiel gestartet wurde */
  let playStarted = false, pendingMs = 0;
  async function flushTime() {
    const add = pendingMs;
    if (!add || !romId) return;
    pendingMs = 0;
    try {
      const rom = await req('roms', 'readonly', s => s.get(romId));
      if (rom) { rom.playTime = (rom.playTime || 0) + add; await req('roms', 'readwrite', s => s.put(rom)); }
      try {
        /* Spielzeit je Tag für die Statistik (wie in common.js) */
        const d = new Date(), k = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
        const o = JSON.parse(localStorage.getItem('ks.playDays') || '{}') || {};
        o[k] = (o[k] || 0) + add;
        const keys = Object.keys(o).sort();
        while (keys.length > 120) delete o[keys.shift()];
        localStorage.setItem('ks.playDays', JSON.stringify(o));
      } catch (e) { /* egal */ }
    } catch (e) { pendingMs += add; }
  }
  setInterval(() => {
    if (!playStarted || document.hidden) return;
    pendingMs += 1000;
    if (pendingMs >= 30000) flushTime();
  }, 1000);
  document.addEventListener('visibilitychange', () => { if (document.hidden) flushTime(); });
  window.addEventListener('pagehide', flushTime);

  async function back() {
    await flushTime();
    location.href = '../../index.html#/' + (romId ? 'rom/' + encodeURIComponent(romId) : 'library');
  }

  function toast(msg, ms = 2600) {
    const el = document.createElement('div');
    el.className = 'ks-toast';
    el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), ms);
  }

  /* Zeigt den Start-Dialog. cb() wird beim Tippen aufgerufen (Benutzergeste für Audio). */
  function showStart(title, cb, opts = {}) {
    const ov = document.createElement('div');
    ov.className = 'ks-start';
    ov.setAttribute('dir', rtl ? 'rtl' : 'ltr');
    ov.innerHTML = `<div class="box"><h2></h2><p></p><button type="button"></button></div>`;
    ov.querySelector('h2').textContent = title;
    ov.querySelector('p').textContent = opts.note || L.note;
    const btn = ov.querySelector('button');
    btn.textContent = L.start;
    btn.onclick = async () => {
      btn.disabled = true;
      btn.textContent = L.loading;
      playStarted = true;
      try { await cb(); } finally { ov.remove(); }
    };
    document.body.appendChild(ov);
    return ov;
  }

  ready(() => {
    const st = document.createElement('style');
    st.textContent = css;
    document.head.appendChild(st);
    const b = document.createElement('button');
    b.className = 'ks-back';
    b.type = 'button';
    b.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" style="${rtl ? 'transform:scaleX(-1)' : ''}"><path d="M15 5l-7 7 7 7"/></svg><span></span>`;
    b.querySelector('span').textContent = L.back;
    b.onclick = back;
    document.body.appendChild(b);
    /* Pinch-Zoom unterbinden wie in der Haupt-App */
    ['gesturestart', 'gesturechange'].forEach(ev => document.addEventListener(ev, e => e.preventDefault(), { passive: false }));
  });

  window.KSBridge = {
    L, romId, loadRom, showStart, toast, back,
    waitFor(test, timeout = 120000, step = 200) {
      return new Promise((resolve, reject) => {
        const t0 = Date.now();
        const tick = () => {
          let ok = false;
          try { ok = test(); } catch (e) { ok = false; }
          if (ok) return resolve(true);
          if (Date.now() - t0 > timeout) return reject(new Error('timeout'));
          setTimeout(tick, step);
        };
        tick();
      });
    }
  };
})();
