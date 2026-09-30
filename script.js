(() => {
  'use strict';

  const $ = (id) => document.getElementById(id);
  const state = {
    totalFiles: 0,
    neededFiles: 0,
    progress: 0,
    gotGameDetails: false,
  };

  const tips = [
    'F2 — меню сервера и выбор режима.',
    'TAB — список игроков, профили и быстрые действия.',
    'Строитель не получает PvP-урон и может использовать noclip.',
    'В PvP noclip отключён, а после боя действует короткая блокировка смены режима.',
    'Зелёная зона — безопасный spawn. Не блокируй входы и выходы.',
    'Не мешай другим играть в выбранном ими стиле.',
    'Проблема или нарушение? F2 → «Жалобы» или команда !report.',
    'Сервер использует прогрессию, достижения, титулы и цвета профиля.'
  ];

  function clean(value, fallback = '—') {
    const s = String(value ?? '').trim();
    return s || fallback;
  }

  function setProgress(value) {
    const p = Math.max(0, Math.min(100, Math.round(Number(value) || 0)));
    state.progress = p;
    $('progressFill').style.width = `${p}%`;
    $('progressNumber').textContent = `${p}%`;
    $('progressTrack').setAttribute('aria-valuenow', String(p));
  }

  function updateFileProgress() {
    if (state.totalFiles > 0) {
      const done = Math.max(0, state.totalFiles - state.neededFiles);
      setProgress((done / state.totalFiles) * 100);
      $('fileCount').textContent = `файлы: ${done} / ${state.totalFiles}`;
    } else if (state.neededFiles > 0) {
      $('fileCount').textContent = `осталось файлов: ${state.neededFiles}`;
    }
  }

  // Garry's Mod loading-screen callbacks.
  window.GameDetails = function(servername, serverurl, mapname, maxplayers, steamid, gamemode, volume, language) {
    state.gotGameDetails = true;
    const server = clean(servername, 'Наш Sandbox');
    $('serverName').textContent = server;
    $('serverNameTop').textContent = server;
    $('mapName').textContent = clean(mapname, 'gm_bigcity_improved_rp');
    $('maxPlayers').textContent = clean(maxplayers, '40');
    $('steamId').textContent = clean(steamid, '—');
    $('gameMode').textContent = clean(gamemode, 'sandbox');
    $('statusText').textContent = 'Информация о сервере получена. Подготавливаем подключение…';
  };

  window.SetFilesTotal = function(total) {
    state.totalFiles = Math.max(0, Number(total) || 0);
    state.neededFiles = state.totalFiles;
    updateFileProgress();
  };

  window.SetFilesNeeded = function(needed) {
    state.neededFiles = Math.max(0, Number(needed) || 0);
    updateFileProgress();
  };

  window.DownloadingFile = function(fileName) {
    const file = clean(fileName, 'ресурс сервера');
    $('fileStatus').textContent = `Загрузка: ${file}`;
  };

  window.SetStatusChanged = function(status) {
    const s = clean(status, 'Подключение…');
    $('statusText').textContent = s;

    // Status is authoritative; this fallback only keeps the bar alive on stages
    // where GMod does not report a file counter.
    if (state.totalFiles === 0 && state.progress < 92) {
      const low = s.toLowerCase();
      if (low.includes('lua')) setProgress(Math.max(state.progress, 72));
      else if (low.includes('workshop') || low.includes('download')) setProgress(Math.max(state.progress, 36));
      else if (low.includes('client')) setProgress(Math.max(state.progress, 84));
      else setProgress(Math.max(state.progress, 12));
    }
  };

  // Optional URL fallback: ?Map=%m&SteamId=%s
  const params = new URLSearchParams(location.search);
  const mapParam = params.get('Map') || params.get('map');
  const steamParam = params.get('SteamId') || params.get('steamid');
  if (mapParam) $('mapName').textContent = mapParam;
  if (steamParam) $('steamId').textContent = steamParam;

  let tipIndex = Math.floor(Math.random() * tips.length);
  $('tipText').textContent = tips[tipIndex];
  setInterval(() => {
    tipIndex = (tipIndex + 1) % tips.length;
    const el = $('tipText');
    el.style.opacity = '0';
    setTimeout(() => {
      el.textContent = tips[tipIndex];
      el.style.opacity = '1';
    }, 220);
  }, 7000);

  // Browser preview mode. Never runs when GMod has already provided real data.
  if (params.get('preview') === '1') {
    window.GameDetails('Наш Sandbox', location.href, mapParam || 'gm_bigcity_improved_rp', 40, steamParam || '7656119XXXXXXXXXX', 'sandbox', 0.5, 'ru');
    window.SetFilesTotal(46);
    let needed = 46;
    const fakeFiles = [
      'materials/sandbox_core/interface.vmt',
      'models/props_c17/oildrum001.mdl',
      'sound/sandbox_core/ui_ready.wav',
      'lua/autorun/sandbox_core_init.lua'
    ];
    let i = 0;
    const timer = setInterval(() => {
      needed = Math.max(0, needed - 2);
      window.SetFilesNeeded(needed);
      window.DownloadingFile(fakeFiles[i++ % fakeFiles.length]);
      window.SetStatusChanged(needed > 8 ? 'Downloading server content…' : 'Starting Lua…');
      if (needed === 0) {
        clearInterval(timer);
        setProgress(100);
        $('statusText').textContent = 'Почти готово…';
        $('fileStatus').textContent = 'Контент загружен';
      }
    }, 260);
  }
})();
