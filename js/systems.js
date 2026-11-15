/* Konsolarium – Konsolen- und Emulator-Datenbank
   Sortierung erfolgt nach Erscheinungsjahr (year).
   status: ready = spielbar, bios = BIOS nötig, exp = experimentell, native = nur als native App
   art: Parameter für die eigenen SVG-Illustrationen (siehe art.js) */

const SYSTEMS = [
  {
    id: 'atari2600', name: 'Atari 2600', maker: 'Atari', year: 1977, type: 'console', bits: 8, gen: 2,
    status: 'ready', ejs: 'atari2600',
    cores: [{ id: 'stella2014', name: 'Stella 2014', dev: 'Bradford Mott, Stephen Anthony', license: 'GPL-2.0' }],
    ext: ['a26', 'bin'], bios: null, cheats: [], native: ['Stella (PC)', 'RetroArch'],
    art: { form: 'box', lid: 'cart-top', ctrl: 'joystick', c: ['#2b2420', '#1a1512', '#c47a3a', '#e8b04a'], wood: true }
  },
  {
    id: 'a5200', name: 'Atari 5200', maker: 'Atari', year: 1982, type: 'console', bits: 8, gen: 2,
    status: 'bios', ejs: 'atari5200',
    cores: [{ id: 'a5200', name: 'a5200', dev: 'Atari800-Team, libretro', license: 'GPL-2.0' }],
    ext: ['a52', 'bin'], bios: { required: true, files: ['5200.rom'] }, cheats: [], native: ['Atari800 (PC)', 'RetroArch'],
    art: { form: 'box', lid: 'cart-top', ctrl: 'rect', c: ['#24232a', '#141318', '#b9b4c7', '#d8c060'], wide: true }
  },
  {
    id: 'coleco', name: 'ColecoVision', maker: 'Coleco', year: 1982, type: 'console', bits: 8, gen: 2,
    status: 'bios', ejs: 'coleco',
    cores: [{ id: 'gearcoleco', name: 'Gearcoleco', dev: 'Ignacio Sánchez (drhelius)', license: 'GPL-3.0' }],
    ext: ['col', 'cv', 'bin', 'rom'], bios: { required: true, files: ['colecovision.rom'] }, cheats: [], native: ['Gearcoleco (PC)', 'RetroArch'],
    art: { form: 'box', lid: 'cart-top', ctrl: 'rect', c: ['#1f2024', '#111216', '#4aa8d8', '#e0c050'] }
  },
  {
    id: 'c64', name: 'Commodore 64', maker: 'Commodore', year: 1982, type: 'computer', bits: 8, gen: 0,
    status: 'ready', ejs: 'c64',
    cores: [{ id: 'vice_x64sc', name: 'VICE x64sc', dev: 'VICE-Team', license: 'GPL-2.0' }],
    ext: ['d64', 't64', 'tap', 'prg', 'crt', 'g64', 'd71', 'd81'], bios: null, cheats: [], native: ['VICE (PC)', 'RetroArch'],
    art: { form: 'breadbin', c: ['#cbbfa8', '#a69a84', '#6b5e4e', '#7a6aa0'] }
  },
  {
    id: 'zxs', name: 'ZX Spectrum', maker: 'Sinclair', year: 1982, type: 'computer', bits: 8, gen: 0,
    status: 'ready', ejs: 'fuse',
    cores: [{ id: 'fuse', name: 'Fuse', dev: 'Philip Kendall', license: 'GPL-3.0' }],
    ext: ['tzx', 'tap', 'z80', 'sna', 'scl', 'trd', 'rzx'], bios: null, cheats: [], native: ['Fuse (PC)', 'RetroArch'],
    art: { form: 'keyboard', c: ['#1d1d22', '#0f0f12', '#e44a4a', '#3ea8ff'], rainbow: true }
  },
  {
    id: 'dos', name: 'MS-DOS-PC', maker: 'IBM / Microsoft', year: 1981, type: 'computer', bits: 16, gen: 0,
    status: 'exp', ejs: 'dos', threads: true,
    cores: [{ id: 'dosbox_pure', name: 'DOSBox Pure', dev: 'Bernhard Schelling', license: 'GPL-2.0' }],
    ext: ['zip', 'dosz', 'exe', 'com', 'bat', 'iso', 'cue', 'img', 'ima', 'vhd'], bios: null, cheats: [], native: ['DOSBox Staging (PC)', 'DOSBox Pure (RetroArch)'],
    art: { form: 'pc', c: ['#d9d3c4', '#b3ac9c', '#3d3a34', '#43d17a'] }
  },
  {
    id: 'nes', name: 'NES / Famicom', maker: 'Nintendo', year: 1983, type: 'console', bits: 8, gen: 3,
    status: 'ready', ejs: 'nes',
    cores: [
      { id: 'fceumm', name: 'FCEUmm', dev: 'Bero, Xodnizel, CaH4e3', license: 'GPL-2.0' },
      { id: 'nestopia', name: 'Nestopia UE', dev: 'Martin Freij, R. Danbrook', license: 'GPL-2.0' }
    ],
    ext: ['nes', 'fds', 'unf', 'unif'], bios: { required: false, files: ['disksys.rom'], hint: 'fds' }, cheats: ['Game Genie', 'Pro Action Rocky'], native: ['Delta (iOS)', 'Mesen (PC)', 'RetroArch'],
    art: { form: 'box', lid: 'front-door', ctrl: 'rect', c: ['#cfcbc4', '#8e8a85', '#c8242f', '#3a3a3a'] }
  },
  {
    id: 'cpc', name: 'Amstrad / Schneider CPC', maker: 'Amstrad', year: 1984, type: 'computer', bits: 8, gen: 0,
    status: 'ready', ejs: 'cap32',
    cores: [{ id: 'cap32', name: 'Caprice32', dev: 'Ulrich Doewich, libretro', license: 'GPL-2.0' }],
    ext: ['dsk', 'sna', 'tap', 'cdt', 'voc', 'm3u', 'cpr'], bios: null, cheats: [], native: ['Caprice32 (PC)', 'RetroArch'],
    art: { form: 'keyboard', c: ['#2c2c33', '#18181c', '#e04848', '#4cc36a'], rainbow: false, keyAccent: true }
  },
  {
    id: 'segaMS', name: 'Master System', maker: 'Sega', year: 1985, type: 'console', bits: 8, gen: 3,
    status: 'ready', ejs: 'segaMS',
    cores: [{ id: 'smsplus', name: 'SMS Plus GX', dev: 'Charles MacDonald, Eke-Eke', license: 'GPL-2.0' }],
    ext: ['sms', 'sg', 'bin'], bios: null, cheats: ['Game Genie', 'Pro Action Replay'], native: ['Genesis Plus GX (RetroArch)'],
    art: { form: 'box', lid: 'cart-top', ctrl: 'rect', c: ['#1d1d22', '#0e0e11', '#d8263a', '#7d7d86'], angular: true }
  },
  {
    id: 'amiga', name: 'Commodore Amiga', maker: 'Commodore', year: 1985, type: 'computer', bits: 16, gen: 0,
    status: 'ready', ejs: 'amiga',
    cores: [{ id: 'puae', name: 'PUAE', dev: 'UAE-Team, libretro', license: 'GPL-2.0' }],
    ext: ['adf', 'adz', 'dms', 'fdi', 'ipf', 'hdf', 'hdz', 'lha', 'slave', 'info', 'cue', 'ccd', 'chd', 'm3u', 'zip'],
    bios: { required: false, files: ['kick34005.A500', 'kick40063.A600', 'kick40068.A1200'], hint: 'aros' }, cheats: [], native: ['FS-UAE / Amiberry (PC)', 'RetroArch'],
    art: { form: 'keyboard', c: ['#e8e3d6', '#c4beaf', '#5a5650', '#e04040'], drive: true }
  },
  {
    id: 'atari7800', name: 'Atari 7800', maker: 'Atari', year: 1986, type: 'console', bits: 8, gen: 3,
    status: 'ready', ejs: 'atari7800',
    cores: [{ id: 'prosystem', name: 'ProSystem', dev: 'Greg Stanton, libretro', license: 'GPL-2.0' }],
    ext: ['a78', 'bin'], bios: { required: false, files: ['7800 BIOS (U).rom'] }, cheats: [], native: ['RetroArch'],
    art: { form: 'box', lid: 'cart-top', ctrl: 'joystick', c: ['#1e1e24', '#101014', '#c0c0c8', '#e4b03a'], angular: true }
  },
  {
    id: 'pce', name: 'PC Engine / TurboGrafx-16', maker: 'NEC', year: 1987, type: 'console', bits: 16, gen: 4,
    status: 'ready', ejs: 'pce',
    cores: [{ id: 'mednafen_pce', name: 'Beetle PCE', dev: 'Mednafen-Team, libretro', license: 'GPL-2.0' }],
    ext: ['pce', 'cue', 'ccd', 'chd', 'toc', 'm3u'], bios: { required: false, files: ['syscard3.pce'], hint: 'cd' }, cheats: [], native: ['Mednafen (PC)', 'RetroArch'],
    art: { form: 'box', lid: 'card', ctrl: 'rect', c: ['#ece9e2', '#c9c5bc', '#ff7a1a', '#3a3a3a'], small: true }
  },
  {
    id: 'segaMD', name: 'Mega Drive / Genesis', maker: 'Sega', year: 1988, type: 'console', bits: 16, gen: 4,
    status: 'ready', ejs: 'segaMD',
    cores: [{ id: 'genesis_plus_gx', name: 'Genesis Plus GX', dev: 'Charles MacDonald, Eke-Eke', license: 'NC' }],
    ext: ['md', 'gen', 'smd', 'bin', '68k', 'sgd'], bios: null, cheats: ['Game Genie', 'Pro Action Replay'], native: ['Genesis Plus GX (RetroArch)', 'Delta (iOS)'],
    art: { form: 'box', lid: 'cart-round', ctrl: 'bone', c: ['#1b1b1f', '#0b0b0d', '#e33', '#b8b8c0'] }
  },
  {
    id: 'gb', name: 'Game Boy', maker: 'Nintendo', year: 1989, type: 'handheld', bits: 8, gen: 4,
    status: 'ready', ejs: 'gb',
    cores: [{ id: 'gambatte', name: 'Gambatte', dev: 'Sindre Aamås', license: 'GPL-2.0' }],
    ext: ['gb', 'dmg'], bios: null, cheats: ['Game Genie', 'GameShark'], native: ['Delta (iOS)', 'SameBoy (PC)', 'RetroArch'],
    art: { form: 'handheld-v', c: ['#c9c6bd', '#9c9990', '#8c2a5a', '#8bac0f'], screenDark: '#306230' }
  },
  {
    id: 'lynx', name: 'Atari Lynx', maker: 'Atari', year: 1989, type: 'handheld', bits: 8, gen: 4,
    status: 'bios', ejs: 'lynx',
    cores: [{ id: 'handy', name: 'Handy', dev: 'Keith Wilkins, libretro', license: 'zlib' }],
    ext: ['lnx', 'o'], bios: { required: true, files: ['lynxboot.img'] }, cheats: [], native: ['Mednafen (PC)', 'RetroArch'],
    art: { form: 'handheld-h', c: ['#2a2a30', '#18181c', '#e8a33a', '#3ab0e0'], long: true }
  },
  {
    id: 'snes', name: 'SNES / Super Famicom', maker: 'Nintendo', year: 1990, type: 'console', bits: 16, gen: 4,
    status: 'ready', ejs: 'snes',
    cores: [{ id: 'snes9x', name: 'Snes9x', dev: 'Gary Henderson, Jerremy Koot', license: 'NC' }],
    ext: ['smc', 'sfc', 'swc', 'fig', 'bs', 'st'], bios: null, cheats: ['Game Genie', 'Pro Action Replay'], native: ['Delta (iOS)', 'bsnes / Snes9x (PC)', 'RetroArch'],
    art: { form: 'box', lid: 'cart-top', ctrl: 'bone', c: ['#d6d3dc', '#a9a5b3', '#6a4fb3', '#4a4560'], rounded: true }
  },
  {
    id: 'segaGG', name: 'Game Gear', maker: 'Sega', year: 1990, type: 'handheld', bits: 8, gen: 4,
    status: 'ready', ejs: 'segaGG',
    cores: [{ id: 'genesis_plus_gx', name: 'Genesis Plus GX', dev: 'Charles MacDonald, Eke-Eke', license: 'NC' }],
    ext: ['gg'], bios: null, cheats: ['Game Genie', 'Pro Action Replay'], native: ['Genesis Plus GX (RetroArch)'],
    art: { form: 'handheld-h', c: ['#26262c', '#141417', '#3a6ad8', '#5aa8ff'] }
  },
  {
    id: 'arcade', name: 'Neo Geo & Arcade', maker: 'SNK', year: 1990, type: 'arcade', bits: 16, gen: 4,
    status: 'ready', ejs: 'arcade',
    cores: [{ id: 'fbneo', name: 'FinalBurn Neo', dev: 'FBNeo-Team', license: 'NC' }],
    ext: ['zip', '7z'], bios: { required: false, files: ['neogeo.zip'], hint: 'neogeo' }, cheats: [], native: ['FinalBurn Neo (RetroArch)', 'MAME (PC)'],
    art: { form: 'arcade', c: ['#2a1f4a', '#17112c', '#ffcf40', '#ff4fa3'] }
  },
  {
    id: 'segaCD', name: 'Mega-CD / Sega CD', maker: 'Sega', year: 1991, type: 'addon', bits: 16, gen: 4,
    status: 'bios', ejs: 'segaCD',
    cores: [{ id: 'genesis_plus_gx', name: 'Genesis Plus GX', dev: 'Charles MacDonald, Eke-Eke', license: 'NC' }],
    ext: ['cue', 'iso', 'chd', 'm3u'], bios: { required: true, files: ['bios_CD_E.bin', 'bios_CD_U.bin', 'bios_CD_J.bin'], any: true }, cheats: ['Pro Action Replay'], native: ['Genesis Plus GX (RetroArch)'],
    art: { form: 'box', lid: 'disc-tray', ctrl: 'bone', c: ['#1b1b1f', '#0b0b0d', '#3a7ae0', '#b8b8c0'] }
  },
  {
    id: '3do', name: '3DO', maker: 'Panasonic', year: 1993, type: 'console', bits: 32, gen: 5,
    status: 'bios', ejs: '3do',
    cores: [{ id: 'opera', name: 'Opera', dev: 'FreeDO-Team, libretro', license: 'LGPL-2.1 / NC' }],
    ext: ['iso', 'bin', 'chd', 'cue'], bios: { required: true, files: ['panafz10.bin', 'panafz1.bin', 'panafz10-norsa.bin', 'goldstar.bin'], any: true }, cheats: [], native: ['Opera (RetroArch)'],
    art: { form: 'box', lid: 'disc-tray', ctrl: 'bone', c: ['#2a2a30', '#141418', '#e0b030', '#d03030'], wide: true }
  },
  {
    id: 'jaguar', name: 'Atari Jaguar', maker: 'Atari', year: 1993, type: 'console', bits: 64, gen: 5,
    status: 'exp', ejs: 'jaguar',
    cores: [{ id: 'virtualjaguar', name: 'Virtual Jaguar', dev: 'James Hammons', license: 'GPL-3.0' }],
    ext: ['j64', 'jag', 'rom', 'abs', 'cof', 'bin', 'prg'], bios: null, cheats: [], native: ['BigPEmu (PC)'],
    art: { form: 'box', lid: 'cart-top', ctrl: 'bone', c: ['#151518', '#08080a', '#d02020', '#7a7a80'], rounded: true }
  },
  {
    id: 'sega32x', name: 'Sega 32X', maker: 'Sega', year: 1994, type: 'addon', bits: 32, gen: 5,
    status: 'ready', ejs: 'sega32x',
    cores: [{ id: 'picodrive', name: 'PicoDrive', dev: 'notaz, fDave', license: 'NC' }],
    ext: ['32x', 'bin', 'md', 'smd', 'gen'], bios: null, cheats: ['Game Genie', 'Pro Action Replay'], native: ['PicoDrive (RetroArch)'],
    art: { form: 'box', lid: 'mushroom', ctrl: 'bone', c: ['#1b1b1f', '#0b0b0d', '#e8c020', '#b8b8c0'] }
  },
  {
    id: 'segaSaturn', name: 'Sega Saturn', maker: 'Sega', year: 1994, type: 'console', bits: 32, gen: 5,
    status: 'exp', ejs: 'segaSaturn',
    cores: [{ id: 'yabause', name: 'Yabause', dev: 'Yabause-Team', license: 'GPL-2.0' }],
    ext: ['cue', 'iso', 'chd', 'ccd', 'mds', 'm3u'], bios: { required: false, files: ['saturn_bios.bin'] }, cheats: [], native: ['Yaba Sanshiro (Android)', 'Ymir / Mednafen (PC)'],
    art: { form: 'box', lid: 'disc-round', ctrl: 'bone', c: ['#3d3d44', '#25252a', '#4a88e8', '#c8c8d0'] }
  },
  {
    id: 'psx', name: 'PlayStation', maker: 'Sony', year: 1994, type: 'console', bits: 32, gen: 5,
    status: 'ready', ejs: 'psx',
    cores: [{ id: 'pcsx_rearmed', name: 'PCSX ReARMed', dev: 'notaz, PCSX-Team', license: 'GPL-2.0' }],
    ext: ['cue', 'bin', 'iso', 'chd', 'pbp', 'img', 'mdf', 'toc', 'ccd', 'm3u', 'exe'],
    bios: { required: false, files: ['scph5501.bin', 'scph5500.bin', 'scph5502.bin', 'scph1001.bin'], hint: 'hle' }, cheats: ['GameShark'], native: ['DuckStation (PC/Android)', 'RetroArch (iOS)'],
    art: { form: 'box', lid: 'disc-round', ctrl: 'bone', c: ['#c9c6c2', '#9c9893', '#3f6fd0', '#d23c3c'], grey: true }
  },
  {
    id: 'vb', name: 'Virtual Boy', maker: 'Nintendo', year: 1995, type: 'handheld', bits: 32, gen: 5,
    status: 'ready', ejs: 'vb',
    cores: [{ id: 'beetle_vb', name: 'Beetle VB', dev: 'Mednafen-Team, libretro', license: 'GPL-2.0' }],
    ext: ['vb', 'vboy', 'bin'], bios: null, cheats: [], native: ['RetroArch'],
    art: { form: 'visor', c: ['#b81e2a', '#7a1018', '#1a1a1e', '#ff3b3b'] }
  },
  {
    id: 'n64', name: 'Nintendo 64', maker: 'Nintendo', year: 1996, type: 'console', bits: 64, gen: 5,
    status: 'ready', ejs: 'n64',
    cores: [
      { id: 'auto', name: 'Auto', dev: '', license: '' },
      { id: 'mupen64plus_next', name: 'Mupen64Plus-Next', dev: 'Mupen64Plus-Team, libretro', license: 'GPL-2.0' },
      { id: 'parallel_n64', name: 'ParaLLEl N64', dev: 'Themaister, libretro', license: 'GPL-2.0' }
    ],
    ext: ['n64', 'z64', 'v64'], bios: null, cheats: ['GameShark'], native: ['Delta (iOS)', 'simple64 / RMG (PC)', 'M64Plus FZ (Android)'],
    art: { form: 'box', lid: 'cart-top', ctrl: 'trident', c: ['#3a3a40', '#222226', '#2a7a3a', '#d8b020'], n64: true }
  },
  {
    id: 'gbc', name: 'Game Boy Color', maker: 'Nintendo', year: 1998, type: 'handheld', bits: 8, gen: 5,
    status: 'ready', ejs: 'gb',
    cores: [{ id: 'gambatte', name: 'Gambatte', dev: 'Sindre Aamås', license: 'GPL-2.0' }],
    ext: ['gbc', 'cgb'], bios: null, cheats: ['Game Genie', 'GameShark'], native: ['Delta (iOS)', 'SameBoy (PC)', 'RetroArch'],
    art: { form: 'handheld-v', c: ['#7b3fe4', '#5426a8', '#ffd84a', '#5ec8ff'], compact: true, translucent: true }
  },
  {
    id: 'ngp', name: 'Neo Geo Pocket Color', maker: 'SNK', year: 1998, type: 'handheld', bits: 16, gen: 5,
    status: 'ready', ejs: 'ngp',
    cores: [{ id: 'mednafen_ngp', name: 'Beetle NeoPop', dev: 'Mednafen-Team, libretro', license: 'GPL-2.0' }],
    ext: ['ngp', 'ngc', 'ngpc', 'npc'], bios: null, cheats: [], native: ['RetroArch'],
    art: { form: 'handheld-h', c: ['#3fb7c9', '#21899a', '#f2f2f2', '#9ae0ff'], stick: true }
  },
  {
    id: 'dreamcast', name: 'Dreamcast', maker: 'Sega', year: 1998, type: 'console', bits: 128, gen: 6,
    status: 'native', ejs: null, cores: [],
    ext: ['gdi', 'cdi', 'chd'], bios: null, cheats: [], native: ['Flycast (PC/Android/iOS)', 'Redream (PC/Android)'],
    art: { form: 'box', lid: 'disc-round', ctrl: 'bone', c: ['#ece9e4', '#c6c2bb', '#f07a1a', '#9a9a9a'], rounded: true }
  },
  {
    id: 'ws', name: 'WonderSwan Color', maker: 'Bandai', year: 1999, type: 'handheld', bits: 16, gen: 5,
    status: 'ready', ejs: 'ws',
    cores: [{ id: 'mednafen_wswan', name: 'Beetle Cygne', dev: 'Mednafen-Team, libretro', license: 'GPL-2.0' }],
    ext: ['ws', 'wsc', 'pc2'], bios: null, cheats: [], native: ['Mednafen (PC)', 'RetroArch'],
    art: { form: 'handheld-h', c: ['#e9e4f2', '#bdb5cf', '#2d7ad8', '#c0f0d0'], thin: true }
  },
  {
    id: 'ps2', name: 'PlayStation 2', maker: 'Sony', year: 2000, type: 'console', bits: 128, gen: 6,
    status: 'exp', ejs: null, lab: 'ps2',
    cores: [{ id: 'play', name: 'Play!', dev: 'Jean-Philip Desjardins', license: 'BSD-2-Clause' }],
    ext: ['iso', 'chd', 'cso', 'isz', 'bin', 'elf'], bios: null, cheats: [], native: ['PCSX2 (PC)', 'NetherSX2 / ARMSX2 (Android)', 'Play! (iOS)'],
    art: { form: 'slim-v', c: ['#1d1e26', '#0c0d12', '#3a5bd8', '#2b2c38'] }
  },
  {
    id: 'gba', name: 'Game Boy Advance', maker: 'Nintendo', year: 2001, type: 'handheld', bits: 32, gen: 6,
    status: 'ready', ejs: 'gba',
    cores: [{ id: 'mgba', name: 'mGBA', dev: 'Vicki Pfau (endrift)', license: 'MPL-2.0' }],
    ext: ['gba', 'agb', 'srl'], bios: { required: false, files: ['gba_bios.bin'] }, cheats: ['GameShark', 'Action Replay', 'CodeBreaker'], native: ['Delta (iOS)', 'mGBA (PC/Android)'],
    art: { form: 'handheld-h', c: ['#5b4fd6', '#3a2fa6', '#c9c4ff', '#7fe0ff'], gba: true }
  },
  {
    id: 'gc', name: 'GameCube', maker: 'Nintendo', year: 2001, type: 'console', bits: 32, gen: 6,
    status: 'pc', ejs: null, lab: 'dolphin',
    cores: [{ id: 'dolphin', name: 'Dolphin (wasm-dolphin)', dev: 'Dolphin Emulator Project, dougchansan', license: 'GPL-2.0+' }],
    ext: ['iso', 'gcm', 'rvz', 'dol', 'elf'], bios: null, cheats: [], native: ['Dolphin (PC/Android)', 'DolphiniOS (iOS, JIT)'],
    art: { form: 'cube', c: ['#5a4cb8', '#3b2f8a', '#c8c2ff', '#2a2260'] }
  },
  {
    id: 'xbox', name: 'Xbox', maker: 'Microsoft', year: 2001, type: 'console', bits: 32, gen: 6,
    status: 'native', ejs: null, cores: [],
    ext: ['iso', 'xiso'], bios: null, cheats: [], native: ['xemu (PC)'],
    art: { form: 'tower', c: ['#202124', '#0d0e10', '#4ccb4c', '#555a5e'] }
  },
  {
    id: 'nds', name: 'Nintendo DS', maker: 'Nintendo', year: 2004, type: 'handheld', bits: 32, gen: 7,
    status: 'ready', ejs: 'nds',
    cores: [
      { id: 'desmume2015', name: 'DeSmuME 2015', dev: 'DeSmuME-Team', license: 'GPL-2.0' },
      { id: 'melonds', name: 'melonDS', dev: 'Arisotura', license: 'GPL-3.0' }
    ],
    ext: ['nds', 'dsi'], bios: { required: false, files: ['bios7.bin', 'bios9.bin', 'firmware.bin'] }, cheats: ['Action Replay'], native: ['Delta (iOS)', 'melonDS (PC/Android)'],
    art: { form: 'clam', c: ['#d9dbe2', '#a9acb6', '#2f2f36', '#8fd0ff'] }
  },
  {
    id: 'psp', name: 'PlayStation Portable', maker: 'Sony', year: 2004, type: 'handheld', bits: 32, gen: 7,
    status: 'exp', ejs: 'psp', threads: true,
    cores: [{ id: 'ppsspp', name: 'PPSSPP', dev: 'Henrik Rydgård', license: 'GPL-2.0' }],
    ext: ['iso', 'cso', 'pbp', 'elf', 'prx'], bios: null, cheats: ['CWCheat'], native: ['PPSSPP (iOS/Android/PC)'],
    art: { form: 'handheld-h', c: ['#1a1a1f', '#0a0a0c', '#9aa0aa', '#5ab0ff'], psp: true }
  },
  {
    id: 'wii', name: 'Wii', maker: 'Nintendo', year: 2006, type: 'console', bits: 32, gen: 7,
    status: 'pc', ejs: null, lab: 'dolphin',
    cores: [{ id: 'dolphin', name: 'Dolphin (wasm-dolphin)', dev: 'Dolphin Emulator Project, dougchansan', license: 'GPL-2.0+' }],
    ext: ['iso', 'wbfs', 'rvz', 'wad'], bios: null, cheats: [], native: ['Dolphin (PC/Android)'],
    art: { form: 'slim-v', c: ['#f2f3f6', '#cfd2d8', '#3ab8ff', '#e2e4ea'], white: true }
  },
  {
    id: 'ps3', name: 'PlayStation 3', maker: 'Sony', year: 2006, type: 'console', bits: 64, gen: 7,
    status: 'native', ejs: null, cores: [],
    ext: ['iso', 'pkg'], bios: null, cheats: [], native: ['RPCS3 (PC)'],
    art: { form: 'box', lid: 'curve', ctrl: 'bone', c: ['#18181c', '#060608', '#b0b0b8', '#3a3a44'], gloss: true }
  },
  {
    id: '3ds', name: 'Nintendo 3DS', maker: 'Nintendo', year: 2011, type: 'handheld', bits: 32, gen: 8,
    status: 'exp', ejs: null, lab: '3ds',
    cores: [{ id: 'azahar', name: 'Azahar Web', dev: 'Azahar-Team, Shubin123', license: 'GPL-2.0' }],
    ext: ['3ds', 'cci', 'cxi', 'cia', '3dsx', 'app'], bios: null, cheats: [], native: ['Azahar (PC/Android)', 'Folium (iOS)'],
    art: { form: 'clam', c: ['#1f3b8a', '#132560', '#0e0e12', '#9ad8ff'], wide3d: true }
  },
  {
    id: 'vita', name: 'PlayStation Vita', maker: 'Sony', year: 2011, type: 'handheld', bits: 32, gen: 8,
    status: 'native', ejs: null, cores: [],
    ext: ['vpk'], bios: null, cheats: [], native: ['Vita3K (PC/Android)'],
    art: { form: 'handheld-h', c: ['#121216', '#050507', '#4a6cff', '#3a8cff'], psp: true, oval: true }
  },
  {
    id: 'wiiu', name: 'Wii U', maker: 'Nintendo', year: 2012, type: 'console', bits: 32, gen: 8,
    status: 'native', ejs: null, cores: [],
    ext: ['wud', 'wux', 'rpx', 'wua'], bios: null, cheats: [], native: ['Cemu (PC/Android)'],
    art: { form: 'tablet', c: ['#f2f3f6', '#cfd2d8', '#2a2a30', '#3ab8ff'] }
  }
];

