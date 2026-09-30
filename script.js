# Наш Sandbox — Loading Screen v0.4

Черновик v0.4 для `sv_loadingurl`, собранный по актуальному архиву сервера.

## Что изменилось относительно v0.1

- Новый cinematic-макет вместо интерфейса в стиле админ-панели.
- Атмосферный Bigcity-фон полностью на CSS, без тяжёлого видео или внешних ресурсов.
- Четыре честных этапа подключения: **Сервер → Контент → Lua → Вход**.
- Процент показывается только когда GMod действительно сообщает `SetFilesTotal/SetFilesNeeded`.
- Динамическая тема по карте.
- Настройки сервера, версии, подсказок и карт вынесены в `config.js`.
- Новый локальный SVG-логотип.
- JS написан без `URLSearchParams`, стрелочных функций и других необязательных современных API.
- Нет внешних шрифтов, аналитики, API и CDN.

## Актуальные данные из переданного архива

- Server name: `Наш Sandbox`
- Core: `v0.44.0`
- Primary map: `gm_bigcity_improved_rp`
- Workshop collection: `3805955116`
- Roles: `Строитель` / `PvP` (+ admin/creator authority)
- Safe spawn: зелёная зона
- Core UI accent: `#4EDD7F`
- Builder: `#5AB4FF`
- PvP: `#E15F5F`

> В `server.cfg` и `srcds_workshop_ids.txt` ещё встречается старый номер `v0.43.9` в комментариях. Активный `SC.Version` и `addon.json` в архиве — `v0.44.0`, поэтому loading screen использует именно его.

## Загрузка на GitHub Pages

Замени файлы в корне репозитория на содержимое этой папки:

```text
index.html
styles.css
script.js
config.js
assets/
```

После commit GitHub Pages оставит тот же URL. Серверный `sv_loadingurl` менять не нужно.

## Проверка без GMod

Открой опубликованную страницу так:

```text
https://YOURNAME.github.io/nash-sandbox-loading/?preview=1
```

Можно проверить тему карты:

```text
?preview=1&Map=gm_construct
?preview=1&Map=gm_flatgrass
```

## Свой фон карты позже

Положи изображение, например:

```text
assets/bigcity.webp
```

И в `config.js` у нужной карты укажи:

```js
backgroundImage: "./assets/bigcity.webp"
```

CSS-город останется фоном/подложкой, а фотография появится поверх него с затемнением.

## Конфиг GMod

У тебя уже прописано:

```cfg
sv_loadingurl "https://wisp887.github.io/nash-sandbox-loading/"
```

Можно оставить именно так. Дополнительные query-параметры необязательны, потому что GMod передаёт карту через `GameDetails()`.

## Важно

Не загружай в этот публичный репозиторий папки `garrysmod/cfg`, серверные Lua-файлы, токены или другие приватные данные. GitHub Pages должен содержать только файлы loading screen.


## Фон v0.4

Для `gm_bigcity_improved_rp` используется локальный файл `assets/bigcity-night.jpg`. Он грузится с того же GitHub Pages и не требует внешних CDN или API. Для замены фона достаточно заменить этот файл или изменить `backgroundImage` в `config.js`.

## Что нового в v0.4
- более крупный фирменный wordmark и новый знак;
- полноценные карточки Builder / PvP с локальными SVG-иконками;
- серверные возможности теперь показаны иконками вместо цветных точек;
- нижняя панель стала HUD загрузки с реальным процентом только во время файловой загрузки;
- макет отдельно ужат для 1366×768.
