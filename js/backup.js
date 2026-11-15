/* Konsolarium – Sicherung: alle Spieldaten als eine Datei exportieren und wiederherstellen.

   Dateiformat .ksbackup
     Byte 0–7    "KSBACKUP"
     Byte 8–11   Format-Version (uint32, little endian)
     Byte 12–15  Länge des JSON-Kopfs in Byte (uint32, little endian)
     danach      JSON-Kopf (UTF-8), dann alle Binärdaten am Stück.
   Binärdaten (Speicherstände, Vorschaubilder, In-Game-Saves, optional ROMs) stehen im Kopf
   als Verweis { o: Versatz, n: Länge } relativ zum Ende des Kopfs. So lassen sich auch große
   Sicherungen erstellen und einlesen, ohne alles gleichzeitig im Arbeitsspeicher zu halten. */

const Backup = (() => {
  const MAGIC = 'KSBACKUP', FORMAT = 1, HEAD = 16, EXT = '.ksbackup';
  /* Datenbanken, die nur Zwischenspeicher enthalten (Emulator-Kerne, JIT-Cache) */
  const isCacheDb = n => /^EmulatorJS-/.test(n) || n === 'dolphin-jit-cache';
  /* Falls der Browser keine Liste der Datenbanken liefert */
  const KNOWN_DB = ['konsolarium', '/data/saves', 'azahar-web'];
  /* Große Spieldateien – nur auf Wunsch */
  const GAME_STORES = { konsolarium: ['romdata', 'bios'] };
  /* Inhalt ändert sich nie: Vorhandenes nicht neu schreiben */
  const KEEP_EXISTING = { konsolarium: ['romdata', 'bios', 'statedata'] };
  const LS_SKIP = ['ks.updTried', 'ks.resetDone', 'ks.restoreDone', 'ks.lastBackup', 'ks.bkSnooze'];
  const BATCH_RECORDS = 40, BATCH_BYTES = 24 * 1024 * 1024;

  const req = r => new Promise((res, rej) => { r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); });

  /* Öffnet eine vorhandene Datenbank, ohne versehentlich eine neue anzulegen */
  function openExisting(name) {
    return new Promise(resolve => {
      let r;
      try { r = indexedDB.open(name); } catch (e) { resolve(null); return; }
      r.onupgradeneeded = () => { try { r.transaction.abort(); } catch (e) { /* egal */ } };
      r.onsuccess = () => resolve(r.result);
      r.onerror = e => { if (e && e.preventDefault) e.preventDefault(); resolve(null); };
      r.onblocked = () => resolve(null);
    });
  }

  async function listDatabases() {
    let names = [];
    try { if (indexedDB.databases) names = (await indexedDB.databases()).map(d => d.name).filter(Boolean); } catch (e) { /* älterer Browser */ }
    KNOWN_DB.forEach(n => { if (!names.includes(n)) names.push(n); });
    names = names.filter(n => !isCacheDb(n));
    /* eigene Datenbank zuerst */
    return names.sort((a, b) => (a === 'konsolarium' ? -1 : b === 'konsolarium' ? 1 : 0));
  }

  /* ---------- Kodieren: beliebige IndexedDB-Werte → JSON + Binärteile ---------- */
  function Writer() {
    const parts = [];
    let size = 0;
    return {
      parts,
      get size() { return size; },
      add(x) { const o = size; parts.push(x); size += x instanceof Blob ? x.size : x.byteLength; return o; }
    };
  }

  function enc(v, w) {
    if (v === null || typeof v === 'string' || typeof v === 'boolean') return v;
    if (typeof v === 'number') return Number.isFinite(v) ? v : { __ks: 'n', v: String(v) };
    if (typeof v === 'undefined') return { __ks: 'u' };
    if (typeof v === 'bigint') return { __ks: 'bi', v: v.toString() };
    if (v instanceof Date) return { __ks: 'd', v: v.getTime() };
    if (v instanceof Blob) {
      const o = { __ks: 'b', o: w.add(v), n: v.size, t: v.type || '' };
      if (typeof File !== 'undefined' && v instanceof File) { o.f = v.name; o.m = v.lastModified; }
      return o;
    }
    if (v instanceof ArrayBuffer) return { __ks: 'ab', o: w.add(new Uint8Array(v)), n: v.byteLength };
    if (ArrayBuffer.isView(v)) {
      const bytes = new Uint8Array(v.buffer, v.byteOffset, v.byteLength);
      return { __ks: v instanceof DataView ? 'dv' : 'ta', c: v.constructor.name, o: w.add(bytes), n: v.byteLength };
    }
    if (Array.isArray(v)) return v.map(x => enc(x, w));
    if (v instanceof Map) return { __ks: 'map', v: Array.from(v, ([k, x]) => [enc(k, w), enc(x, w)]) };
    if (v instanceof Set) return { __ks: 'set', v: Array.from(v, x => enc(x, w)) };
    if (v instanceof RegExp) return { __ks: 're', s: v.source, f: v.flags };
    const o = {};
    for (const k of Object.keys(v)) o[k] = enc(v[k], w);
    return Object.prototype.hasOwnProperty.call(o, '__ks') ? { __ks: 'o', v: o } : o;
  }

  const TYPED = { Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array };
  if (typeof BigInt64Array !== 'undefined') { TYPED.BigInt64Array = BigInt64Array; TYPED.BigUint64Array = BigUint64Array; }

  function Reader(file, base) {
    return {
      blob: (o, n, type) => file.slice(base + o, base + o + n, type || ''),
      buffer: (o, n) => file.slice(base + o, base + o + n).arrayBuffer()
    };
  }

  async function dec(v, rd) {
    if (v === null || typeof v !== 'object') return v;
    if (Array.isArray(v)) { const a = []; for (const x of v) a.push(await dec(x, rd)); return a; }
    switch (v.__ks) {
      case undefined: break;
      case 'n': return Number(v.v);
      case 'u': return undefined;
      case 'bi': return BigInt(v.v);
      case 'd': return new Date(v.v);
      case 'b': {
        const b = rd.blob(v.o, v.n, v.t);
        return v.f != null ? new File([b], v.f, { type: v.t, lastModified: v.m }) : b;
      }
      case 'ab': return rd.buffer(v.o, v.n);
      case 'ta': return new (TYPED[v.c] || Uint8Array)(await rd.buffer(v.o, v.n));
      case 'dv': return new DataView(await rd.buffer(v.o, v.n));
      case 'map': { const m = new Map(); for (const [k, x] of v.v) m.set(await dec(k, rd), await dec(x, rd)); return m; }
      case 'set': { const s = new Set(); for (const x of v.v) s.add(await dec(x, rd)); return s; }
      case 're': return new RegExp(v.s, v.f);
      case 'o': v = v.v; break;
      default: break;
    }
    const o = {};
    for (const k of Object.keys(v)) o[k] = await dec(v[k], rd);
    return o;
  }

  /* Bytes, die beim Dekodieren wirklich in den Arbeitsspeicher geladen werden */
  function memBytes(v) {
    if (!v || typeof v !== 'object') return 0;
    if (Array.isArray(v)) return v.reduce((n, x) => n + memBytes(x), 0);
    if (v.__ks === 'ab' || v.__ks === 'ta' || v.__ks === 'dv') return v.n;
    let n = 0;
    for (const k of Object.keys(v)) n += memBytes(v[k]);
    return n;
  }

  function keyOf(value, keyPath) {
    if (keyPath == null || value == null) return undefined;
    if (Array.isArray(keyPath)) { const ks = keyPath.map(p => keyOf(value, p)); return ks.includes(undefined) ? undefined : ks; }
    return keyPath.split('.').reduce((o, p) => (o == null ? undefined : o[p]), value);
  }

  /* ---------- Überblick ---------- */
  async function summary() {
    const s = { roms: 0, missing: 0, gameBytes: 0, states: 0, cheats: 0, sram: 0, extStates: 0 };
    const db = await openExisting('konsolarium');
    if (db) {
      try {
        const tx = db.transaction(['roms', 'romdata', 'bios', 'states', 'cheats']);
        const roms = await req(tx.objectStore('roms').getAll());
        const have = new Set(await req(tx.objectStore('romdata').getAllKeys()));
        const bios = await req(tx.objectStore('bios').getAll());
        s.roms = roms.length;
        roms.forEach(r => { if (have.has(r.id)) s.gameBytes += r.size || 0; else s.missing++; });
        bios.forEach(b => { s.gameBytes += b.size || (b.blob && b.blob.size) || 0; });
        s.states = await req(tx.objectStore('states').count());
        s.cheats = await req(tx.objectStore('cheats').count());
      } catch (e) { /* leer */ } finally { db.close(); }
    }
    s.sram = await countRecords('/data/saves', 'FILE_DATA', v => v && v.contents && v.contents.byteLength > 0);
    s.extStates = await countRecords('azahar-web', 'saveStates');
    return s;
  }

  async function countRecords(dbName, storeName, filter) {
    const db = await openExisting(dbName);
    if (!db) return 0;
    try {
      if (!db.objectStoreNames.contains(storeName)) return 0;
      const os = db.transaction(storeName).objectStore(storeName);
      if (!filter) return await req(os.count());
      return await new Promise((res, rej) => {
        let n = 0;
        const c = os.openCursor();
        c.onsuccess = () => { const cur = c.result; if (!cur) return res(n); if (filter(cur.value)) n++; cur.continue(); };
        c.onerror = () => rej(c.error);
      });
    } catch (e) { return 0; } finally { db.close(); }
  }

  /* ---------- Sicherung erstellen ---------- */
  async function create({ withGames = false, onProgress } = {}) {
    const w = Writer();
    const names = await listDatabases();
    const dbs = [];
    const stats = { roms: 0, romFiles: 0, bios: 0, states: 0, cheats: 0, sram: 0, extStates: 0 };
    let step = 0;
    for (const name of names) {
      const db = await openExisting(name);
      if (db) {
        try {
          const info = { name, version: db.version, stores: [] };
          for (const sn of Array.from(db.objectStoreNames)) {
            const os = db.transaction(sn).objectStore(sn);
            const meta = {
              name: sn, keyPath: os.keyPath, autoIncrement: os.autoIncrement,
              indexes: Array.from(os.indexNames).map(i => { const ix = os.index(i); return { name: i, keyPath: ix.keyPath, unique: ix.unique, multiEntry: ix.multiEntry }; }),
              records: []
            };
            const skip = !withGames && (GAME_STORES[name] || []).includes(sn);
            if (!skip) {
              await new Promise((res, rej) => {
                const c = os.openCursor();
                c.onsuccess = () => {
                  const cur = c.result;
                  if (!cur) return res();
                  const v = cur.value;
                  meta.records.push(os.keyPath !== null ? enc(v, w) : [enc(cur.primaryKey, w), enc(v, w)]);
                  count(stats, name, sn, v);
                  cur.continue();
                };
                c.onerror = () => rej(c.error);
              });
            }
            info.stores.push(meta); /* auch leer: beim Wiederherstellen muss es den Speicher geben */
          }
          dbs.push(info);
        } finally { db.close(); }
      }
      if (onProgress) onProgress(++step / names.length);
    }
    const ls = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && !LS_SKIP.includes(k)) ls[k] = localStorage.getItem(k);
    }
    const head = { app: 'Konsolarium', appVersion: APP.version, format: FORMAT, created: Date.now(), withGames, stats, dbs, ls };
    const json = new TextEncoder().encode(JSON.stringify(head));
    const pre = new Uint8Array(HEAD);
    for (let i = 0; i < MAGIC.length; i++) pre[i] = MAGIC.charCodeAt(i);
    const dv = new DataView(pre.buffer);
    dv.setUint32(8, FORMAT, true);
    dv.setUint32(12, json.byteLength, true);
    const blob = new Blob([pre, json].concat(w.parts), { type: 'application/octet-stream' });
    const d = new Date(), p = n => String(n).padStart(2, '0');
    const fileName = `Konsolarium-Backup-${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}${EXT}`;
    return { blob, fileName, size: blob.size, stats };
  }

  function count(stats, db, store, v) {
    if (db === 'konsolarium') {
      if (store === 'roms') stats.roms++;
      else if (store === 'romdata') stats.romFiles++;
      else if (store === 'bios') stats.bios++;
      else if (store === 'states') stats.states++;
      else if (store === 'cheats') stats.cheats++;
    } else if (db === '/data/saves') { if (v && v.contents && v.contents.byteLength > 0) stats.sram++; }
    else if (db === 'azahar-web' && store === 'saveStates') stats.extStates++;
  }

  /* Datei teilen (iPhone/Android: „In Dateien sichern“) oder herunterladen.
     Muss direkt aus einem Klick heraus aufgerufen werden. */
  function deliver(res) {
    const file = new File([res.blob], res.fileName, { type: 'application/octet-stream' });
    const mobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const download = () => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(file); a.download = res.fileName;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 120000);
      markDone();
      return Promise.resolve('downloaded');
    };
    let shareOk = false;
    try { shareOk = mobile && navigator.canShare && navigator.canShare({ files: [file] }); } catch (e) { shareOk = false; }
    if (!shareOk) return download();
    return navigator.share({ files: [file], title: res.fileName })
      .then(() => { markDone(); return 'shared'; })
      .catch(e => (e && e.name === 'AbortError' ? 'aborted' : download()));
  }

  function markDone() { try { localStorage.setItem('ks.lastBackup', String(Date.now())); } catch (e) { /* egal */ } }
  function last() { return Number(localStorage.getItem('ks.lastBackup')) || 0; }

  /* ---------- Sicherung einlesen ---------- */
  async function readHeader(file) {
    const bad = code => Object.assign(new Error(code), { code });
    if (!file || file.size < HEAD) throw bad('bad');
    const pre = new Uint8Array(await file.slice(0, HEAD).arrayBuffer());
    let magic = '';
    for (let i = 0; i < MAGIC.length; i++) magic += String.fromCharCode(pre[i]);
    if (magic !== MAGIC) throw bad('bad');
    const dv = new DataView(pre.buffer);
    const fmt = dv.getUint32(8, true), len = dv.getUint32(12, true);
    if (fmt > FORMAT) throw bad('newer');
    if (HEAD + len > file.size) throw bad('bad');
    let head;
    try { head = JSON.parse(await file.slice(HEAD, HEAD + len).text()); } catch (e) { throw bad('bad'); }
    if (!head || head.app !== 'Konsolarium' || !Array.isArray(head.dbs)) throw bad('bad');
    return { head, base: HEAD + len };
  }

  function openForRestore(info) {
    return new Promise(resolve => {
      const attempt = withVersion => {
        let r;
        try { r = withVersion ? indexedDB.open(info.name, info.version) : indexedDB.open(info.name); } catch (e) { resolve(null); return; }
        r.onupgradeneeded = () => {
          const d = r.result;
          for (const st of info.stores) {
            if (d.objectStoreNames.contains(st.name)) continue;
            const os = d.createObjectStore(st.name, st.keyPath !== null ? { keyPath: st.keyPath, autoIncrement: st.autoIncrement } : { autoIncrement: st.autoIncrement });
            for (const ix of st.indexes || []) { try { os.createIndex(ix.name, ix.keyPath, { unique: ix.unique, multiEntry: ix.multiEntry }); } catch (e) { /* egal */ } }
          }
        };
        r.onsuccess = () => resolve(r.result);
        r.onerror = e => {
          if (e && e.preventDefault) e.preventDefault();
          /* Auf diesem Gerät gibt es schon eine neuere Version der Datenbank → so öffnen */
          if (withVersion && r.error && r.error.name === 'VersionError') attempt(false); else resolve(null);
        };
      };
      attempt(true);
    });
  }

  function writeBatch(db, st, items, keepExisting) {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(st.name, 'readwrite');
      const os = tx.objectStore(st.name);
      for (const it of items) {
        const put = () => (st.keyPath !== null ? os.put(it.value) : os.put(it.value, it.key));
        const key = st.keyPath !== null ? keyOf(it.value, st.keyPath) : it.key;
        if (key === undefined) { put(); continue; }
        const g = os.get(key);
        g.onsuccess = () => {
          const ex = g.result;
          if (ex !== undefined) {
            if (keepExisting) return;
            /* Spielstände im Spiel: der neuere gewinnt */
            if (ex && it.value && ex.timestamp instanceof Date && it.value.timestamp instanceof Date && ex.timestamp > it.value.timestamp) return;
          }
          put();
        };
      }
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error || new Error('abort'));
    });
  }

  async function restore(file, parsed, onProgress) {
    const { head, base } = parsed;
    const rd = Reader(file, base);
    if (typeof DB !== 'undefined') DB.close();
    await new Promise(r => setTimeout(r, 50));
    const total = head.dbs.reduce((n, d) => n + d.stores.reduce((m, s) => m + s.records.length, 0), 0) || 1;
    let done = 0;
    for (const info of head.dbs) {
      if (isCacheDb(info.name)) continue;
      const db = await openForRestore(info);
      if (!db) { done += info.stores.reduce((m, s) => m + s.records.length, 0); continue; }
      try {
        for (const st of info.stores) {
          if (!st.records.length) continue;
          if (!db.objectStoreNames.contains(st.name)) { done += st.records.length; continue; }
          const keep = (KEEP_EXISTING[info.name] || []).includes(st.name);
          let items = [], bytes = 0;
          const flush = async () => {
            if (!items.length) return;
            await writeBatch(db, st, items, keep);
            done += items.length; items = []; bytes = 0;
            if (onProgress) onProgress(done / total);
          };
          for (const rec of st.records) {
            if (st.keyPath !== null) items.push({ value: await dec(rec, rd) });
            else items.push({ key: await dec(rec[0], rd), value: await dec(rec[1], rd) });
            bytes += memBytes(rec);
            if (items.length >= BATCH_RECORDS || bytes >= BATCH_BYTES) await flush();
          }
          await flush();
        }
      } finally { db.close(); }
    }
    for (const [k, raw] of Object.entries(head.ls || {})) {
      if (LS_SKIP.includes(k)) continue;
      let v = raw;
      if (k === 'ks.settings') {
        /* gerätebezogene Angaben nicht übernehmen */
        try { const o = JSON.parse(raw); delete o.offlineAll; v = JSON.stringify(o); } catch (e) { /* so lassen */ }
      }
      try { localStorage.setItem(k, v); } catch (e) { /* Speicher voll */ }
    }
    if (typeof DB !== 'undefined') await relinkTwins();
    try { if (navigator.storage && navigator.storage.persist) await navigator.storage.persist(); } catch (e) { /* egal */ }
    if (onProgress) onProgress(1);
  }

  /* Spiel aus der Sicherung ohne Datei, das auf diesem Gerät schon importiert war:
     Datei übernehmen, damit Speicherstände und In-Game-Saves wieder dazu passen. */
  async function relinkTwins() {
    try {
      const roms = await DB.all('roms');
      const have = new Set(await DB.keys('romdata'));
      for (const r of roms) {
        if (have.has(r.id)) continue;
        const twin = roms.find(x => x.id !== r.id && have.has(x.id) && x.fileName === r.fileName && x.size === r.size && x.system === r.system);
        if (!twin) continue;
        const d = await DB.get('romdata', twin.id);
        if (!d) continue;
        await DB.put('romdata', { id: r.id, blob: d.blob });
        have.add(r.id);
        const st = await DB.byIndex('states', 'romId', twin.id);
        const ch = await DB.byIndex('cheats', 'romId', twin.id);
        if (!st.length && !ch.length && !(twin.playCount > 0)) {
          await DB.del('romdata', twin.id); await DB.del('roms', twin.id);
          have.delete(twin.id);
          r.fav = r.fav || twin.fav;
          await DB.put('roms', r);
        }
      }
    } catch (e) { /* nicht kritisch */ }
  }

  return { EXT, summary, create, deliver, readHeader, restore, last, markDone };
})();
