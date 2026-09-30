<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#0b0f12">
  <title>Наш Sandbox — подключение</title>
  <link rel="stylesheet" href="./styles.css">
</head>
<body class="theme-bigcity">
  <div class="scene" id="scene" aria-hidden="true">
    <div class="map-photo" id="mapPhoto"></div>
    <div class="city-glow city-glow-a"></div>
    <div class="city-glow city-glow-b"></div>
    <div class="skyline skyline-far"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
    <div class="skyline skyline-near"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
    <div class="scene-grid"></div>
    <div class="scene-scan"></div>
    <div class="vignette"></div>
    <div class="grain"></div>
  </div>

  <main class="screen">
    <header class="topbar">
      <div class="compact-brand">
        <img src="./assets/logo-mark.svg" class="brand-mark" alt="">
        <div class="brand-copy">
          <strong id="serverNameTop">Наш Sandbox</strong>
          <span>Garry's Mod Community</span>
        </div>
      </div>

      <div class="top-meta">
        <span class="core-chip" id="coreVersionTop">SandboxCore v0.24.0</span>
        <span class="connect-state"><b></b><span id="topState">подключение</span></span>
        <span class="map-chip" id="mapChip">gm_bigcity_improved_rp</span>
      </div>
    </header>

    <section class="hero">
      <div class="hero-main">
        <div class="eyebrow"><span></span> СВОБОДНЫЙ SANDBOX ДЛЯ СВОИХ ИДЕЙ</div>

        <div class="wordmark" aria-label="Наш Sandbox">
          <span class="wordmark-small">НАШ</span>
          <h1>SANDBOX</h1>
          <div class="wordmark-rule"><i></i><b>БОЛЬШЕ ЧЕМ ПРОСТО СЕРВЕР</b><i></i></div>
        </div>

        <p class="slogan">Строй <i>•</i> Сражайся <i>•</i> Экспериментируй</p>
        <p class="hero-note">Выбирай свой стиль игры. Строитель получает свободу для творчества, PvP — полноценный боевой режим. Остальные системы работают тихо и не мешают песочнице.</p>

        <div class="mode-row">
          <article class="mode-card builder-card">
            <span class="mode-index">01</span>
            <div class="mode-icon"><img src="./assets/icon-builder.svg" alt=""></div>
            <div class="mode-copy">
              <span class="mode-overline">РЕЖИМ</span>
              <strong>Строитель</strong>
              <span class="mode-description">Создавай без ограничений и случайных перестрелок.</span>
              <div class="mode-tags"><em>без PvP-урона</em><em>noclip</em></div>
            </div>
          </article>

          <article class="mode-card pvp-card">
            <span class="mode-index">02</span>
            <div class="mode-icon"><img src="./assets/icon-pvp.svg" alt=""></div>
            <div class="mode-copy">
              <span class="mode-overline">РЕЖИМ</span>
              <strong>PvP</strong>
              <span class="mode-description">Полноценные сражения с боевыми ограничениями.</span>
              <div class="mode-tags"><em>полный урон</em><em>noclip off</em></div>
            </div>
          </article>
        </div>
      </div>

      <aside class="info-card">
        <div class="info-card-head">
          <div>
            <span class="micro-label">ПОДКЛЮЧЕНИЕ К СЕРВЕРУ</span>
            <h2 id="serverName">Наш Sandbox</h2>
          </div>
          <span class="status-light"></span>
        </div>

        <div class="session-grid">
          <div class="session-cell session-map">
            <img src="./assets/icon-map.svg" alt="">
            <div><span>Карта</span><strong id="mapName">gm_bigcity_improved_rp</strong></div>
          </div>
          <div class="session-cell">
            <img src="./assets/icon-gamepad.svg" alt="">
            <div><span>Режим</span><strong id="gameMode">sandbox</strong></div>
          </div>
          <div class="session-cell">
            <img src="./assets/icon-players.svg" alt="">
            <div><span>Слоты</span><strong id="maxPlayers">—</strong></div>
          </div>
        </div>

        <div class="features-title"><span>ОСОБЕННОСТИ СЕРВЕРА</span><i></i></div>
        <div class="feature-list">
          <div class="feature-row"><img src="./assets/icon-shield.svg" alt=""><div><strong>Зелёная зона</strong><span>Безопасный spawn и общение</span></div></div>
          <div class="feature-row"><img src="./assets/icon-progress.svg" alt=""><div><strong>Прогрессия</strong><span>Достижения, титулы и лидеры</span></div></div>
          <div class="feature-row"><img src="./assets/icon-guard.svg" alt=""><div><strong>Защита сервера</strong><span>Адаптивный TPS и anti-crash</span></div></div>
          <div class="feature-row"><img src="./assets/icon-voice.svg" alt=""><div><strong>Голосовой чат</strong><span>Локальный и глобальный режимы</span></div></div>
        </div>

        <div class="tip-box">
          <div class="tip-icon">?</div>
          <div class="tip-body">
            <div class="tip-head"><span class="micro-label">ПОДСКАЗКА</span><span class="tip-tag" id="tipTag">F2</span></div>
            <p id="tipText">Меню сервера и выбор режима.</p>
          </div>
        </div>
      </aside>
    </section>

    <section class="connection-panel" aria-live="polite">
      <div class="stage-line" id="stageLine">
        <div class="stage is-active" data-stage="0"><span class="stage-dot">1</span><div><strong>Сервер</strong><small>информация</small></div></div>
        <span class="stage-rail"></span>
        <div class="stage" data-stage="1"><span class="stage-dot">2</span><div><strong>Контент</strong><small>Workshop</small></div></div>
        <span class="stage-rail"></span>
        <div class="stage" data-stage="2"><span class="stage-dot">3</span><div><strong>Lua</strong><small>клиент</small></div></div>
        <span class="stage-rail"></span>
        <div class="stage" data-stage="3"><span class="stage-dot">4</span><div><strong>Вход</strong><small>в игру</small></div></div>
      </div>

      <div class="loading-hud">
        <div class="loading-copy">
          <span class="micro-label" id="statusKicker">ПОДКЛЮЧЕНИЕ</span>
          <strong id="statusText">Получаем информацию о сервере…</strong>
          <span class="file-name" id="fileStatus">Подготавливаем клиент…</span>
        </div>

        <div class="progress-cluster">
          <div class="progress-readout">
            <span id="progressCaption">ожидаем данные</span>
            <strong id="progressNumber">—</strong>
          </div>
          <div class="progress-track is-indeterminate" id="progressTrack" role="progressbar" aria-valuemin="0" aria-valuemax="100">
            <div class="progress-fill" id="progressFill"></div>
            <div class="progress-pulse"></div>
          </div>
          <span class="file-count" id="fileCount">файлы: —</span>
        </div>
      </div>
    </section>

    <footer class="footer">
      <div class="hotkeys">
        <div class="hotkey"><span>F2</span><b>меню сервера</b></div>
        <div class="hotkey"><span>TAB</span><b>игроки</b></div>
        <div class="hotkey"><span>V</span><b>голосовой чат</b></div>
      </div>
      <div class="footer-rule">ИГРАЙ <i>•</i> СОЗДАВАЙ <i>•</i> ОБЩАЙСЯ</div>
      <div class="footer-version" id="coreVersionBottom">Core v0.24.0</div>
    </footer>
  </main>

  <script src="./config.js"></script>
  <script src="./script.js"></script>
</body>
</html>
