# Антон Афанасьев

Персональное портфолио. Реализовано содержание этапа 2; консоль и QA Mode остаются для этапа 3. Публикация текущей версии на GitHub Pages разрешена владельцем.

Адрес сайта: [anton-afanaciev.github.io/anton-portfolio](https://anton-afanaciev.github.io/anton-portfolio/). Статус первой публикации проверяется в [GitHub Actions](https://github.com/anton-afanaciev/anton-portfolio/actions).

## Запуск

Нужен Node.js 22.12+ или 24 LTS и npm. Проверки проекта выполнены на Node.js 24.14.0. В папке проекта: `npm ci`, затем `npm run dev`.
Открыть http://127.0.0.1:5173/anton-portfolio/ (точный адрес указан в терминале).
Production: `npm run build`, `npm run preview` — http://127.0.0.1:4173/anton-portfolio/.

## Проверки

`npm run typecheck`, `npm run lint`, `npm run test -- --run`, `npm run build`, `npm run test:e2e`.
Для E2E нужен установленный Chromium Playwright: `npx playwright install chromium`.

Стек: React, TypeScript, Vite, обычный CSS; Vitest и Playwright для проверок. Тексты: src/content/ru.ts; данные: src/data/. Темы: src/styles/tokens.css. Все 28 инструментов раскрываются кнопками; проекты фильтруются по категориям «Все», Web, AI и QA. Единственный проект — этот сайт в разработке. Портрет и три фото хобби хранятся локально. Контакты доступны целиком кликабельными карточками: [Telegram](https://t.me/Anton_afff), [GitHub](https://github.com/anton-afanaciev), [Email](mailto:afanaciev.anton@yandex.ru). Telegram и GitHub открываются в новой вкладке, Email передаётся почтовому обработчику. Источники и лицензии — [docs/image-sources.md](docs/image-sources.md). Консоль и QA Mode остаются для этапа 3.

## Добавление подтверждённых данных

- Фото профиля/проектов: поместить файл в public/photos/ и задать `photo: { src: 'photos/имя-файла.jpg', alt: 'Описание фотографии' }` в src/data/profile.ts или projects.ts. Локальные пути учитывают Vite base; можно указать полный HTTPS URL. При ошибке загрузки показывается замена. Не добавлять искусственный портрет вместо личного фото. Хобби оформлены едиными фотокарточками; данные — src/data/hobbies.ts, оформление — src/sections/Hobbies.tsx и Hobbies.module.css. Портрет и эндуро предоставлены владельцем, футбол/плавание иллюстративные. Для новых фото укажите width/height и варианты sources (480/960px); оригиналы не заменяйте оптимизированными копиями. Лицензии записывайте в docs/image-sources.md.
- Проект: добавить запись с уникальными id/slug, category (web/ai/qa), tags и status в src/data/projects.ts, а название/описание под тем же id — в `ru.projects.items`. Необязательные ссылки: `links: [{ kind: 'site', url: 'реальный адрес' }]` или kind source. Не добавлять ссылки до получения настоящего адреса. Новый статус при необходимости добавляется в тип и словарь; сейчас используется development.
- Контакт: задать реальный url и отображаемый адрес display в src/data/contacts.ts; для Email — адрес с `mailto:`. Telegram, GitHub и Email активны; контакт без url скрыт.
- Описания инструментов и направлений находятся в словаре ru; они не утверждают неподтверждённый уровень владения. Проверить новые данные теми же командами.

## Состав репозитория и статус

Репозиторий исходников: [anton-afanaciev/anton-portfolio](https://github.com/anton-afanaciev/anton-portfolio). Vite использует base `/anton-portfolio/`. Этап 3 не начат.

## Публикация и обновление

В [Settings → Pages](https://github.com/anton-afanaciev/anton-portfolio/settings/pages), раздел Build and deployment, выбрать Source: **GitHub Actions**. Workflow `.github/workflows/deploy.yml` следует [официальной инструкции Vite](https://vite.dev/guide/static-deploy.html#github-pages) и использует официальные GitHub actions, стандартные GITHUB_TOKEN/OIDC; SSH, сторонние токены и платные сервисы не нужны. Служебные разрешения Pages ограничены задачей deploy.

Каждый обычный push в `main` запускает npm ci, typecheck, lint, unit, production build и E2E desktop/mobile под `/anton-portfolio/`, затем публикует только `dist`. Проверки должны пройти до публикации. Для обновления изменить исходники/данные, выполнить команды проверок выше, создать коммит и `git push origin main`; результат виден в Actions. Возможен ручной запуск через Actions → Deploy portfolio to GitHub Pages → Run workflow.

Для отката будущих изменений вернуть содержимое известной успешно опубликованной версии, сохранив workflow и Vite base, затем выполнить обычный commit/push. Отмена первого коммита настройки Pages удалит workflow и не обновит уже опубликованный сайт; прежней Pages-версии до первой успешной публикации нет.

В Git входят исходники, тесты, конфигурации, package-lock.json, README и используемые ресурсы public/. Зависимости, dist, отчёты, env/ключи, локальные настройки, журналы разработки и снимки проверок исключены через .gitignore. Для работы приложения переменные окружения и секреты не требуются.

Лицензия на весь проект не задана. Публичный доступ к коду не означает разрешение свободно переиспользовать личные фотографии. Их происхождение и условия внешних фото описаны в docs/image-sources.md.


