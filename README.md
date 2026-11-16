# Konsolarium

Eine Emulator-App für iPhone, iPad und den Browser. Die Konsolen sind als Zeitleiste nach Erscheinungsjahr geordnet, jede mit eigener Illustration. Alles läuft lokal auf dem Gerät, auch offline.

Mit ❤️ gemacht von Kerem.

## Funktionen

- **Zeitleiste** mit 41 Konsolen von 1977 bis 2012, gruppiert nach Jahrzehnt und Jahr, mit Suche und Filtern (Spielbar, Handhelds, Heimkonsolen, Computer, Hersteller)
- **32 spielbare Systeme** über EmulatorJS 4.2.3 (RetroArch-Kerne als WebAssembly), alle Kerne im Paket enthalten
- **Labor (ab 1.1.0):** 3DS über Azahar Web und PS2 über Play! (experimentell), GameCube und Wii über wasm-dolphin (nur PC, Chrome/Edge)
- **Dateiablage** für eigene ROMs: Import mehrerer Dateien, automatische Systemerkennung, Suche, Favoriten, Sortierung, Umbenennen, Export
- **BIOS-Verwaltung** pro Konsole (z. B. PS1, Mega-CD, Lynx, 3DO)
- **Speicherstände jederzeit**: Schnellspeichern, beliebig viele Slots mit Vorschaubild, automatisches Speichern beim Beenden, „Weiterspielen“
- **Sicherung (ab 1.2.0):** Speicherstände, Spielstände im Spiel (Batteriespeicher), Cheats und Einstellungen als eine `.ksbackup`-Datei sichern und auf jedem Gerät wiederherstellen, auf Wunsch mit ROMs und BIOS. Beim Wiederherstellen bleiben vorhandene Daten erhalten; Spiele ohne Datei lassen sich neu verknüpfen. Erinnerung nach 30 Tagen ohne Sicherung.
- **Bildschirm-Gamepad (ab 1.3.0):** eigene Tastenlayouts für alle Konsolen, 6 Skins (Konsolarium, Glas, Klassisch, Farbig, Neon, Minimal), Transparenz und Größe einstellbar, Tasten im Spiel frei verschieben und vergrößern (je Konsole, Hoch- und Querformat getrennt), automatisch ausgeblendet bei verbundenem Controller
- **Zurückspulen** (Taste ⏪ halten) für 8-/16-Bit-Konsolen und Game Boy (Advance)
- **Autospeichern** während des Spielens im wählbaren Intervall (1–15 Min.), die letzten 3 automatischen Stände bleiben
- **Speicherstände benennen**, **Spielzeit** je Spiel (auch in den Labor-Emulatoren), **Weiterspielen**-Reihe auf der Startseite
- **Cover**: eigenes Bild je Spiel (Fotos/Dateien) oder mehrere Bilder auf einmal importieren – der Dateiname muss wie das Spiel heißen
- **Bildschirmfotos** pixelgenau vergrößert in Fotos sichern
- **Gehäuse-Skins (ab 1.4.0):** 6 eigene Entwürfe im Handheld-Stil (Kreide, Kobalt, Koralle, Graphit, Salbei, Mitternacht) mit plastischen Tasten – Spielbild oben, Gehäuse darunter bzw. seitlich im Querformat
- **Eigene Skin-Bilder:** je Konsole ein Bild für Hoch- und Querformat, Tasten wahlweise unsichtbar und frei auf das Bild verschiebbar
- **Skin je Konsole und je Spiel**
- **Gesten mit zwei Fingern:** nach rechts wischen = Vorspulen, nach links wischen und halten = Zurückspulen, zweimal tippen = Schnellspeichern
- **Zwei Spieler** (bis vier) mit Bluetooth-Controllern, Zuordnung im Spielmenü
- **Einstellungen pro Spiel:** Skin, Vorspul-Tempo, Autospeichern, Zurückspulen, Bildschirmtasten
- **Emulatoren verwalten:** einzeln laden oder löschen, Speicherbedarf je Emulator
- **Anleitung (ab 1.4.1):** alle Funktionen kurz erklärt, als aufklappbare Themen in den Einstellungen
- **Statistik:** Gesamtspielzeit, letzte 14 Tage, meistgespielte Spiele und Konsolen, Speicher
- **Vorspulen** mit 1,5× bis 8×
- **Cheats** (GameShark, Action Replay, Game Genie usw.) in den Einstellungen und direkt im Spiel
- Hoch- und Querformat, Zoomen deaktiviert
- **Einstellungen**: Spielton und Klicksounds, 6 Hintergründe, 5 App-Icons, Dunkelmodus (System/Hell/Dunkel), 13 Sprachen mit Flaggen, Datenschutz, Quellenangaben, Auto-Update (abschaltbar) plus manuelle Prüfung, Über-Seite, App zurücksetzen mit Sicherheits-Timer
- **Offline**: Service Worker hält die App bereit; Emulatoren werden beim ersten Spielstart geladen oder unter „Emulatoren verwalten“ vorab (einzeln oder alle)