/* Zusätzliche Dateiendungen, die mehreren Systemen gehören können */
const AMBIGUOUS_EXT = ['bin', 'iso', 'cue', 'chd', 'zip', '7z', 'img', 'rom', 'ccd', 'm3u', 'toc', 'mdf', 'exe'];

/* Bekannte BIOS-Dateinamen → System */
const BIOS_INDEX = (() => {
  const map = {};
  SYSTEMS.forEach(s => { if (s.bios) s.bios.files.forEach(f => { map[f.toLowerCase()] = s.id; }); });
  return map;
})();

function sysById(id) { return SYSTEMS.find(s => s.id === id); }

/* Systeme, die eine Dateiendung eindeutig oder mehrdeutig unterstützen */
function isPlayable(s) { return !!(s && (s.ejs || s.lab)); }

function systemsForExt(ext) {
  ext = (ext || '').toLowerCase();
  return SYSTEMS.filter(s => isPlayable(s) && s.ext.includes(ext));
}

/* Eindeutige Zuordnung: nur wenn genau ein spielbares System die Endung hat und sie nicht mehrdeutig ist */
function guessSystem(fileName) {
  const ext = fileName.split('.').pop().toLowerCase();
  if (AMBIGUOUS_EXT.includes(ext)) return null;
  const list = systemsForExt(ext);
  return list.length === 1 ? list[0].id : null;
}

function decadeOf(year) { return Math.floor(year / 10) * 10; }

const DECADE_COLORS = { 1970: '#ff9f43', 1980: '#ff5ca8', 1990: '#9b87ff', 2000: '#4fc3f7', 2010: '#5be0b0' };
