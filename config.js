/*
  Единственный файл, который обычно нужно править вручную.
  Никаких секретов/API-ключей сюда не добавляй: GitHub Pages публичный.
*/
window.NASH_LOADING_CONFIG = {
  serverName: "Наш Sandbox",
  coreVersion: "0.24.0",
  primaryMap: "gm_bigcity_improved_rp",

  maps: {
    "gm_bigcity_improved_rp": {
      label: "Bigcity Improved",
      theme: "bigcity",
      backgroundImage: ""
    },
    "gm_construct": {
      label: "Construct",
      theme: "construct",
      backgroundImage: ""
    },
    "gm_flatgrass": {
      label: "Flatgrass",
      theme: "flatgrass",
      backgroundImage: ""
    }
  },

  points: [
    "Зелёная зона — безопасный spawn",
    "Прогрессия, достижения и титулы",
    "Защита построек и адаптивный TPS guard"
  ],

  tips: [
    { tag: "F2", text: "Меню сервера и выбор режима." },
    { tag: "TAB", text: "Список игроков, профиль и быстрые действия." },
    { tag: "BUILD", text: "Строитель не получает PvP-урон и может использовать noclip." },
    { tag: "PVP", text: "После PvP-боя действует короткая блокировка перехода в Строителя." },
    { tag: "SPAWN", text: "Зелёная зона — безопасный spawn. Не блокируй входы и выходы." },
    { tag: "VOICE", text: "Режим голосового чата можно переключать между локальным и общим." },
    { tag: "PROGRESS", text: "На сервере есть достижения, титулы, цвета профиля и таблицы лидеров." },
    { tag: "RULE", text: "Не мешай другим играть в выбранном ими стиле." }
  ]
};
