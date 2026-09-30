# Наш Sandbox — loading screen (черновик)

Черновая статическая страница для `sv_loadingurl`, собранная по конфигам **Наш Sandbox / SandboxCore v0.24.1**.

## Что уже работает

- дизайн в цветах SandboxCore (`#121418`, `#4EDD7F`, Builder `#5AB4FF`, PvP `#E15F5F`);
- `GameDetails(...)`: имя сервера, карта, maxplayers, SteamID64, gamemode;
- `SetFilesTotal(...)` / `SetFilesNeeded(...)`: прогресс скачивания файлов;
- `DownloadingFile(...)`: текущий файл;
- `SetStatusChanged(...)`: текущий статус подключения;
- адаптивная вёрстка;
- никаких внешних библиотек, шрифтов и CDN;
- тест в обычном браузере: добавь `?preview=1` к адресу.

## Файлы

- `index.html` — разметка;
- `styles.css` — внешний вид;
- `script.js` — интеграция с loading callbacks GMod;
- `.nojekyll` — отключает обработку Jekyll для простого статического сайта;
- `server_config_example.cfg` — пример `sv_loadingurl`.

## Быстрая публикация через GitHub Pages

1. Создай на GitHub публичный репозиторий, например `nash-sandbox-loading`.
2. Нажми **Add file → Upload files** и перетащи **содержимое этой папки** в корень репозитория.
3. Нажми **Commit changes**.
4. Открой **Settings → Pages**.
5. В **Build and deployment → Source** выбери **Deploy from a branch**.
6. Branch: `main`, folder: `/(root)`, затем **Save**.
7. Адрес проекта будет вида `https://USERNAME.github.io/nash-sandbox-loading/`.
8. Открой его в браузере. Для демонстрации callbacks можно открыть `...?preview=1`.
9. На GMod-сервере добавь в `garrysmod/cfg/autoexec.cfg`:

```cfg
sv_loadingurl "https://USERNAME.github.io/nash-sandbox-loading/"
```

После этого перезапусти сервер или выставь convar через серверную консоль.

## Важно

GitHub Pages публикует сайт в интернет. Не клади в этот репозиторий GSLT, пароли, приватные конфиги, внутренние админские документы или весь архив сервера. Для loading screen нужны только файлы этой папки.