## Konsolen

| Jahr | Konsole | Hersteller | Emulator | Status |
|---|---|---|---|---|
| 1977 | Atari 2600 | Atari | Stella 2014 | spielbar |
| 1981 | MS-DOS-PC | IBM / Microsoft | DOSBox Pure | experimentell |
| 1982 | Atari 5200 | Atari | a5200 | spielbar (BIOS nötig) |
| 1982 | ColecoVision | Coleco | Gearcoleco | spielbar (BIOS nötig) |
| 1982 | Commodore 64 | Commodore | VICE x64sc | spielbar |
| 1982 | ZX Spectrum | Sinclair | Fuse | spielbar |
| 1983 | NES / Famicom | Nintendo | FCEUmm, Nestopia UE | spielbar |
| 1984 | Amstrad / Schneider CPC | Amstrad | Caprice32 | spielbar |
| 1985 | Commodore Amiga | Commodore | PUAE | spielbar |
| 1985 | Master System | Sega | SMS Plus GX | spielbar |
| 1986 | Atari 7800 | Atari | ProSystem | spielbar |
| 1987 | PC Engine / TurboGrafx-16 | NEC | Beetle PCE | spielbar |
| 1988 | Mega Drive / Genesis | Sega | Genesis Plus GX | spielbar |
| 1989 | Atari Lynx | Atari | Handy | spielbar (BIOS nötig) |
| 1989 | Game Boy | Nintendo | Gambatte | spielbar |
| 1990 | Game Gear | Sega | Genesis Plus GX | spielbar |
| 1990 | Neo Geo & Arcade | SNK | FinalBurn Neo | spielbar |
| 1990 | SNES / Super Famicom | Nintendo | Snes9x | spielbar |
| 1991 | Mega-CD / Sega CD | Sega | Genesis Plus GX | spielbar (BIOS nötig) |
| 1993 | 3DO | Panasonic | Opera | spielbar (BIOS nötig) |
| 1993 | Atari Jaguar | Atari | Virtual Jaguar | experimentell |
| 1994 | PlayStation | Sony | PCSX ReARMed | spielbar |
| 1994 | Sega 32X | Sega | PicoDrive | spielbar |
| 1994 | Sega Saturn | Sega | Yabause | experimentell |
| 1995 | Virtual Boy | Nintendo | Beetle VB | spielbar |
| 1996 | Nintendo 64 | Nintendo | Mupen64Plus-Next, ParaLLEl N64 | spielbar |
| 1998 | Dreamcast | Sega | Flycast (PC/Android/iOS), Redream (PC/Android) | nur native App |
| 1998 | Game Boy Color | Nintendo | Gambatte | spielbar |
| 1998 | Neo Geo Pocket Color | SNK | Beetle NeoPop | spielbar |
| 1999 | WonderSwan Color | Bandai | Beetle Cygne | spielbar |
| 2000 | PlayStation 2 | Sony | PCSX2 (PC), NetherSX2 / ARMSX2 (Android), Play! (iOS) | nur native App |
| 2001 | Game Boy Advance | Nintendo | mGBA | spielbar |
| 2001 | GameCube | Nintendo | Dolphin (PC/Android), DolphiniOS (iOS, JIT) | nur native App |
| 2001 | Xbox | Microsoft | xemu (PC) | nur native App |
| 2004 | Nintendo DS | Nintendo | DeSmuME 2015, melonDS | spielbar |
| 2004 | PlayStation Portable | Sony | PPSSPP | experimentell |
| 2006 | PlayStation 3 | Sony | RPCS3 (PC) | nur native App |
| 2006 | Wii | Nintendo | Dolphin (PC/Android) | nur native App |
| 2011 | Nintendo 3DS | Nintendo | Azahar (PC/Android), Folium (iOS) | nur native App |
| 2011 | PlayStation Vita | Sony | Vita3K (PC/Android) | nur native App |
| 2012 | Wii U | Nintendo | Cemu (PC/Android) | nur native App |

**Labor-Systeme (externe Browser-Emulatoren im Ordner `labs/`):**

