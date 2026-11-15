/* Konsolarium – GameCube/Wii-Adapter für wasm-dolphin:
   reicht die Disc aus der Dateiablage an die Mount-Funktion der Seite weiter. */
(async function () {
  'use strict';
  const B = window.KSBridge;
  if (!B || !B.romId) return;
  let res = null;
  try { res = await B.loadRom(); } catch (e) { /* unten behandelt */ }
  if (!res) { B.toast(B.L.notFound, 5000); return; }
  B.showStart(res.rom.name, async () => {
    try {
      await B.waitFor(() => typeof window.__ksMountFile === 'function', 60000);
      await window.__ksMountFile(res.file);
    } catch (e) {
      B.toast(String(e && e.message || e), 6000);
    }
  });
})();
