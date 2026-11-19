/* Konsolarium – Hauptoberfläche */

/* Scroll-Container der App: die Seite selbst scrollt nie, so bleibt die Tableiste ruhig */
const SCR = () => document.getElementById('scroller') || document.scrollingElement;

const ICON = {
  consoles: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="7" width="19" height="11" rx="5.5"/><path d="M7 10.5v4M5 12.5h4"/><circle cx="16" cy="11.5" r="1" fill="currentColor"/><circle cx="18" cy="13.8" r="1" fill="currentColor"/></svg>',
  library: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H10l2 2h6.5A2.5 2.5 0 0 1 21 9.5v8a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5z"/><path d="M8 13h8"/></svg>',
  saves: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3h11l4 4v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 1-2z"/><path d="M8 3v5h7V3"/><rect x="7.5" y="13" width="9" height="8" rx="1"/></svg>',
  settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  back: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
  chev: '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13a1 1 0 0 0 1.5.9l10.4-6.5a1 1 0 0 0 0-1.8L9.5 4.6A1 1 0 0 0 8 5.5z"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8L3.5 9.7l5.9-.9z"/></svg>',
  starFill: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8L3.5 9.7l5.9-.9z"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  sort: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 4v16M3.5 16.5L7 20l3.5-3.5M17 20V4M13.5 7.5L17 4l3.5 3.5"/></svg>',
  sound: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/></svg>',
  click: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V11m0-1.5a1.5 1.5 0 0 1 3 0V11m0-.5a1.5 1.5 0 0 1 3 0v4.5a6 6 0 0 1-6 6h-1a6 6 0 0 1-5-2.7L4 15.5a1.6 1.6 0 0 1 2.6-1.8L9 16"/></svg>',
  palette: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a9 9 0 1 0 0 18c1.3 0 2-1 1.6-2.2-.5-1.4.4-2.8 1.9-2.8H18a3 3 0 0 0 3-3A9 9 0 0 0 12 3z"/><circle cx="7.5" cy="11" r="1.2" fill="currentColor"/><circle cx="11" cy="7.5" r="1.2" fill="currentColor"/><circle cx="15.5" cy="8.5" r="1.2" fill="currentColor"/></svg>',
  moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/></svg>',
  globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18"/></svg>',
  bolt: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L4.5 13.5H11L10 22l8.5-11.5H12z"/></svg>',
  ff: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 6.2v11.6a.8.8 0 0 0 1.3.6L11.5 12 4.3 5.6A.8.8 0 0 0 3 6.2zm9 0v11.6a.8.8 0 0 0 1.3.6L20.5 12l-7.2-6.4a.8.8 0 0 0-1.3.6z"/></svg>',
  wand: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20L15 9M14 4v3M18.5 5.5l-2 2M20 10h-3M9.5 4.5l1 1"/></svg>',
  cloud: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 18.5a4.5 4.5 0 0 1-.4-9 6 6 0 0 1 11.6 1.5A3.8 3.8 0 0 1 17.5 18.5z"/><path d="M12 11v5M9.8 14l2.2 2.2 2.2-2.2"/></svg>',
  disk: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/></svg>',
  refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 11a8 8 0 0 0-14.5-4.5L4 8M4 4v4h4M4 13a8 8 0 0 0 14.5 4.5L20 16M20 20v-4h-4"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><path d="M12 3l7.5 3v5.5c0 4.6-3.2 8.4-7.5 9.5-4.3-1.1-7.5-4.9-7.5-9.5V6z"/><path d="M8.8 12l2.2 2.2 4.2-4.4" stroke-linecap="round"/></svg>',
  book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5zM4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5"/></svg>',
  info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M9 7V4.5h6V7M6.5 7l1 13h9l1-13M10 11v6M14 11v6"/></svg>',
  edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16z"/></svg>',
  share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12M7.5 7.5L12 3l4.5 4.5M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/></svg>',
  chip: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2.5v3.5M15 2.5v3.5M9 18v3.5M15 18v3.5M2.5 9H6M2.5 15H6M18 9h3.5M18 15h3.5"/></svg>',
  warn: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4l9 16H3z"/><path d="M12 10v4M12 17.5v.5"/></svg>',
  rewind: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 6.2v11.6a.8.8 0 0 1-1.3.6L12.5 12l7.2-6.4a.8.8 0 0 1 1.3.6zm-9 0v11.6a.8.8 0 0 1-1.3.6L3.5 12l7.2-6.4a.8.8 0 0 1 1.3.6z"/></svg>',
  image: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="4.5" width="17" height="15" rx="2.5"/><circle cx="9" cy="10" r="1.8"/><path d="M20.5 16l-5-5L6 19.5"/></svg>',
  timer: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5M9.5 2.5h5"/></svg>',
  backup: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v11M7.5 9.5L12 14l4.5-4.5"/><path d="M4 15v3a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-3"/></svg>',
  restore: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 14V3M7.5 7.5L12 3l4.5 4.5"/><path d="M4 15v3a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-3"/></svg>',
  swap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h14l-3.5-3.5M20 16H6l3.5 3.5"/></svg>',
  chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h16"/><rect x="5.5" y="11" width="3" height="6" rx="1"/><rect x="10.5" y="6" width="3" height="11" rx="1"/><rect x="15.5" y="9" width="3" height="8" rx="1"/></svg>',
  hand: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V11M11 10V4.5a1.5 1.5 0 0 1 3 0V11M14 10.5V6a1.5 1.5 0 0 1 3 0v7.5a7 7 0 0 1-7 7h-.5a6 6 0 0 1-4.6-2.2L3.6 16a1.6 1.6 0 0 1 2.4-2.1L8 15.5"/></svg>',
  download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v11M7.5 10.5L12 15l4.5-4.5M5 19.5h14"/></svg>',
  file: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M12 11v6M9.5 14.5L12 17l2.5-2.5"/></svg>',
  notes: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3.5" width="14" height="17" rx="2"/><path d="M8.5 8h7M8.5 12h7M8.5 16h4"/></svg>',
  bat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7.5" width="16" height="9" rx="2"/><path d="M21 11v2"/><path d="M6.5 10.5v3M9.5 10.5v3"/></svg>',
  help: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9.5 9.3a2.6 2.6 0 0 1 5 .9c0 1.7-2.5 2.3-2.5 3.8"/><path d="M12 17.2h.01"/></svg>',
  sliders: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="17" r="2"/></svg>'
};

const UI = { sysQuery: '', sysFilter: 'all', libQuery: '', libSystem: 'all', libFav: false, scroll: {} };
const PLAYABLE = SYSTEMS.filter(isPlayable);
const MAKERS = ['Nintendo', 'Sony', 'Sega', 'Atari'];

function statusPill(s) { return `<span class="pill ${s.status}">${esc(t('st.' + s.status))}</span>`; }
function sysMakerLabel(s) { return s.maker; }
function licLabel(l) { return String(l || '').replace(/\bNC\b/, t('lic.nc')); }

/* ---------- Navigation ---------- */
function go(hash) { if (location.hash === hash) render(); else location.hash = hash; }
function back(fallback) { Sfx.back(); if (history.length > 1 && sessionStorage.getItem('ks.nav')) history.back(); else go(fallback || '#/systems'); }
window.addEventListener('hashchange', () => {
  sessionStorage.setItem('ks.nav', '1');
  $$('.overlay, .kerem-layer').forEach(o => o.remove());
  render();
});

function tabFor(hash) {
  if (hash.startsWith('#/library') || hash.startsWith('#/rom')) return 'library';
  if (hash.startsWith('#/saves')) return 'saves';
  if (hash.startsWith('#/settings') || hash.startsWith('#/cheats') || hash.startsWith('#/stats')) return 'settings';
  return 'systems';
}

function renderTabbar() {
  const cur = tabFor(location.hash || '#/systems');
  const tabs = [['systems', ICON.consoles], ['library', ICON.library], ['saves', ICON.saves], ['settings', ICON.settings]];
  $('#tabbar').innerHTML = `<div class="tabs" role="tablist">${tabs.map(([k, ic]) =>
    `<button role="tab" data-tab="${k}" ${cur === k ? 'aria-current="page"' : ''}>${ic}<span>${esc(t('tab.' + k))}</span></button>`).join('')}</div>`;
  $$('#tabbar button').forEach(b => b.onclick = () => {
    Sfx.tap();
    const k = b.dataset.tab;
    if (tabFor(location.hash) === k && location.hash !== '#/' + k) { go('#/' + k); return; }
    if (location.hash === '#/' + k) { SCR().scrollTo({ top: 0, behavior: 'smooth' }); return; }
    go('#/' + k);
  });
}

