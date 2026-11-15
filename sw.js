/* Konsolarium – Service Worker
   - hält App und Emulator-Kerne offline bereit
   - aktualisiert die App nur auf Anfrage der Seite (Auto-Update abschaltbar)
   - setzt COOP/COEP-Header, damit Emulatoren mit Threads (PSP, DOS) laufen */

const APP_PREFIX = 'ks-app-';
const EJS_CACHE = 'ks-ejs-4.2.3';
const LAB_CACHE = 'ks-labs-1'; /* große Labor-Dateien (WASM); bei neuen Kernen hochzählen */
const META = 'ks-meta';
const BASE = new URL('./', self.location).href;

async function installVersion() {
  const r = await fetch(BASE + 'version.json?ts=' + Date.now(), { cache: 'no-store' });
  const v = await r.json();
  const name = APP_PREFIX + v.version;
  const cache = await caches.open(name);
  await cache.addAll(v.files.map(f => new Request(BASE + f, { cache: 'reload' })));
  const ec = await caches.open(EJS_CACHE);
  for (const f of (v.ejsFiles || [])) {
    if (!(await ec.match(BASE + f))) {
      try { await ec.add(new Request(BASE + f, { cache: 'reload' })); } catch (e) { /* später nachladen */ }
    }
  }
  const meta = await caches.open(META);
  await meta.put(BASE + '__current', new Response(v.version));
  for (const k of await caches.keys()) {
    if (k.startsWith(APP_PREFIX) && k !== name) await caches.delete(k);
  }
  return v.version;
}

self.addEventListener('install', e => {
  e.waitUntil(installVersion().catch(() => null).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('message', e => {
  const port = e.ports && e.ports[0];
  if (e.data && e.data.type === 'update') {
    e.waitUntil(installVersion()
      .then(v => port && port.postMessage({ ok: true, version: v }))
      .catch(err => port && port.postMessage({ error: String(err) })));
  }
});

function isolate(resp) {
  if (!resp || resp.type === 'opaque' || resp.type === 'opaqueredirect' || resp.status === 0) return resp;
  const h = new Headers(resp.headers);
  h.set('Cross-Origin-Embedder-Policy', 'require-corp');
  h.set('Cross-Origin-Opener-Policy', 'same-origin');
  h.set('Cross-Origin-Resource-Policy', 'same-origin');
  /* Der Service Worker ist der Zwischenspeicher: Browser soll nicht zusätzlich alte Kopien behalten */
  h.set('Cache-Control', 'no-cache');
  return new Response(resp.body, { status: resp.status, statusText: resp.statusText, headers: h });
}

async function currentAppCache() {
  const meta = await caches.open(META);
  const r = await meta.match(BASE + '__current');
  return r ? APP_PREFIX + (await r.text()) : null;
}

async function handle(req) {
  const url = new URL(req.url);
  let rel = url.href.slice(BASE.length).split('#')[0];
  const relNoQuery = rel.split('?')[0];

  if (relNoQuery === 'version.json') {
    try { return await fetch(req, { cache: 'no-store' }); } catch (e) { return new Response('{}', { status: 503 }); }
  }

  if (relNoQuery.startsWith('emulatorjs/')) {
    const ec = await caches.open(EJS_CACHE);
    const hit = await ec.match(BASE + relNoQuery);
    if (hit) return isolate(hit);
    const resp = await fetch(req);
    if (resp.ok) ec.put(BASE + relNoQuery, resp.clone());
    return isolate(resp);
  }

  const name = await currentAppCache();
  const key = BASE + (relNoQuery === '' ? 'index.html' : relNoQuery);
  if (name) {
    const cache = await caches.open(name);
    const hit = await cache.match(key, { ignoreSearch: true });
    if (hit) return isolate(hit);
  }
  if (relNoQuery.startsWith('labs/')) {
    const lc = await caches.open(LAB_CACHE);
    const hit = await lc.match(BASE + relNoQuery);
    if (hit) return isolate(hit);
    const resp = await fetch(req);
    if (resp.ok && resp.status === 200) lc.put(BASE + relNoQuery, resp.clone());
    return isolate(resp);
  }
  try {
    return isolate(await fetch(req));
  } catch (e) {
    if (req.mode === 'navigate' && name) {
      const cache = await caches.open(name);
      const fallback = await cache.match(BASE + 'index.html');
      if (fallback) return isolate(fallback);
    }
    throw e;
  }
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  if (!req.url.startsWith(BASE)) return;
  e.respondWith(handle(req));
});