| System | Emulator | Hinweis |
|---|---|---|
| Nintendo 3DS | Azahar Web (Shubin123, auf Basis von Azahar/Citra) | experimentell, entschlüsselte Dumps nötig, laut Projekt Safari ab iOS 16.4 |
| PlayStation 2 | Play! (Jean-Philip Desjardins), offizielle WebAssembly-Version | experimentell, kein BIOS nötig, auf dem iPhone sehr langsam |
| GameCube, Wii | wasm-dolphin (dougchansan, auf Basis von Dolphin) | nur Chrome/Edge am PC (WebGPU, viel RAM) |

Die Oberflächen von Azahar Web und wasm-dolphin sind englisch und haben eigene Speicherstände. Aus Azahar Web wurden die eingebaute „Shared Game Library“ (Downloads von archive.org), der KI-Spieler und die Online-Lobbys entfernt.

**Dreamcast, Xbox, PS3, PS Vita, Wii U:** Dafür gibt es noch keinen Browser-Emulator. Sie stehen mit Infos und empfohlenen nativen Apps in der Zeitleiste.

## Hinweise

- Nur ROMs und BIOS-Dateien verwenden, die du rechtmäßig besitzt (z. B. Sicherungen deiner eigenen Module und Discs).
- ROMs, BIOS, Speicherstände und Cheats liegen nur im Browser-Speicher (IndexedDB) dieses Geräts. Auf dem iPhone die App unbedingt über „Zum Home-Bildschirm“ installieren: In Safari löscht iOS die Daten einer Seite nach 7 Tagen ohne Besuch. Regelmäßig eine Sicherung erstellen.
- Spielstände im Spiel bei 3DS, PS2, GameCube und Wii bleiben derzeit nur erhalten, solange das Spiel läuft (die Labor-Emulatoren speichern nur im Arbeitsspeicher). Speicherstände von Azahar (3DS) werden mitgesichert.
- PSP und DOS brauchen „SharedArrayBuffer“. Die App aktiviert das über ihren Service Worker; beim allerersten Start dieser Systeme lädt die Seite einmal neu.

## Aufbau

```
index.html          Hauptoberfläche (Zeitleiste, Bibliothek, Spielstände, Einstellungen)
play.html           Spieler
sw.js               Service Worker (Offline, Updates, COOP/COEP)
version.json        Versionsnummer + Dateiliste für Updates
manifest.webmanifest
css/                Gestaltung
js/i18n.js          Übersetzungen (13 Sprachen)
js/common.js        Einstellungen, Datenbank, Sounds, Updates
js/backup.js        Sicherung und Wiederherstellung (.ksbackup)
js/pad.js           Bildschirm-Gamepad (Layouts, Skins, Anordnen)
css/pad.css         Gestaltung des Gamepads und der Skins
js/systems.js       Konsolen- und Emulator-Daten
js/art.js           Eigene SVG-Illustrationen und App-Icons
js/app.js           Oberfläche
js/play.js          Spieler-Logik
icons/              App-Icons (PNG)
emulatorjs/         EmulatorJS 4.2.3 mit allen Kernen
labs/ks-bridge.js   Brücke: lädt die ROM aus der Dateiablage in die Labor-Emulatoren
labs/3ds/           Azahar Web (bereinigt) + ks-3ds.js
labs/ps2/           Play! (Play.js/Play.wasm) + eigener Spieler (ps2.js)
labs/dolphin/       wasm-dolphin (Commit 7e38409) + ks-dolphin.js
```

Für ein Update die Versionsnummer in `js/common.js` (APP.version) **und** in `version.json` erhöhen.

## Lizenzen

- EmulatorJS: GPL-3.0 (`emulatorjs/LICENSE.txt`)
- Azahar Web / Azahar: GPL-2.0 – Quelltext: github.com/Shubin123/azahar_web und github.com/azahar-emu/azahar
- Play!: BSD-2-Clause (`labs/ps2/License.txt`) – Quelltext: github.com/jpd002/Play-
- wasm-dolphin / Dolphin: GPL-2.0-or-later (`labs/dolphin/LICENSE`) – Quelltext des enthaltenen Kerns: github.com/dougchansan/wasm-dolphin, Commit 7e38409 (Dolphin e22551ea + Patches)
- Emulator-Kerne: jeweilige Lizenzen (GPL-2.0, GPL-3.0, MPL-2.0, zlib, teils nicht-kommerziell: Snes9x, Genesis Plus GX, PicoDrive, FinalBurn Neo), Details in der App unter Einstellungen → Quellenangaben
- Konsolen-Illustrationen und App-Icons sind eigene Zeichnungen. Marken gehören ihren Inhabern.
