/* Konsolarium – 3DS-Adapter für Azahar Web:
   übergibt die ROM aus der Dateiablage an das Dateifeld des Emulators
   und startet nach einem Tippen (Ton braucht eine Benutzergeste). */
(async function () {
  'use strict';
  const B = window.KSBridge;
  if (!B || !B.romId) return;
  let res = null;
  try { res = await B.loadRom(); } catch (e) { /* unten behandelt */ }
  if (!res) { B.toast(B.L.notFound, 5000); return; }

  const input = document.getElementById('rom-file');
  const loadBtn = document.getElementById('btn-load');
  try {
    const dt = new DataTransfer();
    dt.items.add(res.file);
    input.files = dt.files;
    input.dispatchEvent(new Event('change', { bubbles: true }));
  } catch (e) {
    B.toast(String(e && e.message || e), 6000);
    return;
  }

  B.showStart(res.rom.name, async () => {
    try {
      await B.waitFor(() => loadBtn && !loadBtn.disabled, 180000);
      loadBtn.click();
      const stage = document.getElementById('screen-stage');
      if (stage) stage.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (e) {
      B.toast(B.L.notFound, 5000);
    }
  });
})();