let lastHash = '';
async function render() {
  const hash = location.hash || '#/systems';
  if (lastHash) UI.scroll[lastHash] = SCR().scrollTop;
  const view = $('#view');
  renderTabbar();
  let m;
  try {
    if (hash === '#/systems' || hash === '#/' || hash === '#') await viewSystems(view);
    else if ((m = hash.match(/^#\/sys\/([\w]+)$/))) await viewSystem(view, m[1]);
    else if (hash === '#/library') await viewLibrary(view);
    else if ((m = hash.match(/^#\/rom\/([\w-]+)$/))) await viewRom(view, m[1]);
    else if (hash === '#/saves') await viewSaves(view);
    else if (hash === '#/settings') await viewSettings(view);
    else if (hash === '#/settings/lang') viewLang(view);
    else if (hash === '#/settings/design') viewDesign(view);
    else if (hash === '#/settings/privacy') viewPrivacy(view);
    else if (hash === '#/settings/sources') viewSources(view);
    else if (hash === '#/settings/about') viewAbout(view);
    else if (hash === '#/settings/cheats') await viewCheatGames(view);
    else if (hash === '#/settings/backup') await viewBackup(view);
    else if (hash === '#/settings/controller') await viewController(view);
    else if (hash === '#/settings/emulators') await viewEmulators(view);
    else if (hash === '#/stats') await viewStats(view);
    else if (hash === '#/settings/help') viewHelp(view);
    else if ((m = hash.match(/^#\/romprefs\/([\w-]+)$/))) await viewRomPrefs(view, m[1]);
    else if ((m = hash.match(/^#\/cheats\/([\w-]+)$/))) await viewCheats(view, m[1]);
    else await viewSystems(view);
  } catch (e) {
    console.error(e);
    view.innerHTML = `<div class="empty"><div class="big">${esc(t('c.error', { e: e.message }))}</div></div>`;
  }
  if (hash !== lastHash) {
    view.classList.remove('page-enter'); void view.offsetWidth; view.classList.add('page-enter');
    SCR().scrollTop = UI.scroll[hash] || 0;
  }
  lastHash = hash;
}

function topbar(fallback, extra = '') {
  return `<div class="topbar"><button class="back" data-back="${fallback}">${ICON.back}<span>${esc(t('c.back'))}</span></button><div class="spacer"></div>${extra}</div>`;
}
function bindBack(root) { $$('[data-back]', root).forEach(b => b.onclick = () => back(b.dataset.back)); }

/* ---------- Ansicht: Konsolen-Zeitleiste ---------- */
async function viewSystems(view) {
  const roms = await DB.all('roms');
  const counts = {};
  roms.forEach(r => counts[r.system] = (counts[r.system] || 0) + 1);
  const years = PLAYABLE.map(s => s.year);
  const filters = [['all', t('f.all')], ['ready', t('f.ready')], ['handheld', t('f.handheld')], ['console', t('f.console')], ['computer', t('f.computer')],
    ...MAKERS.map(m => [m, m]), ['other', t('f.other')]];
  const order = Settings.get('sortSys');

  view.innerHTML = `
    <div class="brand"><div class="brand-icon">${Art.iconSVG(Settings.get('icon'), 44)}</div><h1 class="title-xl">${APP.name}</h1></div>
    <p class="tagline">${esc(t('app.tagline', { n: PLAYABLE.length, from: Math.min(...years), to: Math.max(...years) }))}</p>
    <div id="cont-slot"></div>
    <div class="lib-tools">
      <label class="search">${ICON.search}<input id="sysq" type="search" enterkeyhint="search" autocomplete="off" placeholder="${esc(t('sys.search'))}" value="${esc(UI.sysQuery)}"><button class="clear" id="sysclear" ${UI.sysQuery ? '' : 'hidden'} aria-label="${esc(t('c.close'))}">${ICON.x}</button></label>
      <button class="icon-btn" id="sortsys" aria-label="${esc(t(order === 'old' ? 'sort.old' : 'sort.new'))}" title="${esc(t(order === 'old' ? 'sort.old' : 'sort.new'))}">${ICON.sort}</button>
    </div>
    <div class="chips" role="toolbar">${filters.map(([k, l]) => `<button class="chip" data-f="${k}" aria-pressed="${UI.sysFilter === k}">${esc(l)}</button>`).join('')}</div>
    <div id="offline-slot"></div>
    <div class="timeline" id="timeline"></div>`;

  const draw = () => {
    const q = UI.sysQuery.trim().toLowerCase();
    let list = SYSTEMS.filter(s => {
      const f = UI.sysFilter;
      if (f === 'ready' && !isPlayable(s)) return false;
      if (f === 'handheld' && s.type !== 'handheld') return false;
      if (f === 'console' && !(s.type === 'console' || s.type === 'addon')) return false;
      if (f === 'computer' && s.type !== 'computer') return false;
      if (MAKERS.includes(f) && s.maker !== f) return false;
      if (f === 'other' && MAKERS.includes(s.maker)) return false;
      if (q) {
        const hay = [s.name, s.maker, s.id, String(s.year), ...s.cores.map(c => c.name), t('type.' + s.type)].join(' ').toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    list.sort((a, b) => order === 'old' ? a.year - b.year || a.name.localeCompare(b.name) : b.year - a.year || a.name.localeCompare(b.name));
    if (!list.length) { $('#timeline').innerHTML = `<div class="empty">${esc(t('sys.none'))}</div>`; return; }
    let html = '', curDec = null, curYear = null;
    list.forEach(s => {
      const dec = decadeOf(s.year);
      if (dec !== curDec) {
        if (curDec !== null) html += '</div></div></section>';
        html += `<section class="decade" style="--dc:${DECADE_COLORS[dec] || '#9b87ff'}"><h2 class="decade-title">${esc(t('decade', { d: dec }))}</h2>`;
        curDec = dec; curYear = null;
      }
      if (s.year !== curYear) {
        if (curYear !== null) html += '</div></div>';
        html += `<div class="year"><div class="year-mark"><span>${s.year}</span></div><div class="year-cards">`;
        curYear = s.year;
      }
      const n = counts[s.id] || 0;
      html += `<button class="sys-card ${s.status === 'native' ? 'native' : ''}" data-sys="${s.id}">
        <div class="sys-art">${Art.consoleSVG(s)}</div>
        <div><div class="sys-name">${esc(s.name)}</div><div class="sys-maker">${esc(sysMakerLabel(s))}</div>
        <div class="sys-tags">${statusPill(s)}${n ? `<span class="pill count">${esc(nGames(n))}</span>` : ''}</div></div>
      </button>`;
    });
    html += '</div></div></section>';
    $('#timeline').innerHTML = html;
    $$('#timeline .sys-card').forEach(c => c.onclick = () => { Sfx.tap(); go('#/sys/' + c.dataset.sys); });
  };
  draw();

  const qi = $('#sysq');
  qi.oninput = () => { UI.sysQuery = qi.value; $('#sysclear').hidden = !qi.value; draw(); };
  $('#sysclear').onclick = e => { e.preventDefault(); UI.sysQuery = ''; qi.value = ''; $('#sysclear').hidden = true; draw(); };
  $$('.chips .chip', view).forEach(c => c.onclick = () => {
    Sfx.tap(); UI.sysFilter = c.dataset.f;
    $$('.chips .chip', view).forEach(x => x.setAttribute('aria-pressed', x === c));
    draw();
  });
  $('#sortsys').onclick = () => { Sfx.toggle(true); Settings.set('sortSys', order === 'old' ? 'new' : 'old'); render(); };
  renderOfflineNotice();
  renderContinue($('#cont-slot'), roms);
}

/* ---------- Weiterspielen ---------- */
async function renderContinue(slot, roms) {
  const recent = roms.filter(r => r.lastPlayed && isPlayable(sysById(r.system))).sort((a, b) => b.lastPlayed - a.lastPlayed).slice(0, 8);
  if (!slot || !recent.length) return;
  const newest = {};
  (await DB.all('states')).forEach(st => { if (!newest[st.romId] || st.created > newest[st.romId].created) newest[st.romId] = st; });
  slot.innerHTML = `<h2 class="cont-h">${esc(t('cont.title'))}</h2><div class="cont-row">${recent.map(r => {
    const s = sysById(r.system);
    return `<button class="cont-card" data-c="${r.id}"><div class="cimg" data-img="${r.id}">${Art.consoleSVG(s)}<span class="cplay">${ICON.play}</span></div>
      <div class="cmeta"><b>${esc(r.name)}</b><span>${esc(s.name)}</span>${r.playTime ? `<span class="ct">${ICON.timer}${esc(fmtDuration(r.playTime))}</span>` : ''}</div></button>`;
  }).join('')}</div>`;
  recent.forEach(r => {
    const blob = r.cover || (newest[r.id] && newest[r.id].thumb);
    if (!blob) return;
    const box = slot.querySelector(`[data-img="${r.id}"]`);
    const img = new Image(); img.alt = ''; img.src = URL.createObjectURL(blob);
    box.querySelector('svg').replaceWith(img);
    box.classList.toggle('is-cover', !!r.cover);
  });
  $$('[data-c]', slot).forEach(b => b.onclick = () => { Sfx.coin(); continueRom(b.dataset.c); });
}
async function continueRom(id) {
  const r = await DB.get('roms', id);
  const s = r && sysById(r.system);
  const st = await Store.latestState(id);
  if (st && s && !s.lab) playRom(id, st.id); else playRom(id);
}

/* Vorschaubild einer Spielzeile: Cover vor letztem Speicherstand */
function applyRowThumbs(box, roms, thumbs) {
  roms.forEach(r => {
    const blob = r.cover || (thumbs && thumbs[r.id]);
    if (!blob) return;
    const th = $(`.game-row[data-rom="${r.id}"] .thumb`, box);
    if (!th) return;
    const img = new Image(); img.alt = ''; img.src = URL.createObjectURL(blob);
    th.innerHTML = ''; th.appendChild(img);
    th.classList.toggle('is-cover', !!r.cover);
  });
}
async function stateThumbs() {
  const thumbs = {};
  (await DB.all('states')).sort((a, b) => b.created - a.created).forEach(s => { if (!thumbs[s.romId] && s.thumb) thumbs[s.romId] = s.thumb; });
  return thumbs;
}

async function renderOfflineNotice() {
  const slot = $('#offline-slot');
  if (!slot || Settings.get('offlineAll') || Settings.get('offlineHintHidden') || !('caches' in window)) return;
  const n = await coresCachedCount();
  if (n >= OFFLINE_FILES.length) { Settings.set('offlineAll', true); return; }
  slot.innerHTML = `<div class="notice"><div class="txt"><b>${esc(t('set.offline'))}</b><span id="off-sub">${esc(t('set.offlineSub', { n: CORE_TOTAL_MB }))}</span><div class="progress" hidden><div></div></div></div>
    <button class="btn small primary" id="off-go">${ICON.cloud}</button><button class="icon-btn" id="off-x" aria-label="${esc(t('c.close'))}">${ICON.x}</button></div>`;
  $('#off-x').onclick = () => { Settings.set('offlineHintHidden', true); slot.innerHTML = ''; };
  $('#off-go').onclick = () => runOfflineDownload(slot);
}

async function runOfflineDownload(root) {
  const bar = $('.progress', root), sub = $('#off-sub', root) || $('.sub', root), btn = $('#off-go', root);
  if (btn) btn.disabled = true;
  if (bar) bar.hidden = false;
  try {
    await cacheAllCores((i, n) => {
      if (sub) sub.textContent = t('set.offlineProg', { i, n });
      if (bar) bar.firstElementChild.style.width = Math.round(i / n * 100) + '%';
    });
    Settings.set('offlineAll', true);
    Sfx.ok(); toast(t('set.offlineDone'));
    if (sub) sub.textContent = t('set.offlineDone');
    if (location.hash === '#/systems' || !location.hash) setTimeout(() => { const s = $('#offline-slot'); if (s) s.innerHTML = ''; }, 1200);
  } catch (e) {
    Sfx.err(); toast(t('c.error', { e: e.message }), 'err');
    if (btn) btn.disabled = false;
  }
}

/* ---------- Ansicht: Konsolen-Details ---------- */
async function viewSystem(view, id) {
  const s = sysById(id);
  if (!s) return go('#/systems');
  const dc = DECADE_COLORS[decadeOf(s.year)];
  const roms = await markMissing(await DB.byIndexSafe('roms', 'system', s.id));
  const biosList = s.bios ? await DB.byIndex('bios', 'system', s.id) : [];
  const haveBios = new Set(biosList.map(b => b.fileName.toLowerCase()));
  const coreSel = (Settings.get('cores') || {})[s.id] || (s.cores[0] && s.cores[0].id);
  const core = s.cores.find(c => c.id === coreSel && c.id !== 'auto') || s.cores.find(c => c.id !== 'auto');

  let notes = '';
  if (s.status === 'native') notes += `<div class="note">${esc(t('note.native'))}</div>`;
  if (s.lab) notes += `<div class="note">${esc(t('note.lab.' + s.lab))}<br><br>${esc(t('note.labUi'))}</div>`;
  else if (s.status === 'exp') notes += `<div class="note">${esc(t('note.exp'))}</div>`;

  const facts = [
    [t('det.year'), s.year], [t('det.maker'), s.maker], [t('det.type'), t('type.' + s.type)],
    [t('det.cpu'), t('det.bits', { b: s.bits })]
  ];
  if (s.gen) facts.push([t('det.gen'), t('det.genv', { g: s.gen })]);
  if (core) {
    facts.push([t('det.emulator'), core.name]);
    if (core.dev) facts.push([t('det.dev'), core.dev]);
    if (core.license) facts.push([t('det.license'), licLabel(core.license)]);
  }
  if (s.ejs) facts.push([t('det.bios'), !s.bios ? t('bios.none') : s.bios.required ? t('bios.required') : t('bios.optional')]);

  const coreSwitch = s.cores.length > 1 ? `
    <h3 class="h3">${esc(t('det.core'))}</h3>
    <div class="seg" id="coreseg">${s.cores.map(c => `<button data-core="${c.id}" aria-pressed="${c.id === coreSel}">${esc(c.id === 'auto' ? t('core.auto') : c.name)}</button>`).join('')}</div>` : '';

  let biosHtml = '';
  if (s.bios) {
    const hint = s.bios.hint ? t('bios.hint.' + s.bios.hint) : '';
    biosHtml = `<h3 class="h3">${esc(t('det.bios'))}</h3>
      <div class="group">${s.bios.files.map(f => `<div class="row"><span class="ico" style="background:${haveBios.has(f.toLowerCase()) ? '#2fb784' : '#8a84b0'}">${ICON.chip}</span><span class="lbl">${esc(f)}</span><span class="val">${esc(haveBios.has(f.toLowerCase()) ? t('bios.have') : t('bios.missing'))}</span></div>`).join('')}</div>
      <p class="muted small" style="margin:8px 4px">${esc(t('note.bios'))} ${s.bios.any ? esc(t('bios.anyOne')) : ''} ${esc(hint)}</p>
      <button class="btn block" id="addbios">${ICON.plus}${esc(t('bios.add'))}</button>`;
  }

  let gamesHtml = '';
  if (isPlayable(s)) {
    roms.sort((a, b) => a.name.localeCompare(b.name));
    gamesHtml = `<h3 class="h3">${esc(t('det.games'))}</h3>
      ${roms.length ? `<div class="group">${roms.map(r => gameRow(r, s)).join('')}</div>` : `<p class="muted" style="margin:4px">${esc(t('det.noGames'))}</p>`}
      <div style="margin-top:12px"><button class="btn primary block" id="addrom">${ICON.plus}${esc(t('det.addRom'))}</button></div>`;
  }

  view.innerHTML = `${topbar('#/systems')}
    <div class="detail-wrap" style="--dc:${dc}">
      <div class="detail-hero">
        <div class="art">${Art.consoleSVG(s)}</div>
        <div class="year-big">${s.year}</div>
        <h1>${esc(s.name)}</h1>
        <div class="maker">${esc(s.maker)}</div>
        <div class="sys-tags">${statusPill(s)}<span class="pill plain">${esc(t('type.' + s.type))}</span></div>
      </div>
      <div>
        ${notes}
        ${s.native.length ? `<h3 class="h3">${esc(t('det.native'))}</h3><div class="native-list">${s.native.map(n => `<span class="pill">${esc(n)}</span>`).join('')}</div>` : ''}
        <div class="facts">${facts.map(([k, v]) => `<div class="fact"><div class="k">${esc(k)}</div><div class="v">${esc(v)}</div></div>`).join('')}
          <div class="fact wide"><div class="k">${esc(t('det.files'))}</div><div class="ext-list">${s.ext.map(e => `<span>.${esc(e)}</span>`).join('')}</div></div>
          ${s.ejs ? `<div class="fact wide"><div class="k">${esc(t('det.cheats'))}</div><div class="v">${esc(s.cheats.length ? s.cheats.join(', ') : t('cheats.core'))}</div></div>` : ''}
        </div>
        ${coreSwitch}
        ${biosHtml}
        ${gamesHtml}
      </div>
    </div>`;
  bindBack(view);
  bindGameRows(view);
  if (roms.length) applyRowThumbs(view, roms, await stateThumbs());
  const seg = $('#coreseg');
  if (seg) $$('button', seg).forEach(b => b.onclick = () => {
    Sfx.toggle(true);
    const cores = Object.assign({}, Settings.get('cores')); cores[s.id] = b.dataset.core; Settings.set('cores', cores);
    render();
  });
  const ab = $('#addbios'); if (ab) ab.onclick = () => pickFile('bios', files => addBios(s, files[0]));
  const ar = $('#addrom'); if (ar) ar.onclick = () => pickFile('rom', files => importFiles(files, s.id));
}

function gameRow(r, s) {
  s = s || sysById(r.system);
  return `<div class="game-row" data-rom="${r.id}">
    <button class="thumb" data-open="${r.id}">${s ? Art.consoleSVG(s) : ''}</button>
    <button class="info" data-open="${r.id}"><div class="name">${esc(r.name)}</div><div class="sub">${r._missing ? `<span class="miss">${esc(t('rom.missing'))}</span> ` : ''}${esc(s ? s.name : r.system)}${r.lastPlayed ? ' – ' + esc(fmtDate(r.lastPlayed)) : ''}</div></button>
    <button class="star" data-fav="${r.id}" aria-label="${esc(t(r.fav ? 'rom.unfav' : 'rom.fav'))}">${r.fav ? ICON.starFill : ICON.star}</button>
    <button class="play-btn" data-play="${r.id}" aria-label="${esc(t('rom.play'))}">${ICON.play}</button>
  </div>`;
}
function bindGameRows(root) {
  $$('[data-open]', root).forEach(b => b.onclick = () => { Sfx.tap(); go('#/rom/' + b.dataset.open); });
  $$('[data-play]', root).forEach(b => b.onclick = () => { Sfx.coin(); playRom(b.dataset.play); });
  $$('[data-fav]', root).forEach(b => b.onclick = async () => {
    const r = await DB.get('roms', b.dataset.fav); r.fav = !r.fav; await DB.put('roms', r);
    Sfx.toggle(r.fav); b.innerHTML = r.fav ? ICON.starFill : ICON.star;
  });
}
function isMobileDevice() {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}
async function markMissing(roms) {
  const have = new Set(await DB.keys('romdata'));
  roms.forEach(r => { r._missing = !have.has(r.id); });
  return roms;
}
/* Spiel aus einer Sicherung ohne Spieldateien: Datei erneut auswählen */
function relinkRom(r, then) {
  dialog({
    title: t('rom.missingT'), text: t('rom.missingX', { name: r.name, file: r.fileName }), icon: ICON.warn,
    buttons: [
      { label: t('c.cancel'), value: false },
      {
        label: t('rom.pick'), value: true, kind: 'primary',
        setup: el => el.addEventListener('click', () => pickFile('one', async files => {
          const f = files[0];
          await DB.put('romdata', { id: r.id, blob: await fileToBlob(f) });
          if (f.size !== r.size) { r.size = f.size; await DB.put('roms', r); }
          Sfx.ok(); toast(t('imp.relinked', { name: r.name }));
          if (then) then(); else render();
        }))
      }
    ]
  });
}
async function playRom(id, stateId) {
  const r = await DB.get('roms', id);
  if (r && !(await DB.get('romdata', id))) { relinkRom(r, () => playRom(id, stateId)); return; }
  const s = r && sysById(r.system);
  if (s && s.lab) {
    if (s.status === 'pc' && (isMobileDevice() || !navigator.gpu)) {
      const go = await dialog({
        title: t('pc.title'), text: t('pc.text'), icon: ICON.warn,
        buttons: [{ label: t('c.cancel'), value: false }, { label: t('pc.anyway'), value: true, kind: 'primary' }]
      });
      if (!go) return;
    }
    location.href = 'labs/' + s.lab + '/index.html?ksrom=' + encodeURIComponent(id);
    return;
  }
  location.href = 'play.html?rom=' + encodeURIComponent(id) + (stateId ? '&state=' + encodeURIComponent(stateId) : '');
}

/* ---------- Dateien wählen & importieren ---------- */
function pickFile(kind, cb) {
  const inp = document.createElement('input');
  inp.type = 'file';
  if (kind === 'rom') inp.multiple = true;
  if (kind === 'image') inp.accept = 'image/*';
  inp.style.display = 'none';
  document.body.appendChild(inp);
  inp.onchange = () => { const f = Array.from(inp.files || []); inp.remove(); if (f.length) cb(f); };
  inp.click();
}

function prettyName(fileName) {
  return fileName.replace(/\.[^.]+$/, '').replace(/[_]+/g, ' ').replace(/\s+/g, ' ').trim();
}

async function fileToBlob(f) {
  const buf = await f.arrayBuffer();
  return new Blob([buf], { type: 'application/octet-stream' });
}

async function importFiles(files, presetSystem) {
  try { if (navigator.storage && navigator.storage.persist) await navigator.storage.persist(); } catch (e) { /* egal */ }
  const existing = await DB.all('roms');
  const relinked = [];
  let n = 0, covers = 0;
  toast(t('imp.working'));
  for (const f of files) {
    const lower = f.name.toLowerCase();
    if (!presetSystem && BIOS_INDEX[lower]) {
      const s = sysById(BIOS_INDEX[lower]);
      await saveBios(s, f, s.bios.files.find(x => x.toLowerCase() === lower));
      toast(t('imp.bios', { name: f.name, sys: s.name }));
      continue;
    }
    const ext = lower.includes('.') ? lower.split('.').pop() : '';
    if (!presetSystem && ((f.type || '').startsWith('image/') || IMG_EXT.includes(ext))) {
      const hits = coverMatches(f.name, existing);
      if (!hits.length) { Sfx.err(); toast(t('cover.noMatch', { name: f.name }), 'err'); await sleepMs(1200); continue; }
      const blob = await makeCover(f);
      if (!blob) { Sfx.err(); toast(t('cover.bad'), 'err'); continue; }
      for (const r of hits) { r.cover = blob; await DB.put('roms', r); }
      covers++;
      continue;
    }
    let sys = presetSystem || guessSystem(f.name);
    if (!sys) {
      let cands = systemsForExt(ext);
      if (!cands.length && ['zip', '7z'].includes(ext)) cands = PLAYABLE.slice();
      if (!cands.length) { Sfx.err(); toast(t('imp.unknown', { name: f.name }), 'err'); continue; }
      sys = cands.length === 1 ? cands[0].id : await pickSystem(f.name, cands);
      if (!sys) continue;
    }
    const twin = existing.find(r => r.fileName === f.name && r.size === f.size && r.system === sys);
    if (twin) {
      if (await DB.get('romdata', twin.id)) { toast(t('imp.dup', { name: f.name })); continue; }
      await DB.put('romdata', { id: twin.id, blob: await fileToBlob(f) });
      relinked.push(twin.name);
      continue;
    }
    const id = uid();
    await DB.put('romdata', { id, blob: await fileToBlob(f) });
    const rec = { id, name: prettyName(f.name), fileName: f.name, system: sys, size: f.size, added: Date.now(), lastPlayed: 0, playCount: 0, fav: false };
    await DB.put('roms', rec);
    existing.push(rec);
    n++;
  }
  if (n) { Sfx.ok(); toast(t('imp.done', { n })); }
  else if (relinked.length) { Sfx.ok(); toast(t('imp.relinked', { name: relinked.join(', ') })); }
  else if (covers) { Sfx.ok(); toast(t('cover.added', { n: fmtNum(covers) })); }
  render();
}

/* ---------- Cover ---------- */
const IMG_EXT = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'heic', 'heif', 'avif'];
const sleepMs = ms => new Promise(r => setTimeout(r, ms));
function normTitle(s) {
  return String(s || '').toLowerCase().replace(/[\(\[][^\)\]]*[\)\]]/g, ' ').replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
}
function coverMatches(fileName, roms) {
  const n = normTitle(fileName.replace(/\.[^.]+$/, ''));
  if (!n) return [];
  return roms.filter(r => normTitle(r.name) === n || normTitle(r.fileName.replace(/\.[^.]+$/, '')) === n);
}
async function makeCover(file) {
  try {
    const url = URL.createObjectURL(file);
    const img = new Image(); img.src = url;
    await img.decode();
    const max = 600, k = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
    const c = document.createElement('canvas');
    c.width = Math.max(1, Math.round(img.naturalWidth * k)); c.height = Math.max(1, Math.round(img.naturalHeight * k));
    c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
    URL.revokeObjectURL(url);
    return await new Promise(res => c.toBlob(res, 'image/jpeg', 0.86));
  } catch (e) { return null; }
}

function pickSystem(fileName, cands) {
  return new Promise(resolve => {
    cands = cands.slice().sort((a, b) => a.name.localeCompare(b.name));
    const o = openSheet(`<h3 class="h2" style="margin-top:4px">${esc(t('imp.choose', { name: fileName }))}</h3>
      <div class="pick-list">${cands.map(s => `<button data-s="${s.id}">${Art.consoleSVG(s)}<span>${esc(s.name)}<br><small class="muted">${s.year}</small></span></button>`).join('')}</div>
      <button class="btn block" data-skip>${esc(t('imp.skip'))}</button>`, () => resolve(null));
    $$('[data-s]', o.el).forEach(b => b.onclick = () => { Sfx.tap(); o.close(true); resolve(b.dataset.s); });
    $('[data-skip]', o.el).onclick = () => { o.close(true); resolve(null); };
  });
}

async function saveBios(s, file, asName) {
  const name = asName || file.name;
  await DB.put('bios', { id: s.id + '/' + name.toLowerCase(), system: s.id, fileName: name, size: file.size, added: Date.now(), blob: await fileToBlob(file) });
}

async function addBios(s, file) {
  const expected = s.bios.files;
  let name = expected.find(x => x.toLowerCase() === file.name.toLowerCase());
  if (!name) {
    if (expected.length === 1) name = expected[0];
    else {
      name = await new Promise(resolve => {
        const o = openSheet(`<h3 class="h2" style="margin-top:4px">${esc(t('bios.wrongName', { names: '' }).replace(/[:：]\s*$/, ''))}</h3>
          <p class="muted">${esc(file.name)}</p>
          <div class="pick-list">${expected.map(x => `<button data-n="${esc(x)}">${ICON.chip}<span>${esc(x)}</span></button>`).join('')}</div>
          <button class="btn block" data-skip>${esc(t('c.cancel'))}</button>`, () => resolve(null));
        $$('[data-n]', o.el).forEach(b => b.onclick = () => { o.close(true); resolve(b.dataset.n); });
        $('[data-skip]', o.el).onclick = () => { o.close(true); resolve(null); };
      });
      if (!name) return;
    }
  }
  await saveBios(s, file, name);
  Sfx.ok(); toast(t('bios.saved'));
  render();
}

/* ---------- Sheets & Dialoge ---------- */
function openSheet(html, onDismiss) {
  const ov = document.createElement('div');
  ov.className = 'overlay';
  ov.innerHTML = `<div class="sheet" role="dialog" aria-modal="true"><div class="grab"></div>${html}</div>`;
  document.body.appendChild(ov);
  let closed = false;
  const close = silent => { if (closed) return; closed = true; ov.remove(); if (!silent && onDismiss) onDismiss(); };
  ov.addEventListener('click', e => { if (e.target === ov) { Sfx.back(); close(); } });
  return { el: ov.firstElementChild, close };
}

function dialog({ title, text, buttons, icon, tone }) {
  return new Promise(resolve => {
    const ov = document.createElement('div');
    ov.className = 'overlay center';
    ov.innerHTML = `<div class="dialog" role="alertdialog" aria-modal="true">${icon ? `<div class="warn-ico ${tone || ''}">${icon}</div>` : ''}<h3>${esc(title)}</h3>${text ? `<p>${esc(text)}</p>` : ''}<div class="btn-row"></div></div>`;
    const row = $('.btn-row', ov);
    buttons.forEach(b => {
      const el = document.createElement('button');
      el.className = 'btn ' + (b.kind || '');
      el.textContent = b.label;
      el.onclick = () => { Sfx.tap(); ov.remove(); resolve(b.value); };
      row.appendChild(el);
      if (b.setup) b.setup(el);
    });
    document.body.appendChild(ov);
  });
}
const confirmDlg = (title, text, okLabel, danger) => dialog({
  title, text, icon: danger ? ICON.warn : null,
  buttons: [{ label: t('c.cancel'), value: false }, { label: okLabel || t('c.ok'), value: true, kind: danger ? 'danger' : 'primary' }]
});
function promptDlg(title, value) {
  return new Promise(resolve => {
    const o = openSheet(`<h3 class="h2" style="margin-top:4px">${esc(title)}</h3>
      <label class="field"><input id="pv" value="${esc(value)}" autocomplete="off"></label>
      <div class="btn-row"><button class="btn" data-c>${esc(t('c.cancel'))}</button><button class="btn primary" data-o>${esc(t('c.save'))}</button></div>`, () => resolve(null));
    const inp = $('#pv', o.el); setTimeout(() => inp.focus(), 50);
    $('[data-c]', o.el).onclick = () => { o.close(true); resolve(null); };
    $('[data-o]', o.el).onclick = () => { o.close(true); resolve(inp.value.trim() || null); };
    inp.onkeydown = e => { if (e.key === 'Enter') { o.close(true); resolve(inp.value.trim() || null); } };
  });
}

/* ---------- Ansicht: Bibliothek (Dateiablage) ---------- */
async function viewLibrary(view) {
  const roms = await markMissing(await DB.all('roms'));
  const states = await DB.all('states');
  const thumbs = {};
  states.sort((a, b) => b.created - a.created).forEach(s => { if (!thumbs[s.romId] && s.thumb) thumbs[s.romId] = s.thumb; });
  const systemsUsed = PLAYABLE.filter(s => roms.some(r => r.system === s.id));
  const sort = Settings.get('sortLib');

  view.innerHTML = `
    <div class="topbar" style="margin-top:4px"><h1 class="title-xl">${esc(t('tab.library'))}</h1><div class="spacer"></div>
      <button class="fab" id="imp" aria-label="${esc(t('lib.import'))}">${ICON.plus}</button></div>
    ${roms.length ? `
    <div class="lib-tools"><label class="search">${ICON.search}<input id="libq" type="search" enterkeyhint="search" autocomplete="off" placeholder="${esc(t('lib.search'))}" value="${esc(UI.libQuery)}"><button class="clear" id="libclear" ${UI.libQuery ? '' : 'hidden'}>${ICON.x}</button></label></div>
    <div class="chips">
      <button class="chip icon" id="favchip" aria-pressed="${UI.libFav}">${ICON.starFill}${esc(t('lib.favs'))}</button>
      <select class="select" id="libsys"><option value="all">${esc(t('lib.all'))}</option>${systemsUsed.map(s => `<option value="${s.id}" ${UI.libSystem === s.id ? 'selected' : ''}>${esc(s.name)}</option>`).join('')}</select>
      <select class="select" id="libsort">${['recent', 'name', 'added', 'system', 'time'].map(k => `<option value="${k}" ${sort === k ? 'selected' : ''}>${esc(t('sort.' + k))}</option>`).join('')}</select>
    </div>
    <div class="lib-meta"><span id="libcount"></span><span id="libstore"></span></div>
    <div class="group" id="liblist"></div>` : `
    <div class="empty"><div class="art">${Art.consoleSVG(sysById('gba'))}</div><div class="big">${esc(t('lib.empty.title'))}</div>
      <p>${esc(t('lib.empty.text'))}</p><button class="btn primary" id="imp2">${ICON.plus}${esc(t('lib.import'))}</button>
      <p class="small" style="margin-top:22px">${esc(t('install.hint'))}</p></div>`}`;

  const doImport = () => { Sfx.tap(); pickFile('rom', files => importFiles(files)); };
  $('#imp').onclick = doImport;
  if (!roms.length) { $('#imp2').onclick = doImport; return; }

  const draw = () => {
    const q = UI.libQuery.trim().toLowerCase();
    let list = roms.filter(r => (UI.libSystem === 'all' || r.system === UI.libSystem) && (!UI.libFav || r.fav) &&
      (!q || (r.name + ' ' + r.fileName + ' ' + (sysById(r.system) || {}).name).toLowerCase().includes(q)));
    const sk = Settings.get('sortLib');
    list.sort((a, b) => {
      if (sk === 'name') return a.name.localeCompare(b.name);
      if (sk === 'added') return b.added - a.added;
      if (sk === 'system') return (sysById(a.system).year - sysById(b.system).year) || a.name.localeCompare(b.name);
      if (sk === 'time') return (b.playTime || 0) - (a.playTime || 0) || a.name.localeCompare(b.name);
      return (b.lastPlayed || 0) - (a.lastPlayed || 0) || b.added - a.added;
    });
    $('#libcount').textContent = nGames(list.length);
    const box = $('#liblist');
    if (!list.length) { box.innerHTML = `<div class="empty">${esc(t('lib.noResults', { q: UI.libQuery }))}</div>`; return; }
    box.innerHTML = list.map(r => gameRow(r)).join('');
    applyRowThumbs(box, list, thumbs);
    bindGameRows(box);
  };
  draw();
  const qi = $('#libq');
  qi.oninput = () => { UI.libQuery = qi.value; $('#libclear').hidden = !qi.value; draw(); };
  $('#libclear').onclick = e => { e.preventDefault(); UI.libQuery = ''; qi.value = ''; $('#libclear').hidden = true; draw(); };
  $('#favchip').onclick = () => { UI.libFav = !UI.libFav; Sfx.toggle(UI.libFav); $('#favchip').setAttribute('aria-pressed', UI.libFav); draw(); };
  $('#libsys').onchange = e => { UI.libSystem = e.target.value; draw(); };
  $('#libsort').onchange = e => { Settings.set('sortLib', e.target.value); draw(); };
  if (navigator.storage && navigator.storage.estimate) navigator.storage.estimate().then(est => { const el = $('#libstore'); if (el) el.textContent = t('lib.storage', { used: fmtBytes(est.usage) }); });
}

/* ---------- Ansicht: Spiel-Details ---------- */
async function viewRom(view, id) {
  const r = await DB.get('roms', id);
  if (!r) return go('#/library');
  const s = sysById(r.system);
  const states = (await DB.byIndex('states', 'romId', id)).sort((a, b) => b.created - a.created);
  const cheats = await DB.byIndex('cheats', 'romId', id);
  const dc = DECADE_COLORS[decadeOf(s.year)];
  view.innerHTML = `${topbar('#/library')}
    <div class="detail-wrap" style="--dc:${dc}">
      <div class="detail-hero">
        <div class="art" id="romart">${Art.consoleSVG(s)}</div>
        <h1>${esc(r.name)}</h1>
        <div class="maker">${esc(s.name)}</div>
        <div class="btn-row" style="margin-top:16px">
          ${states.length && !s.lab ? `<button class="btn primary" id="cont">${ICON.play}${esc(t('rom.continue'))}</button>` : ''}
          <button class="btn ${states.length && !s.lab ? '' : 'primary'}" id="play">${ICON.play}${esc(t('rom.play'))}</button>
        </div>
      </div>
      <div>
        <div class="facts">
          <div class="fact wide"><div class="k">${esc(t('rom.file'))}</div><div class="v">${esc(r.fileName)}</div></div>
          <div class="fact"><div class="k">${esc(t('rom.size'))}</div><div class="v">${esc(fmtBytes(r.size))}</div></div>
          <div class="fact"><div class="k">${esc(t('rom.added'))}</div><div class="v">${esc(fmtDate(r.added))}</div></div>
          <div class="fact"><div class="k">${esc(t('rom.played'))}</div><div class="v">${esc(fmtDate(r.lastPlayed))}</div></div>
          <div class="fact"><div class="k">${esc(t('rom.playCount'))}</div><div class="v">${esc(t('rom.times', { n: r.playCount || 0 }))}</div></div>
          <div class="fact"><div class="k">${esc(t('rom.playTime'))}</div><div class="v">${esc(fmtDuration(r.playTime))}</div></div>
        </div>
        <h3 class="h3"></h3>
        <div class="group">
          <button class="row" id="fav"><span class="ico" style="background:#e0a400">${r.fav ? ICON.starFill : ICON.star}</span><span class="lbl">${esc(t(r.fav ? 'rom.unfav' : 'rom.fav'))}</span></button>
          ${s.lab ? '' : `<button class="row" id="rprefs"><span class="ico" style="background:#3a8ce0">${ICON.sliders}</span><span class="lbl">${esc(t('gp.title'))}<span class="sub">${esc(prefsSummary(r))}</span></span>${ICON.chev}</button>`}
          ${s.lab ? '' : `<button class="row" id="cheats"><span class="ico" style="background:#8c5cff">${ICON.wand}</span><span class="lbl">${esc(t('rom.cheats'))}</span><span class="val">${cheats.length || ''}</span>${ICON.chev}</button>`}
          <button class="row" id="ren"><span class="ico" style="background:#3a8ce0">${ICON.edit}</span><span class="lbl">${esc(t('rom.rename'))}</span></button>
          <button class="row" id="cov"><span class="ico" style="background:#e07a3a">${ICON.image}</span><span class="lbl">${esc(t(r.cover ? 'cover.change' : 'cover.set'))}<span class="sub">${esc(t('cover.hint'))}</span></span></button>
          ${r.cover ? `<button class="row" id="covdel"><span class="ico" style="background:#5a6b85">${ICON.x}</span><span class="lbl">${esc(t('cover.remove'))}</span></button>` : ''}
          <button class="row" id="chs"><span class="ico" style="background:#2fb784">${ICON.swap}</span><span class="lbl">${esc(t('rom.changeSys'))}</span><span class="val">${esc(s.name)}</span></button>
          <button class="row" id="exp"><span class="ico" style="background:#5a6b85">${ICON.share}</span><span class="lbl">${esc(t('rom.export'))}</span></button>
          <button class="row danger" id="del"><span class="ico" style="background:var(--red)">${ICON.trash}</span><span class="lbl">${esc(t('rom.delete'))}</span></button>
        </div>
        ${s.lab ? `<div class="note" style="margin-top:16px">${esc(t('note.labUi'))}</div>` : ''}
        <h3 class="h3">${esc(t('notes.title'))}</h3>
        <textarea class="notes-area" id="rnotes" placeholder="${esc(t('notes.ph'))}" maxlength="5000">${esc(r.notes || '')}</textarea>
        <div class="muted small" id="rnotes-st" style="margin:4px 6px 0;min-height:1.2em"></div>
        ${s.lab ? '' : `<h3 class="h3">${esc(t('sf.title'))}</h3>
        <div class="group">
          <button class="row" id="sfexp" ${r.savePath ? '' : 'disabled'}><span class="ico" style="background:#2fa4e7">${ICON.share}</span><span class="lbl">${esc(t('sf.export'))}<span class="sub" id="sfsub">${esc(r.savePath ? '…' : t('sf.needPlay'))}</span></span></button>
          <button class="row" id="sfimp" ${r.savePath ? '' : 'disabled'}><span class="ico" style="background:#2fb784">${ICON.file}</span><span class="lbl">${esc(t('sf.import'))}<span class="sub">${esc(t('sf.importSub'))}</span></span></button>
        </div>
        <p class="muted small" style="margin:8px 6px 0">${esc(t('sf.intro'))}</p>`}
        ${states.length && !s.lab ? `<h3 class="h3">${esc(t('rom.states'))}</h3><div class="save-grid" id="romstates">${states.map(st => saveCard(st, r)).join('')}</div>` : ''}
      </div>
    </div>`;
  bindBack(view);
  const heroBlob = r.cover || (states[0] && states[0].thumb);
  if (heroBlob) {
    const img = new Image(); img.src = URL.createObjectURL(heroBlob);
    img.style.cssText = 'width:100%;height:100%;object-fit:contain;border-radius:14px;' + (r.cover ? '' : 'image-rendering:pixelated');
    $('#romart').innerHTML = ''; $('#romart').appendChild(img);
  }
  $('#cov').onclick = () => {
    Sfx.tap();
    pickFile('image', async files => {
      const blob = await makeCover(files[0]);
      if (!blob) { Sfx.err(); toast(t('cover.bad'), 'err'); return; }
      r.cover = blob; await DB.put('roms', r); Sfx.ok(); toast(t('cover.saved')); render();
    });
  };
  if ($('#covdel')) $('#covdel').onclick = async () => { delete r.cover; await DB.put('roms', r); Sfx.ok(); render(); };
  $('#play').onclick = () => { Sfx.coin(); playRom(id); };
  if ($('#cont')) $('#cont').onclick = () => { Sfx.coin(); playRom(id, states[0].id); };
  $('#fav').onclick = async () => { r.fav = !r.fav; await DB.put('roms', r); Sfx.toggle(r.fav); render(); };
  if ($('#cheats')) $('#cheats').onclick = () => { Sfx.tap(); go('#/cheats/' + id); };
  if ($('#rprefs')) $('#rprefs').onclick = () => { Sfx.tap(); go('#/romprefs/' + id); };
  /* Notizen speichern sich beim Tippen */
  let ntTimer = 0;
  const saveNotes = async () => {
    clearTimeout(ntTimer);
    const v = $('#rnotes') ? $('#rnotes').value : null;
    if (v === null || v === (r.notes || '')) return;
    const cur = await DB.get('roms', id); if (!cur) return;
    if (v.trim()) cur.notes = v; else delete cur.notes;
    await DB.put('roms', cur); r.notes = cur.notes;
    const st = $('#rnotes-st'); if (st) st.textContent = t('notes.saved');
  };
  $('#rnotes').oninput = () => { clearTimeout(ntTimer); const st = $('#rnotes-st'); if (st) st.textContent = ''; ntTimer = setTimeout(saveNotes, 700); };
  $('#rnotes').onblur = saveNotes;
  /* Spielstand-Datei (.sav) austauschen */
  let sfData = null;
  if (r.savePath && $('#sfexp')) {
    SaveFiles.get(r.savePath).then(d => { sfData = d; const el = $('#sfsub'); if (el) el.textContent = d && d.length ? fileSafe(r.name) + '.sav – ' + fmtBytes(d.length) : t('sf.none'); })
      .catch(() => { const el = $('#sfsub'); if (el) el.textContent = t('sf.none'); });
    $('#sfexp').onclick = () => {
      if (!sfData || !sfData.length) { Sfx.err(); toast(t('sf.none'), 'err'); return; }
      Sfx.tap();
      shareOrDownload(new Blob([sfData]), fileSafe(r.name) + '.sav').then(ok => { if (ok) toast(t('sf.exported')); });
    };
    $('#sfimp').onclick = () => {
      Sfx.tap();
      pickFile('any', async files => {
        const f = files[0];
        if (!f.size || f.size > 16 * 1024 * 1024) { Sfx.err(); toast(t('sf.bad'), 'err'); return; }
        if (!(await confirmDlg(t('sf.import'), t('sf.importX'), t('sf.import'), true))) return;
        try { await SaveFiles.put(r.savePath, new Uint8Array(await f.arrayBuffer())); Sfx.ok(); toast(t('sf.imported')); render(); }
        catch (e) { Sfx.err(); toast(t('c.error', { e: e.message }), 'err'); }
      });
    };
  }
  $('#ren').onclick = async () => { const n = await promptDlg(t('rom.newName'), r.name); if (n) { r.name = n; await DB.put('roms', r); Sfx.ok(); render(); } };
  $('#chs').onclick = async () => {
    const ext = r.fileName.split('.').pop().toLowerCase();
    let cands = systemsForExt(ext); if (cands.length < 2) cands = PLAYABLE.slice();
    const ns = await pickSystem(r.fileName, cands);
    if (ns) { r.system = ns; await DB.put('roms', r); Sfx.ok(); render(); }
  };
  $('#exp').onclick = async () => {
    const d = await DB.get('romdata', id); if (!d) { relinkRom(r); return; }
    const file = new File([d.blob], r.fileName, { type: 'application/octet-stream' });
    if (navigator.canShare && navigator.canShare({ files: [file] })) { try { await navigator.share({ files: [file] }); return; } catch (e) { if (e.name === 'AbortError') return; } }
    const a = document.createElement('a'); a.href = URL.createObjectURL(file); a.download = r.fileName; a.click();
  };
  $('#del').onclick = async () => {
    if (await confirmDlg(t('rom.delete'), t('rom.delConfirm', { name: r.name }), t('c.delete'), true)) { await Store.deleteRom(id); Sfx.ok(); go('#/library'); }
  };
  bindSaveCards(view, () => render());
}

function saveCard(st, rom) {
  const kind = st.kind === 'auto' ? t('saves.auto') : st.kind === 'quick' ? t('saves.quick') : t('saves.slot');
  return `<button class="save-card" data-state="${st.id}" data-rom="${st.romId}">
    <div class="shot" data-thumb="${st.id}"></div>
    <div class="meta"><b>${esc(rom ? rom.name : '')}</b><span>${esc(fmtDate(st.created, true))}</span><br><span class="kind">${esc(st.name || kind)}</span></div>
  </button>`;
}
async function bindSaveCards(root, refresh) {
  for (const card of $$('[data-state]', root)) {
    const st = await DB.get('states', card.dataset.state);
    const shot = $('.shot', card);
    if (st && st.thumb) { const img = new Image(); img.src = URL.createObjectURL(st.thumb); shot.appendChild(img); }
    else { const s = sysById((await DB.get('roms', card.dataset.rom) || {}).system); if (s) shot.innerHTML = Art.consoleSVG(s); }
    card.onclick = async () => {
      Sfx.tap();
      const rom = await DB.get('roms', card.dataset.rom);
      const o = openSheet(`<h3 class="h2" style="margin-top:4px">${esc(rom ? rom.name : '')}</h3><p class="muted">${esc((st.name ? st.name + ' – ' : '') + fmtDate(st.created, true))}</p>
        <div class="btn-row"><button class="btn primary" data-l>${ICON.play}${esc(t('saves.load'))}</button><button class="btn" data-r>${ICON.edit}${esc(t('saves.rename'))}</button><button class="btn" data-d>${ICON.trash}${esc(t('c.delete'))}</button></div>`);
      $('[data-r]', o.el).onclick = async () => {
        o.close(true);
        const n = await promptDlg(t('saves.rename'), st.name || '');
        if (n) { st.name = n.slice(0, 40); await DB.put('states', st); Sfx.ok(); refresh(); }
      };
      $('[data-l]', o.el).onclick = () => { o.close(true); Sfx.coin(); playRom(card.dataset.rom, st.id); };
      $('[data-d]', o.el).onclick = async () => {
        o.close(true);
        if (await confirmDlg(t('c.delete'), t('saves.delConfirm'), t('c.delete'), true)) { await Store.deleteState(st.id); Sfx.ok(); refresh(); }
      };
    };
  }
}

/* ---------- Ansicht: Spielstände ---------- */
async function viewSaves(view) {
  const states = (await DB.all('states')).sort((a, b) => b.created - a.created);
  const roms = {}; (await DB.all('roms')).forEach(r => roms[r.id] = r);
  const valid = states.filter(s => roms[s.romId]);
  const played = Object.values(roms).some(r => r.playCount > 0);
  view.innerHTML = `<div class="topbar" style="margin-top:4px"><h1 class="title-xl">${esc(t('tab.saves'))}</h1></div>
    ${played ? backupReminder() : ''}
    ${valid.length ? `<div class="save-grid" style="margin-top:14px">${valid.map(s => saveCard(s, roms[s.romId])).join('')}</div>`
      : `<div class="empty"><div class="art">${Art.consoleSVG(sysById('snes'))}</div><p style="margin-top:14px">${esc(t('saves.empty'))}</p></div>`}`;
  bindSaveCards(view, () => render());
  bindBackupReminder(view);
}

function backupReminder() {
  const last = Backup.last();
  const days = last ? Math.floor((Date.now() - last) / 864e5) : -1;
  const snooze = Number(localStorage.getItem('ks.bkSnooze')) || 0;
  if ((last && days < 30) || Date.now() < snooze) return '';
  return `<div class="bk-remind"><span class="ico">${ICON.backup}</span><div class="txt">${esc(days < 0 ? t('bk.remindNever') : t('bk.remind', { n: fmtNum(days) }))}</div>
    <div class="btn-row"><button class="btn small" data-bk-later>${esc(t('bk.later'))}</button><button class="btn small primary" data-bk-now>${esc(t('bk.now'))}</button></div></div>`;
}
function bindBackupReminder(root) {
  const now = $('[data-bk-now]', root), later = $('[data-bk-later]', root);
  if (now) now.onclick = () => { Sfx.tap(); go('#/settings/backup'); };
  if (later) later.onclick = () => { Sfx.back(); localStorage.setItem('ks.bkSnooze', String(Date.now() + 7 * 864e5)); $('.bk-remind', root).remove(); };
}

/* ---------- Ansicht: Sicherung ---------- */
function needsHomeHint() {
  const ios = /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const standalone = navigator.standalone === true || (window.matchMedia && matchMedia('(display-mode: standalone)').matches);
  return ios && !standalone;
}

async function viewBackup(view) {
  const sum = await Backup.summary();
  const last = Backup.last();
  if (UI.bkGames == null) UI.bkGames = false;
  view.innerHTML = `${topbar('#/settings')}<h1 class="title-xl">${esc(t('set.backup'))}</h1>
    <p class="tagline">${esc(t('bk.intro'))}</p>
    ${needsHomeHint() ? `<div class="note warn" style="margin-top:14px">${esc(t('bk.homeHint'))}</div>` : ''}
    <h3 class="h3">${esc(t('bk.content'))}</h3>
    <div class="group">
      <div class="row"><span class="ico" style="background:#2fb784">${ICON.saves}</span><span class="lbl">${esc(t('bk.c.states'))}</span><span class="val">${fmtNum(sum.states + sum.extStates)}</span></div>
      <div class="row"><span class="ico" style="background:#3a8ce0">${ICON.disk}</span><span class="lbl">${esc(t('bk.c.sram'))}</span><span class="val">${fmtNum(sum.sram)}</span></div>
      <div class="row"><span class="ico" style="background:#8c5cff">${ICON.wand}</span><span class="lbl">${esc(t('bk.c.cheats'))}</span><span class="val">${fmtNum(sum.cheats)}</span></div>
      <div class="row"><span class="ico" style="background:#e0a400">${ICON.library}</span><span class="lbl">${esc(t('bk.c.games'))}${sum.missing ? `<span class="sub">${esc(t('bk.c.missing', { n: fmtNum(sum.missing) }))}</span>` : ''}</span><span class="val">${fmtNum(sum.roms)}</span></div>
      ${switchRow('bk-games', ICON.chip, '#5a6b85', t('bk.withGames'), UI.bkGames, t('bk.withGamesSub', { size: fmtBytes(sum.gameBytes) }))}
    </div>
    <div class="bk-actions">
      <button class="btn primary block" id="bk-create">${ICON.backup}${esc(t('bk.create'))}</button>
      <div class="bk-prog" id="bk-prog" hidden><div class="progress"><div></div></div><span id="bk-status"></span></div>
      <button class="btn block" id="bk-restore">${ICON.restore}${esc(t('bk.restore'))}</button>
      <p class="small muted bk-last">${esc(last ? t('bk.last', { d: fmtDate(last, true) }) : t('bk.never'))}</p>
    </div>
    <div class="note" style="margin-top:16px">${esc(t('bk.labNote'))}</div>`;
  bindBack(view);
  const sw = $('#bk-games');
  sw.onchange = () => { UI.bkGames = sw.checked; Sfx.toggle(sw.checked); };
  const btnC = $('#bk-create'), btnR = $('#bk-restore');
  const busy = on => { btnC.disabled = on; btnR.disabled = on; sw.disabled = on; $('#bk-prog').hidden = !on; };
  const progress = (key, p) => {
    const pct = Math.round(p * 100);
    $('#bk-prog .progress > div').style.width = pct + '%';
    $('#bk-status').textContent = t(key, { p: fmtNum(pct) });
  };

  btnC.onclick = async () => {
    Sfx.tap(); busy(true); progress('bk.creating', 0);
    let res;
    try { res = await Backup.create({ withGames: UI.bkGames, onProgress: p => progress('bk.creating', p) }); }
    catch (e) { busy(false); Sfx.err(); toast(t('c.error', { e: e.message }), 'err'); return; }
    busy(false);
    Sfx.ok();
    const ok = await dialog({
      title: t('bk.ready'), text: t('bk.readyText', { name: res.fileName, size: fmtBytes(res.size) }), icon: ICON.backup, tone: 'ok',
      buttons: [
        { label: t('c.cancel'), value: false },
        { label: t('bk.save'), value: true, kind: 'primary', setup: el => el.addEventListener('click', () => {
          Backup.deliver(res).then(r => { if (r !== 'aborted') { toast(t('bk.saved')); if (location.hash === '#/settings/backup') render(); } });
        }) }
      ]
    });
    if (!ok) toast(t('bk.notSaved'));
  };

  btnR.onclick = () => {
    Sfx.tap();
    pickFile('one', async files => {
      const file = files[0];
      let parsed;
      try { parsed = await Backup.readHeader(file); }
      catch (e) { Sfx.err(); toast(t(e.code === 'newer' ? 'bk.newer' : 'bk.bad'), 'err'); return; }
      const h = parsed.head, st = h.stats || {};
      const parts = [];
      const item = (k, n) => `${t(k)}: ${fmtNum(n)}`;
      if (st.states || st.extStates) parts.push(item('bk.c.states', (st.states || 0) + (st.extStates || 0)));
      if (st.sram) parts.push(item('bk.c.sram', st.sram));
      if (st.cheats) parts.push(item('bk.c.cheats', st.cheats));
      if (st.roms) parts.push(item('bk.c.games', st.roms) + (h.withGames ? '' : ` (${t('bk.noFiles')})`));
      const go2 = await dialog({
        title: t('bk.confirmT'), icon: ICON.restore, tone: 'ok',
        text: t('bk.confirmX', { d: fmtDate(h.created, true), v: h.appVersion, list: parts.join(', ') || '–' }),
        buttons: [{ label: t('c.cancel'), value: false }, { label: t('bk.restoreGo'), value: true, kind: 'primary' }]
      });
      if (!go2) return;
      busy(true); progress('bk.restoring', 0);
      try { await Backup.restore(file, parsed, p => progress('bk.restoring', p)); }
      catch (e) { busy(false); Sfx.err(); toast(t('c.error', { e: e.message }), 'err'); return; }
      localStorage.setItem('ks.restoreDone', h.withGames ? '1' : '2');
      location.hash = '#/library';
      location.reload();
    });
  };
}

/* ---------- Ansicht: Cheats ---------- */
async function viewCheatGames(view) {
  const roms = (await DB.all('roms')).filter(r => { const x = sysById(r.system); return x && x.ejs; }).sort((a, b) => a.name.localeCompare(b.name));
  const cheats = await DB.all('cheats');
  const cnt = {}; cheats.forEach(c => cnt[c.romId] = (cnt[c.romId] || 0) + 1);
  view.innerHTML = `${topbar('#/settings')}<h1 class="title-xl">${esc(t('set.cheats'))}</h1>
    <p class="tagline">${esc(roms.length ? t('cheat.pick') : t('lib.empty.text'))}</p>
    ${roms.length ? `<div class="group">${roms.map(r => {
      const s = sysById(r.system);
      return `<button class="row" data-r="${r.id}"><span class="thumb" style="width:56px;height:38px;flex:none">${Art.consoleSVG(s)}</span><span class="lbl">${esc(r.name)}<span class="sub">${esc(s.name)}</span></span><span class="val">${cnt[r.id] || ''}</span>${ICON.chev}</button>`;
    }).join('')}</div>` : ''}`;
  bindBack(view);
  $$('[data-r]', view).forEach(b => b.onclick = () => { Sfx.tap(); go('#/cheats/' + b.dataset.r); });
}

async function viewCheats(view, romId) {
  const r = await DB.get('roms', romId);
  if (!r) return go('#/settings/cheats');
  const s = sysById(r.system);
  const cheats = (await DB.byIndex('cheats', 'romId', romId)).sort((a, b) => a.created - b.created);
  view.innerHTML = `${topbar('#/settings/cheats', `<button class="fab" id="addc" aria-label="${esc(t('cheat.add'))}">${ICON.plus}</button>`)}
    <h1 class="title-xl">${esc(t('set.cheats'))}</h1>
    <p class="tagline">${esc(r.name)} – ${esc(s.name)}</p>
    ${cheats.length ? `<div class="group">${cheats.map(c => `<div class="row"><button class="lbl" data-edit="${c.id}" style="text-align:start">${esc(c.desc)}<span class="sub">${esc(c.code.split('\n')[0])}${c.code.includes('\n') ? ' …' : ''}</span></button>
      <label class="switch"><input type="checkbox" data-tog="${c.id}" ${c.enabled ? 'checked' : ''}><span class="track"></span><span class="knob"></span></label></div>`).join('')}</div>`
      : `<div class="empty">${esc(t('cheat.empty'))}</div>`}
    <p class="muted small" style="margin:12px 4px">${esc(s.cheats.length ? t('cheat.formats', { f: s.cheats.join(', ') }) : t('cheats.core'))}. ${esc(t('cheat.note'))}</p>`;
  bindBack(view);
  $('#addc').onclick = () => { Sfx.tap(); editCheat(r, s, null); };
  $$('[data-edit]', view).forEach(b => b.onclick = async () => { Sfx.tap(); editCheat(r, s, await DB.get('cheats', b.dataset.edit)); });
  $$('[data-tog]', view).forEach(inp => inp.onchange = async () => {
    const c = await DB.get('cheats', inp.dataset.tog); c.enabled = inp.checked; await DB.put('cheats', c); Sfx.toggle(c.enabled);
  });
}

function editCheat(rom, s, c) {
  const o = openSheet(`<h3 class="h2" style="margin-top:4px">${esc(t(c ? 'cheat.edit' : 'cheat.add'))}</h3>
    <label class="field"><span>${esc(t('cheat.name'))}</span><input id="cd" value="${esc(c ? c.desc : '')}" placeholder="${esc(t('cheat.namePh'))}" autocomplete="off"></label>
    <label class="field"><span>${esc(t('cheat.code'))} – ${esc(t('cheat.codeHint'))}</span><textarea id="cc" autocapitalize="characters" autocorrect="off" spellcheck="false" placeholder="${esc(cheatPlaceholder(s))}">${esc(c ? c.code : '')}</textarea></label>
    <p class="muted small">${esc(s.cheats.length ? t('cheat.formats', { f: s.cheats.join(', ') }) : t('cheats.core'))}</p>
    <div class="btn-row">${c ? `<button class="btn" data-del>${ICON.trash}${esc(t('c.delete'))}</button>` : ''}<button class="btn primary" data-save>${esc(t('c.save'))}</button></div>`);
  $('[data-save]', o.el).onclick = async () => {
    const desc = $('#cd', o.el).value.trim(), code = $('#cc', o.el).value.trim().toUpperCase();
    if (!desc || !code) { Sfx.err(); toast(t('cheat.invalid'), 'err'); return; }
    const rec = c || { id: uid(), romId: rom.id, created: Date.now(), enabled: true };
    rec.desc = desc; rec.code = code;
    await DB.put('cheats', rec);
    o.close(true); Sfx.ok(); render();
  };
  if (c) $('[data-del]', o.el).onclick = async () => { await DB.del('cheats', c.id); o.close(true); Sfx.ok(); render(); };
}
function cheatPlaceholder(s) {
  const ex = { nes: 'SXIOPO', snes: '7E0DBE09', gb: '01FF34C1', gbc: '01FF34C1', gba: '82025D6C 0063', n64: '8033B21E 0008', psx: '800C4A8C 0063', segaMD: 'FFFE10:0005', nds: '0213B4E8 0000270F' };
  return ex[s.id] || '';
}

/* ---------- Ansicht: Einstellungen ---------- */
function switchRow(id, icon, color, label, checked, sub) {
  return `<div class="row"><span class="ico" style="background:${color}">${icon}</span><span class="lbl">${esc(label)}${sub ? `<span class="sub">${esc(sub)}</span>` : ''}</span>
    <label class="switch"><input type="checkbox" id="${id}" ${checked ? 'checked' : ''} aria-label="${esc(label)}"><span class="track"></span><span class="knob"></span></label></div>`;
}
function linkRow(hash, icon, color, label, val) {
  return `<button class="row" data-go="${hash}"><span class="ico" style="background:${color}">${icon}</span><span class="lbl">${esc(label)}</span>${val ? `<span class="val">${val}</span>` : ''}${ICON.chev}</button>`;
}

async function viewSettings(view) {
  const li = langInfo(Settings.get('lang'));
  const theme = Settings.get('theme');
  const ff = Settings.get('ffSpeed');
  view.innerHTML = `<div class="topbar" style="margin-top:4px"><h1 class="title-xl">${esc(t('tab.settings'))}</h1></div>
    <div class="group" style="margin-top:14px">${linkRow('#/settings/help', ICON.help, '#ff7a45', t('help.title'), '')}</div>
    <h3 class="h3">${esc(t('set.sound'))}</h3>
    <div class="group">
      ${switchRow('s-gs', ICON.sound, '#ff7a45', t('set.gameSound'), Settings.get('gameSound'))}
      ${switchRow('s-cl', ICON.click, '#ff5ca8', t('set.clicks'), Settings.get('clicks'))}
    </div>
    <h3 class="h3">${esc(t('set.look'))}</h3>
    <div class="group">
      ${linkRow('#/settings/design', ICON.palette, '#8c5cff', t('set.bg') + ' & ' + t('set.icon'), esc(t('bg.' + Settings.get('bg'))))}
      <div class="row stack"><span class="ico" style="background:#3a3a6a">${ICON.moon}</span><span class="lbl">${esc(t('set.dark'))}</span>
        <div class="seg" id="themeseg">${['auto', 'light', 'dark'].map(k => `<button data-v="${k}" aria-pressed="${theme === k}">${esc(t('dm.' + k))}</button>`).join('')}</div></div>
      ${linkRow('#/settings/lang', ICON.globe, '#2fa4e7', t('set.lang'), `<span style="font-size:20px;vertical-align:middle">${li.flag}</span> ${esc(li.name)}`)}
    </div>
    <h3 class="h3">${esc(t('set.play'))}</h3>
    <div class="group">
      <div class="row stack"><span class="ico" style="background:#e0a400">${ICON.ff}</span><span class="lbl">${esc(t('set.ffSpeed'))}</span>
        <div class="seg" id="ffseg">${[1.5, 2, 3, 4, 8].map(v => `<button data-v="${v}" aria-pressed="${ff === v}">${fmtNum(v)}×</button>`).join('')}</div></div>
      <div class="row stack"><span class="ico" style="background:#2fb784">${ICON.timer}</span><span class="lbl">${esc(t('set.autoInt'))}</span>
        <div class="seg" id="aiseg">${[0, 1, 3, 5, 10, 15].map(v => `<button data-v="${v}" aria-pressed="${Number(Settings.get('autosaveMin')) === v}">${esc(v ? t('dur.min', { m: v }) : t('c.off'))}</button>`).join('')}</div>
        <span class="sub-below">${esc(t('set.autoIntSub'))}</span></div>
      ${switchRow('s-as', ICON.saves, '#2fb784', t('set.autosave'), Settings.get('autosave'))}
      ${switchRow('s-rw', ICON.rewind, '#8c5cff', t('set.rewind'), Settings.get('rewind') !== false, t('set.rewindSub'))}
      ${switchRow('s-ge', ICON.hand, '#e07a3a', t('set.gestures'), Settings.get('gestures') !== false, t('set.gesturesSub'))}
      ${switchRow('s-bat', ICON.bat, '#2fb784', t('bat.title'), Settings.get('battery') === true, t('bat.sub'))}
      ${linkRow('#/settings/controller', ICON.consoles, '#3a8ce0', t('set.controller'), esc(t('skin.' + (Settings.get('padSkin') || 'konsolarium'))))}
      ${linkRow('#/settings/cheats', ICON.wand, '#8c5cff', t('set.cheats'), '')}
    </div>
    <h3 class="h3">${esc(t('set.data'))}</h3>
    <div class="group" style="margin-bottom:10px">${linkRow('#/settings/backup', ICON.backup, '#2fb784', t('set.backup'), esc(Backup.last() ? fmtDate(Backup.last()) : t('bk.neverShort')))}</div>
    <div class="group" id="offgroup">
      ${linkRow('#/settings/emulators', ICON.chip, '#2fa4e7', t('emu.title'), '<span id="emuval">–</span>')}
      ${linkRow('#/stats', ICON.chart, '#ff5ca8', t('st.title'), '')}
      <div class="row"><span class="ico" style="background:#5a6b85">${ICON.disk}</span><span class="lbl">${esc(t('set.storage'))}</span><span class="val" id="storeval">–</span></div>
    </div>
    <h3 class="h3">${esc(t('set.updates'))}</h3>
    <div class="group">
      ${switchRow('s-au', ICON.refresh, '#2fb784', t('set.autoUpdate'), Settings.get('autoUpdate'))}
      <button class="row" id="chk"><span class="ico" style="background:#3a8ce0">${ICON.refresh}</span><span class="lbl">${esc(t('set.check'))}<span class="sub" id="chkres">${esc(t('about.version'))} ${APP.version}</span></span></button>
    </div>
    <h3 class="h3">${esc(t('set.info'))}</h3>
    <div class="group">
      ${linkRow('#/settings/privacy', ICON.shield, '#2fb784', t('set.privacy'))}
      ${linkRow('#/settings/sources', ICON.book, '#e07a3a', t('set.sources'))}
      ${linkRow('#/settings/about', ICON.info, '#8c5cff', t('set.about'), esc(APP.version))}
    </div>
    <h3 class="h3"></h3>
    <div class="group"><button class="row danger" id="reset"><span class="ico" style="background:var(--red)">${ICON.trash}</span><span class="lbl">${esc(t('set.reset'))}</span></button></div>`;

  $$('[data-go]', view).forEach(b => b.onclick = () => { Sfx.tap(); go(b.dataset.go); });
  const sw = (id, key) => { const el = $('#' + id); el.onchange = () => { Settings.set(key, el.checked); Sfx.toggle(el.checked); }; };
  sw('s-gs', 'gameSound'); sw('s-cl', 'clicks'); sw('s-as', 'autosave'); sw('s-au', 'autoUpdate'); sw('s-rw', 'rewind'); sw('s-ge', 'gestures'); sw('s-bat', 'battery');
  $$('#aiseg button').forEach(b => b.onclick = () => { Sfx.tap(); Settings.set('autosaveMin', Number(b.dataset.v)); $$('#aiseg button').forEach(x => x.setAttribute('aria-pressed', x === b)); });
  $$('#themeseg button').forEach(b => b.onclick = () => { Sfx.tap(); Settings.set('theme', b.dataset.v); render(); });
  $$('#ffseg button').forEach(b => b.onclick = () => { Sfx.tap(); Settings.set('ffSpeed', Number(b.dataset.v)); $$('#ffseg button').forEach(x => x.setAttribute('aria-pressed', x === b)); });
  if (navigator.storage && navigator.storage.estimate) navigator.storage.estimate().then(e => { $('#storeval').textContent = fmtBytes(e.usage); });
  if ('caches' in window) {
    const packs = emulatorPacks();
    Promise.all(packs.map(packStatus)).then(st => { const el = $('#emuval'); if (el) el.textContent = t('emu.count', { n: st.filter(Boolean).length, m: packs.length }); });
  }
  $('#chk').onclick = async () => {
    Sfx.tap();
    const res = $('#chkres'); res.textContent = t('upd.checking');
    const r = await Updater.check();
    if (r.status === 'available') {
      res.innerHTML = `${esc(t('upd.available', { v: r.version }))} <button class="btn small primary" id="updnow" style="margin-top:6px">${esc(t('upd.install'))}</button>`;
      $('#updnow').onclick = e => { e.stopPropagation(); Updater.install(r.version); };
    } else if (r.status === 'offline') res.textContent = t('upd.offline');
    else { res.textContent = t('upd.none', { v: APP.version }); Sfx.ok(); }
  };
  $('#reset').onclick = resetFlow;
}

/* ---------- Ansicht: Controller (Skins je Konsole, Gehäuse, eigene Bilder) ---------- */
const PREVIEW_SYS = ['gba', 'snes', 'psx', 'n64'];
const PREVIEW_LABEL = { gba: 'GBA', snes: 'SNES', psx: 'PS1', n64: 'N64' };
const PAD_SYSTEMS = () => SYSTEMS.filter(s => s.ejs && !s.lab).slice().sort((a, b) => a.year - b.year || a.name.localeCompare(b.name));

function skinCard(k, pressed, label, extra) {
  let sw;
  if (k === '' || k === 'auto') sw = '<span class="sw sw-inherit"><i></i></span>';
  else if (k === 'bild') sw = `<span class="sw sw-img">${extra || ''}</span>`;
  else if (Pad.isBody(k)) sw = `<span class="sw sw-body" data-skin="${k}"><i></i><i></i><i></i></span>`;
  else sw = `<span class="sw sw-${k}"><i></i><i></i><i></i></span>`;
  return `<button class="skin-card" data-k="${k}" aria-pressed="${pressed}">${sw}<span>${esc(label)}</span></button>`;
}
async function skinImgInfo(sysId) {
  const out = { p: null, q: null };
  for (const o of ['p', 'q']) {
    const rec = await SkinStore.get(sysId, o).catch(() => null);
    if (rec && rec.blob) out[o] = { url: URL.createObjectURL(rec.blob), w: rec.w, h: rec.h, hide: !!rec.hide };
  }
  return out;
}
/* Bild verkleinern (max. 1800 px) und je Konsole + Ausrichtung speichern */
async function importSkinImage(sysId, o, file) {
  const bmp = await createImageBitmap(file);
  const k = Math.min(1, 1800 / Math.max(bmp.width, bmp.height));
  const w = Math.round(bmp.width * k), h = Math.round(bmp.height * k);
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  c.getContext('2d').drawImage(bmp, 0, 0, w, h);
  const keepAlpha = /png|webp|gif/.test(file.type);
  const blob = await new Promise(res => c.toBlob(res, keepAlpha ? 'image/png' : 'image/jpeg', 0.9));
  if (!blob) throw new Error('image');
  const prev = await SkinStore.get(sysId, o).catch(() => null);
  const other = await SkinStore.get(sysId, o === 'p' ? 'q' : 'p').catch(() => null);
  const hide = prev ? !!prev.hide : other ? !!other.hide : false;
  await SkinStore.put(sysId, o, blob, { w, h, hide });
  const by = Object.assign({}, Settings.get('padSkinBySys') || {});
  by[sysId] = 'bild';
  Settings.set('padSkinBySys', by);
}

async function viewController(view) {
  if (!UI.padPrev) UI.padPrev = 'snes';
  if (!UI.padScope) UI.padScope = 'all';
  if (!UI.padOri) UI.padOri = 'p';
  const scope = UI.padScope, sysS = scope !== 'all' ? sysById(scope) : null;
  if (scope !== 'all' && !sysS) { UI.padScope = 'all'; return viewController(view); }
  const imgs = sysS ? await skinImgInfo(scope) : { p: null, q: null };
  const anyImg = imgs.p || imgs.q;
  const global = () => Settings.get('padSkin') || 'konsolarium';
  const chosen = () => (sysS ? ((Settings.get('padSkinBySys') || {})[scope] || '') : global());
  const mode = Settings.get('padMode') || 'auto';
  const cur = chosen();
  view.innerHTML = `${topbar('#/settings')}<h1 class="title-xl">${esc(t('set.controller'))}</h1>
    <p class="tagline">${esc(t('ctl.intro'))}</p>
    <div class="group"><div class="row"><span class="ico" style="background:#3a8ce0">${ICON.consoles}</span><span class="lbl">${esc(t('ctl.scope'))}</span>
      <select class="select" id="scope"><option value="all">${esc(t('ctl.scopeAll'))}</option>${PAD_SYSTEMS().map(x => `<option value="${x.id}" ${x.id === scope ? 'selected' : ''}>${esc(x.name)}</option>`).join('')}</select></div></div>
    <div class="pad-preview">
      <div class="pp-phone ${UI.padOri}" id="ppphone"><div class="pp-stage" id="ppstage"><div class="kbody" id="ppbody" hidden></div><div class="pp-screen" id="ppscreen"></div><div id="ppad"></div></div></div>
      <div class="pp-ctl">
        ${sysS ? '' : `<div class="seg" id="ppsys">${PREVIEW_SYS.map(id => `<button data-v="${id}" aria-pressed="${UI.padPrev === id}">${PREVIEW_LABEL[id]}</button>`).join('')}</div>`}
        <div class="seg" id="ppori">${['p', 'q'].map(o => `<button data-v="${o}" aria-pressed="${UI.padOri === o}">${esc(t('ctl.ori.' + o))}</button>`).join('')}</div>
      </div>
    </div>
    ${sysS ? `<p class="muted small" style="margin:12px 4px 0">${esc(t('ctl.scopeHint', { sys: sysS.name }))}</p>` : ''}
    <h3 class="h3">${esc(t('ctl.keys'))}</h3>
    <div class="skin-grid">
      ${sysS ? skinCard('', cur === '', t('ctl.likeAll')) : ''}
      ${anyImg ? skinCard('bild', cur === 'bild', t('skin.bild'), `<img src="${anyImg.url}" alt="">`) : ''}
      ${Pad.SKINS.map(k => skinCard(k, cur === k, t('skin.' + k))).join('')}
    </div>
    <h3 class="h3">${esc(t('ctl.bodies'))}</h3>
    <p class="muted small" style="margin:-4px 4px 10px">${esc(t('ctl.bodiesSub'))}</p>
    <div class="skin-grid">${Pad.BODY_SKINS.map(k => skinCard(k, cur === k, t('skin.' + k))).join('')}</div>
    <h3 class="h3">${esc(t('ctl.img'))}</h3>
    ${sysS ? `<p class="muted small" style="margin:-4px 4px 10px">${esc(t('ctl.imgIntro'))}</p>
      <div class="img-slots">${['p', 'q'].map(o => `<div class="img-slot ${o}">
        <button class="ithumb" data-pick="${o}" aria-label="${esc(t('ctl.imgPick'))}">${imgs[o] ? `<img src="${imgs[o].url}" alt="">` : ICON.plus}</button>
        <b>${esc(t('ctl.ori.' + o))}</b>
        ${imgs[o] ? `<button class="btn small" data-del="${o}">${ICON.trash}${esc(t('c.delete'))}</button>` : `<button class="btn small" data-pick="${o}">${ICON.image}${esc(t('ctl.imgPick'))}</button>`}</div>`).join('')}</div>
      ${anyImg ? `<div class="group" style="margin-top:12px">${switchRow('imghide', ICON.hand, '#5a6b85', t('ctl.imgHide'), !!anyImg.hide, t('ctl.imgHideSub'))}</div>
        <div class="note" style="margin-top:12px">${esc(t('ctl.imgArrange', { m: t('pl.menu'), a: t('pad.arrange') }))}</div>` : ''}`
      : `<div class="note">${esc(t('ctl.imgPickSys'))}</div>`}
    <h3 class="h3">${esc(t('ctl.adjust'))}</h3>
    <div class="group">
      <div class="row stack"><span class="lbl">${esc(t('ctl.opacity'))}</span><input type="range" class="range" id="pop" min="30" max="100" step="5" value="${Math.round((Number(Settings.get('padOpacity')) || 0.85) * 100)}"></div>
      <div class="row stack"><span class="lbl">${esc(t('ctl.size'))}</span><input type="range" class="range" id="psz" min="80" max="130" step="5" value="${Math.round((Number(Settings.get('padScale')) || 1) * 100)}"></div>
      <div class="row stack"><span class="lbl">${esc(t('pad.onscreen'))}</span>
        <div class="seg" id="pmode">${['auto', 'on', 'off'].map(k => `<button data-v="${k}" aria-pressed="${mode === k}">${esc(t('ctl.mode.' + k))}</button>`).join('')}</div>
        <span class="sub-below">${esc(t('ctl.modeSub'))}</span></div>
    </div>
    <div class="note" style="margin-top:16px">${esc(t('ctl.arrangeHint'))}</div>
    <div class="group" style="margin-top:16px"><button class="row" id="preset"><span class="ico" style="background:#5a6b85">${ICON.refresh}</span><span class="lbl">${esc(t('ctl.resetAll'))}</span></button></div>`;
  bindBack(view);

  const ppSys = () => (sysS ? scope : UI.padPrev);
  const look = () => {
    let k = chosen() || global();
    if (k === 'bild') {
      const im = imgs[UI.padOri], g = global();
      if (im) return { kind: 'img', skin: Pad.SKINS.includes(g) ? g : 'glas', ghost: im.hide, img: im };
      k = g;
    }
    if (!Pad.ALL_SKINS.includes(k)) k = 'konsolarium';
    return { kind: Pad.isBody(k) ? 'body' : 'none', skin: k };
  };
  let prev = null;
  const paint = () => {
    const st = $('#ppstage'); if (!st) return;
    const r = st.getBoundingClientRect(), lk = look();
    const rects = Pad.frameRects(r.width, r.height, ppSys(), lk.kind, lk.img);
    const a = Pad.aspectOf(ppSys()), g = rects.game, portrait = r.height >= r.width;
    let w = g.w, h = w / a;
    if (h > g.h) { h = g.h; w = h * a; }
    Object.assign($('#ppscreen').style, { left: (g.l + (g.w - w) / 2) + 'px', top: (g.t + (portrait ? 0 : (g.h - h) / 2)) + 'px', width: w + 'px', height: h + 'px' });
    Pad.paintBody($('#ppbody'), lk.kind, lk.skin, rects, lk.img && lk.img.url);
    if (prev) prev.layout();
  };
  const mk = () => {
    if (prev) prev.destroy();
    const sid = ppSys();
    prev = Pad.create($('#ppad'), { sys: sid, preview: true, rewind: Settings.get('rewind') !== false && REWIND_SYS.includes(sid), zoom: 0.5, look });
    paint();
    requestAnimationFrame(paint);
  };
  mk();
  $('#scope').onchange = e => { Sfx.tap(); UI.padScope = e.target.value; render(); };
  $$('#ppsys button').forEach(b => b.onclick = () => { Sfx.tap(); UI.padPrev = b.dataset.v; $$('#ppsys button').forEach(x => x.setAttribute('aria-pressed', x === b)); mk(); });
  $$('#ppori button').forEach(b => b.onclick = () => {
    Sfx.tap(); UI.padOri = b.dataset.v;
    $$('#ppori button').forEach(x => x.setAttribute('aria-pressed', x === b));
    $('#ppphone').className = 'pp-phone ' + UI.padOri;
    mk();
  });
  $$('.skin-card', view).forEach(b => b.onclick = () => {
    Sfx.toggle(true);
    const k = b.dataset.k;
    if (sysS) {
      const by = Object.assign({}, Settings.get('padSkinBySys') || {});
      if (k) by[scope] = k; else delete by[scope];
      Settings.set('padSkinBySys', by);
    } else Settings.set('padSkin', k);
    $$('.skin-card', view).forEach(x => x.setAttribute('aria-pressed', x === b));
    paint();
  });
  $$('[data-pick]', view).forEach(b => b.onclick = () => {
    Sfx.tap();
    const o = b.dataset.pick;
    pickFile('image', async files => {
      try { await importSkinImage(scope, o, files[0]); UI.padOri = o; Sfx.ok(); toast(t('ctl.imgSaved')); render(); }
      catch (e) { Sfx.err(); toast(t('cover.bad'), 'err'); }
    });
  });
  $$('[data-del]', view).forEach(b => b.onclick = async () => {
    await SkinStore.del(scope, b.dataset.del);
    const left = await skinImgInfo(scope);
    if (!left.p && !left.q) {
      const by = Object.assign({}, Settings.get('padSkinBySys') || {});
      if (by[scope] === 'bild') { delete by[scope]; Settings.set('padSkinBySys', by); }
    }
    Sfx.ok(); render();
  });
  if ($('#imghide')) $('#imghide').onchange = async e => {
    await SkinStore.setHide(scope, e.target.checked);
    ['p', 'q'].forEach(o => { if (imgs[o]) imgs[o].hide = e.target.checked; });
    Sfx.toggle(e.target.checked); paint();
  };
  $('#pop').oninput = e => { Settings.set('padOpacity', Number(e.target.value) / 100); prev.layout(); };
  $('#psz').oninput = e => { Settings.set('padScale', Number(e.target.value) / 100); prev.layout(); };
  $$('#pmode button').forEach(b => b.onclick = () => { Sfx.tap(); Settings.set('padMode', b.dataset.v); $$('#pmode button').forEach(x => x.setAttribute('aria-pressed', x === b)); });
  $('#preset').onclick = async () => {
    if (await confirmDlg(t('ctl.resetAll'), t('ctl.resetAllX'), t('pad.reset'), true)) { Pad.resetAll(); Sfx.ok(); toast(t('ctl.resetDone')); prev.layout(); }
  };
}

/* ---------- Ansicht: Anleitung (aufklappbare Themen) ---------- */
const HELP = [
  ['start', 'library', '#3a8ce0'], ['bios', 'chip', '#5a6b85'], ['play', 'consoles', '#8c5cff'], ['saves', 'saves', '#2fb784'],
  ['speed', 'ff', '#e0a400'], ['gestures', 'hand', '#e07a3a'], ['pad', 'sliders', '#3a8ce0'], ['skins', 'palette', '#ff5ca8'],
  ['players', 'consoles', '#e5433d'], ['gameprefs', 'sliders', '#2fa4e7'], ['covers', 'image', '#2fb784'], ['cheats', 'chip', '#e0a400'],
  ['files', 'file', '#2fa4e7'], ['notes', 'notes', '#e0a400'], ['battery', 'bat', '#2fb784'], ['stats', 'chart', '#ff5ca8'], ['backup', 'backup', '#2fb784'], ['emus', 'chip', '#2fa4e7'], ['home', 'refresh', '#5a6b85'], ['labs', 'info', '#8c5cff']
];
function viewHelp(view) {
  view.innerHTML = `${topbar('#/settings')}<h1 class="title-xl">${esc(t('help.title'))}</h1>
    <p class="tagline">${esc(t('help.intro'))}</p>
    <div class="group help-list">${HELP.map(([id, ic, col]) => `<details class="help-item" data-h="${id}">
      <summary><span class="ico" style="background:${col}">${ICON[ic] || ICON.info}</span><span class="lbl">${esc(t('help.' + id + '.t'))}</span><span class="help-chev">${ICON.chev}</span></summary>
      <ul>${t('help.' + id + '.b').split('|').map(x => `<li>${esc(x)}</li>`).join('')}</ul></details>`).join('')}</div>`;
  bindBack(view);
  /* Nur ein Thema gleichzeitig offen – bleibt übersichtlich */
  $$('.help-item', view).forEach(d => d.addEventListener('toggle', () => {
    if (!d.open) return;
    Sfx.tap();
    $$('.help-item', view).forEach(o => { if (o !== d) o.open = false; });
    setTimeout(() => d.scrollIntoView({ block: 'nearest', behavior: 'smooth' }), 30);
  }));
}

/* ---------- Ansicht: Emulatoren verwalten ---------- */
async function viewEmulators(view) {
  const packs = emulatorPacks();
  const can = 'caches' in window;
  const st = can ? await Promise.all(packs.map(packStatus)) : packs.map(() => false);
  const total = packs.reduce((n, p) => n + p.bytes, 0);
  const have = packs.reduce((n, p, i) => n + (st[i] ? p.bytes : 0), 0);
  const nHave = st.filter(Boolean).length;
  view.innerHTML = `${topbar('#/settings')}<h1 class="title-xl">${esc(t('emu.title'))}</h1>
    <p class="tagline">${esc(t('emu.intro'))}</p>
    <div class="emu-sum">
      <div class="emu-nums"><b>${esc(fmtBytes(have))}</b><span>${esc(t('emu.of', { n: fmtBytes(total) }))}</span></div>
      <div class="emu-meter" role="img" aria-label="${esc(t('emu.count', { n: nHave, m: packs.length }))}"><div style="width:${total ? Math.max(have ? 2 : 0, Math.round(have / total * 100)) : 0}%"></div></div>
      <div class="emu-cnt">${esc(t('emu.count', { n: nHave, m: packs.length }))}</div>
      <div class="progress" id="emprog" hidden><div></div></div>
      <div class="btn-row">
        <button class="btn primary" id="emall" ${!can || nHave === packs.length ? 'disabled' : ''}>${ICON.download}${esc(t('emu.loadAll'))}</button>
        <button class="btn" id="emdel" ${!can || !nHave ? 'disabled' : ''}>${ICON.trash}${esc(t('emu.delAll'))}</button>
      </div>
    </div>
    <div class="group" style="margin-top:16px">${packs.map((p, i) => `<div class="row emu-row ${st[i] ? 'have' : ''}" data-p="${esc(p.id)}">
      <span class="lbl">${esc(p.name)}<span class="sub">${esc(p.systems.map(x => x.name).join(', '))}</span></span>
      <span class="val">${st[i] ? `<span class="emu-ok">${esc(t('emu.loaded'))}</span>` : ''}${esc(fmtBytes(p.bytes))}</span>
      <button class="btn small icon" data-act="${st[i] ? 'del' : 'load'}" aria-label="${esc(t(st[i] ? 'emu.del' : 'emu.load'))}" ${can ? '' : 'disabled'}>${st[i] ? ICON.trash : ICON.download}</button></div>`).join('')}</div>
    <p class="muted small" style="margin:14px 4px">${esc(t('emu.note'))}</p>`;
  bindBack(view);
  let busy = false;
  const prog = (done, all) => { const pr = $('#emprog'); if (!pr) return; pr.hidden = false; pr.firstElementChild.style.width = Math.round(done / Math.max(1, all) * 100) + '%'; };
  $$('.emu-row [data-act]', view).forEach(b => b.onclick = async () => {
    if (busy) return;
    const row = b.closest('.emu-row'), p = packs.find(x => x.id === row.dataset.p);
    if (b.dataset.act === 'del') {
      if (!(await confirmDlg(t('emu.del'), t('emu.delX', { name: p.name }), t('c.delete'), true))) return;
      await packDelete(p); Sfx.ok(); render(); return;
    }
    busy = true; Sfx.tap();
    b.disabled = true; b.innerHTML = '<span class="spin"></span>';
    try { await packLoad(p); Sfx.ok(); toast(t('emu.loadedX', { name: p.name })); }
    catch (e) { Sfx.err(); toast(t('emu.fail'), 'err'); }
    busy = false; render();
  });
  $('#emall').onclick = async () => {
    if (busy) return;
    busy = true; Sfx.tap();
    $('#emall').disabled = true; $('#emdel').disabled = true;
    const todo = packs.filter((p, i) => !st[i]);
    const all = todo.reduce((n, p) => n + p.bytes, 0);
    let done = 0;
    prog(0, all);
    try {
      for (const p of todo) await packLoad(p, bytes => { done += bytes; prog(done, all); });
      Settings.set('offlineAll', true);
      Sfx.ok(); toast(t('set.offlineDone'));
    } catch (e) { Sfx.err(); toast(t('emu.fail'), 'err'); }
    busy = false; render();
  };
  $('#emdel').onclick = async () => {
    if (busy) return;
    if (!(await confirmDlg(t('emu.delAll'), t('emu.delAllX'), t('c.delete'), true))) return;
    for (const p of packs) await packDelete(p);
    Sfx.ok(); render();
  };
}

/* ---------- Ansicht: Statistik ---------- */
async function viewStats(view) {
  const roms = await DB.all('roms');
  const states = await DB.all('states');
  const total = roms.reduce((n, r) => n + (r.playTime || 0), 0);
  const sessions = roms.reduce((n, r) => n + (r.playCount || 0), 0);
  const top = roms.filter(r => r.playTime >= 60000).sort((a, b) => b.playTime - a.playTime).slice(0, 8);
  const bySys = {};
  roms.forEach(r => { const k = r.system; bySys[k] = bySys[k] || { t: 0, n: 0 }; bySys[k].t += r.playTime || 0; bySys[k].n++; });
  const sysList = Object.entries(bySys).filter(([, v]) => v.t >= 60000).sort((a, b) => b[1].t - a[1].t);
  /* Letzte 14 Tage */
  const pd = playDays(), days = [];
  for (let i = 13; i >= 0; i--) { const d = new Date(); d.setHours(12, 0, 0, 0); d.setDate(d.getDate() - i); days.push({ d, ms: pd[dayKey(d)] || 0 }); }
  const dMax = Math.max(...days.map(x => x.ms), 60000);
  const week = days.slice(7).reduce((n, x) => n + x.ms, 0);
  const wd = d => { try { return new Intl.DateTimeFormat(locale(), { weekday: 'narrow' }).format(d); } catch (e) { return ''; } };
  const dl = d => { try { return new Intl.DateTimeFormat(locale(), { weekday: 'short', day: 'numeric', month: 'numeric' }).format(d); } catch (e) { return d.toDateString(); } };
  const romBytes = roms.reduce((n, r) => n + (r.size || 0), 0);
  const stBytes = states.reduce((n, s) => n + (s.size || 0), 0);
  const tMax = top.length ? top[0].playTime : 1, sMax = sysList.length ? sysList[0][1].t : 1;
  const bar = (label, sub, ms, max) => `<div class="sbar"><div class="sb-top"><span class="sb-l">${esc(label)}${sub ? `<small>${esc(sub)}</small>` : ''}</span><span class="sb-v">${esc(fmtDuration(ms))}</span></div>
    <div class="sb-track"><i style="width:${Math.max(2, Math.round(ms / max * 100))}%"></i></div></div>`;

  view.innerHTML = `${topbar('#/settings')}<h1 class="title-xl">${esc(t('st.title'))}</h1>
    ${total < 60000 ? `<div class="empty" style="margin-top:20px"><div class="big">${esc(t('st.empty'))}</div><p class="muted">${esc(t('st.emptySub'))}</p>
      <button class="btn primary" data-go="#/library" style="margin-top:12px">${ICON.library}${esc(t('tab.library'))}</button></div>` : `
    <div class="st-hero"><b>${esc(fmtDuration(total))}</b><span>${esc(t('st.total'))}</span></div>
    <div class="st-tiles">
      <div><b>${esc(fmtNum(roms.length))}</b><span>${esc(t('st.games'))}</span></div>
      <div><b>${esc(fmtNum(sessions))}</b><span>${esc(t('st.sessions'))}</span></div>
      <div><b>${esc(fmtNum(states.length))}</b><span>${esc(t('st.states'))}</span></div>
    </div>
    <h3 class="h3">${esc(t('st.days'))}</h3>
    <div class="st-days">
      <div class="sd-cap" id="sdcap">${esc(t('st.week', { d: fmtDuration(week) }))}</div>
      <div class="sd-plot">${days.map((x, i) => `<button class="sd-col ${i === 13 ? 'today' : ''}" data-i="${i}" aria-label="${esc(dl(x.d) + ': ' + fmtDuration(x.ms))}"><span class="sd-bar" style="height:${x.ms ? Math.max(3, Math.round(x.ms / dMax * 100)) : 0}%"></span><span class="sd-x">${esc(wd(x.d))}</span></button>`).join('')}</div>
    </div>
    ${top.length ? `<h3 class="h3">${esc(t('st.top'))}</h3><div class="group st-list">${top.map(r => bar(r.name, (sysById(r.system) || {}).name || '', r.playTime, tMax)).join('')}</div>` : ''}
    ${sysList.length ? `<h3 class="h3">${esc(t('st.bySys'))}</h3><div class="group st-list">${sysList.map(([k, v]) => bar((sysById(k) || { name: k }).name, nGames(v.n), v.t, sMax)).join('')}</div>` : ''}`}
    <h3 class="h3">${esc(t('st.storage'))}</h3>
    <div class="group">
      <div class="row"><span class="ico" style="background:#3a8ce0">${ICON.library}</span><span class="lbl">${esc(t('st.romBytes'))}</span><span class="val">${esc(fmtBytes(romBytes))}</span></div>
      <div class="row"><span class="ico" style="background:#2fb784">${ICON.saves}</span><span class="lbl">${esc(t('st.stBytes'))}</span><span class="val">${esc(fmtBytes(stBytes))}</span></div>
      <button class="row" data-go="#/settings/emulators"><span class="ico" style="background:#2fa4e7">${ICON.chip}</span><span class="lbl">${esc(t('emu.title'))}</span><span class="val" id="stemu">–</span>${ICON.chev}</button>
      <div class="row"><span class="ico" style="background:#5a6b85">${ICON.disk}</span><span class="lbl">${esc(t('set.storage'))}</span><span class="val" id="ststore">–</span></div>
    </div>`;
  bindBack(view);
  $$('[data-go]', view).forEach(b => b.onclick = () => { Sfx.tap(); go(b.dataset.go); });
  $$('.sd-col', view).forEach(b => b.onclick = () => {
    const x = days[Number(b.dataset.i)];
    $$('.sd-col', view).forEach(c => c.classList.toggle('sel', c === b));
    $('#sdcap').textContent = dl(x.d) + ': ' + (x.ms ? fmtDuration(x.ms) : t('st.none'));
  });
  if ('caches' in window) {
    const packs = emulatorPacks();
    Promise.all(packs.map(packStatus)).then(s => { const el = $('#stemu'); if (el) el.textContent = fmtBytes(packs.reduce((n, p, i) => n + (s[i] ? p.bytes : 0), 0)); });
  }
  if (navigator.storage && navigator.storage.estimate) navigator.storage.estimate().then(e => { const el = $('#ststore'); if (el) el.textContent = fmtBytes(e.usage); });
}

/* ---------- Ansicht: Einstellungen für ein Spiel ---------- */
function prefsSummary(r) {
  const n = Object.keys(r.prefs || {}).length;
  return n ? t('gp.custom', { n }) : t('gp.none');
}
async function viewRomPrefs(view, id) {
  const r = await DB.get('roms', id);
  if (!r) return go('#/library');
  const s = sysById(r.system);
  const p = r.prefs || {};
  const imgs = await skinImgInfo(r.system);
  const anyImg = imgs.p || imgs.q;
  const skin = p.skin || 'auto';
  const opt = (v, cur, label) => `<option value="${v}" ${String(cur) === String(v) ? 'selected' : ''}>${esc(label)}</option>`;
  const ffCur = p.ff === undefined ? 'default' : p.ff, aiCur = p.autoMin === undefined ? 'default' : p.autoMin;
  const rwCur = p.rewind === undefined ? 'default' : String(p.rewind), pmCur = p.padMode || 'default';
  const canRw = REWIND_SYS.includes(r.system);
  view.innerHTML = `${topbar('#/rom/' + id)}<h1 class="title-xl">${esc(t('gp.title'))}</h1>
    <p class="tagline">${esc(t('gp.intro', { name: r.name }))}</p>
    <h3 class="h3">${esc(t('gp.skin'))}</h3>
    <div class="skin-grid">
      ${skinCard('auto', skin === 'auto', t('gp.likeSys', { sys: s.name }))}
      ${anyImg ? skinCard('bild', skin === 'bild', t('skin.bild'), `<img src="${anyImg.url}" alt="">`) : ''}
      ${Pad.ALL_SKINS.map(k => skinCard(k, skin === k, t('skin.' + k))).join('')}
    </div>
    <h3 class="h3">${esc(t('set.play'))}</h3>
    <div class="group">
      <div class="row"><span class="ico" style="background:#e0a400">${ICON.ff}</span><span class="lbl">${esc(t('set.ffSpeed'))}</span>
        <select class="select" id="gff">${opt('default', ffCur, t('gp.std', { v: fmtNum(Settings.get('ffSpeed')) + '×' }))}${[1.5, 2, 3, 4, 8].map(v => opt(v, ffCur, fmtNum(v) + '×')).join('')}</select></div>
      <div class="row"><span class="ico" style="background:#2fb784">${ICON.timer}</span><span class="lbl">${esc(t('set.autoInt'))}</span>
        <select class="select" id="gai">${opt('default', aiCur, t('gp.std', { v: Number(Settings.get('autosaveMin')) ? t('dur.min', { m: Settings.get('autosaveMin') }) : t('c.off') }))}${[0, 1, 3, 5, 10, 15].map(v => opt(v, aiCur, v ? t('dur.min', { m: v }) : t('c.off'))).join('')}</select></div>
      <div class="row stack"><span class="ico" style="background:#8c5cff">${ICON.rewind}</span><span class="lbl">${esc(t('set.rewind'))}</span>
        <div class="seg" id="grw">${[['default', t('gp.stdShort')], ['true', t('c.on')], ['false', t('c.off')]].map(([v, l]) => `<button data-v="${v}" aria-pressed="${rwCur === v}" ${canRw ? '' : 'disabled'}>${esc(l)}</button>`).join('')}</div>
        ${canRw ? '' : `<span class="sub-below">${esc(t('gp.noRewind'))}</span>`}</div>
      <div class="row stack"><span class="ico" style="background:#3a8ce0">${ICON.consoles}</span><span class="lbl">${esc(t('pad.onscreen'))}</span>
        <div class="seg" id="gpm">${[['default', t('gp.stdShort')], ['auto', t('ctl.mode.auto')], ['on', t('ctl.mode.on')], ['off', t('ctl.mode.off')]].map(([v, l]) => `<button data-v="${v}" aria-pressed="${pmCur === v}">${esc(l)}</button>`).join('')}</div></div>
    </div>
    <div class="note" style="margin-top:16px">${esc(t('gp.note'))}</div>
    <div class="group" style="margin-top:16px"><button class="row" id="greset"><span class="ico" style="background:#5a6b85">${ICON.refresh}</span><span class="lbl">${esc(t('gp.reset'))}</span></button></div>`;
  bindBack(view);
  const save = async (k, v) => {
    const cur = await DB.get('roms', id);
    const pr = Object.assign({}, cur.prefs || {});
    if (v === 'default' || v === 'auto' && k === 'skin') delete pr[k]; else pr[k] = v;
    if (Object.keys(pr).length) cur.prefs = pr; else delete cur.prefs;
    await DB.put('roms', cur);
    Sfx.toggle(true);
  };
  $$('.skin-card', view).forEach(b => b.onclick = () => { $$('.skin-card', view).forEach(x => x.setAttribute('aria-pressed', x === b)); save('skin', b.dataset.k); });
  $('#gff').onchange = e => save('ff', e.target.value === 'default' ? 'default' : Number(e.target.value));
  $('#gai').onchange = e => save('autoMin', e.target.value === 'default' ? 'default' : Number(e.target.value));
  $$('#grw button').forEach(b => b.onclick = () => { $$('#grw button').forEach(x => x.setAttribute('aria-pressed', x === b)); save('rewind', b.dataset.v === 'default' ? 'default' : b.dataset.v === 'true'); });
  $$('#gpm button').forEach(b => b.onclick = () => { $$('#gpm button').forEach(x => x.setAttribute('aria-pressed', x === b)); save('padMode', b.dataset.v); });
  $('#greset').onclick = async () => { const cur = await DB.get('roms', id); delete cur.prefs; await DB.put('roms', cur); Sfx.ok(); toast(t('gp.resetDone')); render(); };
}

function viewLang(view) {
  const cur = Settings.get('lang');
  view.innerHTML = `${topbar('#/settings')}<h1 class="title-xl">${esc(t('set.lang'))}</h1><div class="group" style="margin-top:16px">
    ${LANGS.map(l => `<button class="row ${l.code === cur ? 'selected' : ''}" data-l="${l.code}" ${l.code === cur ? 'aria-current="true"' : ''}><span class="flag">${l.flag}</span><span class="lbl" lang="${l.code === 'zht' ? 'zh-Hant' : l.code}" dir="${l.rtl ? 'rtl' : 'ltr'}">${esc(l.name)}</span>${l.code === cur ? `<span class="check">${ICON.check}</span>` : ''}</button>`).join('')}
  </div>`;
  bindBack(view);
  $$('[data-l]', view).forEach(b => b.onclick = () => { Sfx.toggle(true); Settings.set('lang', b.dataset.l); render(); });
}

const BG_PREVIEW = {
  vitrine: 'radial-gradient(80% 60% at 85% 0%, rgba(155,135,255,.5), transparent 60%), #15122a',
  sunset: 'linear-gradient(180deg, #1a0f3d, #8c2a6e 70%, #ff8a4a)',
  grid: 'linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px) 0 0/10px 10px, linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px) 0 0/10px 10px, #17142e',
  ocean: 'radial-gradient(70% 60% at 20% 0%, rgba(79,195,247,.55), transparent 65%), linear-gradient(180deg, #0c1f3d, #08142a)',
  aurora: 'radial-gradient(50% 50% at 15% 10%, rgba(91,224,176,.55), transparent 70%), radial-gradient(45% 50% at 85% 30%, rgba(155,135,255,.55), transparent 70%), #121027',
  plain: 'var(--bg)'
};
function viewDesign(view) {
  const bg = Settings.get('bg'), ic = Settings.get('icon');
  view.innerHTML = `${topbar('#/settings')}<h1 class="title-xl">${esc(t('set.bg'))}</h1>
    <div class="swatches" style="margin-top:16px">${Object.keys(BG_PREVIEW).map(k => `<button class="swatch" data-bg="${k}" aria-pressed="${bg === k}"><div class="pv" style="background:${BG_PREVIEW[k]}"></div>${esc(t('bg.' + k))}</button>`).join('')}</div>
    <h2 class="h2">${esc(t('set.icon'))}</h2>
    <div class="icons-grid">${Art.ICON_KEYS.map(k => `<button class="icon-pick" data-ic="${k}" aria-pressed="${ic === k}"><div class="ic">${Art.iconSVG(k, 72)}</div>${esc(t('ic.' + k))}</button>`).join('')}</div>
    <p class="muted small" style="margin:14px 4px">${esc(t('icon.note'))}</p>`;
  bindBack(view);
  $$('[data-bg]', view).forEach(b => b.onclick = () => { Sfx.tap(); Settings.set('bg', b.dataset.bg); render(); });
  $$('[data-ic]', view).forEach(b => b.onclick = () => { Sfx.tap(); Settings.set('icon', b.dataset.ic); render(); });
}

function viewPrivacy(view) {
  view.innerHTML = `${topbar('#/settings')}<h1 class="title-xl">${esc(t('set.privacy'))}</h1>
    <div class="group prose" style="margin-top:16px">${[1, 2, 3, 4, 5].map(i => `<p>${esc(t('priv.' + i))}</p>`).join('')}</div>`;
  bindBack(view);
}

const SOURCES = [
  ['EmulatorJS 4.2.3', 'Ethan O’Brien, allancoding & community', 'GPL-3.0', 'https://emulatorjs.org'],
  ['RetroArch / libretro', 'libretro-Team', 'GPL-3.0', 'https://www.libretro.com'],
  ['nipplejs', 'Yoann Moinet', 'MIT', 'https://github.com/yoannmoinet/nipplejs'],
  ['libunrar.js, 7-Zip (extract7z.js)', 'EmulatorJS community', 'unRAR / LGPL-2.1', ''],
  ['Azahar Web (3DS)', 'Azahar-Team, Shubin123', 'GPL-2.0', 'https://github.com/Shubin123/azahar_web'],
  ['Play! (PS2)', 'Jean-Philip Desjardins', 'BSD-2-Clause', 'https://github.com/jpd002/Play-'],
  ['wasm-dolphin (GameCube/Wii)', 'Dolphin Emulator Project, dougchansan', 'GPL-2.0+', 'https://github.com/dougchansan/wasm-dolphin (Commit 7e38409)'],
];
function viewSources(view) {
  const cores = [];
  SYSTEMS.forEach(s => s.cores.forEach(c => { if (c.id !== 'auto' && !cores.some(x => x.id === c.id)) cores.push(Object.assign({ systems: [] }, c)); }));
  SYSTEMS.forEach(s => s.cores.forEach(c => { const x = cores.find(y => y.id === c.id); if (x) x.systems.push(s.name); }));
  view.innerHTML = `${topbar('#/settings')}<h1 class="title-xl">${esc(t('set.sources'))}</h1>
    <p class="tagline">${esc(t('src.intro'))}</p>
    <div class="group">${SOURCES.map(([n, a, l, u]) => `<div class="src-item"><b>${esc(n)}</b><span>${esc(a)} – ${esc(t('src.license'))}: ${esc(l)}${u ? ' – ' + esc(u) : ''}</span></div>`).join('')}</div>
    <h3 class="h3">${esc(t('det.emulator'))}</h3>
    <div class="group">${cores.map(c => `<div class="src-item"><b>${esc(c.name)}</b><span>${esc(c.dev)} – ${esc(t('src.license'))}: ${esc(licLabel(c.license))}<br>${esc(c.systems.join(', '))}</span></div>`).join('')}</div>
    <p class="muted small" style="margin:14px 4px">${esc(t('src.art'))}</p>`;
  bindBack(view);
}

function viewAbout(view) {
  const made = t('about.madeBy', { name: '\u0000' }).split('\u0000');
  view.innerHTML = `${topbar('#/settings')}
    <div class="about-head"><div class="ic">${Art.iconSVG(Settings.get('icon'), 96)}</div><h1 class="title-xl">${APP.name}</h1>
      <div class="made-by">${esc(made[0])}<button class="kerem-btn" id="kerem">${APP.author}</button>${esc(made[1] || '')}</div></div>
    <div class="group" style="margin-top:20px">
      <div class="row"><span class="lbl">${esc(t('about.version'))}</span><span class="val">${APP.version}</span></div>
      <div class="row"><span class="lbl">${esc(t('about.date'))}</span><span class="val">${esc(fmtDate(new Date(APP.date + 'T12:00:00').getTime()))}</span></div>
      <div class="row"><span class="lbl">${esc(t('about.engine'))}</span><span class="val">EmulatorJS ${APP.ejs}</span></div>
    </div>
    <h3 class="h3">${esc(t('about.versions'))}</h3>
    <div class="group">
      <div class="src-item"><b>1.5.1 – ${esc(fmtDate(new Date('2026-11-19T12:00:00').getTime()))}</b><span>${esc(t('ver.9'))}</span></div>
      <div class="src-item"><b>1.5.0 – ${esc(fmtDate(new Date('2026-11-16T13:00:00').getTime()))}</b><span>${esc(t('ver.8'))}</span></div>
      <div class="src-item"><b>1.4.1 – ${esc(fmtDate(new Date('2026-11-16T12:00:00').getTime()))}</b><span>${esc(t('ver.7'))}</span></div>
      <div class="src-item"><b>1.4.0 – ${esc(fmtDate(new Date('2026-11-15T12:00:00').getTime()))}</b><span>${esc(t('ver.6'))}</span></div>
      <div class="src-item"><b>1.3.1 – ${esc(fmtDate(new Date('2026-11-15T12:00:00').getTime()))}</b><span>${esc(t('ver.5'))}</span></div>
      <div class="src-item"><b>1.3.0 – ${esc(fmtDate(new Date('2026-11-15T12:00:00').getTime()))}</b><span>${esc(t('ver.4'))}</span></div>
      <div class="src-item"><b>1.2.0 – ${esc(fmtDate(new Date('2026-11-15T12:00:00').getTime()))}</b><span>${esc(t('ver.3'))}</span></div>
      <div class="src-item"><b>1.1.0 – ${esc(fmtDate(new Date('2026-11-15T12:00:00').getTime()))}</b><span>${esc(t('ver.2'))}</span></div>
      <div class="src-item"><b>1.0.0 – ${esc(fmtDate(new Date('2026-11-15T12:00:00').getTime()))}</b><span>${esc(t('ver.1', { n: 32 }))}</span></div>
    </div>
    <div class="note" style="--dc:var(--gold);margin-top:18px">${esc(t('about.feedback'))}</div>`;
  bindBack(view);
  $('#kerem').onclick = keremSurprise;
}

function keremSurprise() {
  Sfx.jingle();
  const layer = document.createElement('div');
  layer.className = 'kerem-layer';
  const colors = ['#ff5ca8', '#ffc94a', '#5be0b0', '#9b87ff', '#5be0e6', '#ff7a45'];
  let hearts = '';
  for (let i = 0; i < 34; i++) {
    const a = (Math.PI * 2 * i) / 34 + Math.random() * 0.3, d = 140 + Math.random() * 260;
    const col = colors[i % colors.length];
    hearts += `<svg class="px-heart" viewBox="0 0 11 10" style="--x:${Math.cos(a) * d}px;--y:${Math.sin(a) * d}px;--s:${0.6 + Math.random() * 1.2};--r:${Math.round(Math.random() * 120 - 60)}deg;--d:${1.2 + Math.random() * 0.9}s;animation-delay:${Math.random() * 0.25}s" shape-rendering="crispEdges"><path fill="${col}" d="M2 0h2v1H2zM7 0h2v1H7zM1 1h4v1H1zM6 1h4v1H6zM0 2h11v3H0zM1 5h9v1H1zM2 6h7v1H2zM3 7h5v1H3zM4 8h3v1H4zM5 9h1v1H5z"/></svg>`;
  }
  const q = t('q.' + (1 + Math.floor(Math.random() * 5)));
  layer.innerHTML = `${hearts}<div class="kerem-card"><div class="avatar">${Art.iconSVG('heart', 84)}</div>
    <h3>${esc(t('kerem.hi'))}</h3><p>${esc(t('kerem.msg'))}</p><blockquote>${esc(q)}</blockquote>
    <button class="btn primary block">${esc(t('c.close'))}</button></div>`;
  document.body.appendChild(layer);
  const close = () => { Sfx.back(); layer.style.transition = 'opacity .2s'; layer.style.opacity = '0'; setTimeout(() => layer.remove(), 200); };
  $('.btn', layer).onclick = close;
  layer.onclick = e => { if (e.target === layer) close(); };
}

async function resetFlow() {
  Sfx.tap();
  const first = await confirmDlg(t('reset.t1'), t('reset.x1'), t('c.next'), true);
  if (!first) return;
  let timer;
  const ok = await dialog({
    title: t('reset.t2'), text: t('reset.x2'), icon: ICON.warn,
    buttons: [
      { label: t('c.cancel'), value: false },
      {
        label: t('reset.wait', { s: 5 }), value: true, kind: 'danger',
        setup: el => {
          let s = 5; el.disabled = true;
          timer = setInterval(() => {
            s--;
            if (s <= 0) { clearInterval(timer); el.disabled = false; el.textContent = t('reset.go'); Sfx.err(); }
            else { el.textContent = t('reset.wait', { s }); Sfx.tap(); }
          }, 1000);
        }
      }
    ]
  });
  clearInterval(timer);
  if (!ok) return;
  DB.close();
  let dbs = ['konsolarium', 'EmulatorJS-roms', 'EmulatorJS-bios', 'EmulatorJS-states', '/data/saves', 'azahar-web', 'dolphin-jit-cache'];
  try { if (indexedDB.databases) (await indexedDB.databases()).forEach(d => { if (d.name && !dbs.includes(d.name)) dbs.push(d.name); }); } catch (e) { /* älterer Browser */ }
  await Promise.all(dbs.map(n => new Promise(res => { const r = indexedDB.deleteDatabase(n); r.onsuccess = r.onerror = r.onblocked = () => res(); })));
  /* Kopien von 3DS-Spielen im privaten Dateisystem des Browsers */
  try {
    if (navigator.storage && navigator.storage.getDirectory) {
      const root = await navigator.storage.getDirectory();
      const names = []; for await (const k of root.keys()) names.push(k);
      for (const k of names) { try { await root.removeEntry(k, { recursive: true }); } catch (e) { /* egal */ } }
    }
  } catch (e) { /* nicht unterstützt */ }
  localStorage.clear();
  sessionStorage.clear();
  localStorage.setItem('ks.resetDone', '1');
  location.hash = '#/systems';
  location.reload();
}

/* Kleine Ergänzung für DB: Index, der evtl. fehlt (roms nach System) */
DB.byIndexSafe = async (store, field, value) => (await DB.all(store)).filter(x => x[field] === value);

/* ---------- Start ---------- */
(async function init() {
  document.body.insertAdjacentHTML('afterbegin', '<div id="bg"></div>');
  Settings.on(k => { if (k === 'lang') renderTabbar(); });
  await DB.open();
  if (localStorage.getItem('ks.resetDone')) { localStorage.removeItem('ks.resetDone'); setTimeout(() => toast(t('reset.done')), 500); }
  const rd = localStorage.getItem('ks.restoreDone');
  if (rd) { localStorage.removeItem('ks.restoreDone'); setTimeout(() => toast(t(rd === '2' ? 'bk.doneNoFiles' : 'bk.done'), null, rd === '2' ? 6000 : 2600), 500); }
  render();
  Updater.announce();
  const reg = await Updater.register();
  if (reg) setTimeout(() => Updater.auto(), 2500);
})();
