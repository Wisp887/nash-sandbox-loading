(function () {
  "use strict";

  var config = window.NASH_LOADING_CONFIG || {};
  var state = {
    totalFiles: 0,
    neededFiles: 0,
    currentStage: 0,
    gotGameDetails: false,
    steamId: "",
    tipIndex: 0
  };

  function byId(id) {
    return document.getElementById(id);
  }

  function clean(value, fallback) {
    var text = String(value === undefined || value === null ? "" : value).replace(/^\s+|\s+$/g, "");
    return text || (fallback || "—");
  }

  function queryValue(name) {
    var query = window.location.search || "";
    var parts = query.replace(/^\?/, "").split("&");
    var target = String(name).toLowerCase();
    var i;

    for (i = 0; i < parts.length; i += 1) {
      if (!parts[i]) { continue; }
      var pair = parts[i].split("=");
      var key = decodeURIComponent(pair[0] || "").toLowerCase();
      if (key === target) {
        return decodeURIComponent((pair.slice(1).join("=") || "").replace(/\+/g, " "));
      }
    }

    return "";
  }

  function setText(id, value) {
    var node = byId(id);
    if (node) { node.textContent = value; }
  }

  function applyConfig() {
    var serverName = config.serverName || "Наш Sandbox";
    var coreVersion = config.coreVersion || "0.24.0";

    setText("serverName", serverName);
    setText("serverNameTop", serverName);
    setText("coreVersionTop", "SandboxCore v" + coreVersion);
    setText("coreVersionBottom", "Core v" + coreVersion);

    if (config.points && config.points.length) {
      var container = byId("serverPoints");
      var rows = container ? container.getElementsByTagName("span") : [];
      var i;
      for (i = 0; i < rows.length && i < config.points.length; i += 1) {
        rows[i].textContent = config.points[i];
      }
    }
  }

  function mapData(mapName) {
    var maps = config.maps || {};
    return maps[mapName] || {
      label: mapName,
      theme: "generic",
      backgroundImage: ""
    };
  }

  function setMap(mapName) {
    var name = clean(mapName, config.primaryMap || "gm_bigcity_improved_rp");
    var data = mapData(name);
    var body = document.body;
    var className = body.className || "";
    var classes = className.split(/\s+/);
    var kept = [];
    var i;

    for (i = 0; i < classes.length; i += 1) {
      if (classes[i] && classes[i].indexOf("theme-") !== 0) {
        kept.push(classes[i]);
      }
    }
    kept.push("theme-" + (data.theme || "generic"));
    body.className = kept.join(" ");

    setText("mapName", name);
    setText("mapChip", name);

    var photo = byId("mapPhoto");
    if (photo) {
      if (data.backgroundImage) {
        photo.style.backgroundImage = "url('" + String(data.backgroundImage).replace(/'/g, "%27") + "')";
        photo.style.opacity = "0.66";
        if (body.className.indexOf("has-map-photo") === -1) {
          body.className += " has-map-photo";
        }
      } else {
        photo.style.backgroundImage = "none";
        photo.style.opacity = "0";
        body.className = body.className.replace(/\bhas-map-photo\b/g, "").replace(/\s+/g, " ").replace(/^\s+|\s+$/g, "");
      }
    }
  }

  function setStage(stage, status) {
    var next = Math.max(0, Math.min(3, Number(stage) || 0));
    if (next > state.currentStage) {
      state.currentStage = next;
    }

    var line = byId("stageLine");
    var nodes = line ? line.getElementsByClassName("stage") : [];
    var rails = line ? line.getElementsByClassName("stage-rail") : [];
    var i;

    for (i = 0; i < nodes.length; i += 1) {
      nodes[i].className = "stage";
      if (i < state.currentStage) {
        nodes[i].className += " is-done";
      } else if (i === state.currentStage) {
        nodes[i].className += " is-active";
      }
    }

    for (i = 0; i < rails.length; i += 1) {
      rails[i].className = "stage-rail" + (i < state.currentStage ? " is-done" : "");
    }

    if (status) {
      setText("statusText", status);
    }

    var topLabels = ["получаем сервер", "загружаем контент", "запускаем Lua", "входим в игру"];
    setText("topState", topLabels[state.currentStage]);
  }

  function setIndeterminate(caption) {
    var track = byId("progressTrack");
    if (track) {
      track.className = "progress-track is-indeterminate";
      track.removeAttribute("aria-valuenow");
    }
    if (byId("progressFill")) {
      byId("progressFill").style.width = "0%";
    }
    setText("progressNumber", "—");
    setText("progressCaption", caption || "этап подключения");
  }

  function setFileProgress() {
    var track = byId("progressTrack");
    var total = state.totalFiles;
    var needed = state.neededFiles;

    if (total > 0) {
      var done = Math.max(0, Math.min(total, total - needed));
      var percent = Math.max(0, Math.min(100, Math.round((done / total) * 100)));

      if (track) {
        track.className = "progress-track";
        track.setAttribute("aria-valuenow", String(percent));
      }
      if (byId("progressFill")) {
        byId("progressFill").style.width = percent + "%";
      }
      setText("progressNumber", percent + "%");
      setText("progressCaption", "контент");
      setText("fileCount", "файлы: " + done + " / " + total);

      if (needed <= 0) {
        setStage(2, "Контент загружен. Запускаем клиентские скрипты…");
        setText("fileStatus", "Workshop-контент готов");
      } else {
        setStage(1);
      }
    } else if (needed > 0) {
      setText("fileCount", "осталось файлов: " + needed);
    }
  }

  function friendlyStatus(raw) {
    var text = clean(raw, "Подключение…");
    var low = text.toLowerCase();

    if (low.indexOf("retriev") !== -1 || low.indexOf("connect") !== -1 || low.indexOf("auth") !== -1) {
      return { stage: 0, text: "Получаем информацию о сервере…" };
    }
    if (low.indexOf("workshop") !== -1 || low.indexOf("download") !== -1 || low.indexOf("mount") !== -1) {
      return { stage: 1, text: "Загружаем и подключаем контент сервера…" };
    }
    if (low.indexOf("lua") !== -1 || low.indexOf("script") !== -1) {
      return { stage: 2, text: "Запускаем клиентские Lua-скрипты…" };
    }
    if (low.indexOf("sending client info") !== -1 || low.indexOf("spawn") !== -1 || low.indexOf("ready") !== -1 || low.indexOf("joining") !== -1) {
      return { stage: 3, text: "Финальная синхронизация. Входим в игру…" };
    }

    return { stage: state.currentStage, text: text };
  }

  function showTip(index) {
    var tips = config.tips || [];
    if (!tips.length) { return; }

    var tip = tips[index % tips.length];
    var textNode = byId("tipText");
    var tagNode = byId("tipTag");

    if (textNode) { textNode.style.opacity = "0"; }
    if (tagNode) { tagNode.style.opacity = "0"; }

    window.setTimeout(function () {
      setText("tipText", tip.text || "");
      setText("tipTag", tip.tag || "TIP");
      if (textNode) { textNode.style.opacity = "1"; }
      if (tagNode) { tagNode.style.opacity = "1"; }
    }, 180);
  }

  function startTips() {
    var tips = config.tips || [];
    if (!tips.length) { return; }

    state.tipIndex = Math.floor(Math.random() * tips.length);
    setText("tipText", tips[state.tipIndex].text || "");
    setText("tipTag", tips[state.tipIndex].tag || "TIP");

    window.setInterval(function () {
      state.tipIndex = (state.tipIndex + 1) % tips.length;
      showTip(state.tipIndex);
    }, 7200);
  }

  window.GameDetails = function (servername, serverurl, mapname, maxplayers, steamid, gamemode) {
    state.gotGameDetails = true;
    state.steamId = clean(steamid, "");

    var name = clean(servername, config.serverName || "Наш Sandbox");
    setText("serverName", name);
    setText("serverNameTop", name);
    setText("gameMode", clean(gamemode, "sandbox"));
    setText("maxPlayers", clean(maxplayers, "—"));
    setMap(clean(mapname, config.primaryMap || "gm_bigcity_improved_rp"));
    setStage(0, "Сервер найден. Подготавливаем подключение…");
  };

  window.SetFilesTotal = function (total) {
    state.totalFiles = Math.max(0, Number(total) || 0);
    state.neededFiles = state.totalFiles;
    if (state.totalFiles > 0) {
      setStage(1, "Проверяем Workshop-контент…");
    }
    setFileProgress();
  };

  window.SetFilesNeeded = function (needed) {
    state.neededFiles = Math.max(0, Number(needed) || 0);
    setFileProgress();
  };

  window.DownloadingFile = function (fileName) {
    var file = clean(fileName, "ресурс сервера");
    setStage(1);
    setText("fileStatus", "Загрузка: " + file);
  };

  window.SetStatusChanged = function (status) {
    var result = friendlyStatus(status);
    setStage(result.stage, result.text);

    if (state.totalFiles <= 0 || result.stage !== 1) {
      setIndeterminate(result.stage === 2 ? "Lua" : (result.stage === 3 ? "вход" : "этап подключения"));
    }
  };

  applyConfig();

  var mapParam = queryValue("Map") || queryValue("map") || config.primaryMap || "gm_bigcity_improved_rp";
  var steamParam = queryValue("SteamId") || queryValue("steamid");
  setMap(mapParam);
  if (steamParam) { state.steamId = steamParam; }
  setIndeterminate("ожидаем данные");
  startTips();

  if (queryValue("preview") === "1") {
    window.GameDetails(config.serverName || "Наш Sandbox", window.location.href, mapParam, 40, steamParam || "7656119XXXXXXXXXX", "sandbox");

    window.setTimeout(function () {
      window.SetStatusChanged("Downloading Workshop content");
      window.SetFilesTotal(46);

      var files = [
        "materials/sandbox_core/interface.vmt",
        "models/props_c17/oildrum001.mdl",
        "sound/sandbox_core/ui_ready.wav",
        "lua/autorun/sandbox_core_init.lua"
      ];
      var needed = 46;
      var fileIndex = 0;

      var timer = window.setInterval(function () {
        needed = Math.max(0, needed - 2);
        window.SetFilesNeeded(needed);
        window.DownloadingFile(files[fileIndex % files.length]);
        fileIndex += 1;

        if (needed <= 0) {
          window.clearInterval(timer);
          window.setTimeout(function () {
            window.SetStatusChanged("Starting Lua");
            window.setTimeout(function () {
              window.SetStatusChanged("Sending client info");
              setText("fileStatus", "Контент готов · финальная синхронизация");
            }, 1400);
          }, 700);
        }
      }, 160);
    }, 750);
  }
}());
